'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovaVagaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    requisitos: '',
    beneficios: '',
    tipoContrato: 'CLT',
    nivel: 'Pleno',
    localizacao: 'Dubai',
    modalidade: 'Híbrido',
    salario: '',
    idiomas: ['Inglês'],
    habilidades: [],
    dataLimite: '',
    status: 'Ativa'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar integração com API
    console.log('Dados da vaga:', formData);
    router.push('/empresa/vagas');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Nova Vaga</h1>
            <p className="mt-2 text-sm text-gray-600">
              Preencha os detalhes da vaga para publicar uma nova oportunidade
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informações Básicas */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                    Título da Vaga
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    required
                    value={formData.titulo}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    name="descricao"
                    id="descricao"
                    rows={4}
                    required
                    value={formData.descricao}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="requisitos" className="block text-sm font-medium text-gray-700">
                    Requisitos
                  </label>
                  <textarea
                    name="requisitos"
                    id="requisitos"
                    rows={4}
                    required
                    value={formData.requisitos}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="beneficios" className="block text-sm font-medium text-gray-700">
                    Benefícios
                  </label>
                  <textarea
                    name="beneficios"
                    id="beneficios"
                    rows={4}
                    value={formData.beneficios}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Detalhes da Vaga */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Detalhes da Vaga</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tipoContrato" className="block text-sm font-medium text-gray-700">
                    Tipo de Contrato
                  </label>
                  <select
                    name="tipoContrato"
                    id="tipoContrato"
                    required
                    value={formData.tipoContrato}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  >
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="Temporário">Temporário</option>
                    <option value="Estágio">Estágio</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="nivel" className="block text-sm font-medium text-gray-700">
                    Nível
                  </label>
                  <select
                    name="nivel"
                    id="nivel"
                    required
                    value={formData.nivel}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  >
                    <option value="Júnior">Júnior</option>
                    <option value="Pleno">Pleno</option>
                    <option value="Sênior">Sênior</option>
                    <option value="Especialista">Especialista</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">
                    Localização
                  </label>
                  <input
                    type="text"
                    name="localizacao"
                    id="localizacao"
                    required
                    value={formData.localizacao}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="modalidade" className="block text-sm font-medium text-gray-700">
                    Modalidade
                  </label>
                  <select
                    name="modalidade"
                    id="modalidade"
                    required
                    value={formData.modalidade}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  >
                    <option value="Presencial">Presencial</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Híbrido">Híbrido</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="salario" className="block text-sm font-medium text-gray-700">
                    Faixa Salarial (USD)
                  </label>
                  <input
                    type="text"
                    name="salario"
                    id="salario"
                    value={formData.salario}
                    onChange={handleChange}
                    placeholder="Ex: 5000-7000"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="dataLimite" className="block text-sm font-medium text-gray-700">
                    Data Limite
                  </label>
                  <input
                    type="date"
                    name="dataLimite"
                    id="dataLimite"
                    required
                    value={formData.dataLimite}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring-[#D4AF37] sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
              >
                Publicar Vaga
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 