import type { Metadata } from 'next'
import { Gloock } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import PillNav from '@/components/PillNav'
import SmoothScroll from '@/components/SmoothScroll'
import EasterEggsLayer from '@/components/easter/EasterEggsLayer'
import NavigationOverlay from '@/components/NavigationOverlay'

// Geist Sans + Mono (loaded from the `geist` package — official Vercel font)
// expose them through CSS variables matched in tailwind.config.js
const geistSans = GeistSans
const geistMono = GeistMono

const gloock = Gloock({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mustakimshikalgar.dev'),
  title: 'Mustakim Shikalgar — Software Engineer',
  description:
    'I build distributed systems, intelligent agents & research. MS Software Engineering @ ASU. IEEE published researcher. Seeking SDE roles May 2026.',
  keywords: [
    'Software Engineer',
    'Distributed Systems',
    'Machine Learning',
    'Full Stack',
    'ASU',
    'IEEE',
    'Mustakim Shikalgar',
  ],
  authors: [{ name: 'Mustakim Shikalgar' }],
  openGraph: {
    title: 'Mustakim Shikalgar — Software Engineer',
    description:
      'I build distributed systems, intelligent agents & research. MS @ ASU · IEEE published · Seeking SDE roles May 2026.',
    url: 'https://mustakimshikalgar.dev',
    siteName: 'Mustakim Shikalgar',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mustakim Shikalgar — Software Engineer',
    description: 'MS Software Engineering @ ASU · IEEE published',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${gloock.variable}`}
      suppressHydrationWarning>
      <body>
        <SmoothScroll />
        <PillNav />
        {children}
        <EasterEggsLayer />
        <NavigationOverlay />
        <Analytics />
      </body>
    </html>
  )
}
