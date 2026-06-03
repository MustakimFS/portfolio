import { ImageResponse } from 'next/og'

// Favicon — generated via the edge runtime (@vercel/og). Warm-black tile
// with a bone "M" monogram.
export const runtime = 'edge'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#101010',
          color: '#F2F2F2',
          fontSize: 42,
          fontWeight: 600,
          borderRadius: 14,
        }}
      >
        M
      </div>
    ),
    { ...size },
  )
}
