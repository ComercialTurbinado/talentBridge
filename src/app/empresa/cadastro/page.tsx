'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api/client';

export default function CadastroEmpresaPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Estado do formulário estruturado conforme API
  const [formData, setFormData] = useState({
    // Dados da Empresa
    empresa: {
      nomeEmpresa: '',
      razaoSocial: '',
      cnpj: '',
      inscricaoEstadual: '',
      segmento: '',
      porte: 'medio',
      anoFundacao: '',
      website: '',
      linkedin: '',
      descricao: '',
      missao: '',
      visao: '',
      valores: ''
    },
    // Contato
    contato: {
      email: '',
      telefone: '',
      whatsapp: '',
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: 'Brasil'
      }
    },
    // Responsável
    responsavel: {
      nome: '',
      cargo: '',
      telefone: '',
      email: '',
      linkedin: ''
    },
    // Benefícios
    beneficios: [],
    // Cultura
    cultura: {
      ambiente: '',
      valores: [],
      metodologias: [],
      ferramentas: []
    },
    // Senha
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (path: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newData;
    });

    // Limpa erro do campo
    if (errors[path]) {
      setErrors(prev => ({ ...prev, [path]: '' }));
    }
  };

  const handleArrayAdd = (path: string, newItem: any) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = [...current[keys[keys.length - 1]], newItem];
      return newData;
    });
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validação Dados da Empresa
      if (!formData.empresa.nomeEmpresa) 
        newErrors['empresa.nomeEmpresa'] = 'Nome da empresa é obrigatório';
      if (!formData.contato.email) 
        newErrors['contato.email'] = 'E-mail é obrigatório';
      if (!formData.responsavel.nome) 
        newErrors['responsavel.nome'] = 'Nome do responsável é obrigatório';
      if (!formData.senha) 
        newErrors['senha'] = 'Senha é obrigatória';
      if (!formData.confirmarSenha) 
        newErrors['confirmarSenha'] = 'Confirmação de senha é obrigatória';

      // Validações específicas
      if (formData.contato.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contato.email)) {
        newErrors['contato.email'] = 'E-mail inválido';
      }

      if (formData.senha && formData.senha.length < 6) {
        newErrors['senha'] = 'A senha deve ter pelo menos 6 caracteres';
      }

      if (formData.senha && formData.confirmarSenha && formData.senha !== formData.confirmarSenha) {
        newErrors['confirmarSenha'] = 'As senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiClient.cadastrarEmpresa(formData);
      
      if (response.sucesso) {
        alert(response.mensagem);
        router.push('/empresa/login?message=cadastro_sucesso');
      }
    } catch (error: any) {
      alert(error.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cadastro de Empresa</h1>
          <p className="mt-2 text-gray-600">
            Preencha os dados da sua empresa para começar a encontrar os melhores talentos
          </p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="px-4 py-5 bg-blue-600 sm:px-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full ${
                      currentStep >= step ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                    }`}
                  >
                    {step}
                  </div>
                  <div className="ml-2 text-sm font-medium text-white">
                    {step === 1 ? 'Dados Básicos' : 
                     step === 2 ? 'Responsável' : 'Cultura'}
                  </div>
                  {step < 3 && <div className="ml-4 h-0.5 w-12 bg-blue-500"></div>}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Dados Básicos */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Dados da Empresa</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome da Empresa*
                    </label>
                    <input
                      type="text"
                      value={formData.empresa.nomeEmpresa}
                      onChange={(e) => handleInputChange('empresa.nomeEmpresa', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['empresa.nomeEmpresa'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['empresa.nomeEmpresa'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['empresa.nomeEmpresa']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Razão Social
                    </label>
                    <input
                      type="text"
                      value={formData.empresa.razaoSocial}
                      onChange={(e) => handleInputChange('empresa.razaoSocial', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CNPJ
                    </label>
                    <input
                      type="text"
                      value={formData.empresa.cnpj}
                      onChange={(e) => handleInputChange('empresa.cnpj', e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Segmento
                    </label>
                    <select
                      value={formData.empresa.segmento}
                      onChange={(e) => handleInputChange('empresa.segmento', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="tecnologia">Tecnologia</option>
                      <option value="financeiro">Financeiro</option>
                      <option value="saude">Saúde</option>
                      <option value="educacao">Educação</option>
                      <option value="varejo">Varejo</option>
                      <option value="industria">Indústria</option>
                      <option value="servicos">Serviços</option>
                      <option value="consultoria">Consultoria</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Porte da Empresa
                    </label>
                    <select
                      value={formData.empresa.porte}
                      onChange={(e) => handleInputChange('empresa.porte', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="micro">Micro (até 9 funcionários)</option>
                      <option value="pequeno">Pequeno (10-49 funcionários)</option>
                      <option value="medio">Médio (50-499 funcionários)</option>
                      <option value="grande">Grande (500+ funcionários)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ano de Fundação
                    </label>
                    <input
                      type="number"
                      value={formData.empresa.anoFundacao}
                      onChange={(e) => handleInputChange('empresa.anoFundacao', e.target.value)}
                      min="1900"
                      max={new Date().getFullYear()}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      value={formData.empresa.website}
                      onChange={(e) => handleInputChange('empresa.website', e.target.value)}
                      placeholder="https://www.empresa.com"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      LinkedIn da Empresa
                    </label>
                    <input
                      type="url"
                      value={formData.empresa.linkedin}
                      onChange={(e) => handleInputChange('empresa.linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/empresa"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descrição da Empresa
                  </label>
                  <textarea
                    value={formData.empresa.descricao}
                    onChange={(e) => handleInputChange('empresa.descricao', e.target.value)}
                    rows={4}
                    placeholder="Descreva os principais produtos, serviços e valores da empresa..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <h3 className="text-md font-medium text-gray-900 mt-8 mb-4">Dados de Contato</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      E-mail Corporativo*
                    </label>
                    <input
                      type="email"
                      value={formData.contato.email}
                      onChange={(e) => handleInputChange('contato.email', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['contato.email'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['contato.email'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['contato.email']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.contato.telefone}
                      onChange={(e) => handleInputChange('contato.telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cidade
                    </label>
                    <input
                      type="text"
                      value={formData.contato.endereco.cidade}
                      onChange={(e) => handleInputChange('contato.endereco.cidade', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Estado
                    </label>
                    <input
                      type="text"
                      value={formData.contato.endereco.estado}
                      onChange={(e) => handleInputChange('contato.endereco.estado', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <h3 className="text-md font-medium text-gray-900 mt-8 mb-4">Segurança</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Senha*
                    </label>
                    <input
                      type="password"
                      value={formData.senha}
                      onChange={(e) => handleInputChange('senha', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['senha'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['senha'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['senha']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirmar Senha*
                    </label>
                    <input
                      type="password"
                      value={formData.confirmarSenha}
                      onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['confirmarSenha'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['confirmarSenha'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['confirmarSenha']}</p>}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Próxima Etapa
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Responsável */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Responsável pela Conta</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome Completo*
                    </label>
                    <input
                      type="text"
                      value={formData.responsavel.nome}
                      onChange={(e) => handleInputChange('responsavel.nome', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['responsavel.nome'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['responsavel.nome'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['responsavel.nome']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={formData.responsavel.cargo}
                      onChange={(e) => handleInputChange('responsavel.cargo', e.target.value)}
                      placeholder="Ex: Gerente de RH, CEO, Diretor"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={formData.responsavel.telefone}
                      onChange={(e) => handleInputChange('responsavel.telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      E-mail do Responsável
                    </label>
                    <input
                      type="email"
                      value={formData.responsavel.email}
                      onChange={(e) => handleInputChange('responsavel.email', e.target.value)}
                      placeholder="Se diferente do e-mail corporativo"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      LinkedIn do Responsável
                    </label>
                    <input
                      type="url"
                      value={formData.responsavel.linkedin}
                      onChange={(e) => handleInputChange('responsavel.linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/nome"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Etapa Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Próxima Etapa
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Cultura */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Cultura e Valores</h2>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Missão
                    </label>
                    <textarea
                      value={formData.empresa.missao}
                      onChange={(e) => handleInputChange('empresa.missao', e.target.value)}
                      rows={3}
                      placeholder="Qual é o propósito da empresa?"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Visão
                    </label>
                    <textarea
                      value={formData.empresa.visao}
                      onChange={(e) => handleInputChange('empresa.visao', e.target.value)}
                      rows={3}
                      placeholder="Onde a empresa quer chegar?"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Valores
                    </label>
                    <textarea
                      value={formData.empresa.valores}
                      onChange={(e) => handleInputChange('empresa.valores', e.target.value)}
                      rows={3}
                      placeholder="Quais são os valores que guiam a empresa?"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ambiente de Trabalho
                    </label>
                    <textarea
                      value={formData.cultura.ambiente}
                      onChange={(e) => handleInputChange('cultura.ambiente', e.target.value)}
                      rows={3}
                      placeholder="Descreva o ambiente de trabalho na empresa..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Etapa Anterior
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Já tem uma conta?{' '}
            <Link href="/empresa/login" className="font-medium text-blue-600 hover:text-blue-500">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 