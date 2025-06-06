'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function AdminCandidatoDetalhesPage() {
  const params = useParams();
  const candidatoId = params.id;

  const [candidato, setCandidato] = useState({
    id: candidatoId,
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '+55 11 98765-4321',
    linkedin: 'linkedin.com/in/joaosilva',
    status: 'Aprovado',
    nivelAcademico: 'Mestrado',
    curso: 'Ciência da Computação',
    instituicao: 'Universidade de São Paulo',
    nivelIngles: 'Avançado',
    experiencia: '5 anos',
    disponibilidade: 'Imediata',
    expectativaSalarial: '15.000 - 20.000 AED',
    dataCadastro: '15/03/2024',
    ultimaAtualizacao: '15/03/2024',
    documentos: [
      {
        id: 1,
        tipo: 'Currículo',
        nome: 'curriculo_joao_silva.pdf',
        dataUpload: '15/03/2024',
        status: 'Aprovado'
      },
      {
        id: 2,
        tipo: 'Carta de Apresentação',
        nome: 'carta_apresentacao_joao_silva.pdf',
        dataUpload: '15/03/2024',
        status: 'Pendente'
      }
    ],
    habilidades: [
      'JavaScript',
      'React',
      'Node.js',
      'Python',
      'SQL',
      'Git',
      'AWS',
      'Docker'
    ],
    historico: [
      {
        id: 1,
        data: '15/03/2024 14:30',
        acao: 'Cadastro realizado',
        usuario: 'Sistema'
      },
      {
        id: 2,
        data: '15/03/2024 15:45',
        acao: 'Documentos enviados',
        usuario: 'João Silva'
      }
    ]
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Detalhes do Candidato</h1>
              <p className="mt-2 text-sm text-gray-600">
                Visualize e gerencie as informações do candidato
              </p>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/admin/candidatos"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Voltar à Lista
              </Link>
              <button
                onClick={() => {/* Implementar edição */}}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]"
              >
                Editar Candidato
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações Principais */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.nome}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.telefone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.linkedin}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formação e Experiência */}
            <div className="bg-white shadow rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Formação e Experiência</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nível Acadêmico</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.nivelAcademico}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Curso</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.curso}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Instituição</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.instituicao}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nível de Inglês</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.nivelIngles}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Anos de Experiência</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.experiencia}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Disponibilidade</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.disponibilidade}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Expectativa Salarial (AED)</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.expectativaSalarial}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white shadow rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {candidato.habilidades.map((habilidade, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#D4AF37] text-white"
                    >
                      {habilidade}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Status e Ações */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Status e Ações</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status Atual</label>
                    <span className={`mt-1 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      candidato.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                      candidato.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {candidato.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data de Cadastro</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.dataCadastro}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Última Atualização</label>
                    <p className="mt-1 text-sm text-gray-900">{candidato.ultimaAtualizacao}</p>
                  </div>
                  <div className="pt-4 space-y-2">
                    <button
                      onClick={() => {/* Implementar aprovação */}}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                      Aprovar Candidato
                    </button>
                    <button
                      onClick={() => {/* Implementar rejeição */}}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                    >
                      Rejeitar Candidato
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos */}
            <div className="bg-white shadow rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Documentos</h2>
                <div className="space-y-4">
                  {candidato.documentos.map((documento) => (
                    <div key={documento.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{documento.tipo}</h3>
                          <p className="text-sm text-gray-500">{documento.nome}</p>
                          <p className="text-xs text-gray-400">Upload em {documento.dataUpload}</p>
                        </div>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          documento.status === 'Aprovado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {documento.status}
                        </span>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          Download
                        </button>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                          Aprovar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Histórico */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Histórico</h2>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {candidato.historico.map((item, index) => (
                      <li key={item.id}>
                        <div className="relative pb-8">
                          {index !== candidato.historico.length - 1 && (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {item.acao} <span className="font-medium text-gray-900">por {item.usuario}</span>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time dateTime={item.data}>{item.data}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 