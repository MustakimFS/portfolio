import { ImageResponse } from 'next/og'

// Social-preview card — generated via the edge runtime (@vercel/og).
// Used for OpenGraph + Twitter.
export const runtime = 'edge'
export const alt = 'Mustakim Shikalgar — Software Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#101010',
          color: '#F2F2F2',
        }}
      >
        <div
          style={{
            fontSize: 30,
            color: '#A0A0A0',
            marginBottom: 28,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          Mustakim Shikalgar
        </div>
        <div style={{ display: 'flex', fontSize: 70, fontWeight: 600, lineHeight: 1.12, maxWidth: 960 }}>
          I build distributed systems, intelligent agents &amp; research.
        </div>
        <div style={{ fontSize: 30, color: '#A0A0A0', marginTop: 44 }}>
          Software Engineer · MS @ ASU · IEEE published · Top 15% LeetCode
        </div>
      </div>
    ),
    { ...size },
  )
}
