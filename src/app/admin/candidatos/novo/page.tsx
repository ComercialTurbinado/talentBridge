'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NovoCandidatoPage() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    dataNascimento: '',
    genero: '',
    endereco: '',
    cidade: '',
    estado: '',
    pais: '',
    linkedin: '',
    github: '',
    portfolio: '',
    area: '',
    nivel: '',
    experiencia: '',
    formacao: '',
    idiomas: '',
    habilidades: '',
    objetivo: '',
    disponibilidade: '',
    pretensao: ''
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
    console.log('Dados do candidato:', formData);
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
            href="/admin/candidatos"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Candidatos
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Novo Candidato</h1>
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
                      Nome Completo *
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
                    <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                      CPF *
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      id="cpf"
                      required
                      value={formData.cpf}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      name="dataNascimento"
                      id="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                      Gênero
                    </label>
                    <select
                      name="genero"
                      id="genero"
                      value={formData.genero}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="prefiro_nao_informar">Prefiro não informar</option>
                    </select>
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
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                      GitHub
                    </label>
                    <input
                      type="url"
                      name="github"
                      id="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">
                      Portfolio
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                      Área de Atuação
                    </label>
                    <select
                      name="area"
                      id="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione uma área</option>
                      <option value="desenvolvimento">Desenvolvimento</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="vendas">Vendas</option>
                      <option value="rh">Recursos Humanos</option>
                      <option value="financas">Finanças</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                      Nível Profissional
                    </label>
                    <select
                      name="nivel"
                      id="nivel"
                      value={formData.nivel}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione o nível</option>
                      <option value="junior">Júnior</option>
                      <option value="pleno">Pleno</option>
                      <option value="senior">Sênior</option>
                      <option value="especialista">Especialista</option>
                      <option value="gerente">Gerente</option>
                      <option value="diretor">Diretor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700">
                      Anos de Experiência
                    </label>
                    <select
                      name="experiencia"
                      id="experiencia"
                      value={formData.experiencia}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="0-1">0-1 ano</option>
                      <option value="1-3">1-3 anos</option>
                      <option value="3-5">3-5 anos</option>
                      <option value="5-10">5-10 anos</option>
                      <option value="10+">Mais de 10 anos</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="formacao" className="block text-sm font-medium text-gray-700">
                      Formação
                    </label>
                    <select
                      name="formacao"
                      id="formacao"
                      value={formData.formacao}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="ensino_medio">Ensino Médio</option>
                      <option value="tecnico">Técnico</option>
                      <option value="graduacao">Graduação</option>
                      <option value="pos_graduacao">Pós-graduação</option>
                      <option value="mestrado">Mestrado</option>
                      <option value="doutorado">Doutorado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="idiomas" className="block text-sm font-medium text-gray-700">
                    Idiomas
                  </label>
                  <textarea
                    name="idiomas"
                    id="idiomas"
                    rows={2}
                    value={formData.idiomas}
                    onChange={handleInputChange}
                    placeholder="Ex: Português (Nativo), Inglês (Fluente), Espanhol (Intermediário)"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="habilidades" className="block text-sm font-medium text-gray-700">
                    Habilidades
                  </label>
                  <textarea
                    name="habilidades"
                    id="habilidades"
                    rows={3}
                    value={formData.habilidades}
                    onChange={handleInputChange}
                    placeholder="Liste suas principais habilidades técnicas e comportamentais"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
                    Objetivo Profissional
                  </label>
                  <textarea
                    name="objetivo"
                    id="objetivo"
                    rows={3}
                    value={formData.objetivo}
                    onChange={handleInputChange}
                    placeholder="Descreva seus objetivos profissionais e expectativas de carreira"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="disponibilidade" className="block text-sm font-medium text-gray-700">
                      Disponibilidade
                    </label>
                    <select
                      name="disponibilidade"
                      id="disponibilidade"
                      value={formData.disponibilidade}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    >
                      <option value="">Selecione</option>
                      <option value="imediata">Imediata</option>
                      <option value="15_dias">15 dias</option>
                      <option value="30_dias">30 dias</option>
                      <option value="60_dias">60 dias</option>
                      <option value="90_dias">90 dias</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="pretensao" className="block text-sm font-medium text-gray-700">
                      Pretensão Salarial
                    </label>
                    <input
                      type="text"
                      name="pretensao"
                      id="pretensao"
                      value={formData.pretensao}
                      onChange={handleInputChange}
                      placeholder="Ex: R$ 5.000,00"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Link
                    href="/admin/candidatos"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#D4AF37] border border-transparent rounded-md shadow-sm hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Cadastrar Candidato
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
                    placeholder="Cole aqui os dados em formato CSV. Exemplo:&#10;nome,email,telefone,cpf,dataNascimento,genero,endereco,cidade,estado,pais,linkedin,github,portfolio,area,nivel,experiencia,formacao,idiomas,habilidades,objetivo,disponibilidade,pretensao&#10;João Silva,joao@email.com,11999999999,12345678901,1990-01-01,masculino,Rua A 123,São Paulo,SP,Brasil,linkedin.com/joao,github.com/joao,joao.com,desenvolvimento,pleno,3-5,graduacao,Português (Nativo),JavaScript,Desenvolvedor Full Stack,imediata,R$ 5000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm font-mono"
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Link
                    href="/admin/candidatos"
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-[#D4AF37] border border-transparent rounded-md shadow-sm hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                  >
                    Importar Candidatos
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