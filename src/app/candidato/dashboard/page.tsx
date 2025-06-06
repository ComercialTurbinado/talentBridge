'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function CandidatoDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const userType = Cookies.get('userType');
    if (!userType || userType !== 'candidato') {
      router.push('/candidato/login');
    }
  }, [router]);

  const [stats, setStats] = useState({
    perfilCompletoPercentual: 85,
    oportunidadesEncaminhadas: 3,
    entrevistasRealizadas: 1,
    processosAndamento: 2
  });

  // Mudança: apenas oportunidades encaminhadas pelo consultor
  const [oportunidadesEncaminhadas, setOportunidadesEncaminhadas] = useState([
    {
      id: 1,
      titulo: 'Oportunidade Internacional',
      localizacao: 'Dubai',
      tipo: 'Tempo Integral',
      status: 'Aguardando sua resposta',
      dataEncaminhamento: '18/03/2024',
      consultor: 'Paula Silva',
      prazoResposta: '25/03/2024'
    },
    {
      id: 2,
      titulo: 'Posição de Liderança',
      localizacao: 'Canadá',
      tipo: 'Tempo Integral',
      status: 'Entrevista agendada',
      dataEncaminhamento: '15/03/2024',
      consultor: 'Andressa Costa',
      dataEntrevista: '22/03/2024'
    }
  ]);

  const [proximasEntrevistas, setProximasEntrevistas] = useState([
    {
      id: 1,
      titulo: 'Posição de Liderança',
      empresa: 'Empresa Internacional',
      data: '22/03/2024',
      hora: '10:00',
      tipo: 'Online'
    }
  ]);

  const [atividades, setAtividades] = useState([
    {
      id: 1,
      tipo: 'encaminhamento',
      descricao: 'Nova oportunidade encaminhada: Oportunidade Internacional',
      data: '18/03/2024',
      hora: '14:30'
    },
    {
      id: 2,
      tipo: 'entrevista',
      descricao: 'Entrevista agendada para Posição de Liderança',
      data: '16/03/2024',
      hora: '09:15'
    },
    {
      id: 3,
      tipo: 'feedback',
      descricao: 'Feedback recebido sobre sua candidatura',
      data: '14/03/2024',
      hora: '16:45'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Seu Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Acompanhe suas oportunidades e o andamento dos processos
          </p>
        </div>

        {/* Alerta informativo sobre intermediação */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Sobre o processo</h3>
              <p className="mt-1 text-sm text-blue-700">
                A Leão Careers atua como sua representante exclusiva. Você verá apenas oportunidades pré-selecionadas e encaminhadas por nossos consultores especializados.
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#D4AF37] rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Perfil Completo
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.perfilCompletoPercentual}%
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/candidato/perfil" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Completar perfil
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#D4AF37] rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Oportunidades Encaminhadas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.oportunidadesEncaminhadas}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/candidato/oportunidades" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Ver oportunidades
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#D4AF37] rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Entrevistas Realizadas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.entrevistasRealizadas}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/candidato/entrevistas" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Ver histórico
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#D4AF37] rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Processos em Andamento
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.processosAndamento}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/candidato/processos" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Acompanhar
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Oportunidades Encaminhadas */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Oportunidades Encaminhadas</h2>
                <div className="space-y-4">
                  {oportunidadesEncaminhadas.map((oportunidade) => (
                    <div key={oportunidade.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{oportunidade.titulo}</h3>
                          <p className="text-sm text-gray-500 mt-1">{oportunidade.localizacao}</p>
                          <p className="text-sm text-gray-400">Consultor: {oportunidade.consultor}</p>
                          <div className="mt-2 flex items-center space-x-4">
                            <span className="text-sm text-gray-600">{oportunidade.tipo}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">
                              Encaminhado em: {oportunidade.dataEncaminhamento}
                            </span>
                          </div>
                          {oportunidade.prazoResposta && (
                            <p className="text-sm text-orange-600 mt-1">
                              Prazo para resposta: {oportunidade.prazoResposta}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            oportunidade.status === 'Aguardando sua resposta' ? 'bg-yellow-100 text-yellow-800' :
                            oportunidade.status === 'Entrevista agendada' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {oportunidade.status}
                          </span>
                          <Link
                            href={`/candidato/oportunidades/${oportunidade.id}`}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]"
                          >
                            Ver Detalhes
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  {oportunidadesEncaminhadas.length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-gray-500">Nenhuma oportunidade encaminhada ainda.</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Nossos consultores estão analisando seu perfil.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="space-y-6">
            {/* Próximas Entrevistas */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Próximas Entrevistas
                </h3>
                <div className="space-y-4">
                  {proximasEntrevistas.length > 0 ? (
                    proximasEntrevistas.map((entrevista) => (
                      <div key={entrevista.id} className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900">{entrevista.titulo}</h4>
                        <p className="text-sm text-gray-500 mt-1">{entrevista.empresa}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{entrevista.data}</p>
                            <p className="text-sm text-gray-500">{entrevista.hora}</p>
                          </div>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {entrevista.tipo}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nenhuma entrevista agendada
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Atividades Recentes */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Atividades Recentes
                </h3>
                <div className="space-y-4">
                  {atividades.map((atividade) => (
                    <div key={atividade.id} className="flex items-start">
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        atividade.tipo === 'encaminhamento' ? 'bg-[#D4AF37]' :
                        atividade.tipo === 'entrevista' ? 'bg-blue-500' :
                        'bg-green-500'
                      }`}></div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-900">{atividade.descricao}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {atividade.data} às {atividade.hora}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 