'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatoEntrevistasPage() {
  const [entrevistas, setEntrevistas] = useState([
    {
      id: 1,
      empresa: 'Tech Solutions',
      cargo: 'Desenvolvedor Full Stack',
      data: '25/03/2024',
      hora: '14:00',
      tipo: 'Online',
      status: 'Agendada',
      link: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: 2,
      empresa: 'Global Finance',
      cargo: 'Analista Financeiro',
      data: '28/03/2024',
      hora: '10:00',
      tipo: 'Presencial',
      status: 'Agendada',
      endereco: 'Dubai Business Center, Torre 1, Sala 302'
    }
  ]);

  const [simulacoes, setSimulacoes] = useState([
    {
      id: 1,
      titulo: 'Entrevista Técnica',
      descricao: 'Simulação de entrevista técnica para desenvolvedores',
      duracao: '45 min',
      nivel: 'Intermediário',
      completada: false
    },
    {
      id: 2,
      titulo: 'Entrevista Comportamental',
      descricao: 'Simulação focada em perguntas comportamentais',
      duracao: '30 min',
      nivel: 'Básico',
      completada: true
    },
    {
      id: 3,
      titulo: 'Entrevista em Inglês',
      descricao: 'Simulação de entrevista totalmente em inglês',
      duracao: '40 min',
      nivel: 'Avançado',
      completada: false
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Entrevistas</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gerencie suas entrevistas e pratique com simulações
              </p>
            </div>
            <Link
              href="/candidato/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>

        {/* Entrevistas Agendadas */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Entrevistas Agendadas</h2>
            <div className="space-y-4">
              {entrevistas.map((entrevista) => (
                <div key={entrevista.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{entrevista.empresa}</h3>
                      <p className="mt-1 text-sm text-gray-500">{entrevista.cargo}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {entrevista.data} às {entrevista.hora}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {entrevista.tipo === 'Online' ? 'Entrevista Online' : entrevista.endereco}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {entrevista.status}
                      </span>
                      {entrevista.tipo === 'Online' && (
                        <a
                          href={entrevista.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]"
                        >
                          Acessar Link
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Simulações de Entrevista */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Simulações de Entrevista</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulacoes.map((simulacao) => (
                <div key={simulacao.id} className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900">{simulacao.titulo}</h3>
                  <p className="mt-1 text-sm text-gray-500">{simulacao.descricao}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Duração: {simulacao.duracao}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Nível: {simulacao.nivel}
                    </div>
                  </div>
                  <div className="mt-4">
                    {simulacao.completada ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Completada
                      </span>
                    ) : (
                      <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                        Iniciar Simulação
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 