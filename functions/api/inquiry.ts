interface InquiryBody {
  segment?: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  [key: string]: unknown;
}

export async function onRequestPost(context: { request: Request }) {
  try {
    const body = (await context.request.json()) as InquiryBody;

    // Segment routing logic
    let crmTag = 'inbound_lead';
    let assignedRole = 'Sales Desk Qualifier';

    switch (body.segment) {
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

    const inquiryId = `INQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;

    return Response.json(
      {
        status: 'success',
        inquiryId,
        message: 'Thank you. Your inquiry has been validated and routed to our team.',
        crmTag,
        assignedRole,
      },
      { status: 200 }
    );
  } catch {
    return Response.json(
      {
        status: 'error',
        message: 'Internal server error processing inquiry. Please try again.',
      },
      { status: 500 }
    );
  }
}
