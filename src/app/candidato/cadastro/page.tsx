'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiClient } from '@/lib/api/client';

export default function CadastroCandidatoPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Estado do formulário estruturado conforme API
  const [formData, setFormData] = useState({
    // Dados Pessoais
    dadosPessoais: {
      nomeCompleto: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      genero: '',
      estadoCivil: '',
      nacionalidade: 'Brasileira'
    },
    // Contato
    contato: {
      email: '',
      telefone: '',
      whatsapp: '',
      linkedin: '',
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
    // Experiência Profissional
    experiencia: [
      {
        empresa: '',
        cargo: '',
        dataInicio: '',
        dataFim: '',
        atualEmprego: false,
        descricao: '',
        salario: 0,
        area: ''
      }
    ],
    // Formação
    formacao: [
      {
        instituicao: '',
        curso: '',
        nivel: 'superior',
        dataInicio: '',
        dataConclusao: '',
        status: 'concluido',
        area: ''
      }
    ],
    // Competências
    competencias: {
      tecnicas: [],
      comportamentais: [],
      idiomas: [
        {
          idioma: 'Inglês',
          nivel: 'basico',
          certificacao: ''
        }
      ]
    },
    // Preferências
    preferencias: {
      salario: {
        minimo: 0,
        maximo: 0,
        negociavel: true
      },
      localizacao: {
        cidade: '',
        estado: '',
        pais: 'Brasil',
        dispostoMudar: false
      },
      modalidade: ['presencial'],
      disponibilidade: 'imediato',
      areas: [],
      contratos: ['clt']
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

  const handleArrayRemove = (path: string, index: number) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]].splice(index, 1);
      return newData;
    });
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      // Validação Dados Pessoais
      if (!formData.dadosPessoais.nomeCompleto) 
        newErrors['dadosPessoais.nomeCompleto'] = 'Nome completo é obrigatório';
      if (!formData.contato.email) 
        newErrors['contato.email'] = 'E-mail é obrigatório';
      if (!formData.contato.telefone) 
        newErrors['contato.telefone'] = 'Telefone é obrigatório';
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
      const response = await apiClient.cadastrarCandidato(formData);
      
      if (response.sucesso) {
        alert(response.mensagem);
        router.push('/candidato/login?message=cadastro_sucesso');
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
          <h1 className="text-3xl font-bold text-gray-900">Cadastro de Candidato</h1>
          <p className="mt-2 text-gray-600">Preencha suas informações para acessar oportunidades internacionais</p>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Progress Bar */}
          <div className="px-4 py-5 bg-blue-600 sm:px-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
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
                     step === 2 ? 'Experiência' : 
                     step === 3 ? 'Formação' : 'Preferências'}
                  </div>
                  {step < 4 && <div className="ml-4 h-0.5 w-12 bg-blue-500"></div>}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Step 1: Dados Básicos */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Dados Pessoais</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Nome Completo*
                    </label>
                    <input
                      type="text"
                      value={formData.dadosPessoais.nomeCompleto}
                      onChange={(e) => handleInputChange('dadosPessoais.nomeCompleto', e.target.value)}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['dadosPessoais.nomeCompleto'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['dadosPessoais.nomeCompleto'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['dadosPessoais.nomeCompleto']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CPF
                    </label>
                    <input
                      type="text"
                      value={formData.dadosPessoais.cpf}
                      onChange={(e) => handleInputChange('dadosPessoais.cpf', e.target.value)}
                      placeholder="000.000.000-00"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      E-mail*
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
                      Telefone*
                    </label>
                    <input
                      type="tel"
                      value={formData.contato.telefone}
                      onChange={(e) => handleInputChange('contato.telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                        errors['contato.telefone'] ? 'border-red-500' : ''
                      }`}
                    />
                    {errors['contato.telefone'] && 
                      <p className="mt-1 text-sm text-red-600">{errors['contato.telefone']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={formData.contato.linkedin}
                      onChange={(e) => handleInputChange('contato.linkedin', e.target.value)}
                      placeholder="https://linkedin.com/in/seu-perfil"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      value={formData.dadosPessoais.dataNascimento}
                      onChange={(e) => handleInputChange('dadosPessoais.dataNascimento', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gênero
                    </label>
                    <select
                      value={formData.dadosPessoais.genero}
                      onChange={(e) => handleInputChange('dadosPessoais.genero', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="masculino">Masculino</option>
                      <option value="feminino">Feminino</option>
                      <option value="outro">Outro</option>
                      <option value="nao_informar">Prefiro não informar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Estado Civil
                    </label>
                    <select
                      value={formData.dadosPessoais.estadoCivil}
                      onChange={(e) => handleInputChange('dadosPessoais.estadoCivil', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Selecione...</option>
                      <option value="solteiro">Solteiro(a)</option>
                      <option value="casado">Casado(a)</option>
                      <option value="divorciado">Divorciado(a)</option>
                      <option value="viuvo">Viúvo(a)</option>
                      <option value="uniao_estavel">União Estável</option>
                    </select>
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

            {/* Step 2: Experiência */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Experiência Profissional</h2>
                  <button
                    type="button"
                    onClick={() => handleArrayAdd('experiencia', {
                      empresa: '', cargo: '', dataInicio: '', dataFim: '', 
                      atualEmprego: false, descricao: '', salario: 0, area: ''
                    })}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    + Adicionar Experiência
                  </button>
                </div>

                {formData.experiencia.map((exp, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-md font-medium text-gray-800">Experiência {index + 1}</h3>
                      {formData.experiencia.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('experiencia', index)}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Remover
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Empresa
                        </label>
                        <input
                          type="text"
                          value={exp.empresa}
                          onChange={(e) => {
                            const newExp = [...formData.experiencia];
                            newExp[index].empresa = e.target.value;
                            handleInputChange('experiencia', newExp);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cargo
                        </label>
                        <input
                          type="text"
                          value={exp.cargo}
                          onChange={(e) => {
                            const newExp = [...formData.experiencia];
                            newExp[index].cargo = e.target.value;
                            handleInputChange('experiencia', newExp);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Data de Início
                        </label>
                        <input
                          type="date"
                          value={exp.dataInicio}
                          onChange={(e) => {
                            const newExp = [...formData.experiencia];
                            newExp[index].dataInicio = e.target.value;
                            handleInputChange('experiencia', newExp);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Data de Fim
                        </label>
                        <input
                          type="date"
                          value={exp.dataFim}
                          onChange={(e) => {
                            const newExp = [...formData.experiencia];
                            newExp[index].dataFim = e.target.value;
                            handleInputChange('experiencia', newExp);
                          }}
                          disabled={exp.atualEmprego}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-100"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={exp.atualEmprego}
                            onChange={(e) => {
                              const newExp = [...formData.experiencia];
                              newExp[index].atualEmprego = e.target.checked;
                              if (e.target.checked) {
                                newExp[index].dataFim = '';
                              }
                              handleInputChange('experiencia', newExp);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Emprego atual</span>
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Descrição das Atividades
                        </label>
                        <textarea
                          value={exp.descricao}
                          onChange={(e) => {
                            const newExp = [...formData.experiencia];
                            newExp[index].descricao = e.target.value;
                            handleInputChange('experiencia', newExp);
                          }}
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

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

            {/* Step 3: Formação */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">Formação Acadêmica</h2>
                  <button
                    type="button"
                    onClick={() => handleArrayAdd('formacao', {
                      instituicao: '', curso: '', nivel: 'superior', 
                      dataInicio: '', dataConclusao: '', status: 'concluido', area: ''
                    })}
                    className="text-sm text-blue-600 hover:text-blue-500"
                  >
                    + Adicionar Formação
                  </button>
                </div>

                {formData.formacao.map((form, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-md font-medium text-gray-800">Formação {index + 1}</h3>
                      {formData.formacao.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleArrayRemove('formacao', index)}
                          className="text-sm text-red-600 hover:text-red-500"
                        >
                          Remover
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Instituição
                        </label>
                        <input
                          type="text"
                          value={form.instituicao}
                          onChange={(e) => {
                            const newForm = [...formData.formacao];
                            newForm[index].instituicao = e.target.value;
                            handleInputChange('formacao', newForm);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Curso
                        </label>
                        <input
                          type="text"
                          value={form.curso}
                          onChange={(e) => {
                            const newForm = [...formData.formacao];
                            newForm[index].curso = e.target.value;
                            handleInputChange('formacao', newForm);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nível
                        </label>
                        <select
                          value={form.nivel}
                          onChange={(e) => {
                            const newForm = [...formData.formacao];
                            newForm[index].nivel = e.target.value;
                            handleInputChange('formacao', newForm);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="tecnico">Técnico</option>
                          <option value="tecnologo">Tecnólogo</option>
                          <option value="superior">Superior</option>
                          <option value="pos_graduacao">Pós-graduação</option>
                          <option value="mestrado">Mestrado</option>
                          <option value="doutorado">Doutorado</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Status
                        </label>
                        <select
                          value={form.status}
                          onChange={(e) => {
                            const newForm = [...formData.formacao];
                            newForm[index].status = e.target.value;
                            handleInputChange('formacao', newForm);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="concluido">Concluído</option>
                          <option value="cursando">Cursando</option>
                          <option value="interrompido">Interrompido</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                <h3 className="text-md font-medium text-gray-900 mt-8 mb-4">Idiomas</h3>
                
                {formData.competencias.idiomas.map((idioma, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Idioma
                        </label>
                        <input
                          type="text"
                          value={idioma.idioma}
                          onChange={(e) => {
                            const newIdiomas = [...formData.competencias.idiomas];
                            newIdiomas[index].idioma = e.target.value;
                            handleInputChange('competencias.idiomas', newIdiomas);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Nível
                        </label>
                        <select
                          value={idioma.nivel}
                          onChange={(e) => {
                            const newIdiomas = [...formData.competencias.idiomas];
                            newIdiomas[index].nivel = e.target.value;
                            handleInputChange('competencias.idiomas', newIdiomas);
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                          <option value="basico">Básico</option>
                          <option value="intermediario">Intermediário</option>
                          <option value="avancado">Avançado</option>
                          <option value="fluente">Fluente</option>
                          <option value="nativo">Nativo</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Certificação
                        </label>
                        <input
                          type="text"
                          value={idioma.certificacao}
                          onChange={(e) => {
                            const newIdiomas = [...formData.competencias.idiomas];
                            newIdiomas[index].certificacao = e.target.value;
                            handleInputChange('competencias.idiomas', newIdiomas);
                          }}
                          placeholder="Ex: TOEFL, IELTS"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}

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

            {/* Step 4: Preferências */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-lg font-medium text-gray-900">Preferências Profissionais</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pretensão Salarial Mínima (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.preferencias.salario.minimo}
                      onChange={(e) => handleInputChange('preferencias.salario.minimo', parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pretensão Salarial Máxima (USD)
                    </label>
                    <input
                      type="number"
                      value={formData.preferencias.salario.maximo}
                      onChange={(e) => handleInputChange('preferencias.salario.maximo', parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Disponibilidade para Mudança
                    </label>
                    <select
                      value={formData.preferencias.disponibilidade}
                      onChange={(e) => handleInputChange('preferencias.disponibilidade', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="imediato">Imediato</option>
                      <option value="30_dias">Em 30 dias</option>
                      <option value="60_dias">Em 60 dias</option>
                      <option value="90_dias">Em 90 dias</option>
                      <option value="negociavel">Negociável</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferencias.localizacao.dispostoMudar}
                        onChange={(e) => handleInputChange('preferencias.localizacao.dispostoMudar', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Disposto a se mudar para outros países</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.preferencias.salario.negociavel}
                        onChange={(e) => handleInputChange('preferencias.salario.negociavel', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Salário negociável</span>
                    </label>
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
            <Link href="/candidato/login" className="font-medium text-blue-600 hover:text-blue-500">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 