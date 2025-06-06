import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, generateToken } from '@/lib/auth/middleware';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, senha, tipo } = body;

    if (!email || !senha) {
      return NextResponse.json({ 
        erro: 'E-mail e senha são obrigatórios' 
      }, { status: 400 });
    }

    // Validar apenas login de admin por enquanto
    if (tipo !== 'admin') {
      return NextResponse.json({ 
        erro: 'Tipo de login não suportado' 
      }, { status: 400 });
    }

    // Validar credenciais
    const user = await validateCredentials(email, senha);
    
    if (!user) {
      return NextResponse.json({ 
        erro: 'Credenciais inválidas' 
      }, { status: 401 });
    }

    // Gerar token
    const accessToken = generateToken(user);

    return NextResponse.json({
      sucesso: true,
      accessToken,
      user: {
        email: user.email,
        role: user.role,
        nome: user.nome
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json({ 
      erro: 'Erro interno do servidor' 
    }, { status: 500 });
  }
} 