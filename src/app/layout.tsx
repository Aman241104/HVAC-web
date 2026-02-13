import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'VAER HVAC Solutions | Premium VRF & HVAC Engineering',
  description: 'Leading HVAC engineering firm in Mumbai. Specializing in VRF installation, luxury home climate control, and commercial ducting. Book a site inspection.',
  keywords: ['HVAC Consultant', 'VRF System', 'Luxury AC Installation', 'Daikin VRV', 'Mumbai HVAC', 'Engineering', 'Climate Control'],
  openGraph: {
    title: 'Engineering Perfect Indoor Comfort - VAER HVAC',
    description: "We don't just install. We engineer comfort. 500+ Premium projects delivered.",
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppFloat />
        </SmoothScroll>
      </body>
    </html>
  )
}
