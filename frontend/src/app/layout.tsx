import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fichas de Caracterización',
  description: 'Creado con Idk',
  generator: 'Angie, you Know',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
