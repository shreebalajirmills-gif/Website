import { NextRequest, NextResponse } from 'next/server';
import { ApiResponse } from '@/types';

export interface SecurityAuditEvent {
  eventType: 'AUTHENTICATION_FAILURE' | 'AUTHORIZATION_FAILURE' | 'RATE_LIMIT_EXCEEDED' | 'SUSPICIOUS_REQUEST' | 'ADMIN_ACCESS_ATTEMPT' | 'BOT_HONEYPOT_TRIGGERED';
  path: string;
  ip: string;
  userAgent?: string;
  details?: string;
  timestamp?: string;
}

// 1. Server-side string sanitization (Strips HTML/script tags and trims)
export function sanitizeInputString(str: unknown): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .trim();
}

// 2. Server-side Security Audit Logging (Never logs passwords, tokens, or secrets)
export function logSecurityEvent(event: SecurityAuditEvent): void {
  const timestamp = event.timestamp || new Date().toISOString();
  const safeLog = {
    timestamp,
    eventType: event.eventType,
    path: event.path,
    ip: event.ip || 'ANONYMOUS',
    userAgent: event.userAgent || 'UNKNOWN',
    details: event.details ? sanitizeInputString(event.details) : undefined,
  };

  // Server-side audit log output (for production log aggregators / SIEM)
  console.warn(`[SECURITY AUDIT LOG] ${JSON.stringify(safeLog)}`);
}

// 3. Server-side Session Verification (Independent of client state)
export async function verifyServerSession(req: NextRequest): Promise<{ authenticated: boolean; userId?: string; role?: string }> {
  const authHeader = req.headers.get('authorization');
  const sessionCookie = req.cookies.get('sbrm_session')?.value;

  // Verify Bearer token or HttpOnly session cookie server-side
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : sessionCookie;

  if (!token) {
    return { authenticated: false };
  }

  // Example server-side validation against environment secret or JWT signature
  const adminSecret = process.env.ADMIN_SESSION_SECRET;
  if (adminSecret && token === adminSecret) {
    return { authenticated: true, userId: 'admin_sys', role: 'admin' };
  }

  return { authenticated: false };
}

// 4. Server-side Role Authorization
export function authorizeRole(userRole: string | undefined, requiredRole: string): boolean {
  if (!userRole) return false;
  if (requiredRole === 'admin') return userRole === 'admin';
  if (requiredRole === 'sales_desk') return userRole === 'admin' || userRole === 'sales_desk';
  return false;
}

// 5. Generic Safe Unauthorized Response (Does NOT leak whether resource exists or internal permissions)
export function safeUnauthorizedResponse(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      status: 'error',
      message: 'The requested resource or action cannot be accessed.',
    },
    { status: 404 } // Standard security pattern: Return generic 404 to prevent endpoint enumeration
  );
}

// 6. Generic Safe Server Error Response (Does NOT leak stack traces or SQL errors)
export function safeGenericError(): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      status: 'error',
      message: 'An unexpected server error occurred. Please try again later.',
    },
    { status: 500 }
  );
}
