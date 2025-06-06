'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TreinamentoPage() {
  const [modulos] = useState([
    {
      id: 1,
      titulo: 'Introdução ao Recrutamento e Seleção',
      descricao: 'Conceitos básicos e fundamentos do processo de recrutamento e seleção',
      progresso: 100,
      aulas: 5,
      duracao: '2h 30min',
      concluido: true,
      aulaAtual: null
    },
    {
      id: 2,
      titulo: 'Técnicas de Entrevista',
      descricao: 'Aprenda as melhores práticas para conduzir entrevistas efetivas',
      progresso: 60,
      aulas: 8,
      duracao: '4h 15min',
      concluido: false,
      aulaAtual: 3
    },
    {
      id: 3,
      titulo: 'Avaliação de Candidatos',
      descricao: 'Métodos e ferramentas para avaliar candidatos de forma objetiva',
      progresso: 0,
      aulas: 6,
      duracao: '3h 45min',
      concluido: false,
      aulaAtual: null
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Treinamento</h1>
          <p className="mt-2 text-sm text-gray-600">
            Aprenda as melhores práticas de recrutamento e seleção
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Módulos Concluídos</p>
                <p className="text-lg font-semibold text-gray-900">
                  {modulos.filter(m => m.concluido).length}/{modulos.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tempo Total</p>
                <p className="text-lg font-semibold text-gray-900">10h 30min</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-[#D4AF37]/10">
                <svg className="h-6 w-6 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Aulas Disponíveis</p>
                <p className="text-lg font-semibold text-gray-900">19 aulas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Módulos */}
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {modulos.map((modulo) => (
            <div key={modulo.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{modulo.titulo}</h3>
                  <p className="mt-1 text-sm text-gray-500">{modulo.descricao}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{modulo.aulas} aulas</span>
                    <span className="mx-2">•</span>
                    <span>{modulo.duracao}</span>
                  </div>
                </div>
                <div className="ml-6">
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-[#D4AF37] h-2.5 rounded-full"
                        style={{ width: `${modulo.progresso}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{modulo.progresso}%</span>
                  </div>
                </div>
                <div className="ml-6">
                  <Link
                    href={`/empresa/treinamento/${modulo.id}`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    {modulo.concluido ? 'Revisar' : modulo.aulaAtual ? 'Continuar' : 'Começar'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Área de Downloads */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Materiais Complementares</h2>
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Guia de Entrevista</h3>
                    <p className="text-sm text-gray-500">PDF • 2.4 MB</p>
                  </div>
                </div>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]">
                  Download
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">Checklist de Avaliação</h3>
                    <p className="text-sm text-gray-500">PDF • 1.8 MB</p>
                  </div>
                </div>
                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 