'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DetalhesVagaPage() {
  const params = useParams();
  const vagaId = params.id;

  const [vaga, setVaga] = useState({
    id: vagaId,
    titulo: 'Desenvolvedor Full Stack',
    descricao: 'Estamos procurando um desenvolvedor Full Stack experiente para se juntar à nossa equipe em Dubai.',
    requisitos: 'Experiência com React, Node.js, TypeScript e AWS. Inglês fluente.',
    beneficios: 'Plano de saúde, vale alimentação, ambiente internacional.',
    tipoContrato: 'CLT',
    nivel: 'Pleno',
    localizacao: 'Dubai',
    modalidade: 'Híbrido',
    salario: '5000-7000 USD',
    dataPublicacao: '15/03/2024',
    dataLimite: '15/04/2024',
    status: 'Ativa',
    totalCandidatos: 12,
    entrevistasRealizadas: 3
  });

  const [candidatos, setCandidatos] = useState([
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao.silva@email.com',
      matchScore: 95,
      status: 'Em análise',
      dataCandidatura: '18/03/2024',
      entrevista: {
        realizada: true,
        data: '20/03/2024',
        avaliacao: 90,
        feedback: 'Excelente candidato, demonstrou grande conhecimento técnico.'
      }
    },
    {
      id: 2,
      nome: 'Maria Santos',
      email: 'maria.santos@email.com',
      matchScore: 88,
      status: 'Entrevista agendada',
      dataCandidatura: '17/03/2024',
      entrevista: {
        realizada: false,
        data: '21/03/2024',
        avaliacao: null,
        feedback: null
      }
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      matchScore: 82,
      status: 'Em análise',
      dataCandidatura: '16/03/2024',
      entrevista: {
        realizada: false,
        data: null,
        avaliacao: null,
        feedback: null
      }
    }
  ]);

  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [ordemRanking, setOrdemRanking] = useState('match');

  const candidatosFiltrados = candidatos
    .filter(candidato => filtroStatus === 'todos' || candidato.status === filtroStatus)
    .sort((a, b) => {
      if (ordemRanking === 'match') {
        return b.matchScore - a.matchScore;
      } else if (ordemRanking === 'entrevista') {
        if (!a.entrevista.avaliacao) return 1;
        if (!b.entrevista.avaliacao) return -1;
        return b.entrevista.avaliacao - a.entrevista.avaliacao;
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Vaga */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{vaga.titulo}</h1>
              <p className="mt-2 text-sm text-gray-600">
                {vaga.localizacao} • {vaga.modalidade} • {vaga.tipoContrato}
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Editar Vaga
              </button>
              <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                Encerrar Vaga
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Detalhes da Vaga</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Descrição</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.descricao}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Requisitos</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.requisitos}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Benefícios</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.beneficios}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Adicionais</h2>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nível</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.nivel}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Faixa Salarial</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.salario}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Data de Publicação</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.dataPublicacao}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Data Limite</dt>
                  <dd className="mt-1 text-sm text-gray-900">{vaga.dataLimite}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Ranking de Candidatos */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Candidatos</h2>
              <div className="flex space-x-4">
                <select
                  value={filtroStatus}
                  onChange={(e) => setFiltroStatus(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="Em análise">Em análise</option>
                  <option value="Entrevista agendada">Entrevista agendada</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Reprovado">Reprovado</option>
                </select>
                <select
                  value={ordemRanking}
                  onChange={(e) => setOrdemRanking(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                >
                  <option value="match">Ordenar por Match</option>
                  <option value="entrevista">Ordenar por Avaliação</option>
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Match
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avaliação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Candidatura
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
                        <div>
                          <div className="text-sm font-medium text-gray-900">{candidato.nome}</div>
                          <div className="text-sm text-gray-500">{candidato.email}</div>
                        </div>
                      </div>
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
                      {candidato.entrevista.avaliacao ? (
                        <div className="text-sm text-gray-900">{candidato.entrevista.avaliacao}%</div>
                      ) : (
                        <div className="text-sm text-gray-500">-</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {candidato.dataCandidatura}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/empresa/candidatos/${candidato.id}`}
                        className="text-[#D4AF37] hover:text-[#B38F2E] mr-4"
                      >
                        Ver perfil
                      </Link>
                      {!candidato.entrevista.realizada && (
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
    </div>
  );
} 