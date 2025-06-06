'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/api/client';

interface Stats {
  totalCandidatos: number;
  totalEmpresas: number;
  candidatosPendentes: number;
  empresasPendentes: number;
  matchesRecentes: number;
}

interface Atividade {
  id: string;
  tipo: 'candidato' | 'empresa' | 'match';
  descricao: string;
  nome: string;
  data: string;
  status: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  
  const [stats, setStats] = useState<Stats>({
    totalCandidatos: 0,
    totalEmpresas: 0,
    candidatosPendentes: 0,
    empresasPendentes: 0,
    matchesRecentes: 0
  });

  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Verificar se o usuário tem permissão de admin
    const currentUser = user();
    if (!currentUser || !['superadmin', 'analista', 'consultor'].includes(currentUser.role)) {
      router.push('/');
      return;
    }

    // Carregar dados do dashboard
    loadDashboardData();
  }, [isAuthenticated, user, router]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Carregar estatísticas de candidatos
      const candidatosResponse = await fetch('/api/admin/candidatos', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (candidatosResponse.ok) {
        const candidatosData = await candidatosResponse.json();
        
        // Calcular estatísticas de candidatos
        const candidatosPendentes = candidatosData.candidatos?.filter((c: any) => c.status === 'pendente').length || 0;
        
        setStats(prev => ({
          ...prev,
          totalCandidatos: candidatosData.totalCandidatos || 0,
          candidatosPendentes
        }));
      }

      // Carregar estatísticas de empresas
      const empresasResponse = await fetch('/api/admin/empresas', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (empresasResponse.ok) {
        const empresasData = await empresasResponse.json();
        
        // Calcular estatísticas de empresas
        const empresasPendentes = empresasData.empresas?.filter((e: any) => e.status === 'pendente').length || 0;
        
        setStats(prev => ({
          ...prev,
          totalEmpresas: empresasData.totalEmpresas || 0,
          empresasPendentes,
          matchesRecentes: 8 // Mock por enquanto
        }));
      }

      // Gerar atividades recentes mockadas (futuramente vindo da API)
      setAtividades([
        {
          id: '1',
          tipo: 'candidato',
          descricao: 'Novo candidato registrado',
          nome: 'João Silva Santos',
          data: new Date().toLocaleString('pt-BR'),
          status: 'pendente'
        },
        {
          id: '2',
          tipo: 'empresa',
          descricao: 'Nova empresa registrada',
          nome: 'Tech Solutions Dubai',
          data: new Date(Date.now() - 3600000).toLocaleString('pt-BR'),
          status: 'pendente'
        },
        {
          id: '3',
          tipo: 'match',
          descricao: 'Candidato aprovado',
          nome: 'Maria Oliveira Costa',
          data: new Date(Date.now() - 7200000).toLocaleString('pt-BR'),
          status: 'concluido'
        }
      ]);

    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leão Careers - Admin</h1>
              <p className="text-sm text-gray-600">Bem-vindo, {user()?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {user()?.role === 'superadmin' ? 'Super Admin' : 
                 user()?.role === 'analista' ? 'Analista' : 'Consultor'}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Total de Candidatos</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalCandidatos}</p>
                {stats.candidatosPendentes > 0 && (
                  <p className="text-sm text-orange-600">{stats.candidatosPendentes} pendentes</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Total de Empresas</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalEmpresas}</p>
                {stats.empresasPendentes > 0 && (
                  <p className="text-sm text-orange-600">{stats.empresasPendentes} pendentes</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Matches Recentes</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats.matchesRecentes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Total Pendentes</h2>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.candidatosPendentes + stats.empresasPendentes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navegação Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/candidatos"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Candidatos</h3>
                <p className="text-sm text-gray-600">Gerenciar candidatos e aprovações</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/empresas"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Empresas</h3>
                <p className="text-sm text-gray-600">Gerenciar empresas e validações</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/vagas"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6m0 0v6m0-6a2 2 0 012 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Vagas</h3>
                <p className="text-sm text-gray-600">Gerenciar vagas e matches</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Atividades Recentes</h2>
            <div className="flow-root">
              <ul className="-mb-8">
                {atividades.map((atividade, index) => (
                  <li key={atividade.id}>
                    <div className="relative pb-8">
                      {index !== atividades.length - 1 && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            atividade.tipo === 'candidato' ? 'bg-blue-500' :
                            atividade.tipo === 'empresa' ? 'bg-green-500' :
                            'bg-yellow-500'
                          }`}>
                            {atividade.tipo === 'candidato' ? (
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            ) : atividade.tipo === 'empresa' ? (
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            ) : (
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              {atividade.descricao} <span className="font-medium text-gray-900">{atividade.nome}</span>
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            <time>{atividade.data}</time>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 