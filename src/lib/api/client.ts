// Cliente API para o frontend
class ApiClient {
  private baseURL: string;
  private accessToken: string | null = null;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || '';
  }

  // Definir token de acesso
  setAccessToken(token: string) {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  // Obter token de acesso
  getAccessToken(): string | null {
    if (this.accessToken) return this.accessToken;
    
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    
    return null;
  }

  // Limpar token
  clearTokens() {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

  // Fazer requisição
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}/api${endpoint}`;
    const token = this.getAccessToken();

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Adicionar token de autorização se disponível
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    let response = await fetch(url, config);

    // Se token expirou, tentar renovar
    if (response.status === 401 && token) {
      const refreshed = await this.refreshToken();
      if (refreshed) {
        // Tentar novamente com novo token
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${this.getAccessToken()}`,
        };
        response = await fetch(url, config);
      } else {
        // Redirecionar para login se refresh falhou
        this.handleAuthError();
        throw new Error('Sessão expirada. Faça login novamente.');
      }
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro na requisição');
    }

    return data;
  }

  // Renovar token
  private async refreshToken(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // Para enviar cookies
      });

      if (response.ok) {
        const data = await response.json();
        this.setAccessToken(data.accessToken);
        return true;
      }
    } catch (error) {
      console.error('Erro ao renovar token:', error);
    }

    return false;
  }

  // Lidar com erro de autenticação
  private handleAuthError() {
    this.clearTokens();
    if (typeof window !== 'undefined') {
      window.location.href = '/candidato/login';
    }
  }

  // Métodos HTTP
  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // Upload de arquivos
  async upload(endpoint: string, formData: FormData) {
    const url = `${this.baseURL}/api${endpoint}`;
    const token = this.getAccessToken();

    const config: RequestInit = {
      method: 'POST',
      body: formData,
      headers: {},
    };

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || 'Erro no upload');
    }

    return data;
  }

  // Métodos específicos da API

  // Autenticação
  async login(email: string, senha: string, tipo: string) {
    try {
      const response = await fetch(`${this.baseURL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha, tipo }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || 'Erro no login');
      }

      if (data.sucesso && data.accessToken) {
        this.setAccessToken(data.accessToken);
      }

      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Erro no login');
    }
  }

  async logout() {
    try {
      await this.post('/auth/logout');
    } finally {
      this.clearTokens();
    }
  }

  // Candidatos
  async cadastrarCandidato(dados: any) {
    return this.post('/candidatos/cadastro', dados);
  }

  async buscarCandidatos(filtros: any = {}) {
    const params = new URLSearchParams(filtros).toString();
    return this.get(`/candidatos?${params}`);
  }

  // Empresas
  async cadastrarEmpresa(dados: any) {
    return this.post('/empresas/cadastro', dados);
  }

  // Dashboard
  async obterEstatisticas() {
    return this.get('/dashboard/stats');
  }

  // Upload
  async uploadArquivo(arquivo: File, tipo: string) {
    const formData = new FormData();
    formData.append('file', arquivo);
    formData.append('tipo', tipo);
    return this.upload('/upload', formData);
  }

  // Métodos de Administração
  async buscarCandidatosAdmin(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.status && params.status !== 'todos') queryParams.set('status', params.status);
    if (params?.search) queryParams.set('search', params.search);

    const response = await fetch(`/api/admin/candidatos?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao buscar candidatos');
    }

    return response.json();
  }

  async atualizarStatusCandidato(candidatoId: string, status: string, observacoes?: string) {
    const response = await fetch('/api/admin/candidatos', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        candidatoId,
        status,
        observacoes
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao atualizar status do candidato');
    }

    return response.json();
  }

  async buscarEmpresasAdmin(params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set('page', params.page.toString());
    if (params?.limit) queryParams.set('limit', params.limit.toString());
    if (params?.status && params.status !== 'todos') queryParams.set('status', params.status);
    if (params?.search) queryParams.set('search', params.search);

    const response = await fetch(`/api/admin/empresas?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao buscar empresas');
    }

    return response.json();
  }

  async atualizarStatusEmpresa(empresaId: string, status: string, observacoes?: string) {
    const response = await fetch('/api/admin/empresas', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        empresaId,
        status,
        observacoes
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao atualizar status da empresa');
    }

    return response.json();
  }

  async obterEstatisticasAdmin() {
    const response = await fetch('/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao obter estatísticas');
    }

    return response.json();
  }
}

// Instância singleton
export const apiClient = new ApiClient();

// Hook para usar no React
export function useAuth() {
  const login = async (email: string, senha: string, tipo: string) => {
    try {
      const response = await apiClient.login(email, senha, tipo);
      return { sucesso: true, dados: response };
    } catch (error: any) {
      return { sucesso: false, erro: error.message };
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      return { sucesso: true };
    } catch (error: any) {
      return { sucesso: false, erro: error.message };
    }
  };

  const isAuthenticated = () => {
    return !!apiClient.getAccessToken();
  };

  const user = () => {
    const token = apiClient.getAccessToken();
    if (!token) return null;

    try {
      // Decodificar JWT simples (apenas para exemplo)
      // Em produção, usar biblioteca como 'jsonwebtoken'
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        email: payload.email || 'admin@leaocareers.com',
        role: payload.role || 'superadmin',
        nome: payload.nome || 'Administrador'
      };
    } catch (error) {
      return {
        email: 'admin@leaocareers.com',
        role: 'superadmin', 
        nome: 'Administrador'
      };
    }
  };

  return { login, logout, isAuthenticated, user };
}

export default apiClient; 