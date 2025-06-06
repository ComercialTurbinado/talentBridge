'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VagasPage() {
  const [filtros, setFiltros] = useState({
    busca: '',
    status: 'todos',
    tipo: 'todos',
    nivel: 'todos'
  });

  const [vagas, setVagas] = useState([
    {
      id: 1,
      titulo: 'Desenvolvedor Full Stack',
      tipoContrato: 'CLT',
      nivel: 'Pleno',
      localizacao: 'Dubai',
      modalidade: 'Híbrido',
      status: 'Ativa',
      dataPublicacao: '15/03/2024',
      candidatos: 12,
      entrevistas: 3,
      matches: 8
    },
    {
      id: 2,
      titulo: 'Arquiteto de Software',
      tipoContrato: 'PJ',
      nivel: 'Sênior',
      localizacao: 'Dubai',
      modalidade: 'Remoto',
      status: 'Ativa',
      dataPublicacao: '14/03/2024',
      candidatos: 8,
      entrevistas: 2,
      matches: 5
    },
    {
      id: 3,
      titulo: 'Desenvolvedor Frontend',
      tipoContrato: 'CLT',
      nivel: 'Júnior',
      localizacao: 'Dubai',
      modalidade: 'Presencial',
      status: 'Ativa',
      dataPublicacao: '13/03/2024',
      candidatos: 4,
      entrevistas: 0,
      matches: 2
    }
  ]);

  const vagasFiltradas = vagas.filter(vaga => {
    const matchBusca = vaga.titulo.toLowerCase().includes(filtros.busca.toLowerCase());
    const matchStatus = filtros.status === 'todos' || vaga.status === filtros.status;
    const matchTipo = filtros.tipo === 'todos' || vaga.tipoContrato === filtros.tipo;
    const matchNivel = filtros.nivel === 'todos' || vaga.nivel === filtros.nivel;
    return matchBusca && matchStatus && matchTipo && matchNivel;
  });

  const estatisticas = {
    totalVagas: vagas.length,
    vagasAtivas: vagas.filter(v => v.status === 'Ativa').length,
    totalCandidatos: vagas.reduce((acc, v) => acc + v.candidatos, 0),
    totalEntrevistas: vagas.reduce((acc, v) => acc + v.entrevistas, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Vagas</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gerencie todas as vagas publicadas
              </p>
            </div>
            <Link
              href="/empresa/vagas/nova"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]"
            >
              Nova Vaga
            </Link>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.totalVagas}</h2>
                <p className="text-sm text-gray-500">Total de Vagas</p>
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
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.vagasAtivas}</h2>
                <p className="text-sm text-gray-500">Vagas Ativas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.totalCandidatos}</h2>
                <p className="text-sm text-gray-500">Total de Candidatos</p>
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
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.totalEntrevistas}</h2>
                <p className="text-sm text-gray-500">Entrevistas Realizadas</p>
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
                placeholder="Buscar por título..."
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
                <option value="Ativa">Ativa</option>
                <option value="Encerrada">Encerrada</option>
                <option value="Pausada">Pausada</option>
              </select>
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo de Contrato
              </label>
              <select
                id="tipo"
                value={filtros.tipo}
                onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              >
                <option value="todos">Todos</option>
                <option value="CLT">CLT</option>
                <option value="PJ">PJ</option>
                <option value="Temporário">Temporário</option>
                <option value="Estágio">Estágio</option>
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
          </div>
        </div>

        {/* Lista de Vagas */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nível
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidatos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entrevistas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vagasFiltradas.map((vaga) => (
                <tr key={vaga.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vaga.titulo}</div>
                    <div className="text-sm text-gray-500">{vaga.localizacao} • {vaga.modalidade}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vaga.tipoContrato}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vaga.nivel}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      vaga.status === 'Ativa' ? 'bg-green-100 text-green-800' :
                      vaga.status === 'Encerrada' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vaga.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vaga.candidatos}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vaga.entrevistas}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vaga.dataPublicacao}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/empresa/vagas/${vaga.id}`}
                      className="text-[#D4AF37] hover:text-[#B38F2E] mr-4"
                    >
                      Ver detalhes
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Encerrar
                    </button>
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