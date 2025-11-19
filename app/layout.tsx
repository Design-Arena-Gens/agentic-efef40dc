export const metadata = {
  title: 'Trabajar con Múltiples IAs',
  description: 'Aprende a trabajar con varias IAs en paralelo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
