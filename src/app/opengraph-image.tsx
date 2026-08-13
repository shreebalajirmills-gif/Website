import { ImageResponse } from 'next/og';

export const alt = 'Shree Balaji Rolling Mills | Structural Steel & TMT Bar Manufacturers';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f172a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900',
                color: '#0f172a',
                fontSize: '24px',
              }}
            >
              SB
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.5px' }}>
                SHREE BALAJI ROLLING MILLS
              </span>
              <span style={{ fontSize: '14px', color: '#94a3b8', fontFamily: 'monospace' }}>
                Bhiwadi Mill Facility & Delhi NCR Office
              </span>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '20px',
              padding: '8px 20px',
              color: '#fbbf24',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            180,000 TPA CAPACITY
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: 1.1,
              color: '#ffffff',
              margin: 0,
              letterSpacing: '-1.5px',
            }}
          >
            BIS Certified Structural Steel <br />
            <span style={{ color: '#f59e0b' }}>& Fe-500D TMT Bar Manufacturers</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', margin: 0, maxWidth: '900px', lineHeight: 1.4 }}>
            Operating 36,000 TPA IS 2062 Structural Angles & Channels and 144,000 TPA IS 1786 Fe-500D Rebars in Bhiwadi, Haryana.
          </p>
        </div>

        {/* Bottom Certifications Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '16px', fontWeight: '700' }}>
            ✓ BIS IS 2062:2011 Grade A/E250
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '16px', fontWeight: '700' }}>
            ✓ BIS IS 1786:2018 Grade Fe-500D
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#e2e8f0', fontSize: '16px', fontWeight: '700' }}>
            ✓ ISO 9001:2015 Registered Quality
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
