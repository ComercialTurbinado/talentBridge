'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NovaEmpresaPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    pais: '',
    website: '',
    setor: '',
    tamanho: '',
    descricao: ''
  });

  const [importMode, setImportMode] = useState(false);
  const [importData, setImportData] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da empresa:', formData);
    // Implementar lógica de cadastro
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados para importação:', importData);
    // Implementar lógica de importação
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/admin/empresas"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Empresas
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Nova Empresa</h1>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex space-x-4">
              <button
                onClick={() => setImportMode(false)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  !importMode
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Cadastro Individual
              </button>
              <button
                onClick={() => setImportMode(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  importMode
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Importação em Lote
              </button>
            </div>
          </div>

          <div className="p-6">
            {!importMode ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      id="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
                      CNPJ *
                    </label>
                    <input
                      type="text"
                      name="cnpj"
                      id="cnpj"
                      required
                      value={formData.cnpj}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <input
                      type="text"
                      name="endereco"
                      id="endereco"
                      value={formData.endereco}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      id="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <input
                      type="text"
                      name="estado"
                      id="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="pais" className="block text-sm font-medium text-gray-700">
                      País
                    </label>
                    <input
                      type="text"
                      name="pais"
                      id="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="setor" className="block text-sm font-medium text-gray-700">
                      Setor
                    </label>
                    <select
                      name="setor"
                      id="setor"
                      value={formData.setor}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione um setor</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="saude">Saúde</option>
                      <option value="educacao">Educação</option>
                      <option value="financas">Finanças</option>
                      <option value="varejo">Varejo</option>
                      <option value="industria">Indústria</option>
                      <option value="servicos">Serviços</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="tamanho" className="block text-sm font-medium text-gray-700">
                      Tamanho
                    </label>
                    <select
                      name="tamanho"
                      id="tamanho"
                      value={formData.tamanho}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione o tamanho</option>
                      <option value="1-10">1-10 funcionários</option>
                      <option value="11-50">11-50 funcionários</option>
                      <option value="51-200">51-200 funcionários</option>
                      <option value="201-500">201-500 funcionários</option>
                      <option value="501-1000">501-1000 funcionários</option>
                      <option value="1001+">Mais de 1000 funcionários</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    rows={4}
                    value={formData.descricao}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Link
                    href="/admin/empresas"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#D4AF37] border border-transparent rounded-md shadow-sm hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Cadastrar Empresa
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleImport} className="space-y-6">
                <div>
                  <label htmlFor="importData" className="block text-sm font-medium text-gray-700">
                    Dados para Importação (CSV)
                  </label>
                  <textarea
                    name="importData"
                    id="importData"
                    rows={10}
                    value={importData}
                    onChange={(e) => setImportData(e.target.value)}
                    placeholder="Cole aqui os dados em formato CSV. Exemplo:&#10;nome,email,telefone,cnpj,endereco,cidade,estado,pais,website,setor,tamanho,descricao&#10;Empresa A,contato@empresaa.com,11999999999,12345678901234,Rua A 123,São Paulo,SP,Brasil,www.empresaa.com,tecnologia,51-200,Descrição da Empresa A"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm font-mono"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Link
                    href="/admin/empresas"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#D4AF37] border border-transparent rounded-md shadow-sm hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Importar Empresas
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 