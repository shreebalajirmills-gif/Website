import { NextRequest, NextResponse } from 'next/server';
import { verifyServerSession, authorizeRole, logSecurityEvent, safeUnauthorizedResponse, safeGenericError } from '@/lib/security';

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('cf-connecting-ip') || 
               '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || '';

    // 1. Verify Authentication Server-Side
    const session = await verifyServerSession(req);
    if (!session.authenticated) {
      logSecurityEvent({
        eventType: 'AUTHENTICATION_FAILURE',
        path: '/api/admin/inquiries',
        ip,
        userAgent,
        details: 'Unauthenticated attempt to access administrative route',
      });
      return safeUnauthorizedResponse();
    }

    // 2. Authorize Admin Role Server-Side
    const isAuthorized = authorizeRole(session.role, 'admin');
    if (!isAuthorized) {
      logSecurityEvent({
        eventType: 'AUTHORIZATION_FAILURE',
        path: '/api/admin/inquiries',
        ip,
        userAgent,
        details: `Insufficient privileges for role '${session.role || 'none'}'`,
      });
      return safeUnauthorizedResponse();
    }

    // 3. Log Successful Admin Access Audit Event
    logSecurityEvent({
      eventType: 'ADMIN_ACCESS_ATTEMPT',
      path: '/api/admin/inquiries',
      ip,
      userAgent,
      details: `Authorized admin access by user ${session.userId}`,
    });

    // 4. Return Trimmed DTO Response
    return NextResponse.json({
      status: 'success',
      data: {
        systemStatus: 'Operational',
        inquiriesCount: 0,
        assignedDesk: 'Bhiwadi Mill Commercial Desk',
      },
    });
  } catch (error) {
    console.error('Admin API Internal Error:', error);
    return safeGenericError();
  }
}
