// Simple example API route for demo purposes.
// If you're using Next.js, place this file at /src/pages/api/inquiry.ts
// Replace with your real backend logic (DB persistence, email, CRM integration, etc.)

// Types for Next.js API are optional in this demo. Avoiding dependency on 'next' types to keep the repo typecheck clean in mixed environments.

type Data = {
  inquiryId: string;
};

export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body || {};
  // Basic server-side validation could be added here.
  const date = new Date();
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, '');
  const rnd = Math.floor(Math.random() * 9000 + 1000);
  const inquiryId = `INQ-${ymd}-${rnd}`;

  // Example: log the inquiry to server logs. Replace with DB write/email as needed.
  console.log('Received inquiry:', { inquiryId, payload });

  // Return the generated id to the client
  return res.status(200).json({ inquiryId });
}
