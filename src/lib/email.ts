import nodemailer from 'nodemailer';

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = Number(process.env.SMTP_PORT) || 465;
const smtpUser = process.env.SMTP_USER || 'shreebalajirmills@gmail.com';
const smtpPass = process.env.SMTP_PASS || 'pakooxzoordmncoz';
const notificationEmail = process.env.NOTIFICATION_EMAIL || smtpUser;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for 587
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

export interface InquiryEmailPayload {
  contactName: string;
  email: string;
  phone: string;
  companyName: string;
  segment: string;
  message?: string;
  specInterest?: string;
  inquiryId: string;
  crmTag?: string;
  assignedRole?: string;
}

export async function sendInquiryEmails(data: InquiryEmailPayload) {
  try {
    // 1. Lead alert email dispatched to Mill Sales Desk
    const adminMailOptions = {
      from: `"Shree Balaji Rolling Mills Web" <${smtpUser}>`,
      to: notificationEmail,
      replyTo: data.email,
      subject: `🚨 NEW MILL INQUIRY [${data.inquiryId}] - ${data.companyName} (${data.segment.toUpperCase()})`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 28px; border-radius: 16px; max-width: 650px; margin: auto;">
          <h2 style="color: #f59e0b; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-top: 0; font-size: 20px;">
            NEW INBOUND LEAD INQUIRY — ${data.inquiryId}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold; width: 140px;">Contact Name:</td><td style="padding: 10px; color: #ffffff; font-weight: bold;">${data.contactName}</td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Business Email:</td><td style="padding: 10px; color: #38bdf8;"><a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: underline;">${data.email}</a></td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Phone Number:</td><td style="padding: 10px; color: #ffffff;">${data.phone}</td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Company Name:</td><td style="padding: 10px; color: #ffffff; font-weight: bold;">${data.companyName}</td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Buyer Segment:</td><td style="padding: 10px; color: #f59e0b; font-weight: bold; text-transform: uppercase;">${data.segment}</td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Product Interest:</td><td style="padding: 10px; color: #ffffff; text-transform: uppercase;">${data.specInterest || 'Not specified'}</td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">CRM Tag:</td><td style="padding: 10px; color: #10b981; font-family: monospace;">${data.crmTag || 'inbound_lead'}</td></tr>
            <tr style="border-bottom: 1px solid #1e293b;"><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Assigned Desk:</td><td style="padding: 10px; color: #e2e8f0;">${data.assignedRole || 'Sales Desk Qualifier'}</td></tr>
            <tr><td style="padding: 10px; color: #94a3b8; font-weight: bold;">Project Requirement:</td><td style="padding: 10px; color: #e2e8f0; line-height: 1.5;">${data.message || 'None provided'}</td></tr>
          </table>
          <div style="margin-top: 24px; padding: 12px; background-color: #1e293b; border-radius: 8px; font-size: 12px; color: #94a3b8; text-align: center;">
            Dispatched via Shree Balaji Rolling Mills Private Limited API Engine.
          </div>
        </div>
      `,
    };

    // 2. Auto-responder confirmation email sent to Prospect
    const customerMailOptions = {
      from: `"Shree Balaji Rolling Mills" <${smtpUser}>`,
      to: data.email,
      subject: `Inquiry Confirmation [${data.inquiryId}] — Shree Balaji Rolling Mills Pvt. Ltd.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f8fafc; color: #0f172a; padding: 32px; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800;">Shree Balaji Rolling Mills Pvt. Ltd.</h1>
            <p style="color: #64748b; font-size: 12px; font-family: monospace; margin-top: 4px; uppercase; letter-spacing: 1px;">Bhiwadi, Haryana | 180,000 TPA Total Throughput</p>
          </div>

          <h2 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank You for Your Inquiry</h2>
          <p style="font-size: 14px; color: #475569; line-height: 1.6;">
            Dear <strong>${data.contactName}</strong>,<br/><br/>
            We have received your RFQ and technical inquiry on behalf of <strong>${data.companyName}</strong>. Our commercial sales desk in Bhiwadi, Haryana is processing your request.
          </p>

          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <p style="margin: 0; font-size: 13px; font-family: monospace; color: #0f172a;"><strong>Reference Ticket:</strong> ${data.inquiryId}</p>
            <p style="margin: 6px 0 0 0; font-size: 13px; color: #475569;"><strong>Inquiry Focus:</strong> ${data.segment.toUpperCase()}</p>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #475569;"><strong>Assigned Representative:</strong> ${data.assignedRole || 'Commercial Sales Desk'}</p>
          </div>

          <p style="font-size: 14px; color: #475569; line-height: 1.6;">
            A formal quote with mill-direct pricing schedules, chemical/mechanical test reports, and dispatch SLAs will be sent to <strong>${data.email}</strong> shortly.
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0;" />

          <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
            <strong>Shree Balaji Rolling Mills Private Limited</strong><br/>
            Factory Location: Bhiwadi, Haryana | Business Region: Delhi NCR<br/>
            Product Scope: BIS IS 2062 Structural Steel & IS 1786 Fe-500D TMT Bars
          </div>
        </div>
      `,
    };

    const info = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    console.log(`Email dispatched successfully for ${data.inquiryId}:`, info[0].messageId);
    return true;
  } catch (error) {
    console.error('Nodemailer Email Error:', error);
    return false;
  }
}
