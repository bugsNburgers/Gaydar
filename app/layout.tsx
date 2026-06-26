import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GAYDAR 3000',
  description: 'The most scientifically inaccurate machine ever built',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#08000f' }}>
        {children}
      </body>
    </html>
  )
}
