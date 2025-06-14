'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthService, User as UserType } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import { 
  Users,
  Search,
  Filter,
  Calendar,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  X,
  Eye,
  Phone,
  Video,
  MessageSquare,
  ChevronDown,
  Download,
  FileText,
  Mail,
  Globe,
  Building,
  Calendar as CalendarIcon
} from 'lucide-react';
import styles from './candidatos.module.css';

interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  descricao: string;
  tecnologias: string[];
}

interface Educacao {
  instituicao: string;
  curso: string;
  periodo: string;
  status: string;
}

interface Certificacao {
  nome: string;
  instituicao: string;
  dataObtencao: string;
  validade?: string;
}

interface Candidato {
  id: string;
  codigo: string;
  nome: string;
  email: string;
  telefone: string;
  linkedin?: string;
  portfolio?: string;
  score: number;
  experiencia: string;
  localizacao: string;
  disponibilidade: string;
  habilidades: string[];
  status: 'novo' | 'visualizado' | 'interessado' | 'entrevista_agendada' | 'rejeitado';
  dataAplicacao: string;
  vagaId?: string;
  // Dados detalhados do currículo
  resumoProfissional: string;
  experiencias: Experiencia[];
  educacao: Educacao[];
  certificacoes: Certificacao[];
  idiomas: { idioma: string; nivel: string }[];
  salarioPretendido: string;
  observacoes?: string;
}

interface ModalEntrevista {
  candidatoId: string;
  isOpen: boolean;
}

function CandidatosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [filtroExperiencia, setFiltroExperiencia] = useState('todos');
  const [busca, setBusca] = useState('');
  const [candidatoSelecionado, setCandidatoSelecionado] = useState<Candidato | null>(null);
  const [showAgendarModal, setShowAgendarModal] = useState(false);
  const [modalEntrevista, setModalEntrevista] = useState<ModalEntrevista>({ candidatoId: '', isOpen: false });

  const vagaId = searchParams?.get('vaga');

  const loadCandidatos = () => {
    // Dados simulados de candidatos com informações completas do currículo
    const candidatosSimulados: Candidato[] = [
      {
        id: '1',
        codigo: 'CAND-2024-001',
        nome: 'João Silva Santos',
        email: 'joao.silva@email.com',
        telefone: '+55 11 99999-9999',
        linkedin: 'https://linkedin.com/in/joaosilva',
        portfolio: 'https://joaosilva.dev',
        score: 95,
        experiencia: 'Sênior',
        localizacao: 'São Paulo, SP',
        disponibilidade: 'Imediata',
        habilidades: ['React', 'Node.js', 'TypeScript', 'AWS'],
        status: 'novo',
        dataAplicacao: '2024-01-15',
        vagaId: vagaId || undefined,
        resumoProfissional: 'Desenvolvedor Full Stack com mais de 8 anos de experiência em desenvolvimento web, especializado em React, Node.js e arquiteturas cloud. Experiência sólida em liderança técnica e mentoria de equipes. Apaixonado por tecnologias emergentes e sempre buscando soluções inovadoras para problemas complexos.',
        salarioPretendido: 'AED 18.000 - 22.000',
        experiencias: [
          {
            empresa: 'TechCorp Brasil',
            cargo: 'Tech Lead Full Stack',
            periodo: 'Jan 2021 - Atual',
            descricao: 'Liderança técnica de equipe de 6 desenvolvedores, arquitetura de sistemas escaláveis, implementação de CI/CD e mentoria técnica.',
            tecnologias: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes']
          },
          {
            empresa: 'StartupXYZ',
            cargo: 'Desenvolvedor Full Stack Senior',
            periodo: 'Mar 2019 - Dez 2020',
            descricao: 'Desenvolvimento de plataforma de e-commerce do zero, integração com APIs de pagamento e implementação de sistema de recomendações.',
            tecnologias: ['React', 'Node.js', 'MongoDB', 'Redis', 'Stripe API']
          },
          {
            empresa: 'WebSolutions',
            cargo: 'Desenvolvedor Frontend',
            periodo: 'Jun 2016 - Feb 2019',
            descricao: 'Desenvolvimento de interfaces responsivas, otimização de performance e implementação de testes automatizados.',
            tecnologias: ['JavaScript', 'Vue.js', 'SASS', 'Webpack', 'Jest']
          }
        ],
        educacao: [
          {
            instituicao: 'Universidade de São Paulo (USP)',
            curso: 'Bacharelado em Ciência da Computação',
            periodo: '2012 - 2016',
            status: 'Concluído'
          }
        ],
        certificacoes: [
          {
            nome: 'AWS Solutions Architect Associate',
            instituicao: 'Amazon Web Services',
            dataObtencao: '2023-03-15',
            validade: '2026-03-15'
          },
          {
            nome: 'React Developer Certification',
            instituicao: 'Meta',
            dataObtencao: '2022-11-20'
          }
        ],
        idiomas: [
          { idioma: 'Português', nivel: 'Nativo' },
          { idioma: 'Inglês', nivel: 'Fluente' },
          { idioma: 'Árabe', nivel: 'Básico' }
        ]
      },
      {
        id: '2',
        codigo: 'CAND-2024-002',
        nome: 'Maria Oliveira Costa',
        email: 'maria.oliveira@email.com',
        telefone: '+55 21 98888-8888',
        linkedin: 'https://linkedin.com/in/mariaoliveira',
        score: 88,
        experiencia: 'Pleno',
        localizacao: 'Rio de Janeiro, RJ',
        disponibilidade: '30 dias',
        habilidades: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        status: 'visualizado',
        dataAplicacao: '2024-01-14',
        vagaId: vagaId || undefined,
        resumoProfissional: 'Desenvolvedora Backend especializada em Python e Django com 5 anos de experiência. Forte conhecimento em bancos de dados relacionais e arquiteturas de microserviços. Experiência em desenvolvimento de APIs RESTful e integração com sistemas terceiros.',
        salarioPretendido: 'AED 12.000 - 16.000',
        experiencias: [
          {
            empresa: 'DataTech Solutions',
            cargo: 'Desenvolvedora Backend Pleno',
            periodo: 'Ago 2021 - Atual',
            descricao: 'Desenvolvimento de APIs para sistema de análise de dados, otimização de queries e implementação de cache distribuído.',
            tecnologias: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Celery']
          },
          {
            empresa: 'FinanceApp',
            cargo: 'Desenvolvedora Python Junior',
            periodo: 'Jan 2019 - Jul 2021',
            descricao: 'Desenvolvimento de sistema de gestão financeira, integração com APIs bancárias e implementação de relatórios automatizados.',
            tecnologias: ['Python', 'Flask', 'SQLAlchemy', 'MySQL']
          }
        ],
        educacao: [
          {
            instituicao: 'Universidade Federal do Rio de Janeiro (UFRJ)',
            curso: 'Bacharelado em Sistemas de Informação',
            periodo: '2015 - 2019',
            status: 'Concluído'
          }
        ],
        certificacoes: [
          {
            nome: 'Python Institute PCAP',
            instituicao: 'Python Institute',
            dataObtencao: '2022-08-10'
          }
        ],
        idiomas: [
          { idioma: 'Português', nivel: 'Nativo' },
          { idioma: 'Inglês', nivel: 'Intermediário' }
        ]
      }
    ];

    setCandidatos(candidatosSimulados);
    setLoading(false);
  };

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'empresa') {
      router.push('/empresa/login');
      return;
    }
    setUser(currentUser);
    loadCandidatos();
  }, [router, loadCandidatos]);

  const candidatosFiltrados = candidatos.filter(candidato => {
    const matchStatus = filtroStatus === 'todos' || candidato.status === filtroStatus;
    const matchExperiencia = filtroExperiencia === 'todos' || candidato.experiencia === filtroExperiencia;
    const matchBusca = busca === '' || 
      candidato.codigo.toLowerCase().includes(busca.toLowerCase()) ||
      candidato.habilidades.some(h => h.toLowerCase().includes(busca.toLowerCase()));
    
    return matchStatus && matchExperiencia && matchBusca;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'blue';
      case 'visualizado': return 'gray';
      case 'interessado': return 'green';
      case 'entrevista_agendada': return 'purple';
      case 'rejeitado': return 'red';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'novo': return 'Novo';
      case 'visualizado': return 'Visualizado';
      case 'interessado': return 'Interessado';
      case 'entrevista_agendada': return 'Entrevista Agendada';
      case 'rejeitado': return 'Rejeitado';
      default: return status;
    }
  };

  const handleVerDetalhes = (candidato: Candidato) => {
    setCandidatoSelecionado(candidato);
    // Marcar como visualizado se for novo
    if (candidato.status === 'novo') {
      setCandidatos(prev => 
        prev.map(c => c.id === candidato.id ? { ...c, status: 'visualizado' } : c)
      );
    }
  };

  const handleMarcarInteresse = (candidatoId: string) => {
    setCandidatos(prev => 
      prev.map(c => c.id === candidatoId ? { ...c, status: 'interessado' } : c)
    );
    setCandidatoSelecionado(null);
  };

  const handleAgendarEntrevista = (candidatoId: string) => {
    setShowAgendarModal(true);
  };

  const confirmarAgendamento = () => {
    if (candidatoSelecionado) {
      setCandidatos(prev => 
        prev.map(c => c.id === candidatoSelecionado.id ? { ...c, status: 'entrevista_agendada' } : c)
      );
    }
    setShowAgendarModal(false);
    setCandidatoSelecionado(null);
  };

  const abrirModalEntrevista = (candidatoId: string) => {
    setModalEntrevista({ candidatoId, isOpen: true });
  };

  const fecharModalEntrevista = () => {
    setModalEntrevista({ candidatoId: '', isOpen: false });
  };

  if (loading) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.candidatosPage}>
      <DashboardHeader user={user} userType="empresa" />

      <main className={styles.mainContent}>
        <div className="container">
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div className={styles.titleSection}>
              <h1>Candidatos</h1>
              <p>Gerencie candidatos interessados nas vagas da sua empresa</p>
            </div>
            
            <div className={styles.headerActions}>
              <button className="btn btn-secondary">
                <Download size={16} />
                Exportar Lista
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBox}>
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar por código ou habilidades..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>

            <div className={styles.filters}>
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="todos">Todos os Status</option>
                <option value="novo">Novos</option>
                <option value="visualizado">Visualizados</option>
                <option value="interessado">Interessados</option>
                <option value="entrevista_agendada">Entrevista Agendada</option>
                <option value="rejeitado">Rejeitados</option>
              </select>

              <select
                value={filtroExperiencia}
                onChange={(e) => setFiltroExperiencia(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="todos">Todas as Experiências</option>
                <option value="Júnior">Júnior</option>
                <option value="Pleno">Pleno</option>
                <option value="Sênior">Sênior</option>
              </select>
            </div>
          </div>

          {/* Candidatos Grid */}
          <div className={styles.candidatosGrid}>
            {candidatosFiltrados.map((candidato) => (
              <div key={candidato.id} className={styles.candidatoCard}>
                <div className={styles.candidatoHeader}>
                  <div className={styles.candidatoInfo}>
                    <div className={styles.candidatoId}>
                      <span className={styles.idIcon}>👤</span>
                      <span className={styles.idText}>{candidato.codigo}</span>
                      <span className={`${styles.statusBadge} ${styles[getStatusColor(candidato.status)]}`}>
                        {getStatusLabel(candidato.status)}
                      </span>
                    </div>
                    
                    <div className={styles.scoreSection}>
                      <div className={styles.scoreValue}>{candidato.score}%</div>
                      <div className={styles.scoreLabel}>Score de Match</div>
                      <div className={styles.rating}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < Math.floor(candidato.score / 20) ? styles.starFilled : styles.starEmpty}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.candidatoDetails}>
                  <div className={styles.detailItem}>
                    <Briefcase size={16} />
                    <span>{candidato.experiencia}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <MapPin size={16} />
                    <span>{candidato.localizacao}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Clock size={16} />
                    <span>{candidato.disponibilidade}</span>
                  </div>
                </div>

                <div className={styles.habilidadesSection}>
                  <div className={styles.habilidadesLabel}>Principais Habilidades</div>
                  <div className={styles.habilidadesTags}>
                    {candidato.habilidades.slice(0, 3).map((skill, index) => (
                      <span key={index} className={styles.habilidadeTag}>
                        {skill}
                      </span>
                    ))}
                    {candidato.habilidades.length > 3 && (
                      <span className={styles.habilidadeTag}>
                        +{candidato.habilidades.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.candidatoFooter}>
                  <div className={styles.aplicadoInfo}>
                    <button 
                      onClick={() => handleVerDetalhes(candidato)}
                      className={styles.verDetalhesBtn}
                    >
                      <FileText size={16} />
                      Ver Currículo
                    </button>
                    <span className={styles.aplicadoEm}>
                      Aplicou em {new Date(candidato.dataAplicacao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                  {candidato.status !== 'interessado' && candidato.status !== 'entrevista_agendada' && (
                    <button 
                      onClick={() => handleMarcarInteresse(candidato.id)}
                      className={styles.interessadoBtn}
                    >
                      <Star size={16} />
                      INTERESSADO
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {candidatosFiltrados.length === 0 && (
            <div className={styles.emptyState}>
              <Users size={48} />
              <h3>Nenhum candidato encontrado</h3>
              <p>Tente ajustar os filtros ou aguarde novos candidatos se inscreverem.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Currículo Detalhado */}
      {candidatoSelecionado && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Currículo Detalhado</h2>
              <button 
                onClick={() => setCandidatoSelecionado(null)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.curriculoDetalhado}>
                {/* Header do Candidato */}
                <div className={styles.candidatoHeaderModal}>
                  <div className={styles.candidatoInfoModal}>
                     <p className={styles.candidatoCodigo}>{candidatoSelecionado.codigo}</p>
                  </div>
                  <div className={styles.scoreCircle}>
                    <span>{candidatoSelecionado.score}%</span>
                  </div>
                </div>

                {/* Informações Básicas */}
                <div className={styles.secaoBasica}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <MapPin size={16} />
                      <div>
                        <span className={styles.infoLabel}>Localização</span>
                        <span className={styles.infoValue}>{candidatoSelecionado.localizacao}</span>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <Clock size={16} />
                      <div>
                        <span className={styles.infoLabel}>Disponibilidade</span>
                        <span className={styles.infoValue}>{candidatoSelecionado.disponibilidade}</span>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <Briefcase size={16} />
                      <div>
                        <span className={styles.infoLabel}>Nível</span>
                        <span className={styles.infoValue}>{candidatoSelecionado.experiencia}</span>
                      </div>
                    </div>
                    <div className={styles.infoItem}>
                      <Award size={16} />
                      <div>
                        <span className={styles.infoLabel}>Salário Pretendido</span>
                        <span className={styles.infoValue}>{candidatoSelecionado.salarioPretendido}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumo Profissional */}
                <div className={styles.secaoCurriculo}>
                  <h4>
                    <FileText size={18} />
                    Resumo Profissional
                  </h4>
                  <p className={styles.resumoProfissional}>
                    {candidatoSelecionado.resumoProfissional}
                  </p>
                </div>

                {/* Experiências Profissionais */}
                <div className={styles.secaoCurriculo}>
                  <h4>
                    <Briefcase size={18} />
                    Experiência Profissional
                  </h4>
                  <div className={styles.experienciasList}>
                    {candidatoSelecionado.experiencias.map((exp, index) => (
                      <div key={index} className={styles.experienciaItem}>
                        <div className={styles.experienciaHeader}>
                          <div>
                            <h5>{exp.cargo}</h5>
                            <p className={styles.empresa}>
                              <Building size={14} />
                              {exp.empresa}
                            </p>
                          </div>
                          <span className={styles.periodo}>
                            <CalendarIcon size={14} />
                            {exp.periodo}
                          </span>
                        </div>
                        <p className={styles.experienciaDescricao}>{exp.descricao}</p>
                        <div className={styles.tecnologiasTags}>
                          {exp.tecnologias.map((tech, techIndex) => (
                            <span key={techIndex} className={styles.tecnologiaTag}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Educação */}
                <div className={styles.secaoCurriculo}>
                  <h4>
                    <GraduationCap size={18} />
                    Formação Acadêmica
                  </h4>
                  <div className={styles.educacaoList}>
                    {candidatoSelecionado.educacao.map((edu, index) => (
                      <div key={index} className={styles.educacaoItem}>
                        <div className={styles.educacaoHeader}>
                          <div>
                            <h5>{edu.curso}</h5>
                            <p className={styles.instituicao}>{edu.instituicao}</p>
                          </div>
                          <div className={styles.educacaoInfo}>
                            <span className={styles.periodo}>{edu.periodo}</span>
                            <span className={`${styles.statusBadge} ${styles.green}`}>
                              {edu.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certificações */}
                {candidatoSelecionado.certificacoes.length > 0 && (
                  <div className={styles.secaoCurriculo}>
                    <h4>
                      <Award size={18} />
                      Certificações
                    </h4>
                    <div className={styles.certificacoesList}>
                      {candidatoSelecionado.certificacoes.map((cert, index) => (
                        <div key={index} className={styles.certificacaoItem}>
                          <div className={styles.certificacaoHeader}>
                            <div>
                              <h5>{cert.nome}</h5>
                              <p className={styles.instituicao}>{cert.instituicao}</p>
                            </div>
                            <div className={styles.certificacaoInfo}>
                              <span className={styles.dataObtencao}>
                                Obtida em: {new Date(cert.dataObtencao).toLocaleDateString('pt-BR')}
                              </span>
                              {cert.validade && (
                                <span className={styles.validade}>
                                  Válida até: {new Date(cert.validade).toLocaleDateString('pt-BR')}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Habilidades Técnicas */}
                <div className={styles.secaoCurriculo}>
                  <h4>
                    <Award size={18} />
                    Habilidades Técnicas
                  </h4>
                  <div className={styles.skillsTags}>
                    {candidatoSelecionado.habilidades.map((skill, index) => (
                      <span key={index} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Idiomas */}
                <div className={styles.secaoCurriculo}>
                  <h4>
                    <Globe size={18} />
                    Idiomas
                  </h4>
                  <div className={styles.idiomasList}>
                    {candidatoSelecionado.idiomas.map((idioma, index) => (
                      <div key={index} className={styles.idiomaItem}>
                        <span className={styles.idiomaNome}>{idioma.idioma}</span>
                        <span className={styles.idiomaNivel}>{idioma.nivel}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                onClick={() => setCandidatoSelecionado(null)}
                className="btn btn-secondary"
              >
                Fechar
              </button>
              
              {candidatoSelecionado.status !== 'interessado' && candidatoSelecionado.status !== 'entrevista_agendada' && (
                <button 
                  onClick={() => handleMarcarInteresse(candidatoSelecionado.id)}
                  className="btn btn-primary"
                >
                  <Star size={16} />
                  Marcar Interesse
                </button>
              )}
              
              {candidatoSelecionado.status === 'interessado' && (
                <button 
                  onClick={() => handleAgendarEntrevista(candidatoSelecionado.id)}
                  className="btn btn-primary"
                >
                  <Calendar size={16} />
                  Agendar Entrevista
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agendamento */}
      {showAgendarModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Agendar Entrevista</h2>
              <button 
                onClick={() => setShowAgendarModal(false)}
                className={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.agendamentoForm}>
                <div className={styles.formGroup}>
                  <label>Tipo de Entrevista</label>
                  <select className={styles.formSelect}>
                    <option value="video">Videoconferência</option>
                    <option value="presencial">Presencial</option>
                    <option value="telefone">Telefone</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label>Data</label>
                  <input type="date" className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label>Horário</label>
                  <input type="time" className={styles.formInput} />
                </div>

                <div className={styles.formGroup}>
                  <label>Observações</label>
                  <textarea 
                    className={styles.formTextarea}
                    placeholder="Informações adicionais sobre a entrevista..."
                    rows={3}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button 
                onClick={() => setShowAgendarModal(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmarAgendamento}
                className="btn btn-primary"
              >
                <Calendar size={16} />
                Confirmar Agendamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EmpresaCandidatosPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#0a0a0a'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(212, 175, 55, 0.3)',
          borderTop: '3px solid #d4af37',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    }>
      <CandidatosContent />
    </Suspense>
  );
} 