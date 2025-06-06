'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EntrevistasPage() {
  const [filtros, setFiltros] = useState({
    busca: '',
    status: 'todos',
    tipo: 'todos',
    data: ''
  });

  const [entrevistas, setEntrevistas] = useState([
    {
      id: 1,
      candidato: {
        nome: 'João Silva',
        email: 'joao.silva@email.com',
        foto: '/images/avatar.png'
      },
      vaga: {
        titulo: 'Desenvolvedor Frontend Senior',
        empresa: 'Tech Solutions'
      },
      data: '20/03/2024',
      horario: '14:00',
      tipo: 'Online',
      status: 'Agendada',
      link: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      candidato: {
        nome: 'Maria Santos',
        email: 'maria.santos@email.com',
        foto: '/images/avatar.png'
      },
      vaga: {
        titulo: 'Desenvolvedor Full Stack',
        empresa: 'Startup ABC'
      },
      data: '21/03/2024',
      horario: '15:30',
      tipo: 'Presencial',
      status: 'Agendada',
      endereco: 'Rua das Flores, 123 - São Paulo, SP'
    },
    {
      id: 3,
      candidato: {
        nome: 'Pedro Oliveira',
        email: 'pedro.oliveira@email.com',
        foto: '/images/avatar.png'
      },
      vaga: {
        titulo: 'Desenvolvedor Backend',
        empresa: 'Tech Solutions'
      },
      data: '19/03/2024',
      horario: '10:00',
      tipo: 'Online',
      status: 'Concluída',
      avaliacao: 4.5
    }
  ]);

  const entrevistasFiltradas = entrevistas.filter(entrevista => {
    const matchBusca = entrevista.candidato.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                      entrevista.vaga.titulo.toLowerCase().includes(filtros.busca.toLowerCase());
    const matchStatus = filtros.status === 'todos' || entrevista.status === filtros.status;
    const matchTipo = filtros.tipo === 'todos' || entrevista.tipo === filtros.tipo;
    const matchData = !filtros.data || entrevista.data === filtros.data;
    return matchBusca && matchStatus && matchTipo && matchData;
  });

  const estatisticas = {
    total: entrevistas.length,
    agendadas: entrevistas.filter(e => e.status === 'Agendada').length,
    concluidas: entrevistas.filter(e => e.status === 'Concluída').length,
    canceladas: entrevistas.filter(e => e.status === 'Cancelada').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Entrevistas</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gerencie todas as entrevistas
              </p>
            </div>
            <Link
              href="/empresa/agendarentrevista"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
            >
              Agendar Entrevista
            </Link>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.total}</h2>
                <p className="text-sm text-gray-500">Total de Entrevistas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.agendadas}</h2>
                <p className="text-sm text-gray-500">Agendadas</p>
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
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.concluidas}</h2>
                <p className="text-sm text-gray-500">Concluídas</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium text-gray-900">{estatisticas.canceladas}</h2>
                <p className="text-sm text-gray-500">Canceladas</p>
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
                placeholder="Buscar por candidato ou vaga..."
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
                <option value="Agendada">Agendada</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo
              </label>
              <select
                id="tipo"
                value={filtros.tipo}
                onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              >
                <option value="todos">Todos</option>
                <option value="Online">Online</option>
                <option value="Presencial">Presencial</option>
              </select>
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                Data
              </label>
              <input
                type="date"
                id="data"
                value={filtros.data}
                onChange={(e) => setFiltros(prev => ({ ...prev, data: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Lista de Entrevistas */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data/Horário
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {entrevistasFiltradas.map((entrevista) => (
                <tr key={entrevista.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={entrevista.candidato.foto}
                          alt={entrevista.candidato.nome}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {entrevista.candidato.nome}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entrevista.candidato.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entrevista.vaga.titulo}</div>
                    <div className="text-sm text-gray-500">{entrevista.vaga.empresa}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entrevista.data}</div>
                    <div className="text-sm text-gray-500">{entrevista.horario}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entrevista.tipo === 'Online' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {entrevista.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entrevista.status === 'Agendada' ? 'bg-yellow-100 text-yellow-800' :
                      entrevista.status === 'Concluída' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {entrevista.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {entrevista.status === 'Agendada' && entrevista.tipo === 'Online' && (
                      <a
                        href={entrevista.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4AF37] hover:text-[#B38F2E] mr-4"
                      >
                        Acessar Reunião
                      </a>
                    )}
                    {entrevista.status === 'Agendada' && (
                      <button className="text-red-600 hover:text-red-900">
                        Cancelar
                      </button>
                    )}
                    {entrevista.status === 'Concluída' && (
                      <Link
                        href={`/empresa/entrevistas/${entrevista.id}/avaliacao`}
                        className="text-[#D4AF37] hover:text-[#B38F2E]"
                      >
                        Ver Avaliação
                      </Link>
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