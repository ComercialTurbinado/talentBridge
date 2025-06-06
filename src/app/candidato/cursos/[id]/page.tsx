'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CursoDetalhesPage() {
  const [curso] = useState({
    id: 1,
    titulo: 'Preparação para Entrevistas',
    descricao: 'Aprenda técnicas e estratégias para se destacar em entrevistas internacionais',
    progresso: 60,
    categoria: 'Entrevista',
    duracao: '8 horas',
    nivel: 'Intermediário',
    modulos: [
      {
        id: 1,
        titulo: 'Fundamentos da Entrevista',
        aulas: [
          {
            id: 1,
            titulo: 'Introdução ao Processo de Entrevista',
            duracao: '15:30',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_1',
            concluida: true
          },
          {
            id: 2,
            titulo: 'Tipos de Entrevistas',
            duracao: '20:45',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_2',
            concluida: true
          }
        ],
        materiais: [
          {
            id: 1,
            titulo: 'Guia de Preparação',
            tipo: 'PDF',
            tamanho: '2.4 MB',
            url: '/materiais/guia-preparacao.pdf'
          }
        ]
      },
      {
        id: 2,
        titulo: 'Perguntas Comportamentais',
        aulas: [
          {
            id: 3,
            titulo: 'Estrutura STAR',
            duracao: '25:15',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_3',
            concluida: true
          },
          {
            id: 4,
            titulo: 'Exemplos Práticos',
            duracao: '30:20',
            videoUrl: 'https://www.youtube.com/embed/VIDEO_ID_4',
            concluida: false
          }
        ],
        materiais: [
          {
            id: 2,
            titulo: 'Template de Respostas STAR',
            tipo: 'DOCX',
            tamanho: '1.2 MB',
            url: '/materiais/template-star.docx'
          }
        ]
      }
    ]
  });

  const [moduloAtual, setModuloAtual] = useState(curso.modulos[0]);
  const [aulaAtual, setAulaAtual] = useState(moduloAtual.aulas[0]);

  const handleModuloClick = (modulo: typeof curso.modulos[0]) => {
    setModuloAtual(modulo);
    setAulaAtual(modulo.aulas[0]);
  };

  const handleAulaClick = (aula: typeof moduloAtual.aulas[0]) => {
    setAulaAtual(aula);
  };

  const handleDownload = (url: string) => {
    console.log('Download:', url);
    // Implementar lógica de download
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/candidato/cursos"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Cursos
          </Link>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{curso.titulo}</h1>
                <p className="mt-2 text-sm text-gray-600">{curso.descricao}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#D4AF37] text-white">
                  {curso.categoria}
                </span>
                <span className="text-sm text-gray-500">{curso.duracao}</span>
                <span className="text-sm text-gray-500">{curso.nivel}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#D4AF37] h-2.5 rounded-full"
                    style={{ width: `${curso.progresso}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-500">{curso.progresso}% concluído</span>
              </div>
            </div>
          </div>
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

            {/* Materiais do Módulo */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Materiais Complementares</h3>
              <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
                {moduloAtual.materiais.map((material) => (
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

          {/* Sidebar - Módulos e Aulas */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Módulos do Curso</h3>
                <div className="space-y-4">
                  {curso.modulos.map((modulo) => (
                    <div key={modulo.id}>
                      <button
                        onClick={() => handleModuloClick(modulo)}
                        className={`w-full text-left p-4 rounded-lg transition-colors ${
                          modulo.id === moduloAtual.id
                            ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                            : 'hover:bg-gray-50 border-transparent'
                        } border`}
                      >
                        <h4 className="font-medium text-gray-900">{modulo.titulo}</h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {modulo.aulas.length} aulas • {modulo.aulas.filter(a => a.concluida).length} concluídas
                        </p>
                      </button>
                      {modulo.id === moduloAtual.id && (
                        <div className="mt-2 ml-4 space-y-2">
                          {modulo.aulas.map((aula) => (
                            <button
                              key={aula.id}
                              onClick={() => handleAulaClick(aula)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
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
                      )}
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