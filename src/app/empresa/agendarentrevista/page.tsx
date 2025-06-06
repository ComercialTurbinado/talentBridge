'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AgendarEntrevistaPage() {
  const [formData, setFormData] = useState({
    vagaId: '',
    candidatoId: '',
    data: '',
    horario: '',
    tipo: 'online',
    endereco: '',
    link: '',
    observacoes: ''
  });

  const [buscaVaga, setBuscaVaga] = useState('');

  const [vagas] = useState([
    {
      id: 1,
      titulo: 'Desenvolvedor Frontend Senior',
      empresa: 'Tech Solutions',
      candidatos: [
        {
          id: 1,
          nome: 'João Silva',
          email: 'joao.silva@email.com',
          foto: '/images/avatar.png',
          matchScore: 95
        },
        {
          id: 2,
          nome: 'Maria Santos',
          email: 'maria.santos@email.com',
          foto: '/images/avatar.png',
          matchScore: 88
        }
      ]
    },
    {
      id: 2,
      titulo: 'Desenvolvedor Full Stack',
      empresa: 'Startup ABC',
      candidatos: [
        {
          id: 3,
          nome: 'Pedro Oliveira',
          email: 'pedro.oliveira@email.com',
          foto: '/images/avatar.png',
          matchScore: 92
        },
        {
          id: 4,
          nome: 'Ana Costa',
          email: 'ana.costa@email.com',
          foto: '/images/avatar.png',
          matchScore: 85
        }
      ]
    }
  ]);

  const vagasFiltradas = vagas.filter(vaga => 
    vaga.titulo.toLowerCase().includes(buscaVaga.toLowerCase()) ||
    vaga.empresa.toLowerCase().includes(buscaVaga.toLowerCase())
  );

  const candidatosDaVaga = formData.vagaId 
    ? vagas.find(v => v.id.toString() === formData.vagaId)?.candidatos || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar a entrevista
    console.log('Dados da entrevista:', formData);
    window.location.href = '/empresa/entrevistas';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Resetar candidatoId quando mudar a vaga
      ...(name === 'vagaId' && { candidatoId: '' })
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link
            href="/empresa/entrevistas"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Entrevistas
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Agendar Entrevista</h1>
          <p className="mt-2 text-sm text-gray-600">
            Preencha os dados para agendar uma nova entrevista
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seleção de Vaga */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selecione a Vaga</h2>
            <div className="mb-4">
              <input
                type="text"
                value={buscaVaga}
                onChange={(e) => setBuscaVaga(e.target.value)}
                placeholder="Buscar vaga por título ou empresa..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {vagasFiltradas.map(vaga => (
                <label
                  key={vaga.id}
                  className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                    formData.vagaId === vaga.id.toString()
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                      : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="vagaId"
                    value={vaga.id}
                    checked={formData.vagaId === vaga.id.toString()}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300"
                  />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{vaga.titulo}</p>
                    <p className="text-sm text-gray-500">{vaga.empresa}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Seleção de Candidato */}
          {formData.vagaId && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Selecione o Candidato</h2>
              <div className="grid grid-cols-1 gap-4">
                {candidatosDaVaga.map(candidato => (
                  <label
                    key={candidato.id}
                    className={`relative flex items-center p-4 border rounded-lg cursor-pointer ${
                      formData.candidatoId === candidato.id.toString()
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="candidatoId"
                      value={candidato.id}
                      checked={formData.candidatoId === candidato.id.toString()}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300"
                    />
                    <div className="ml-3 flex items-center">
                      <img
                        src={candidato.foto}
                        alt={candidato.nome}
                        className="h-10 w-10 rounded-full"
                      />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{candidato.nome}</p>
                        <p className="text-sm text-gray-500">{candidato.email}</p>
                      </div>
                      <div className="ml-auto">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#D4AF37]/10 text-[#D4AF37]">
                          Match: {candidato.matchScore}%
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Detalhes da Entrevista */}
          {formData.candidatoId && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Detalhes da Entrevista</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                    Data
                  </label>
                  <input
                    type="date"
                    id="data"
                    name="data"
                    value={formData.data}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="horario" className="block text-sm font-medium text-gray-700">
                    Horário
                  </label>
                  <input
                    type="time"
                    id="horario"
                    name="horario"
                    value={formData.horario}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                    Tipo de Entrevista
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  >
                    <option value="online">Online</option>
                    <option value="presencial">Presencial</option>
                  </select>
                </div>
                {formData.tipo === 'presencial' ? (
                  <div>
                    <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                      Endereço
                    </label>
                    <input
                      type="text"
                      id="endereco"
                      name="endereco"
                      value={formData.endereco}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                ) : (
                  <div>
                    <label htmlFor="link" className="block text-sm font-medium text-gray-700">
                      Link da Reunião
                    </label>
                    <input
                      type="url"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleChange}
                      required
                      placeholder="https://meet.google.com/..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                    />
                  </div>
                )}
              </div>
              <div className="mt-6">
                <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                />
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/empresa/entrevistas"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={!formData.vagaId || !formData.candidatoId}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agendar Entrevista
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 