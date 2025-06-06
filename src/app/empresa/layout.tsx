'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'

export default function EmpresaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Lista de rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/empresa/login',
    '/empresa/cadastro',
    '/empresa/recuperar-senha',
    '/empresa'
  ]

  useEffect(() => {
    // Verifica se o usuário está logado
    const userType = Cookies.get('userType')
    
    // Se não estiver em uma rota pública e não estiver logado como empresa,
    // redireciona para a página de login
    if (!publicRoutes.includes(pathname) && userType !== 'empresa') {
      router.push('/empresa/login')
    }
  }, [pathname, router])

  return (
    <div>
      {children}
    </div>
  )
} 