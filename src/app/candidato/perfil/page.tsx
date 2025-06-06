'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CandidatoPerfilPage() {
  const [perfil, setPerfil] = useState({
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '+55 11 98765-4321',
    linkedin: 'linkedin.com/in/joaosilva',
    nivelAcademico: 'Mestrado',
    curso: 'Ciência da Computação',
    instituicao: 'Universidade de São Paulo',
    ingles: 'Avançado',
    experiencia: '5 anos',
    disponibilidade: 'Imediata',
    expectativaSalarial: '15.000 - 20.000 AED',
    curriculo: 'curriculo_joao_silva.pdf',
    cartaApresentacao: 'carta_apresentacao_joao_silva.pdf'
  });

  const [documentos, setDocumentos] = useState([
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
    },
    {
      id: 3,
      tipo: 'Certificado de Inglês',
      nome: 'certificado_ingles.pdf',
      dataUpload: '15/03/2024',
      status: 'Aprovado'
    }
  ]);

  const [habilidades, setHabilidades] = useState([
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'SQL',
    'Git',
    'AWS',
    'Docker'
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
              <p className="mt-2 text-sm text-gray-600">
                Gerencie suas informações e documentos
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações Pessoais */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input
                      type="text"
                      value={perfil.nome}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={perfil.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefone</label>
                    <input
                      type="tel"
                      value={perfil.telefone}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                    <input
                      type="text"
                      value={perfil.linkedin}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
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
                    <select
                      value={perfil.nivelAcademico}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option>Graduação</option>
                      <option>Mestrado</option>
                      <option>Doutorado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Curso</label>
                    <input
                      type="text"
                      value={perfil.curso}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Instituição</label>
                    <input
                      type="text"
                      value={perfil.instituicao}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nível de Inglês</label>
                    <select
                      value={perfil.ingles}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option>Básico</option>
                      <option>Intermediário</option>
                      <option>Avançado</option>
                      <option>Fluente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Anos de Experiência</label>
                    <input
                      type="text"
                      value={perfil.experiencia}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Disponibilidade</label>
                    <select
                      value={perfil.disponibilidade}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option>Imediata</option>
                      <option>30 dias</option>
                      <option>60 dias</option>
                      <option>90 dias</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Expectativa Salarial (AED)</label>
                    <input
                      type="text"
                      value={perfil.expectativaSalarial}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className="bg-white shadow rounded-lg mt-8">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {habilidades.map((habilidade, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#D4AF37] text-white"
                    >
                      {habilidade}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Adicionar nova habilidade"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Documentos */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Documentos</h2>
                <div className="space-y-4">
                  {documentos.map((documento) => (
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
                          Atualizar
                        </button>
                        <button className="inline-flex items-center px-3 py-1 border border-transparent rounded-md text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                    Adicionar Documento
                  </button>
                </div>
              </div>
            </div>

            {/* Salvar Alterações */}
            <div className="mt-8">
              <button className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E]">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 