import type { Metadata } from 'next'
import { Albert_Sans } from 'next/font/google'
import './globals.css'

const albertSans = Albert_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Grownee - Budget That Makes Sense',
  description: 'Grownee Budget helps you understand your spending, stay organized, and hit your goals within weeks of using it.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={albertSans.className}>{children}</body>
    </html>
  )
}
