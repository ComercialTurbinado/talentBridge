'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ModuloDetalhesPage() {
  const [modulo] = useState({
    id: 1,
    titulo: 'Introdução ao Recrutamento e Seleção',
    descricao: 'Conceitos básicos e fundamentos do processo de recrutamento e seleção',
    progresso: 100,
    aulas: [
      {
        id: 1,
        titulo: 'O que é Recrutamento e Seleção',
        duracao: '30min',
        concluida: true,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1'
      },
      {
        id: 2,
        titulo: 'O Papel do Recrutador',
        duracao: '45min',
        concluida: true,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2'
      },
      {
        id: 3,
        titulo: 'Técnicas de Entrevista',
        duracao: '40min',
        concluida: true,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3'
      },
      {
        id: 4,
        titulo: 'Avaliação de Candidatos',
        duracao: '35min',
        concluida: true,
        videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4'
      }
    ],
    materiais: [
      {
        id: 1,
        titulo: 'Guia de Entrevista',
        tipo: 'PDF',
        tamanho: '2.4 MB',
        url: '/materiais/guia-entrevista.pdf'
      },
      {
        id: 2,
        titulo: 'Checklist de Avaliação',
        tipo: 'PDF',
        tamanho: '1.8 MB',
        url: '/materiais/checklist-avaliacao.pdf'
      }
    ]
  });

  const [aulaAtual, setAulaAtual] = useState(modulo.aulas[0]);

  const handleVideoClick = (aula: typeof modulo.aulas[0]) => {
    setAulaAtual(aula);
  };

  const handleDownload = (url: string) => {
    console.log('Download:', url);
    // Implementar lógica de download
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/empresa/treinamento"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Treinamento
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">{modulo.titulo}</h1>
          <p className="mt-2 text-sm text-gray-600">{modulo.descricao}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2">
            {/* Player de Vídeo */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={aulaAtual.videoUrl}
                  title={aulaAtual.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">{aulaAtual.titulo}</h2>
                <p className="mt-2 text-sm text-gray-500">Duração: {aulaAtual.duracao}</p>
              </div>
            </div>

            {/* Materiais Complementares */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Materiais Complementares</h3>
              <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {modulo.materiais.map((material) => (
                  <div key={material.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <div className="ml-4">
                          <h4 className="text-sm font-medium text-gray-900">{material.titulo}</h4>
                          <p className="text-sm text-gray-500">{material.tipo} • {material.tamanho}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(material.url)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-[#D4AF37] bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Aulas do Módulo</h3>
                <div className="space-y-4">
                  {modulo.aulas.map((aula) => (
                    <button
                      key={aula.id}
                      onClick={() => handleVideoClick(aula)}
                      className={`w-full text-left p-4 rounded-lg transition-colors ${
                        aula.id === aulaAtual.id
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                          : 'hover:bg-gray-50 border-transparent'
                      } border`}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {aula.concluida ? (
                            <svg className="h-5 w-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${
                            aula.id === aulaAtual.id ? 'text-[#D4AF37]' : 'text-gray-900'
                          }`}>
                            {aula.titulo}
                          </p>
                          <p className="text-sm text-gray-500">{aula.duracao}</p>
                        </div>
                      </div>
                    </button>
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