import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validation';
import { ApiResponse, BuyerSegment } from '@/types';



export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate with Zod
    const validationResult = inquirySchema.safeParse(body);
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

    // Segment routing logic per TDR Section 4
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

    // Generate unique inquiry ID
    const inquiryId = `INQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    const successResponse: ApiResponse = {
      status: 'success',
      inquiryId,
      message: "Thank you. Your inquiry has been validated and routed to our team.",
      crmTag,
      assignedRole,
    };

    return NextResponse.json(successResponse, { status: 200 });
  } catch (error) {
    console.error('Inquiry API Handler Error:', error);
    const errorResponse: ApiResponse = {
      status: 'error',
      message: 'Internal server error processing inquiry. Please try again.',
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
