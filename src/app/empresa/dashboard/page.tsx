'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

export default function EmpresaDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const userType = Cookies.get('userType');
    if (!userType || userType !== 'empresa') {
      router.push('/empresa/login');
    }
  }, [router]);

  const [stats, setStats] = useState({
    vagasAtivas: 12,
    candidatosRecomendados: 8,
    entrevistasAgendadas: 3,
    processosAndamento: 5
  });

  const [vagasRecentes, setVagasRecentes] = useState([
    {
      id: 1,
      titulo: 'Desenvolvedor Full Stack',
      status: 'Ativa',
      data: '15/03/2024',
      recomendacoes: 2
    },
    {
      id: 2,
      titulo: 'Arquiteto de Software',
      status: 'Ativa',
      data: '14/03/2024',
      recomendacoes: 1
    },
    {
      id: 3,
      titulo: 'Tech Lead',
      status: 'Ativa',
      data: '13/03/2024',
      recomendacoes: 0
    }
  ]);

  const [candidatosRecomendados, setCandidatosRecomendados] = useState([
    {
      id: 1,
      nome: 'Candidato recomendado',
      vaga: 'Desenvolvedor Full Stack',
      status: 'Aguardando análise',
      dataRecomendacao: '18/03/2024',
      consultor: 'Paula Silva'
    },
    {
      id: 2,
      nome: 'Candidato recomendado',
      vaga: 'Arquiteto de Software',
      status: 'Entrevista agendada',
      dataRecomendacao: '17/03/2024',
      consultor: 'Andressa Costa'
    }
  ]);

  const [proximasEntrevistas, setProximasEntrevistas] = useState([
    {
      id: 1,
      candidato: 'Candidato recomendado',
      vaga: 'Arquiteto de Software',
      data: '25/03/2024',
      hora: '14:00'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard da Empresa</h1>
          <p className="mt-2 text-sm text-gray-600">
            Acompanhe suas vagas e candidatos recomendados pela Leão Careers
          </p>
        </div>

        {/* Alerta informativo sobre intermediação */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Sobre o processo de recrutamento</h3>
              <p className="mt-1 text-sm text-blue-700">
                A Leão Careers atua como intermediadora total. Você verá apenas candidatos pré-selecionados e recomendados por nossos consultores especializados.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Vagas Ativas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.vagasAtivas}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/empresa/vagas" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Ver todas as vagas
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#D4AF37] rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Candidatos Recomendados
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.candidatosRecomendados}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/empresa/recomendacoes" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Ver recomendações
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
                      Entrevistas Agendadas
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.entrevistasAgendadas}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/empresa/entrevistas" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Ver agenda
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
                <Link href="/empresa/processos" className="font-medium text-[#D4AF37] hover:text-[#B38F2E]">
                  Ver processos
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vagas Recentes */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Suas Vagas
                </h3>
                <Link
                  href="/empresa/vagas/nova"
                  className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]"
                >
                  Nova Vaga
                </Link>
              </div>
              <div className="space-y-4">
                {vagasRecentes.map((vaga) => (
                  <div key={vaga.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{vaga.titulo}</h4>
                        <p className="text-sm text-gray-500 mt-1">Publicada em: {vaga.data}</p>
                      </div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {vaga.status}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {vaga.recomendacoes} recomendação(ões)
                      </span>
                      <Link href={`/empresa/vagas/${vaga.id}`} className="text-sm text-[#D4AF37] hover:text-[#B38F2E]">
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Candidatos Recomendados */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Candidatos Recomendados
              </h3>
              <div className="space-y-4">
                {candidatosRecomendados.map((candidato) => (
                  <div key={candidato.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{candidato.nome}</h4>
                        <p className="text-sm text-gray-500 mt-1">Para: {candidato.vaga}</p>
                        <p className="text-sm text-gray-400">Consultor: {candidato.consultor}</p>
                      </div>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {candidato.status}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Recomendado em: {candidato.dataRecomendacao}
                      </span>
                      <Link href={`/empresa/recomendacoes/${candidato.id}`} className="text-sm text-[#D4AF37] hover:text-[#B38F2E]">
                        Ver detalhes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Próximas Entrevistas */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Próximas Entrevistas
                </h3>
                <Link
                  href="/empresa/entrevistas"
                  className="text-sm text-[#D4AF37] hover:text-[#B38F2E]"
                >
                  Ver todas
                </Link>
              </div>
              <div className="space-y-4">
                {proximasEntrevistas.length > 0 ? (
                  proximasEntrevistas.map((entrevista) => (
                    <div key={entrevista.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{entrevista.candidato}</h4>
                          <p className="text-sm text-gray-500 mt-1">{entrevista.vaga}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{entrevista.data}</p>
                          <p className="text-sm text-gray-500">{entrevista.hora}</p>
                        </div>
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
        </div>
      </div>
    </div>
  );
} 