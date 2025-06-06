'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BeneficiosEmpresa() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    email: '',
    telefone: '',
    senha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do cadastro:', formData);
    // Simulação de cadastro bem-sucedido
    setTimeout(() => {
      router.push('/empresa/dashboard');
    }, 1000);
  };

  // Lista de benefícios para empresas
  const beneficios = [
    {
      id: 1,
      icone: '🌍',
      titulo: 'Acesso a Talentos Brasileiros Qualificados',
      descricao: 'Conecte-se com os melhores profissionais brasileiros pré-selecionados e prontos para desafios internacionais.'
    },
    {
      id: 2,
      icone: '🔍',
      titulo: 'Recrutamento Especializado',
      descricao: 'Nossa equipe cuida de todo o processo de triagem, avaliação e seleção, economizando tempo e recursos da sua empresa.'
    },
    {
      id: 3,
      icone: '🤖',
      titulo: 'Matchmaking por IA',
      descricao: 'Tecnologia avançada para encontrar os candidatos mais compatíveis com as necessidades específicas da sua empresa.'
    },
    {
      id: 4,
      icone: '📋',
      titulo: 'Processo de Imigração Simplificado',
      descricao: 'Suporte completo em documentação e vistos de trabalho, facilitando a contratação internacional.'
    },
    {
      id: 5,
      icone: '💼',
      titulo: 'Candidatos Prontos para Relocação',
      descricao: 'Acesso a profissionais já preparados e dispostos a se mudar para o exterior, reduzindo desistências.'
    },
    {
      id: 6,
      icone: '🚀',
      titulo: 'Agilidade na Contratação',
      descricao: 'Processos otimizados que reduzem o tempo médio de contratação em até 60% comparado a métodos tradicionais.'
    },
    {
      id: 7,
      icone: '🌐',
      titulo: 'Diversidade Cultural',
      descricao: 'Enriqueça seu time com profissionais que trazem novas perspectivas e abordagens inovadoras.'
    },
    {
      id: 8,
      icone: '💰',
      titulo: 'Custos Reduzidos de Recrutamento',
      descricao: 'Economize em processos seletivos longos e ineficientes, focando apenas em candidatos já qualificados.'
    },
    {
      id: 9,
      icone: '🔄',
      titulo: 'Suporte Pós-Contratação',
      descricao: 'Acompanhamento durante o período de adaptação do profissional, garantindo uma transição suave.'
    },
    {
      id: 10,
      icone: '⚡',
      titulo: 'Plataforma Tecnológica Exclusiva',
      descricao: 'Dashboard intuitivo para gerenciamento de vagas, candidatos e processos seletivos em um só lugar.'
    },
  ];

  // Depoimentos de empresas
  const depoimentos = [
    {
      id: 1,
      nome: 'Mohammed Al Fahim',
      cargo: 'Head of HR',
      empresa: 'Dubai Tech Innovations',
      texto: 'A Leão Careers revolucionou nossa forma de recrutar talentos brasileiros. O processo é eficiente e os profissionais que contratamos superaram nossas expectativas.'
    },
    {
      id: 2,
      nome: 'Sophia Schmidt',
      cargo: 'Tech Recruiter',
      empresa: 'Berlin Digital Solutions',
      texto: 'Conseguimos preencher posições que estavam abertas há meses com profissionais brasileiros extremamente qualificados. O suporte da equipe em todo o processo de imigração foi fundamental.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header */}
      <header className="backdrop-blur-xl bg-black/80 border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] rounded-sm flex items-center justify-center">
                    <span className="text-black font-bold text-xl">L</span>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                    Leão Careers
                  </h1>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#beneficios" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">
                Benefícios
              </a>
              <a href="#depoimentos" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">
                Depoimentos
              </a>
              <a href="#cadastro" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">
                Cadastro
              </a>
              <div className="flex items-center space-x-3">
                <Link
                  href="/empresa/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Entrar
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-300 hover:text-[#D4AF37]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/90">
          {/* Imagem de Dubai com overlay */}
          <div 
            className="absolute inset-0 opacity-20" 
            style={{
              backgroundImage: `url('/images/dubai-skyline-Grande.jpeg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(1.1) brightness(0.7)',
              mixBlendMode: 'luminosity'
            }}
          ></div>
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4AF37_1px,transparent_1px),linear-gradient(to_bottom,#D4AF37_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03] z-10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
              <span className="text-[#D4AF37] text-sm font-medium uppercase tracking-wider">Para Empresas Internacionais</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="block">Transforme seu</span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                Recrutamento Global
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10">
              Acesse os melhores talentos brasileiros pré-selecionados e qualificados para alavancar os resultados da sua empresa no cenário internacional.
            </p>
            
            <a 
              href="#cadastro" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-2xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
            >
              Cadastrar Empresa
            </a>
          </div>
        </div>
      </section>

      {/* Benefícios Grid */}
      <section id="beneficios" className="py-24 bg-black/60 backdrop-blur-sm border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                10 Vantagens Exclusivas
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Por que empresas globais escolhem a Leão Careers para suas contratações internacionais
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beneficios.map((beneficio) => (
              <div 
                key={beneficio.id} 
                className="bg-gray-900/30 border border-gray-800 p-6 rounded-sm hover:border-[#D4AF37]/30 transition-all hover:transform hover:scale-105"
              >
                <div className="text-3xl mb-4">{beneficio.icone}</div>
                <h3 className="text-xl font-semibold mb-3 text-[#D4AF37]">{beneficio.titulo}</h3>
                <p className="text-gray-400">{beneficio.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-24 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Empresas de Sucesso</h2>
            <p className="text-xl text-gray-400">Organizações que transformaram seu recrutamento com a Leão Careers</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {depoimentos.map((depoimento) => (
              <div key={depoimento.id} className="bg-gray-900/50 backdrop-blur-sm rounded-sm p-8 border border-gray-700/50 hover:border-[#D4AF37]/30 transition-all">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] rounded-sm"></div>
                  <div>
                    <div className="font-semibold text-white text-lg">{depoimento.nome}</div>
                    <div className="text-sm text-gray-400">{depoimento.cargo}</div>
                    <div className="text-sm text-[#D4AF37]">{depoimento.empresa}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">&ldquo;{depoimento.texto}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cadastro Section */}
      <section id="cadastro" className="py-24 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                  Acesse os Melhores Talentos Brasileiros
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Cadastre sua empresa e tenha acesso imediato a um pool de profissionais qualificados e prontos para desafios internacionais.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center text-[#D4AF37] text-xl">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Cadastre sua empresa</h3>
                    <p className="text-gray-400">Processo rápido e simples para começar a acessar talentos</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center text-[#D4AF37] text-xl">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Publique suas vagas</h3>
                    <p className="text-gray-400">Descreva as oportunidades e requisitos para encontrar os melhores candidatos</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center text-[#D4AF37] text-xl">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Receba candidatos selecionados</h3>
                    <p className="text-gray-400">Nossa equipe filtra e encaminha apenas os profissionais mais qualificados</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-gray-900/30 border border-gray-800 rounded-sm">
                <div className="flex items-center space-x-4 text-[#D4AF37]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium">O cadastro é gratuito. Você só paga quando contratar um profissional.</p>
                </div>
              </div>
            </div>
            
            {/* Formulário de Cadastro */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl rounded-sm border border-gray-700/50 p-8 shadow-2xl shadow-[#D4AF37]/10">
              <h3 className="text-2xl font-bold mb-6">Cadastre sua Empresa</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Nome da Empresa</label>
                  <input
                    type="text"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                    placeholder="Dubai Tech Innovations"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Email Corporativo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                    placeholder="hr@empresa.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Telefone</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                    placeholder="+971 4 123 4567"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                  />
                </div>
                
                <div className="flex items-start space-x-3 mt-4">
                  <input
                    type="checkbox"
                    id="termos"
                    className="mt-1 focus:ring-[#D4AF37]"
                    required
                  />
                  <label htmlFor="termos" className="text-sm text-gray-400">
                    Concordo com os <a href="#" className="text-[#D4AF37] hover:underline">Termos de Uso</a> e <a href="#" className="text-[#D4AF37] hover:underline">Política de Privacidade</a>
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all uppercase tracking-wider text-sm"
                >
                  Cadastrar Empresa
                </button>
                
                <p className="text-center text-gray-400 text-sm">
                  Já tem uma conta? <Link href="/empresa/login" className="text-[#D4AF37] hover:underline">Fazer login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37]/10 to-black">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para Revolucionar seu Recrutamento?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Junte-se a empresas globais que já estão contratando os melhores talentos brasileiros com eficiência e segurança.
          </p>
          <a
            href="#cadastro"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-2xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            Começar Agora
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] rounded-sm flex items-center justify-center">
                  <span className="text-black font-bold">L</span>
                </div>
                <span className="text-xl font-bold">Leão Careers</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Conectando empresas globais aos melhores talentos brasileiros com eficiência e qualidade.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-[#D4AF37] uppercase tracking-wider">Links Rápidos</h3>
              <div className="space-y-3 text-gray-400">
                <div><a href="#beneficios" className="hover:text-[#D4AF37] transition-colors">Benefícios</a></div>
                <div><a href="#depoimentos" className="hover:text-[#D4AF37] transition-colors">Depoimentos</a></div>
                <div><a href="#cadastro" className="hover:text-[#D4AF37] transition-colors">Cadastro</a></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-[#D4AF37] uppercase tracking-wider">Contato</h3>
              <div className="space-y-3 text-gray-400">
                <div>empresas@leaocareers.com</div>
                <div>+55 (11) 3456-7890</div>
                <div>São Paulo, Brasil</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Leão Careers. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 