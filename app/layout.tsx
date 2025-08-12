import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ultra Music Collab',
  description: 'A collaborative and AI-powered music creation platform built with Next.js 14, featuring real-time collaboration, waveform visualization, and AI-assisted audio analysis.',
  keywords: 'music, collaboration, AI, waveform, audio, Next.js, real-time',
  authors: [{ name: 'Ultra Music Collab Team' }],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Ultra Music Collab',
    description: 'Collaborative music creation platform with AI-powered features',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-purple text-white`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
