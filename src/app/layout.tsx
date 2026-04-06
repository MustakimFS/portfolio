import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mustakim Shikalgar — Software Engineer',
  description: 'MS Software Engineering @ ASU · Published IEEE Researcher · Distributed Systems & ML · Seeking SDE Roles May 2026',
  keywords: ['Software Engineer', 'Full Stack', 'Machine Learning', 'Distributed Systems', 'ASU', 'IEEE'],
  authors: [{ name: 'Mustakim Shikalgar' }],
  openGraph: {
    title: 'Mustakim Shikalgar — Software Engineer',
    description: 'MS Software Engineering @ ASU · IEEE Published Researcher · Building distributed systems and intelligent applications',
    url: 'https://mustakimshikalgar.dev',
    siteName: 'Mustakim Shikalgar',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mustakim Shikalgar — Software Engineer',
    description: 'MS Software Engineering @ ASU · IEEE Published Researcher',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-bg">{children}</body>
    </html>
  )
}
