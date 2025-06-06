'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/api/client';

interface Empresa {
  _id: string;
  empresa: {
    nomeEmpresa: string;
    razaoSocial: string;
    cnpj: string;
    segmento: string;
    porte: string;
    website: string;
    linkedin: string;
  };
  contato: {
    email: string;
    telefone: string;
    endereco: {
      cidade: string;
      estado: string;
      pais: string;
    };
  };
  responsavel: {
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
  };
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'em_analise';
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminEmpresasPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [observacoes, setObservacoes] = useState('');
  const [actionType, setActionType] = useState<'aprovar' | 'rejeitar' | 'analisar'>('aprovar');

  useEffect(() => {
    // Verificar autenticação
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Verificar permissões de admin
    const currentUser = user();
    if (!currentUser || !['superadmin', 'analista', 'consultor'].includes(currentUser.role)) {
      router.push('/');
      return;
    }

    loadEmpresas();
  }, [currentPage, statusFilter, searchTerm, isAuthenticated, user, router]);

  const loadEmpresas = async () => {
    try {
      setIsLoading(true);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        ...(statusFilter !== 'todos' && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/admin/empresas?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEmpresas(data.empresas || []);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error('Erro ao carregar empresas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (empresaId: string, novoStatus: string) => {
    try {
      const response = await fetch('/api/admin/empresas', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          empresaId,
          status: novoStatus,
          observacoes
        })
      });

      if (response.ok) {
        alert('Status atualizado com sucesso!');
        setShowApprovalModal(false);
        setObservacoes('');
        loadEmpresas(); // Recarregar lista
      } else {
        const error = await response.json();
        alert(error.erro || 'Erro ao atualizar status');
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const openApprovalModal = (empresa: Empresa, action: 'aprovar' | 'rejeitar' | 'analisar') => {
    setSelectedEmpresa(empresa);
    setActionType(action);
    setShowApprovalModal(true);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pendente: 'bg-yellow-100 text-yellow-800',
      aprovado: 'bg-green-100 text-green-800',
      rejeitado: 'bg-red-100 text-red-800',
      em_analise: 'bg-blue-100 text-blue-800'
    };
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    const texts = {
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
      em_analise: 'Em Análise'
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getSegmentoText = (segmento: string) => {
    const segmentos = {
      tecnologia: 'Tecnologia',
      financeiro: 'Financeiro',
      saude: 'Saúde',
      educacao: 'Educação',
      varejo: 'Varejo',
      industria: 'Indústria',
      servicos: 'Serviços',
      consultoria: 'Consultoria'
    };
    return segmentos[segmento as keyof typeof segmentos] || segmento;
  };

  const getPorteText = (porte: string) => {
    const portes = {
      micro: 'Micro (até 9)',
      pequeno: 'Pequeno (10-49)',
      medio: 'Médio (50-499)',
      grande: 'Grande (500+)'
    };
    return portes[porte as keyof typeof portes] || porte;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando empresas...</p>
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
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="text-gray-600 hover:text-gray-900"
              >
                ← Voltar ao Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Gerenciar Empresas</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar empresa
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, e-mail ou responsável..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todos">Todos</option>
                <option value="pendente">Pendente</option>
                <option value="em_analise">Em Análise</option>
                <option value="aprovado">Aprovado</option>
                <option value="rejeitado">Rejeitado</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setCurrentPage(1);
                  loadEmpresas();
                }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>

        {/* Lista de Empresas */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Empresas ({empresas.length})
            </h2>
          </div>

          {empresas.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Nenhuma empresa encontrada com os filtros aplicados.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {empresas.map((empresa) => (
                <div key={empresa._id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {empresa.empresa.nomeEmpresa}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(empresa.status)}`}>
                          {getStatusText(empresa.status)}
                        </span>
                      </div>
                      
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>E-mail:</strong> {empresa.contato.email}
                        </div>
                        <div>
                          <strong>Segmento:</strong> {getSegmentoText(empresa.empresa.segmento)}
                        </div>
                        <div>
                          <strong>Porte:</strong> {getPorteText(empresa.empresa.porte)}
                        </div>
                      </div>

                      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <strong>Responsável:</strong> {empresa.responsavel.nome}
                        </div>
                        <div>
                          <strong>Cargo:</strong> {empresa.responsavel.cargo}
                        </div>
                        <div>
                          <strong>Cadastrado em:</strong> {new Date(empresa.createdAt).toLocaleDateString('pt-BR')}
                        </div>
                      </div>

                      <div className="mt-2 text-sm text-gray-600">
                        <strong>Localização:</strong> {empresa.contato.endereco.cidade}, {empresa.contato.endereco.estado} - {empresa.contato.endereco.pais}
                      </div>

                      {empresa.empresa.website && (
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Website:</strong> 
                          <a href={empresa.empresa.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">
                            {empresa.empresa.website}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      {empresa.status === 'pendente' && (
                        <>
                          <button
                            onClick={() => openApprovalModal(empresa, 'analisar')}
                            className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-sm font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100"
                          >
                            Analisar
                          </button>
                          <button
                            onClick={() => openApprovalModal(empresa, 'aprovar')}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-green-600 hover:bg-green-700"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => openApprovalModal(empresa, 'rejeitar')}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700"
                          >
                            Rejeitar
                          </button>
                        </>
                      )}
                      
                      <Link
                        href={`/admin/empresas/${empresa._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Página {currentPage} de {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Próxima
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Aprovação */}
      {showApprovalModal && selectedEmpresa && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                {actionType === 'aprovar' ? 'Aprovar Empresa' : 
                 actionType === 'rejeitar' ? 'Rejeitar Empresa' : 'Colocar em Análise'}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {selectedEmpresa.empresa.nomeEmpresa}
                </p>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações
                  </label>
                  <textarea
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Adicione observações sobre a decisão..."
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    const newStatus = actionType === 'aprovar' ? 'aprovado' : 
                                   actionType === 'rejeitar' ? 'rejeitado' : 'em_analise';
                    handleStatusChange(selectedEmpresa._id, newStatus);
                  }}
                  className={`px-4 py-2 text-white text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                    actionType === 'aprovar' ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' :
                    actionType === 'rejeitar' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' :
                    'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                  }`}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 