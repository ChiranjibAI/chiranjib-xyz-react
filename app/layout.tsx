import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import VoiceAgent from '@/components/voice/VoiceAgent'

export const metadata: Metadata = {
  metadataBase: new URL('https://chiranjib.xyz'),
  title: { default: 'Chiranjib — AGI Developer & AI Automation Specialist', template: '%s | Chiranjib.xyz' },
  description: 'India\'s leading AI automation specialist. Building autonomous AI agents, WhatsApp bots, and full business automation. ₹25K–₹5L+ projects.',
  openGraph: { type: 'website', url: 'https://chiranjib.xyz', title: 'Chiranjib — AGI Developer & AI Automation Specialist', images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', site: '@Chiranjibai' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-bg text-text antialiased">
        <div className="grain" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <VoiceAgent />
      </body>
    </html>
  )
}
