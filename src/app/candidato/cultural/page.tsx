'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatoCulturalPage() {
  const [conteudos, setConteudos] = useState([
    {
      id: 1,
      titulo: 'Cultura e Costumes',
      descricao: 'Conheça os principais aspectos culturais dos Emirados Árabes Unidos',
      categoria: 'Cultura',
      artigos: [
        {
          id: 1,
          titulo: 'Tradições e Valores',
          descricao: 'Entenda os valores fundamentais da sociedade dos EAU',
          tempoLeitura: '5 min',
          lido: true
        },
        {
          id: 2,
          titulo: 'Festivais e Celebrações',
          descricao: 'Principais eventos culturais e religiosos',
          tempoLeitura: '4 min',
          lido: false
        }
      ]
    },
    {
      id: 2,
      titulo: 'Etiqueta Profissional',
      descricao: 'Aprenda as práticas profissionais e de negócios nos EAU',
      categoria: 'Profissional',
      artigos: [
        {
          id: 1,
          titulo: 'Comunicação no Ambiente de Trabalho',
          descricao: 'Como se comunicar efetivamente em um ambiente multicultural',
          tempoLeitura: '6 min',
          lido: false
        },
        {
          id: 2,
          titulo: 'Reuniões e Negociações',
          descricao: 'Protocolos e práticas em reuniões de negócios',
          tempoLeitura: '7 min',
          lido: false
        }
      ]
    },
    {
      id: 3,
      titulo: 'Vida Cotidiana',
      descricao: 'Informações práticas sobre morar e trabalhar nos EAU',
      categoria: 'Vida Prática',
      artigos: [
        {
          id: 1,
          titulo: 'Transporte e Mobilidade',
          descricao: 'Como se locomover nas principais cidades',
          tempoLeitura: '5 min',
          lido: false
        },
        {
          id: 2,
          titulo: 'Alimentação e Gastronomia',
          descricao: 'Culinária local e opções de restaurantes',
          tempoLeitura: '4 min',
          lido: false
        }
      ]
    }
  ]);

  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');

  const categorias = ['todos', 'Cultura', 'Profissional', 'Vida Prática'];

  const conteudosFiltrados = categoriaAtiva === 'todos'
    ? conteudos
    : conteudos.filter(conteudo => conteudo.categoria === categoriaAtiva);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Conteúdo Cultural</h1>
              <p className="mt-2 text-sm text-gray-600">
                Aprenda sobre a cultura e práticas profissionais dos Emirados Árabes Unidos
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

        {/* Navegação por Categorias */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaAtiva(categoria)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  categoriaAtiva === categoria
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {categoria === 'todos' ? 'Todos os Conteúdos' : categoria}
              </button>
            ))}
          </nav>
        </div>

        {/* Lista de Conteúdos */}
        <div className="space-y-8">
          {conteudosFiltrados.map((conteudo) => (
            <div key={conteudo.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{conteudo.titulo}</h2>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#D4AF37] text-white">
                    {conteudo.categoria}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{conteudo.descricao}</p>

                <div className="space-y-4">
                  {conteudo.artigos.map((artigo) => (
                    <div
                      key={artigo.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{artigo.titulo}</h3>
                        <p className="mt-1 text-sm text-gray-500">{artigo.descricao}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {artigo.tempoLeitura} de leitura
                        </div>
                      </div>
                      <div className="ml-4">
                        {artigo.lido ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Lido
                          </span>
                        ) : (
                          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                            Ler artigo
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 