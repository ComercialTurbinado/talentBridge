'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Crown, 
  User, 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Star, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  ArrowRight,
  FileText,
  Upload,
  XCircle,
  AlertTriangle,
  Info,
  Camera,
  GraduationCap,
  Award,
  UserCheck,
  Target,
  Globe,
  FileCheck
} from 'lucide-react';
import { AuthService, User as UserType } from '@/lib/auth';
import styles from './dashboard.module.css';
import DashboardHeader from '@/components/DashboardHeader';

interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  type: 'curriculum' | 'photo' | 'diploma' | 'certificate' | 'recommendation' | 'identity';
  required: boolean;
  completed: boolean;
  icon: React.ReactNode;
}

interface CandidateStatus {
  overall: 'incomplete' | 'pending_approval' | 'approved' | 'active';
  profileCompletion: number;
  documentsCompletion: number;
  nextSteps: string[];
  canBeOfferedToCompanies: boolean;
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'candidato') {
      router.push('/candidato/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);

    // Verificar se veio do pagamento
    if (searchParams?.get('pagamento') === 'sucesso') {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    }
  }, [router, searchParams]);

  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  // Documentos obrigatórios do sistema
  const requiredDocuments: RequiredDocument[] = [
    {
      id: 'curriculum',
      name: 'Currículo Atualizado',
      description: 'Currículo completo com experiências mais recentes',
      type: 'curriculum',
      required: true,
      completed: true, // Mock - viria do backend
      icon: <FileText size={20} />
    },
    {
      id: 'photo',
      name: 'Foto Profissional',
      description: 'Foto profissional de alta qualidade para o perfil',
      type: 'photo',
      required: true,
      completed: false,
      icon: <Camera size={20} />
    },
    {
      id: 'diploma',
      name: 'Diplomas e Certificados',
      description: 'Diplomas de graduação e certificações relevantes',
      type: 'diploma',
      required: true,
      completed: true,
      icon: <GraduationCap size={20} />
    },
    {
      id: 'identity',
      name: 'Documento de Identidade',
      description: 'Passaporte ou RG com foto clara',
      type: 'identity',
      required: true,
      completed: false,
      icon: <UserCheck size={20} />
    },
    {
      id: 'recommendations',
      name: 'Cartas de Recomendação',
      description: 'Pelo menos 2 cartas de recomendação profissionais',
      type: 'recommendation',
      required: true,
      completed: false,
      icon: <Award size={20} />
    },
    {
      id: 'experience_proof',
      name: 'Comprovantes de Experiência',
      description: 'Declarações ou contratos de trabalhos anteriores',
      type: 'certificate',
      required: false,
      completed: true,
      icon: <Briefcase size={20} />
    }
  ];

  // Cálculo do status do candidato
  const calculateCandidateStatus = (): CandidateStatus => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    const completedRequired = requiredDocs.filter(doc => doc.completed);
    
    const documentsCompletion = Math.round((completedRequired.length / requiredDocs.length) * 100);
    const profileCompletion = 85; // Mock - viria do perfil real
    
    let overall: CandidateStatus['overall'] = 'incomplete';
    let nextSteps: string[] = [];
    let canBeOfferedToCompanies = false;

    if (documentsCompletion < 100 || profileCompletion < 100) {
      overall = 'incomplete';
      if (profileCompletion < 100) {
        nextSteps.push('Complete seu perfil profissional');
      }
      if (documentsCompletion < 100) {
        nextSteps.push('Envie todos os documentos obrigatórios');
      }
    } else {
      overall = 'pending_approval';
      nextSteps.push('Aguardando análise da nossa equipe');
      nextSteps.push('Formatação de documentos em andamento');
    }

    // Mock para demonstração - candidato aprovado
    if (completedRequired.length >= 3) {
      overall = 'approved';
      canBeOfferedToCompanies = true;
      nextSteps = [
        'Perfil aprovado e ativo',
        'Sendo oferecido para empresas parceiras',
        'Complete simulações de entrevista'
      ];
    }

    return {
      overall,
      profileCompletion,
      documentsCompletion,
      nextSteps,
      canBeOfferedToCompanies
    };
  };

  const candidateStatus = calculateCandidateStatus();

  const getStatusInfo = (status: CandidateStatus['overall']) => {
    switch (status) {
      case 'incomplete':
        return {
          label: 'Perfil Incompleto',
          color: 'warning',
          icon: <AlertTriangle size={20} />,
          message: 'Complete seu perfil para ser incluído no banco de talentos'
        };
      case 'pending_approval':
        return {
          label: 'Aguardando Aprovação',
          color: 'info',
          icon: <Clock size={20} />,
          message: 'Documentos em análise. Formatação para padrões UAE em andamento'
        };
      case 'approved':
        return {
          label: 'Perfil Aprovado',
          color: 'success',
          icon: <CheckCircle size={20} />,
          message: 'Seu perfil está ativo e sendo oferecido para empresas'
        };
      case 'active':
        return {
          label: 'Ativo em Processos',
          color: 'primary',
          icon: <TrendingUp size={20} />,
          message: 'Participando ativamente de processos seletivos'
        };
      default:
        return {
          label: 'Status Indefinido',
          color: 'secondary',
          icon: <Info size={20} />,
          message: 'Entre em contato com o suporte'
        };
    }
  };

  const statusInfo = getStatusInfo(candidateStatus.overall);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const mockData = {
    stats: {
      profileCompletion: candidateStatus.profileCompletion,
      documentsCompletion: candidateStatus.documentsCompletion,
      interviews: 3,
      processes: candidateStatus.canBeOfferedToCompanies ? 5 : 0
    },
    recentOpportunities: candidateStatus.canBeOfferedToCompanies ? [
      {
        id: 1,
        title: 'Desenvolvedor Full Stack Sênior',
        company: 'TECH-001',
        location: 'Dubai, UAE',
        salary: '$8,000 - $12,000',
        matchScore: 92,
        postedAt: '2 dias atrás',
        featured: true
      },
      {
        id: 2,
        title: 'Product Manager',
        company: 'INNOV-002',
        location: 'Abu Dhabi, UAE',
        salary: '$10,000 - $15,000',
        matchScore: 88,
        postedAt: '1 semana atrás',
        featured: false
      }
    ] : [],
    upcomingInterviews: [
      {
        id: 1,
        company: 'TECH-001',
        position: 'Desenvolvedor Full Stack',
        date: '15 Dezembro, 2024',
        time: '14:00',
        type: 'Online'
      }
    ],
    recentActivity: [
      {
        id: 1,
        action: 'Documento enviado',
        target: 'Currículo Atualizado',
        company: '',
        timestamp: '2 horas atrás',
        status: 'approved'
      },
      {
        id: 2,
        action: 'Perfil visualizado por',
        target: 'TECH-001',
        company: '',
        timestamp: '1 dia atrás',
        status: 'view'
      }
    ]
  };

  return (
    <div className={styles.dashboardPage}>
      <DashboardHeader user={user} userType="candidato" />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className="container">
          {/* Welcome Section */}
          <section className={styles.welcomeSection}>
            <div className={styles.welcomeContent}>
              <h1>Bem-vindo de volta, {user?.name?.split(' ')[0]}!</h1>
              <p>Acompanhe seu progresso no processo de qualificação para o mercado internacional.</p>
            </div>
          </section>

          {/* Status Card */}
          <section className={styles.statusSection}>
            <div className={`${styles.statusCard} ${styles[statusInfo.color]}`}>
              <div className={styles.statusHeader}>
                <div className={styles.statusIcon}>
                  {statusInfo.icon}
                </div>
                <div className={styles.statusInfo}>
                  <h3>{statusInfo.label}</h3>
                  <p>{statusInfo.message}</p>
                </div>
              </div>
              
              {candidateStatus.nextSteps.length > 0 && (
                <div className={styles.nextSteps}>
                  <h4>Próximos Passos:</h4>
                  <ul>
                    {candidateStatus.nextSteps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Progress Cards */}
          <section className={styles.progressSection}>
            <div className="grid grid-2">
              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <div className={styles.progressIcon}>
                    <User size={24} />
                  </div>
                  <div>
                    <h3>{candidateStatus.profileCompletion}%</h3>
                    <p>Perfil Completo</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${candidateStatus.profileCompletion}%` }}
                  ></div>
                </div>
                <Link href="/candidato/perfil" className={styles.progressAction}>
                  Completar Perfil <ArrowRight size={16} />
                </Link>
              </div>

              <div className={styles.progressCard}>
                <div className={styles.progressHeader}>
                  <div className={styles.progressIcon}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3>{candidateStatus.documentsCompletion}%</h3>
                    <p>Documentos Enviados</p>
                  </div>
                </div>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${candidateStatus.documentsCompletion}%` }}
                  ></div>
                </div>
                <Link href="/candidato/documentos" className={styles.progressAction}>
                  Enviar Documentos <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* Documents Checklist */}
          <section className={styles.checklistSection}>
            <div className={styles.checklistHeader}>
              <h2>Checklist de Documentos</h2>
              <p>Complete todos os documentos obrigatórios para ser incluído no banco de talentos</p>
            </div>

            <div className={styles.checklistGrid}>
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className={`${styles.checklistItem} ${doc.completed ? styles.completed : ''}`}>
                  <div className={styles.checklistStatus}>
                    {doc.completed ? (
                      <CheckCircle size={20} className={styles.statusCompleted} />
                    ) : (
                      <XCircle size={20} className={styles.statusPending} />
                    )}
                  </div>
                  
                  <div className={styles.checklistIcon}>
                    {doc.icon}
                  </div>
                  
                  <div className={styles.checklistContent}>
                    <h4>
                      {doc.name}
                      {doc.required && <span className={styles.requiredBadge}>Obrigatório</span>}
                    </h4>
                    <p>{doc.description}</p>
                    
                    <div className={styles.checklistActions}>
                      {doc.completed ? (
                        <span className={styles.statusText}>✓ Enviado</span>
                      ) : (
                        <Link href="/candidato/documentos" className="btn btn-primary btn-small">
                          <Upload size={16} />
                          Enviar
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Main Dashboard Grid */}
          <div className={styles.dashboardGrid}>
            {/* Opportunities or Onboarding Message */}
            <section className={styles.dashboardCard}>
              <div className={styles.cardHeader}>
                <h2>
                  {candidateStatus.canBeOfferedToCompanies 
                    ? 'Oportunidades para Você' 
                    : 'Complete seu Cadastro'
                  }
                </h2>
              </div>

              {candidateStatus.canBeOfferedToCompanies ? (
                <div className={styles.opportunitiesList}>
                  {mockData.recentOpportunities.map((opportunity) => (
                    <div key={opportunity.id} className={styles.opportunityCard}>
                      {opportunity.featured && (
                        <div className={styles.featuredBadge}>
                          <Star size={12} />
                          Destaque
                        </div>
                      )}
                      
                      <div className={styles.opportunityContent}>
                        <div className={styles.opportunityHeader}>
                          <h3>{opportunity.title}</h3>
                          <div className={styles.matchScore}>
                            <span className={styles.matchPercentage}>{opportunity.matchScore}%</span>
                            <span className={styles.matchLabel}>match</span>
                          </div>
                        </div>
                        
                        <div className={styles.opportunityDetails}>
                          <div className={styles.opportunityInfo}>
                            <span className={styles.company}>{opportunity.company}</span>
                            <div className={styles.location}>
                              <MapPin size={14} />
                              {opportunity.location}
                            </div>
                          </div>
                          
                          <div className={styles.opportunityMeta}>
                            <div className={styles.salary}>
                              <DollarSign size={14} />
                              {opportunity.salary}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className={styles.opportunityActions}>
                        <button className="btn btn-primary btn-small" disabled>
                          Entre em Contato
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.onboardingMessage}>
                  <div className={styles.onboardingIcon}>
                    <AlertTriangle size={48} />
                  </div>
                  <h3>Complete seu perfil para ver oportunidades</h3>
                  <p>
                    Após completar seu perfil e enviar todos os documentos obrigatórios, 
                    seu currículo será formatado nos padrões dos Emirados Árabes Unidos 
                    e você começará a receber oportunidades exclusivas.
                  </p>
                  <div className={styles.onboardingActions}>
                    <Link href="/candidato/perfil" className="btn btn-primary">
                      Completar Perfil
                    </Link>
                    <Link href="/candidato/documentos" className="btn btn-secondary">
                      Enviar Documentos
                    </Link>
                  </div>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              {/* Quick Stats */}
              <section className={styles.sidebarCard}>
                <h3>Estatísticas</h3>
                
                <div className={styles.quickStats}>
                  <div className={styles.quickStat}>
                    <Calendar size={16} />
                    <span>{mockData.stats.interviews} Entrevistas</span>
                  </div>
                  <div className={styles.quickStat}>
                    <TrendingUp size={16} />
                    <span>{mockData.stats.processes} Processos</span>
                  </div>
                  <div className={styles.quickStat}>
                    <FileText size={16} />
                    <span>{requiredDocuments.filter(d => d.completed).length}/{requiredDocuments.filter(d => d.required).length} Docs</span>
                  </div>
                </div>
              </section>

              {/* Recent Activity */}
              <section className={styles.sidebarCard}>
                <h3>Atividade Recente</h3>
                
                <div className={styles.activityList}>
                  {mockData.recentActivity.map((activity) => (
                    <div key={activity.id} className={styles.activityItem}>
                      <div className={`${styles.activityIcon} ${styles[activity.status]}`}>
                        {activity.status === 'approved' && <CheckCircle size={14} />}
                        {activity.status === 'view' && <User size={14} />}
                      </div>
                      
                      <div className={styles.activityContent}>
                        <p>
                          {activity.action} <strong>{activity.target}</strong>
                        </p>
                        <span className={styles.activityTime}>{activity.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Quick Actions */}
              <section className={styles.sidebarCard}>
                <h3>Ações Rápidas</h3>
                
                <div className={styles.quickActions}>
                  <Link href="/candidato/perfil" className={styles.quickAction}>
                    <User size={20} />
                    <span>Editar Perfil</span>
                  </Link>
                  
                  <Link href="/candidato/documentos" className={styles.quickAction}>
                    <Upload size={20} />
                    <span>Enviar Documentos</span>
                  </Link>
                  
                  <Link href="/candidato/simulacoes" className={styles.quickAction}>
                    <Target size={20} />
                    <span>Treinar Entrevistas</span>
                  </Link>
                  
                  <Link href="/candidato/cultura" className={styles.quickAction}>
                    <Globe size={20} />
                    <span>Guia Cultural</span>
                  </Link>
                  
                  <Link href="/candidato/formatacao" className={styles.quickAction}>
                    <FileCheck size={20} />
                    <span>Docs Formatados</span>
                  </Link>
                  
                  <Link href="/candidato/cursos" className={styles.quickAction}>
                    <Briefcase size={20} />
                    <span>Cursos Gratuitos</span>
                  </Link>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CandidatoDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
} 