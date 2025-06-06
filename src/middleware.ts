import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userType = request.cookies.get('userType')?.value
  const path = request.nextUrl.pathname

  // Rotas públicas
  const publicRoutes = [
    '/candidato/login',
    '/candidato/recuperar-senha',
    '/candidato/cadastro',
    '/empresa/login',
    '/empresa/recuperar-senha',
    '/empresa/cadastro',
    '/',
  ]

  // Se a rota for pública, permite o acesso
  if (publicRoutes.includes(path)) {
    return NextResponse.next()
  }

  // Verifica se o usuário está tentando acessar uma rota protegida
  if (path.startsWith('/candidato/') || path.startsWith('/empresa/')) {
    // Se não estiver logado, redireciona para o login apropriado
    if (!userType) {
      const loginPath = path.startsWith('/candidato/') ? '/candidato/login' : '/empresa/login'
      return NextResponse.redirect(new URL(loginPath, request.url))
    }

    // Verifica se o usuário está tentando acessar uma área que não tem permissão
    if (
      (path.startsWith('/candidato/') && userType !== 'candidato') ||
      (path.startsWith('/empresa/') && userType !== 'empresa')
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/candidato/:path*',
    '/empresa/:path*',
  ],
} 