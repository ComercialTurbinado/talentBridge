'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BeneficiosCandidato() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
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
      router.push('/candidato/dashboard');
    }, 1000);
  };

  // Lista de benefícios com ícones e descrições
  const beneficios = [
    {
      id: 1,
      icone: '🌎',
      titulo: 'Acesso a Oportunidades Internacionais',
      descricao: 'Vagas exclusivas em mais de 50 países com salários e benefícios superiores ao mercado brasileiro.'
    },
    {
      id: 2,
      icone: '🛂',
      titulo: 'Suporte em Imigração',
      descricao: 'Orientação completa em documentação, vistos de trabalho e todo o processo de relocalização internacional.'
    },
    {
      id: 3,
      icone: '🤖',
      titulo: 'Matchmaking por IA',
      descricao: 'Nossa inteligência artificial analisa seu perfil e encontra as melhores compatibilidades com vagas globais.'
    },
    {
      id: 4,
      icone: '👔',
      titulo: 'Intermediação Profissional',
      descricao: 'Recrutadores especializados apresentam seu perfil de forma qualificada às empresas internacionais.'
    },
    {
      id: 5,
      icone: '🎯',
      titulo: 'Preparação para Processos Seletivos',
      descricao: 'Orientação para entrevistas internacionais e dicas culturais sobre o mercado de trabalho no exterior.'
    },
    {
      id: 6,
      icone: '✈️',
      titulo: 'Acompanhamento Pós-Contratação',
      descricao: 'Suporte na adaptação ao novo país, auxílio com moradia, bancos e networking local.'
    },
    {
      id: 7,
      icone: '👁️',
      titulo: 'Visibilidade para Recrutadores Globais',
      descricao: 'Seu perfil ganha destaque para empresas internacionais de primeira linha em mercados competitivos.'
    },
    {
      id: 8,
      icone: '📱',
      titulo: 'Plataforma Tech de Fácil Uso',
      descricao: 'Interface intuitiva com acesso via desktop e mobile, e notificações em tempo real sobre oportunidades.'
    },
    {
      id: 9,
      icone: '📊',
      titulo: 'Consultoria de Carreira Internacional',
      descricao: 'Análise do seu potencial em diferentes países e orientação sobre qualificações necessárias.'
    },
    {
      id: 10,
      icone: '🔒',
      titulo: 'Confidencialidade e Segurança',
      descricao: 'Proteção de dados conforme LGPD e GDPR, com controle total sobre quem vê seu perfil.'
    },
  ];

  // Depoimentos de sucesso
  const depoimentos = [
    {
      id: 1,
      nome: 'Ana Silva',
      cargo: 'Desenvolvedora Senior',
      empresa: 'Google Dublin',
      foto: '/images/profile-1.jpg',
      texto: 'Em apenas 6 meses consegui uma posição incrível em Dublin. O suporte da Leão Careers foi fundamental para navegar todo o processo de imigração e adaptação.'
    },
    {
      id: 2,
      nome: 'Carlos Santos',
      cargo: 'Product Manager',
      empresa: 'Microsoft Amsterdam',
      foto: '/images/profile-2.jpg',
      texto: 'Nunca imaginei que poderia trabalhar em Amsterdam. A equipe da Leão me preparou para as entrevistas e cuidou de toda a burocracia. Hoje estou vivendo meu sonho!'
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
                  href="/candidato/login"
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
              <span className="text-[#D4AF37] text-sm font-medium uppercase tracking-wider">Exclusivo para Candidatos</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black mb-6">
              <span className="block">Por que escolher a</span>
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                Leão Careers
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10">
              Transforme sua carreira e conquiste oportunidades internacionais com nossa plataforma exclusiva.
              Descubra todos os benefícios de fazer parte do nosso time de talentos globais.
            </p>
            
            <a 
              href="#cadastro" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-2xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
            >
              Quero me Cadastrar
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
                10 Benefícios Exclusivos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Vantagens que apenas os candidatos da Leão Careers desfrutam em sua jornada internacional
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
            <h2 className="text-4xl font-bold mb-4">Histórias de Sucesso</h2>
            <p className="text-xl text-gray-400">Profissionais que transformaram suas carreiras com a Leão Careers</p>
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
                  Comece Sua Jornada Internacional
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Preencha o formulário ao lado para criar sua conta gratuitamente e dar o primeiro passo rumo à sua carreira global.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center text-[#D4AF37] text-xl">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Crie seu perfil</h3>
                    <p className="text-gray-400">Cadastre-se gratuitamente e complete seu perfil profissional</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center text-[#D4AF37] text-xl">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Seja avaliado por nossa IA</h3>
                    <p className="text-gray-400">Nossa tecnologia analisará seu perfil e experiências</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-sm flex items-center justify-center text-[#D4AF37] text-xl">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Receba oportunidades exclusivas</h3>
                    <p className="text-gray-400">Conectamos você com empresas internacionais alinhadas ao seu perfil</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 p-6 bg-gray-900/30 border border-gray-800 rounded-sm">
                <div className="flex items-center space-x-4 text-[#D4AF37]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-medium">Não se preocupe com custos. O cadastro e avaliação inicial são totalmente gratuitos.</p>
                </div>
              </div>
            </div>
            
            {/* Formulário de Cadastro */}
            <div className="bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl rounded-sm border border-gray-700/50 p-8 shadow-2xl shadow-[#D4AF37]/10">
              <h3 className="text-2xl font-bold mb-6">Crie sua conta</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Nome Completo</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                    placeholder="seu@email.com"
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
                    placeholder="+55 (11) 99999-9999"
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
                  Criar Minha Conta
                </button>
                
                <p className="text-center text-gray-400 text-sm">
                  Já tem uma conta? <Link href="/candidato/login" className="text-[#D4AF37] hover:underline">Fazer login</Link>
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
            Pronto para Transformar sua Carreira?
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Junte-se a milhares de profissionais brasileiros que já estão construindo carreiras internacionais de sucesso.
          </p>
          <a
            href="#cadastro"
            className="inline-block px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-2xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            Cadastre-se Gratuitamente
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
                Conectando talentos brasileiros às melhores oportunidades internacionais.
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
                <div>contato@leaocareers.com</div>
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