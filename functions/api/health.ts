export async function onRequestGet() {
  return Response.json(
    {
      status: 'online',
      service: 'Shree Balaji Rolling Mills Web Edge',
      timestamp: new Date().toISOString(),
      cdn: 'Cloudflare Global Edge Network (300+ PoPs)',
      uptime: '100% Guaranteed (No Inactivity Sleep)',
    },
    { status: 200 }
  );
}
