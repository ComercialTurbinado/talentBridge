import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'leao-careers-jwt-secret-change-in-production';

interface User {
  email: string;
  role: string;
  nome: string;
}

interface TokenPayload {
  email: string;
  role: string;
  nome: string;
  iat?: number;
  exp?: number;
}

export interface AuthUser {
  id: string;
  email: string;
  tipo: 'superadmin' | 'analista' | 'consultor' | 'candidato' | 'empresa';
  permissoes: string[];
}

export function verifyToken(request: NextRequest): { success: boolean; user?: User; error?: string } {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { success: false, error: 'Token não encontrado' };
    }

    const token = authHeader.substring(7); // Remove 'Bearer '

    // Por enquanto, aceitar token simples para desenvolvimento
    if (token === 'mock-admin-token') {
      return {
        success: true,
        user: {
          email: 'admin@leaocareers.com',
          role: 'superadmin',
          nome: 'Administrador'
        }
      };
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
      
      return {
        success: true,
        user: {
          email: decoded.email,
          role: decoded.role,
          nome: decoded.nome
        }
      };
    } catch (jwtError) {
      // Se JWT falhar, tentar decodificação simples para desenvolvimento
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
          success: true,
          user: {
            email: payload.email || 'admin@leaocareers.com',
            role: payload.role || 'superadmin',
            nome: payload.nome || 'Administrador'
          }
        };
      } catch (error) {
        return { success: false, error: 'Token inválido' };
      }
    }

  } catch (error) {
    return { success: false, error: 'Erro ao verificar token' };
  }
}

export function generateToken(user: User): string {
  const payload: TokenPayload = {
    email: user.email,
    role: user.role,
    nome: user.nome
  };

  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: '24h' 
  });
}

// Função para validar credenciais (temporária para desenvolvimento)
export async function validateCredentials(email: string, senha: string): Promise<User | null> {
  // Mock para desenvolvimento - em produção buscar do MongoDB
  if (email === 'admin@leaocareers.com' && senha === 'LeaoAdmin2024!') {
    return {
      email: 'admin@leaocareers.com',
      role: 'superadmin',
      nome: 'Administrador'
    };
  }

  // TODO: Implementar busca real no MongoDB
  // const usuariosCollection = await getCollection(Collections.USUARIOS);
  // const usuario = await usuariosCollection.findOne({ email });
  // if (usuario && await bcrypt.compare(senha, usuario.senha)) {
  //   return { email: usuario.email, role: usuario.role, nome: usuario.nome };
  // }

  return null;
}

export function authenticateToken(request: NextRequest): AuthUser | null {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      id: decoded.id,
      email: decoded.email,
      tipo: decoded.tipo,
      permissoes: decoded.permissoes || []
    };
  } catch (error) {
    return null;
  }
}

export function requireAuth(request: NextRequest): NextResponse | AuthUser {
  const user = authenticateToken(request);
  
  if (!user) {
    return NextResponse.json(
      { erro: 'Token de acesso inválido ou expirado' },
      { status: 401 }
    );
  }

  return user;
}

export function requirePermission(user: AuthUser, requiredPermission: string): boolean {
  // Superadmin tem todas as permissões
  if (user.tipo === 'superadmin') {
    return true;
  }

  return user.permissoes.includes(requiredPermission);
}

export function requireRole(user: AuthUser, allowedRoles: string[]): boolean {
  return allowedRoles.includes(user.tipo);
}

export function createAuthError(message: string = 'Não autorizado'): NextResponse {
  return NextResponse.json(
    { erro: message },
    { status: 403 }
  );
} 