import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'candidato' | 'empresa' | 'admin';
  profile?: {
    completed: boolean;
    avatar?: string;
    phone?: string;
    company?: string;
    position?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export class AuthService {
  private static readonly TOKEN_KEY = 'leao_token';
  private static readonly USER_KEY = 'leao_user';

  static setAuth(user: User, token: string): void {
    Cookies.set(this.TOKEN_KEY, token, { expires: 7 });
    Cookies.set(this.USER_KEY, JSON.stringify(user), { expires: 7 });
  }

  static getToken(): string | null {
    return Cookies.get(this.TOKEN_KEY) || null;
  }

  static getUser(): User | null {
    const userStr = Cookies.get(this.USER_KEY);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  static getUserType(): 'candidato' | 'empresa' | 'admin' | null {
    const user = this.getUser();
    return user?.type || null;
  }

  static logout(): void {
    Cookies.remove(this.TOKEN_KEY);
    Cookies.remove(this.USER_KEY);
  }

  static async login(email: string, password: string, type: 'candidato' | 'empresa' | 'admin'): Promise<AuthResponse> {
    try {
      // Simulação de usuários para desenvolvimento
      const mockUsers: Record<string, User> = {
        'candidato@teste.com': {
          id: '1',
          email: 'candidato@teste.com',
          name: 'João Silva',
          type: 'candidato',
          profile: {
            completed: true,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            phone: '+55 11 99999-9999',
            position: 'Desenvolvedor Full Stack'
          }
        },
        'empresa@teste.com': {
          id: '2',
          email: 'empresa@teste.com',
          name: 'Maria Santos',
          type: 'empresa',
          profile: {
            completed: true,
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
            phone: '+55 11 88888-8888',
            company: 'TechCorp Dubai',
            position: 'Recrutadora Sênior'
          }
        },
        'admin@leaocareers.com': {
          id: '3',
          email: 'admin@leaocareers.com',
          name: 'Admin Sistema',
          type: 'admin',
          profile: {
            completed: true,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            phone: '+55 11 77777-7777',
            position: 'Administrador'
          }
        }
      };

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers[email];
      
      if (!user || password !== '123456') {
        return {
          success: false,
          message: 'Credenciais inválidas'
        };
      }

      if (user.type !== type) {
        return {
          success: false,
          message: 'Tipo de usuário incorreto'
        };
      }

      const token = `token_${Date.now()}_${Math.random()}`;
      
      this.setAuth(user, token);

      return {
        success: true,
        user,
        token,
        message: 'Login realizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  static async register(userData: Partial<User> & { password: string }): Promise<AuthResponse> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simular validação de email existente
      if (userData.email === 'existente@teste.com') {
        return {
          success: false,
          message: 'Este email já está cadastrado'
        };
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email || '',
        name: userData.name || '',
        type: userData.type || 'candidato',
        profile: {
          completed: false,
          phone: userData.profile?.phone
        }
      };

      const token = `token_${Date.now()}_${Math.random()}`;
      
      this.setAuth(newUser, token);

      return {
        success: true,
        user: newUser,
        token,
        message: 'Cadastro realizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  }

  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular envio de email
      return {
        success: true,
        message: 'Instruções de recuperação enviadas para seu email'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Erro ao enviar email de recuperação'
      };
    }
  }

  static getRedirectPath(userType: 'candidato' | 'empresa' | 'admin'): string {
    switch (userType) {
      case 'candidato':
        return '/candidato/dashboard';
      case 'empresa':
        return '/empresa/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  }
} 