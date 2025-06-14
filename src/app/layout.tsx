import './globals.css'

export const metadata = {
  title: 'Leao Talent Bridge',
  description: 'Plataforma de carreiras para brasileiros nos Emirados Árabes Unidos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
