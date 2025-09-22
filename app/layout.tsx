import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'JSG SPARSH Pune - Jain Social Group',
  description: 'JSG SPARSH Pune - Connecting the Jain community in Pune through social activities, cultural events, and community service.',
  keywords: 'JSG, SPARSH, Pune, Jain Social Group, community, events, cultural activities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}