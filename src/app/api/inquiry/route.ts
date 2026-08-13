import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validation';
import { ApiResponse, BuyerSegment } from '@/types';
import { sendInquiryEmails } from '@/lib/email';
import { sanitizeInputString, logSecurityEvent, safeGenericError } from '@/lib/security';

// In-memory rate-limiter and submission deduplication cache
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const recentSubmissions = new Map<string, number>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const DUP_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

export async function POST(req: NextRequest) {
  try {
    // 1. Client IP Extraction
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               req.headers.get('cf-connecting-ip') || 
               '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || '';
    const now = Date.now();

    // Clean up stale rate-limit & duplicate entries
    rateLimitMap.forEach((entry, key) => {
      if (entry.resetTime < now) rateLimitMap.delete(key);
    });
    recentSubmissions.forEach((timestamp, hash) => {
      if (timestamp + DUP_WINDOW_MS < now) recentSubmissions.delete(hash);
    });

    // 2. Sliding Window Rate Limiting
    const currentRate = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };
    if (currentRate.resetTime < now) {
      currentRate.count = 0;
      currentRate.resetTime = now + RATE_LIMIT_WINDOW_MS;
    }

    if (currentRate.count >= MAX_REQUESTS_PER_WINDOW) {
      logSecurityEvent({
        eventType: 'RATE_LIMIT_EXCEEDED',
        path: '/api/inquiry',
        ip,
        userAgent,
        details: 'Exceeded maximum 5 submissions per 15 min window',
      });

      const errorResponse: ApiResponse = {
        status: 'error',
        message: 'Too many submission attempts. Please wait a few minutes before trying again.',
      };
      return NextResponse.json(errorResponse, { status: 429 });
    }

    currentRate.count += 1;
    rateLimitMap.set(ip, currentRate);

    // 3. Safely parse request JSON
    const rawBody = await req.json().catch(() => null);
    if (!rawBody || typeof rawBody !== 'object') {
      logSecurityEvent({
        eventType: 'SUSPICIOUS_REQUEST',
        path: '/api/inquiry',
        ip,
        userAgent,
        details: 'Malformed non-JSON request body',
      });
      return NextResponse.json(
        { status: 'error', message: 'Invalid request payload.' } as ApiResponse,
        { status: 400 }
      );
    }

    // 4. Honeypot Bot Trap Validation
    if (rawBody.website_hp && String(rawBody.website_hp).trim() !== '') {
      logSecurityEvent({
        eventType: 'BOT_HONEYPOT_TRIGGERED',
        path: '/api/inquiry',
        ip,
        userAgent,
        details: 'Spam bot filled hidden honeypot field',
      });
      // Return 400 to stop automated bot scripts
      return NextResponse.json(
        { status: 'error', message: 'Automated submission rejected.' } as ApiResponse,
        { status: 400 }
      );
    }

    // 5. Server-Side Input Sanitization
    const sanitizedBody = {
      segment: sanitizeInputString(rawBody.segment),
      companyName: sanitizeInputString(rawBody.companyName),
      contactName: sanitizeInputString(rawBody.contactName),
      email: sanitizeInputString(rawBody.email).toLowerCase(),
      phone: sanitizeInputString(rawBody.phone),
      message: sanitizeInputString(rawBody.message),
      specInterest: sanitizeInputString(rawBody.specInterest),
      currentSuppliers: sanitizeInputString(rawBody.currentSuppliers),
      annualVolumeMT: sanitizeInputString(rawBody.annualVolumeMT),
      growthAspiration: sanitizeInputString(rawBody.growthAspiration),
      projectScope: sanitizeInputString(rawBody.projectScope),
      requiredVolumeMT: sanitizeInputString(rawBody.requiredVolumeMT),
      deliveryTimeline: sanitizeInputString(rawBody.deliveryTimeline),
      investmentScale: sanitizeInputString(rawBody.investmentScale),
    };

    // 6. Duplicate Submission Hash Check
    const subHash = `${sanitizedBody.email}:${sanitizedBody.message.slice(0, 30)}`;
    if (recentSubmissions.has(subHash)) {
      logSecurityEvent({
        eventType: 'SUSPICIOUS_REQUEST',
        path: '/api/inquiry',
        ip,
        userAgent,
        details: `Duplicate submission hash blocked for ${sanitizedBody.email}`,
      });
      const errorResponse: ApiResponse = {
        status: 'error',
        message: 'Your inquiry has already been received. Our team is processing it.',
      };
      return NextResponse.json(errorResponse, { status: 429 });
    }
    recentSubmissions.set(subHash, now);

    // 7. Zod Schema Validation (Authoritative Server-Side Gate)
    const validationResult = inquirySchema.safeParse(sanitizedBody);
    if (!validationResult.success) {
      const issue = validationResult.error.issues[0];
      const errorResponse: ApiResponse = {
        status: 'error',
        message: issue?.message || 'Invalid form input',
        field: issue?.path[0] as string,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const data = validationResult.data;

    // 8. Lead Segment Routing Logic
    let crmTag = 'inbound_lead';
    let assignedRole = 'Sales Desk Qualifier';

    switch (data.segment as BuyerSegment) {
      case 'distributor':
        crmTag = 'channel_partner | growth_focus';
        assignedRole = 'Regional Sales Manager - Channel Partnerships';
        break;
      case 'contractor':
        crmTag = 'project_buyer | bulk_order';
        assignedRole = 'Account Manager - Commercial Fabricators';
        break;
      case 'project':
        crmTag = 'infrastructure_project | institutional';
        assignedRole = 'Executive Sales Director - Infrastructure SLAs';
        break;
      case 'investor':
        crmTag = 'investor_prospect | financial_interest';
        assignedRole = 'Investor Relations & CFO Desk';
        break;
    }

    // Generate unique inquiry ticket ID
    const inquiryId = `INQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    // 9. Dispatch Email Notifications via Nodemailer
    await sendInquiryEmails({
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      companyName: data.companyName,
      segment: data.segment,
      message: data.message,
      specInterest: data.specInterest,
      inquiryId,
      crmTag,
      assignedRole,
    });

    // 10. Trimmed API DTO Response (No internal secrets or database columns returned)
    const successResponse: ApiResponse = {
      status: 'success',
      inquiryId,
      message: 'Thank you. Your inquiry has been validated and dispatched to our sales desk.',
      crmTag,
      assignedRole,
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Inquiry API Handler Internal Error:', error);
    return safeGenericError();
  }
}
