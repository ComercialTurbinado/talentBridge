'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { 
  Crown, 
  ArrowRight, 
  Users, 
  Building2, 
  CheckCircle, 
  Star, 
  Globe, 
  Briefcase,
  Target,
  TrendingUp,
  Award,
  Shield,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Calendar,
  Clock,
  ChevronRight,
  Play,
  Quote
} from 'lucide-react';
import styles from './page.module.css';
import Image from 'next/image';

export default function HomePage() {
  const [userType, setUserType] = useState<'candidato' | 'empresa' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    experience: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simular cadastro inicial na base
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirecionar para página de pagamento
      if (userType === 'candidato') {
        window.location.href = '/candidato/pagamento';
      } else if (userType === 'empresa') {
        window.location.href = '/empresa/pagamento';
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('Erro ao processar cadastro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.homePage}>
      <Header transparent />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOverlay}></div>
          <div className={styles.gridPattern}></div>
        </div>
        
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className="heading-1 fade-in">
                Conectamos <span className="text-gold">Talentos</span> a 
                <br />Oportunidades <span className="text-gold">Internacionais</span>
              </h1>
              <p className={`${styles.heroDescription} slide-up`}>
                A Leao Talent Bridge é a ponte entre profissionais brasileiros e as melhores 
                oportunidades de trabalho em Dubai e Emirados Árabes Unidos. 
                Especializamos em conectar talentos excepcionais com empresas que valorizam a excelência.
              </p>
              
              <div className={`${styles.heroStats} scale-in`}>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>500+</div>
                  <div className={styles.statLabel}>Profissionais Conectados</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>150+</div>
                  <div className={styles.statLabel}>Empresas Parceiras</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statNumber}>95%</div>
                  <div className={styles.statLabel}>Taxa de Sucesso</div>
                </div>
              </div>
            </div>

            {/* Formulário de Acesso Rápido */}
            <div className={`${styles.accessForm} slide-up`}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Comece Sua Jornada</h3>
                  <p className="card-description">
                    Selecione seu perfil e dê o primeiro passo rumo ao sucesso internacional
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Seleção de Tipo de Usuário */}
                  <div className={styles.userTypeSelector}>
                    <button
                      type="button"
                      className={`${styles.userTypeButton} ${userType === 'candidato' ? styles.active : ''}`}
                      onClick={() => setUserType('candidato')}
                    >
                      <Users size={24} />
                      <span>Sou Candidato</span>
                      <CheckCircle className={styles.checkIcon} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.userTypeButton} ${userType === 'empresa' ? styles.active : ''}`}
                      onClick={() => setUserType('empresa')}
                    >
                      <Building2 size={24} />
                      <span>Sou Empresa</span>
                      <CheckCircle className={styles.checkIcon} />
                    </button>
                  </div>

                  {/* Formulário Dinâmico */}
                  {userType && (
                    <div className={styles.formFields}>
                      <div className="form-group">
                        <label className="form-label">Nome Completo</label>
                        <input
                          type="text"
                          name="name"
                          className="form-input"
                          placeholder="Digite seu nome completo"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-input"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Telefone</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-input"
                          placeholder="+55 (11) 99999-9999"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      {userType === 'candidato' && (
                        <div className="form-group">
                          <label className="form-label">LinkedIn</label>
                          <input
                            type="text"
                            name="linkedin"
                            className="form-input"
                            placeholder="https://www.linkedin.com/in/seu-perfil"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}

                      {userType === 'empresa' && (
                        <div className="form-group">
                          <label className="form-label">Website</label>
                          <input
                            type="text"
                            name="website"
                            className="form-input"
                            placeholder="https://www.seuwebsite.com"
                            value={formData.website}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}

                      {userType === 'empresa' && (
                        <div className="form-group">
                          <label className="form-label">LinkedIn da Empresa</label>
                          <input
                            type="text"
                            name="linkedin"
                            className="form-input"
                            placeholder="https://www.linkedin.com/company/empresa"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}

                      {userType === 'candidato' && (
                        <div className="form-group">
                          <label className="form-label">Nível de Experiência</label>
                          <select
                            name="experience"
                            className="form-select"
                            value={formData.experience}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Selecione</option>
                            <option value="junior">Júnior (1-3 anos)</option>
                            <option value="pleno">Pleno (3-7 anos)</option>
                            <option value="senior">Sênior (7+ anos)</option>
                            <option value="gerencial">Gerencial/Executivo</option>
                          </select>
                        </div>
                      )}

                      {userType === 'empresa' && (
                        <div className="form-group">
                          <label className="form-label">Nome da Empresa</label>
                          <input
                            type="text"
                            name="company"
                            className="form-input"
                            placeholder="Nome da sua empresa"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      )}

                      <button type="submit" className="btn btn-primary btn-large w-full" disabled={isLoading}>
                        {isLoading ? (
                          <div className={styles.loadingSpinner}></div>
                        ) : (
                          <>
                            Iniciar Cadastro
                            <ArrowRight size={20} />
                          </>
                        )}
                      </button>

                      <div className={styles.loginLink}>
                        <p>Já tem uma conta?</p>
                        <a href={`/${userType}/login`} className="text-gold">
                          Fazer Login
                        </a>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className={`section ${styles.howItWorksSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="heading-2 text-center">Como Funciona</h2>
            <p className={styles.sectionDescription}>
              Um processo simples e eficiente para conectar talentos a oportunidades únicas
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIcon}>
                <Users size={32} />
              </div>
              <h3>Cadastro e Perfil</h3>
              <p>
                Complete seu perfil profissional com informações detalhadas sobre sua experiência, 
                habilidades e objetivos de carreira.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIcon}>
                <Target size={32} />
              </div>
              <h3>Matching Inteligente</h3>
              <p>
                Nossa tecnologia analisa seu perfil e identifica as melhores oportunidades 
                que combinam com suas qualificações e aspirações.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIcon}>
                <Award size={32} />
              </div>
              <h3>Processo Seletivo</h3>
              <p>
                Participe de processos seletivos exclusivos com empresas internacionais 
                que valorizam profissionais brasileiros.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>04</div>
              <div className={styles.stepIcon}>
                <Globe size={32} />
              </div>
              <h3>Sucesso Internacional</h3>
              <p>
                Receba suporte completo para sua transição internacional, incluindo 
                orientação cultural e suporte legal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className={`section ${styles.benefitsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="heading-2 text-center">Por que Escolher a Leao Talent Bridge?</h2>
            <p className={styles.sectionDescription}>
              Oferecemos muito mais que simples conexões - somos seu parceiro de sucesso
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <div className={styles.benefitIcon}>
                <TrendingUp size={40} />
              </div>
              <h3>Oportunidades Exclusivas</h3>
              <p>
                Acesso a vagas que não são divulgadas publicamente, 
                diretamente com empresas parceiras em Dubai e UAE.
              </p>
            </div>

            <div className="card">
              <div className={styles.benefitIcon}>
                <Shield size={40} />
              </div>
              <h3>Processo Seguro</h3>
              <p>
                Todas as empresas são rigorosamente verificadas. 
                Garantimos transparência e segurança em todo o processo.
              </p>
            </div>

            <div className="card">
              <div className={styles.benefitIcon}>
                <Globe size={40} />
              </div>
              <h3>Suporte Completo</h3>
              <p>
                Acompanhamento personalizado desde o primeiro contato 
                até sua chegada ao destino internacional.
              </p>
            </div>

            <div className="card">
              <div className={styles.benefitIcon}>
                <Star size={40} />
              </div>
              <h3>Network Premium</h3>
              <p>
                Conecte-se com outros profissionais brasileiros que 
                já fazem sucesso no mercado internacional.
              </p>
            </div>

            <div className="card">
              <div className={styles.benefitIcon}>
                <Briefcase size={40} />
              </div>
              <h3>Preparação Cultural</h3>
              <p>
                Treinamentos específicos sobre cultura empresarial, 
                etiqueta e aspectos legais dos países de destino.
              </p>
            </div>

            <div className="card">
              <div className={styles.benefitIcon}>
                <Award size={40} />
              </div>
              <h3>Taxa de Sucesso</h3>
              <p>
                95% dos nossos candidatos recebem pelo menos 2 propostas 
                de emprego em até 60 dias após o cadastro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className={`section ${styles.aboutSection}`}>
        <div className="container">
          <div className="grid grid-2">
            <div className={styles.aboutContent}>
              <h2 className="heading-2">Sobre a  Leao Talent Bridge</h2>
              <p>
                Fundada com a missão de conectar talentos brasileiros às melhores 
                oportunidades internacionais, especialmente em Dubai e nos Emirados Árabes Unidos.
              </p>
              <p>
                Nossa equipe especializada entende as necessidades tanto dos profissionais 
                quanto das empresas, criando conexões que geram valor real para ambos os lados.
              </p>
              
              <div className={styles.aboutStats}>
                <div className={styles.aboutStat}>
                  <h4>5 Anos</h4>
                  <span>de Experiência</span>
                </div>
                <div className={styles.aboutStat}>
                  <h4>15 Países</h4>
                  <span>de Atuação</span>
                </div>
                <div className={styles.aboutStat}>
                  <h4>24/7</h4>
                  <span>Suporte</span>
                </div>
              </div>
            </div>
            
            <div className={styles.aboutImage}>
              <div className={styles.imageContainer}>
                <img 
                  src="https://lp.leaogroup.com/wp-content/uploads/2025/06/equipe-highFive.png" 
                  alt="Equipe  Leao Talent Bridge" 
                />
                <div className={styles.imageOverlay}>
                  <Crown size={48} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className={`section ${styles.contactSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="heading-2 text-center">Entre em Contato</h2>
            <p className={styles.sectionDescription}>
              Pronto para dar o próximo passo? Nossa equipe está aqui para ajudar
            </p>
          </div>

          <div className="grid grid-3">
            <div className={styles.contactCard}>
              <Mail size={32} />
              <h4>Email</h4>
              <p>contato@leaocareers.com</p>
              <a href="mailto:contato@leaocareers.com" className="btn btn-secondary">
                Enviar Email
              </a>
            </div>

            <div className={styles.contactCard}>
              <Phone size={32} />
              <h4>Telefone</h4>
              <p>+55 (11) 99999-9999</p>
              <a href="tel:+5511999999999" className="btn btn-secondary">
                Ligar Agora
              </a>
            </div>

            <div className={styles.contactCard}>
              <MapPin size={32} />
              <h4>Escritório</h4>
              <p>São Paulo, Brasil<br />Dubai, UAE</p>
              <button className="btn btn-secondary">
                Ver Localização
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Image 
                src="/images/leao-talent-briddge-branco.svg" 
                alt="Leao Talent Bridge" 
                width={24} 
                height={24}
              />
              <span>Leao <span className="text-gold">Talent Bridge</span></span>
            </div>
            
            <div className={styles.footerLinks}>
              <a href="#como-funciona">Como Funciona</a>
              <a href="#beneficios">Benefícios</a>
              <a href="#sobre">Sobre</a>
              <a href="#contato">Contato</a>
            </div>
            
            <div className={styles.footerCopyright}>
              <p>&copy; 2025 Leao Talent Bridge. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
