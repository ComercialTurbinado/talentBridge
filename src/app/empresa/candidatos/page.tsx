'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatosPage() {
  const [filtros, setFiltros] = useState({
    busca: '',
    status: 'todos',
    nivel: 'todos',
    experiencia: 'todos'
  });

  const [candidatos, setCandidatos] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      foto: '/images/avatar.png',
      nivel: 'Pleno',
      experiencia: '5 anos',
      status: 'Em análise',
      matchScore: 95,
      vagasAplicadas: 3,
      entrevistas: 2,
      ultimaAtividade: '18/03/2024'
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      foto: '/images/avatar.png',
      nivel: 'Sênior',
      experiencia: '8 anos',
      status: 'Entrevista agendada',
      matchScore: 88,
      vagasAplicadas: 2,
      entrevistas: 1,
      ultimaAtividade: '17/03/2024'
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      foto: '/images/avatar.png',
      nivel: 'Júnior',
      experiencia: '2 anos',
      status: 'Em análise',
      matchScore: 82,
      vagasAplicadas: 1,
      entrevistas: 0,
      ultimaAtividade: '16/03/2024'
    }
  ]);

  const candidatosFiltrados = candidatos.filter(candidato => {
    const matchBusca = candidato.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                      candidato.email.toLowerCase().includes(filtros.busca.toLowerCase());
    const matchStatus = filtros.status === 'todos' || candidato.status === filtros.status;
    const matchNivel = filtros.nivel === 'todos' || candidato.nivel === filtros.nivel;
    const matchExperiencia = filtros.experiencia === 'todos' || candidato.experiencia === filtros.experiencia;
    return matchBusca && matchStatus && matchNivel && matchExperiencia;
  });

  const estatisticas = {
    total: candidatos.length,
    emAnalise: candidatos.filter(c => c.status === 'Em análise').length,
    entrevistas: candidatos.filter(c => c.status === 'Entrevista agendada').length,
    aprovados: candidatos.filter(c => c.status === 'Aprovado').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Candidatos</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gerencie todos os candidatos
              </p>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.total}</h2>
                <p className="text-sm text-gray-500">Total de Candidatos</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.emAnalise}</h2>
                <p className="text-sm text-gray-500">Em Análise</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.entrevistas}</h2>
                <p className="text-sm text-gray-500">Entrevistas Agendadas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.aprovados}</h2>
                <p className="text-sm text-gray-500">Aprovados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="busca" className="block text-sm font-medium text-gray-700">
                Buscar
              </label>
              <input
                type="text"
                id="busca"
                value={filtros.busca}
                onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
                placeholder="Buscar por nome ou email..."
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                value={filtros.status}
                onChange={(e) => setFiltros(prev => ({ ...prev, status: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              >
                <option value="todos">Todos</option>
                <option value="Em análise">Em análise</option>
                <option value="Entrevista agendada">Entrevista agendada</option>
                <option value="Aprovado">Aprovado</option>
                <option value="Reprovado">Reprovado</option>
              </select>
            </div>

            <div>
              <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                Nível
              </label>
              <select
                id="nivel"
                value={filtros.nivel}
                onChange={(e) => setFiltros(prev => ({ ...prev, nivel: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              >
                <option value="todos">Todos</option>
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
                <option value="Especialista">Especialista</option>
              </select>
            </div>

            <div>
              <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700">
                Experiência
              </label>
              <select
                id="experiencia"
                value={filtros.experiencia}
                onChange={(e) => setFiltros(prev => ({ ...prev, experiencia: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              >
                <option value="todos">Todos</option>
                <option value="1-3 anos">1-3 anos</option>
                <option value="4-6 anos">4-6 anos</option>
                <option value="7-10 anos">7-10 anos</option>
                <option value="10+ anos">10+ anos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Candidatos */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nível/Experiência
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vagas/Entrevistas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Atividade
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidatosFiltrados.map((candidato) => (
                <tr key={candidato.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={candidato.foto}
                          alt={candidato.nome}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {candidato.nome}
                        </div>
                        <div className="text-sm text-gray-500">
                          {candidato.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{candidato.nivel}</div>
                    <div className="text-sm text-gray-500">{candidato.experiencia}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      candidato.status === 'Em análise' ? 'bg-yellow-100 text-yellow-800' :
                      candidato.status === 'Entrevista agendada' ? 'bg-blue-100 text-blue-800' :
                      candidato.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {candidato.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{candidato.matchScore}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{candidato.vagasAplicadas} vagas</div>
                    <div className="text-sm text-gray-500">{candidato.entrevistas} entrevistas</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidato.ultimaAtividade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/empresa/candidatos/${candidato.id}`}
                      className="text-[#D4AF37] hover:text-[#B38F2E] mr-4"
                    >
                      Ver perfil
                    </Link>
                    {candidato.status === 'Em análise' && (
                      <button className="text-[#D4AF37] hover:text-[#B38F2E]">
                        Agendar entrevista
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 