'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [userType, setUserType] = useState<'candidato' | 'empresa' | null>(null);
  const [email, setEmail] = useState('');
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const checkEmail = async () => {
    if (!email || !userType) return;
    
    // Simular verificação de email (aqui você faria a chamada real para API)
    setEmailChecked(true);
    // Simular que email não existe para mostrar formulário
    setEmailExists(false);
    setShowForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria o cadastro real
    console.log('Cadastro:', { userType, email, ...formData });
    // Redirecionar para dashboard apropriado
    window.location.href = `/${userType}/dashboard`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Header Tech */}
      <header className="backdrop-blur-xl bg-black/80 border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] rounded-sm flex items-center justify-center">
                <span className="text-black font-bold text-xl">L</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                Leão Careers
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#sobre" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">
                Sobre
              </Link>
              <Link href="#como-funciona" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">
                Como Funciona
              </Link>
              <Link href="#depoimentos" className="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm font-medium">
                Depoimentos
              </Link>
              <div className="flex items-center space-x-3">
                <Link
                  href="/candidato/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-[#D4AF37] transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  href="/candidato/cadastro"
                  className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black text-sm font-semibold rounded-sm hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all"
                >
                  Começar Agora
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

      {/* Hero Section Tech */}
      <main className="relative overflow-hidden">
        {/* Background Tech Pattern */}
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
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-sm bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                  <span className="text-[#D4AF37] text-sm font-medium uppercase tracking-wider">Conectando Talentos Globalmente</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-black leading-tight">
                  Sua Carreira
                  <span className="block bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] bg-clip-text text-transparent">
                    Internacional
                  </span>
                  Começa Aqui
                </h1>
                
                <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                  Plataforma tech que conecta profissionais brasileiros às melhores oportunidades no exterior. 
                  Suporte completo em imigração e networking global.
                </p>
              </div>

              {/* Stats Tech */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="border border-gray-800 bg-gray-900/50 p-4 rounded-sm">
                  <div className="text-3xl font-bold text-[#D4AF37]">6K+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Profissionais</div>
                </div>
                <div className="border border-gray-800 bg-gray-900/50 p-4 rounded-sm">
                  <div className="text-3xl font-bold text-[#D4AF37]">1.5K+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Empresas</div>
                </div>
                <div className="border border-gray-800 bg-gray-900/50 p-4 rounded-sm">
                  <div className="text-3xl font-bold text-[#D4AF37]">50+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Países</div>
                </div>
              </div>
            </div>

            {/* Formulário Tech */}
            <div className="relative lg:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-xl rounded-sm border border-gray-700/50 p-8 shadow-2xl shadow-[#D4AF37]/10">
                <div className="h-full flex flex-col">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">Acesso Direto</h3>
                    <p className="text-gray-400 text-sm">Entre ou cadastre-se em segundos</p>
                  </div>

                  {/* Formulário Principal */}
                  <div className="space-y-6">
                    {/* Seleção de Tipo - Sempre Visível */}
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-300 uppercase tracking-wider">Tipo de Acesso</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setUserType('candidato')}
                          className={`p-4 border rounded-sm transition-all text-left ${
                            userType === 'candidato'
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                              : 'border-gray-700 hover:border-gray-600 text-gray-300'
                          }`}
                        >
                          <div className="font-semibold">Candidato</div>
                          <div className="text-xs text-gray-500">Busco oportunidades</div>
                        </button>
                        <button
                          onClick={() => setUserType('empresa')}
                          className={`p-4 border rounded-sm transition-all text-left ${
                            userType === 'empresa'
                              ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                              : 'border-gray-700 hover:border-gray-600 text-gray-300'
                          }`}
                        >
                          <div className="font-semibold">Empresa</div>
                          <div className="text-xs text-gray-500">Busco talentos</div>
                        </button>
                      </div>
                    </div>

                    {/* Campo Email - Sempre Visível */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>

                    {/* Botão Principal */}
                    {!showForm && (
                      <button
                        onClick={checkEmail}
                        disabled={!email || !userType}
                        className="w-full px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
                      >
                        Continuar
                      </button>
                    )}

                    {/* Formulário Completo */}
                    {showForm && (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">
                            {userType === 'candidato' ? 'Nome Completo' : 'Nome da Empresa'}
                          </label>
                          <input
                            type="text"
                            value={formData.nome}
                            onChange={(e) => setFormData({...formData, nome: e.target.value})}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder={userType === 'candidato' ? 'João Silva' : 'Empresa LTDA'}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Telefone</label>
                          <input
                            type="tel"
                            value={formData.telefone}
                            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder="+55 11 99999-9999"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-300 uppercase tracking-wider">Senha</label>
                          <input
                            type="password"
                            value={formData.senha}
                            onChange={(e) => setFormData({...formData, senha: e.target.value})}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder="Mínimo 8 caracteres"
                            required
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-lg hover:shadow-[#D4AF37]/25 transition-all uppercase tracking-wider text-sm"
                        >
                          Criar Conta
                        </button>
                      </form>
                    )}

                    {/* Login Links */}
                    <div className="pt-6 border-t border-gray-700/50">
                      <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Já tem conta?</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Link
                          href="/candidato/login"
                          className="px-4 py-2 border border-gray-700 rounded-sm text-sm font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center uppercase tracking-wider"
                        >
                          Login Candidato
                        </Link>
                        <Link
                          href="/empresa/login"
                          className="px-4 py-2 border border-gray-700 rounded-sm text-sm font-medium hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all text-center uppercase tracking-wider"
                        >
                          Login Empresa
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Como Funciona Section Tech */}
      <section id="como-funciona" className="py-24 bg-black/60 backdrop-blur-sm border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Processo tech simples e eficiente para conectar você às melhores oportunidades
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Crie seu Perfil",
                description: "Complete seu perfil profissional com suas habilidades e experiências"
              },
              {
                step: "02", 
                title: "Análise IA",
                description: "Nossa IA analisa seu perfil e encontra as melhores oportunidades"
              },
              {
                step: "03",
                title: "Conexão Global",
                description: "Conectamos você diretamente com empresas interessadas"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform border border-gray-800 bg-gray-900/30 p-8 rounded-sm">
                <div className="w-16 h-16 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] rounded-sm mx-auto mb-6 flex items-center justify-center text-black font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#D4AF37]">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos Section Tech */}
      <section id="depoimentos" className="py-24 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Histórias de Sucesso</h2>
            <p className="text-xl text-gray-400">Profissionais que transformaram suas carreiras</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ana Silva",
                role: "Desenvolvedora Senior",
                company: "Google Dublin",
                content: "Em 6 meses consegui uma posição incrível em Dublin. O suporte foi fundamental!"
              },
              {
                name: "Carlos Santos",
                role: "Product Manager", 
                company: "Microsoft Amsterdam",
                content: "Processo muito profissional. Hoje estou vivendo meu sonho na Europa."
              },
              {
                name: "Maria Costa",
                role: "UX Designer",
                company: "Spotify Stockholm",
                content: "Plataforma incrível! Consegui minha vaga dos sonhos na Suécia."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-sm p-6 border border-gray-700/50 hover:border-[#D4AF37]/30 transition-all">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] rounded-sm"></div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-[#D4AF37]">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Tech */}
      <section className="py-24 bg-gradient-to-r from-[#D4AF37]/10 to-black border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Decolar sua Carreira?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Junte-se a milhares de profissionais que já transformaram suas vidas
          </p>
          <Link
            href="/candidato/cadastro"
            className="inline-block px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F4E7A1] text-black font-semibold rounded-sm hover:shadow-2xl hover:shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-105 uppercase tracking-wider"
          >
            Começar Minha Jornada
          </Link>
        </div>
      </section>

      {/* Footer Tech */}
      <footer className="bg-black border-t border-gray-800 py-16">
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
              <h3 className="font-semibold mb-4 text-[#D4AF37] uppercase tracking-wider">Para Candidatos</h3>
              <div className="space-y-3 text-gray-400">
                <div><Link href="/candidato/cadastro" className="hover:text-[#D4AF37] transition-colors">Criar Conta</Link></div>
                <div><Link href="/candidato/login" className="hover:text-[#D4AF37] transition-colors">Fazer Login</Link></div>
                <div><Link href="/vagas" className="hover:text-[#D4AF37] transition-colors">Buscar Vagas</Link></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-[#D4AF37] uppercase tracking-wider">Para Empresas</h3>
              <div className="space-y-3 text-gray-400">
                <div><Link href="/empresa/cadastro" className="hover:text-[#D4AF37] transition-colors">Cadastrar Empresa</Link></div>
                <div><Link href="/empresa/login" className="hover:text-[#D4AF37] transition-colors">Portal Empresas</Link></div>
                <div><Link href="/talentos" className="hover:text-[#D4AF37] transition-colors">Buscar Talentos</Link></div>
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