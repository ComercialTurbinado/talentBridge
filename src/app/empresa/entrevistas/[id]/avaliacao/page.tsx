'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AvaliacaoEntrevistaPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    candidatoId: params.id,
    vagaId: '1',
    data: '19/03/2024',
    candidato: {
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@email.com',
      foto: '/images/avatar.png'
    },
    vaga: {
      titulo: 'Desenvolvedor Backend',
      empresa: 'Tech Solutions'
    },
    avaliacao: {
      conhecimentosTecnicos: 0,
      experiencia: 0,
      comunicacao: 0,
      cultura: 0,
      potencial: 0,
      observacoes: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar a avaliação
    console.log('Dados da avaliação:', formData);
    router.push('/empresa/entrevistas');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      avaliacao: {
        ...prev.avaliacao,
        [name]: parseInt(value) || 0
      }
    }));
  };

  const handleObservacoesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      avaliacao: {
        ...prev.avaliacao,
        observacoes: e.target.value
      }
    }));
  };

  const calcularMedia = () => {
    const { avaliacao } = formData;
    const valores = [
      avaliacao.conhecimentosTecnicos,
      avaliacao.experiencia,
      avaliacao.comunicacao,
      avaliacao.cultura,
      avaliacao.potencial
    ];
    const media = valores.reduce((acc, val) => acc + val, 0) / valores.length;
    return media.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Avaliação da Entrevista</h1>
          <p className="mt-2 text-sm text-gray-600">
            Avalie o desempenho do candidato na entrevista
          </p>
        </div>

        {/* Informações da Entrevista */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <img
              src={formData.candidato.foto}
              alt={formData.candidato.nome}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">{formData.candidato.nome}</h2>
              <p className="text-sm text-gray-500">{formData.candidato.email}</p>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Vaga</p>
                <p className="mt-1 text-sm text-gray-900">{formData.vaga.titulo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Empresa</p>
                <p className="mt-1 text-sm text-gray-900">{formData.vaga.empresa}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Data da Entrevista</p>
                <p className="mt-1 text-sm text-gray-900">{formData.data}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário de Avaliação */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Critérios de Avaliação</h2>
            
            {/* Conhecimentos Técnicos */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conhecimentos Técnicos
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="conhecimentosTecnicos"
                  min="0"
                  max="5"
                  value={formData.avaliacao.conhecimentosTecnicos}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">
                  {formData.avaliacao.conhecimentosTecnicos}/5
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Avalie o domínio técnico do candidato em relação à vaga
              </p>
            </div>

            {/* Experiência */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiência
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="experiencia"
                  min="0"
                  max="5"
                  value={formData.avaliacao.experiencia}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">
                  {formData.avaliacao.experiencia}/5
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Avalie a experiência do candidato em relação à vaga
              </p>
            </div>

            {/* Comunicação */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comunicação
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="comunicacao"
                  min="0"
                  max="5"
                  value={formData.avaliacao.comunicacao}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">
                  {formData.avaliacao.comunicacao}/5
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Avalie a capacidade de comunicação do candidato
              </p>
            </div>

            {/* Cultura */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fit Cultural
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="cultura"
                  min="0"
                  max="5"
                  value={formData.avaliacao.cultura}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">
                  {formData.avaliacao.cultura}/5
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Avalie o alinhamento do candidato com a cultura da empresa
              </p>
            </div>

            {/* Potencial */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Potencial
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  name="potencial"
                  min="0"
                  max="5"
                  value={formData.avaliacao.potencial}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-900">
                  {formData.avaliacao.potencial}/5
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Avalie o potencial de crescimento do candidato
              </p>
            </div>

            {/* Média */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Média Final</span>
                <span className="text-lg font-bold text-[#D4AF37]">{calcularMedia()}/5</span>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                Observações
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.avaliacao.observacoes}
                onChange={handleObservacoesChange}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                placeholder="Adicione observações importantes sobre a entrevista..."
              />
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
            >
              Salvar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 