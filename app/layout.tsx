import type { Metadata } from 'next'
import { Cormorant_Garamond, Josefin_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif"
});

const josefin = Josefin_Sans({ 
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: 'Bích & Minh | Đám Cưới',
  description: 'Trân trọng kính mời quý khách đến dự lễ thành hôn',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${cormorant.variable} ${josefin.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
