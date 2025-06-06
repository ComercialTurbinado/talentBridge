'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatoDetalhesPage({ params }: { params: { id: string } }) {
  const [candidato, setCandidato] = useState({
    id: params.id,
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    foto: '/images/avatar.png',
    telefone: '(11) 98765-4321',
    linkedin: 'linkedin.com/in/joaosilva',
    github: 'github.com/joaosilva',
    nivel: 'Pleno',
    experiencia: '5 anos',
    status: 'Em análise',
    matchScore: 95,
    vagasAplicadas: 3,
    entrevistas: 2,
    ultimaAtividade: '18/03/2024',
    habilidades: [
      'React', 'TypeScript', 'Node.js', 'MongoDB', 'AWS'
    ],
    formacao: [
      {
        curso: 'Ciência da Computação',
        instituicao: 'Universidade de São Paulo',
        periodo: '2015 - 2019'
      }
    ],
    experienciaProfissional: [
      {
        cargo: 'Desenvolvedor Frontend',
        empresa: 'Tech Solutions',
        periodo: '2020 - Presente',
        descricao: 'Desenvolvimento de aplicações web com React e TypeScript'
      },
      {
        cargo: 'Desenvolvedor Júnior',
        empresa: 'Startup XYZ',
        periodo: '2019 - 2020',
        descricao: 'Desenvolvimento de aplicações web com JavaScript'
      }
    ],
    vagas: [
      {
        id: 1,
        titulo: 'Desenvolvedor Frontend Senior',
        empresa: 'Tech Solutions',
        status: 'Em análise',
        data: '18/03/2024',
        matchScore: 95
      },
      {
        id: 2,
        titulo: 'Desenvolvedor Full Stack',
        empresa: 'Startup ABC',
        status: 'Entrevista agendada',
        data: '15/03/2024',
        matchScore: 88
      }
    ],
    entrevistasMarcadas: [
      {
        id: 1,
        vaga: 'Desenvolvedor Full Stack',
        data: '20/03/2024',
        horario: '14:00',
        tipo: 'Online',
        status: 'Agendada',
        link: 'https://meet.google.com/abc-defg-hij'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Perfil do Candidato</h1>
              <p className="mt-2 text-sm text-gray-600">
                Informações detalhadas e histórico
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/empresa/candidatos"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
              >
                Voltar
              </Link>
              {candidato.status === 'Em análise' && (
                <Link
                  href="/empresa/agendarentrevista"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                >
                  Agendar Entrevista
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda - Informações Básicas */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  className="h-32 w-32 rounded-full"
                  src={candidato.foto}
                  alt={candidato.nome}
                />
                <h2 className="mt-4 text-xl font-bold text-gray-900">{candidato.nome}</h2>
                <p className="text-sm text-gray-500">{candidato.email}</p>
                <div className="mt-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    candidato.status === 'Em análise' ? 'bg-yellow-100 text-yellow-800' :
                    candidato.status === 'Entrevista agendada' ? 'bg-blue-100 text-blue-800' :
                    candidato.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {candidato.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Telefone</dt>
                    <dd className="mt-1 text-sm text-gray-900">{candidato.telefone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a href={candidato.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#B38F2E]">
                        {candidato.linkedin}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">GitHub</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <a href={candidato.github} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-[#B38F2E]">
                        {candidato.github}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Nível</dt>
                    <dd className="mt-1 text-sm text-gray-900">{candidato.nivel}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Experiência</dt>
                    <dd className="mt-1 text-sm text-gray-900">{candidato.experiencia}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Habilidades</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {candidato.habilidades.map((habilidade, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-[#D4AF37]/10 text-[#D4AF37]"
                    >
                      {habilidade}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita - Detalhes e Histórico */}
          <div className="lg:col-span-2 space-y-8">
            {/* Formação */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Formação</h3>
              <div className="space-y-4">
                {candidato.formacao.map((formacao, index) => (
                  <div key={index} className="border-l-4 border-[#D4AF37] pl-4">
                    <h4 className="text-sm font-medium text-gray-900">{formacao.curso}</h4>
                    <p className="text-sm text-gray-500">{formacao.instituicao}</p>
                    <p className="text-sm text-gray-500">{formacao.periodo}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experiência Profissional */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Experiência Profissional</h3>
              <div className="space-y-6">
                {candidato.experienciaProfissional.map((experiencia, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-medium text-gray-900">{experiencia.cargo}</h4>
                    <p className="text-sm text-gray-500">{experiencia.empresa}</p>
                    <p className="text-sm text-gray-500">{experiencia.periodo}</p>
                    <p className="mt-2 text-sm text-gray-600">{experiencia.descricao}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vagas Aplicadas */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Vagas Aplicadas</h3>
              <div className="space-y-4">
                {candidato.vagas.map((vaga) => (
                  <div key={vaga.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{vaga.titulo}</h4>
                      <p className="text-sm text-gray-500">{vaga.empresa}</p>
                      <p className="text-sm text-gray-500">Aplicado em: {vaga.data}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vaga.status === 'Em análise' ? 'bg-yellow-100 text-yellow-800' :
                        vaga.status === 'Entrevista agendada' ? 'bg-blue-100 text-blue-800' :
                        vaga.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {vaga.status}
                      </span>
                      <span className="text-sm font-medium text-[#D4AF37]">
                        Match: {vaga.matchScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entrevistas Marcadas */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Entrevistas</h3>
              <div className="space-y-4">
                {candidato.entrevistasMarcadas.map((entrevista) => (
                  <div key={entrevista.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{entrevista.vaga}</h4>
                      <p className="text-sm text-gray-500">
                        {entrevista.data} às {entrevista.horario}
                      </p>
                      <p className="text-sm text-gray-500">
                        Tipo: {entrevista.tipo}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entrevista.status === 'Agendada' ? 'bg-blue-100 text-blue-800' :
                        entrevista.status === 'Concluída' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {entrevista.status}
                      </span>
                      {entrevista.tipo === 'Online' && (
                        <a
                          href={entrevista.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[#D4AF37] hover:text-[#B38F2E]"
                        >
                          Acessar Reunião
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 