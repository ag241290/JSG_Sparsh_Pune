import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'JSG SPARSH Pune - Jain Social Group',
  description: 'JSG SPARSH Pune - Connecting the Jain community in Pune through social activities, cultural events, and community service.',
  keywords: 'JSG, SPARSH, Pune, Jain Social Group, community, events, cultural activities',
  authors: [{ name: 'JSG SPARSH Pune' }],
  openGraph: {
    title: 'JSG SPARSH Pune - Jain Social Group',
    description: 'Connecting the Jain community in Pune',
    type: 'website',
    locale: 'en_US',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}