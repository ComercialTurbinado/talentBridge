'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatoCursosPage() {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      titulo: 'Preparação para Entrevistas',
      descricao: 'Aprenda técnicas e estratégias para se destacar em entrevistas internacionais',
      progresso: 60,
      aulas: 12,
      aulasCompletas: 7,
      proximaAula: 'Como responder perguntas comportamentais',
      categoria: 'Entrevista',
      duracao: '8 horas',
      nivel: 'Intermediário'
    },
    {
      id: 2,
      titulo: 'Adaptação Cultural',
      descricao: 'Conheça os costumes e práticas profissionais dos Emirados Árabes Unidos',
      progresso: 45,
      aulas: 8,
      aulasCompletas: 4,
      proximaAula: 'Etiqueta profissional no Oriente Médio',
      categoria: 'Cultural',
      duracao: '6 horas',
      nivel: 'Básico'
    },
    {
      id: 3,
      titulo: 'Networking Internacional',
      descricao: 'Desenvolva habilidades de networking para o mercado internacional',
      progresso: 0,
      aulas: 10,
      aulasCompletas: 0,
      proximaAula: 'Introdução ao networking internacional',
      categoria: 'Soft Skills',
      duracao: '5 horas',
      nivel: 'Básico'
    },
    {
      id: 4,
      titulo: 'Negociação Salarial',
      descricao: 'Aprenda a negociar seu salário e benefícios no mercado internacional',
      progresso: 0,
      aulas: 6,
      aulasCompletas: 0,
      proximaAula: 'Pesquisa de mercado salarial',
      categoria: 'Carreira',
      duracao: '4 horas',
      nivel: 'Intermediário'
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroNivel, setFiltroNivel] = useState('todos');

  const categorias = ['todos', 'Entrevista', 'Cultural', 'Soft Skills', 'Carreira'];
  const niveis = ['todos', 'Básico', 'Intermediário', 'Avançado'];

  const cursosFiltrados = cursos.filter(curso => {
    const matchCategoria = filtroCategoria === 'todos' || curso.categoria === filtroCategoria;
    const matchNivel = filtroNivel === 'todos' || curso.nivel === filtroNivel;
    return matchCategoria && matchNivel;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Cursos</h1>
              <p className="mt-2 text-sm text-gray-600">
                Desenvolva suas habilidades para o mercado internacional
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

        {/* Filtros */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria
                </label>
                <select
                  id="categoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                >
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria === 'todos' ? 'Todas as categorias' : categoria}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">
                  Nível
                </label>
                <select
                  id="nivel"
                  value={filtroNivel}
                  onChange={(e) => setFiltroNivel(e.target.value)}
                  className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                >
                  {niveis.map((nivel) => (
                    <option key={nivel} value={nivel}>
                      {nivel === 'todos' ? 'Todos os níveis' : nivel}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Cursos */}
        <div className="grid grid-cols-1 gap-6">
          {cursosFiltrados.map((curso) => (
            <div key={curso.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">{curso.titulo}</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#D4AF37] text-white">
                        {curso.categoria}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-600">{curso.descricao}</p>
                    
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Progresso</p>
                        <div className="mt-1 flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-[#D4AF37] h-2.5 rounded-full"
                              style={{ width: `${curso.progresso}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{curso.progresso}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Duração</p>
                        <p className="mt-1 text-sm text-gray-900">{curso.duracao}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Nível</p>
                        <p className="mt-1 text-sm text-gray-900">{curso.nivel}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-gray-500">
                        {curso.aulasCompletas} de {curso.aulas} aulas completas
                      </p>
                      {curso.progresso > 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                          Próxima aula: <span className="font-medium text-gray-900">{curso.proximaAula}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-end">
                  {curso.progresso > 0 ? (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                      Continuar curso
                    </button>
                  ) : (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                      Começar curso
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 