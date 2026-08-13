import type { Metadata } from 'next'
import { Syne, Space_Grotesk, DM_Mono } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-grotesk',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Anirudh A Tembe — Software Developer',
  description: 'Building systems that scale. Chasing redlines at 1:30 AM on empty airport routes.',
  keywords: ['Software Developer', 'Full Stack', 'AI', 'Next.js', 'KTM'],
  icons: {
    icon: '/webicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
