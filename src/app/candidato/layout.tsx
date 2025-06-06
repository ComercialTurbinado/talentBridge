'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

export default function CandidatoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Lista de rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/candidato/login',
    '/candidato/cadastro',
    '/candidato/recuperar-senha',
    '/candidato',
  ]

  useEffect(() => {
    // Verifica se o usuário está logado
    const userType = Cookies.get('userType')
    if (!publicRoutes.includes(pathname) && userType !== 'candidato') {
      router.push('/candidato/login')
    }
  }, [pathname, router])

  return (
    <div>
      {children}
    </div>
  )
} 