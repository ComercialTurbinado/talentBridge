'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService, User as UserType } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import { 
  Briefcase,
  Users,
  Calendar,
  UserCheck,
  Plus,
  TrendingUp,
  Clock,
  Eye
} from 'lucide-react';
import styles from './dashboard.module.css';

interface DashboardStats {
  totalVagas: number;
  vagasAtivas: number;
  candidatosIndicados: number;
  entrevistasAgendadas: number;
  contratacoes: number;
}

interface RecentActivity {
  id: number;
  type: 'vaga' | 'candidato' | 'entrevista' | 'contratacao';
  title: string;
  description: string;
  date: string;
}

export default function EmpresaDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalVagas: 0,
    vagasAtivas: 0,
    candidatosIndicados: 0,
    entrevistasAgendadas: 0,
    contratacoes: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'empresa') {
      router.push('/empresa/login');
      return;
    }
    setUser(currentUser);
    loadDashboardData();
  }, [router]);

  const loadDashboardData = () => {
    // Mock data - em produção viria da API
    setStats({
      totalVagas: 12,
      vagasAtivas: 8,
      candidatosIndicados: 45,
      entrevistasAgendadas: 6,
      contratacoes: 3
    });

    setRecentActivities([
      {
        id: 1,
        type: 'candidato',
        title: 'Novos candidatos indicados',
        description: '3 candidatos para Desenvolvedor Senior',
        date: '2024-01-15'
      },
      {
        id: 2,
        type: 'entrevista',
        title: 'Entrevista agendada',
        description: 'Analista de Marketing - Amanhã às 14h',
        date: '2024-01-14'
      },
      {
        id: 3,
        type: 'vaga',
        title: 'Nova vaga publicada',
        description: 'Gerente de Vendas - Dubai',
        date: '2024-01-13'
      }
    ]);

    setLoading(false);
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
    <div className={styles.dashboardPage}>
      <DashboardHeader user={user} userType="empresa" />

      <main className={styles.mainContent}>
        <div className="container">
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div className={styles.titleSection}>
              <h1>Dashboard</h1>
              <p>Visão geral da sua empresa no Leao Talent Bridge</p>
            </div>
            <div className={styles.headerActions}>
              <Link href="/empresa/vagas/nova" className="btn btn-primary">
                <Plus size={16} />
                Nova Vaga
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Briefcase size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>{stats.totalVagas}</h3>
                <p>Total de Vagas</p>
                <span className={styles.statDetail}>{stats.vagasAtivas} ativas</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Users size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>{stats.candidatosIndicados}</h3>
                <p>Candidatos Indicados</p>
                <span className={styles.statDetail}>Este mês</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <Calendar size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>{stats.entrevistasAgendadas}</h3>
                <p>Entrevistas Agendadas</p>
                <span className={styles.statDetail}>Próximos 7 dias</span>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statIcon}>
                <UserCheck size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>{stats.contratacoes}</h3>
                <p>Contratações</p>
                <span className={styles.statDetail}>Este mês</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <h2>Ações Rápidas</h2>
            <div className={styles.actionsGrid}>
              <Link href="/empresa/vagas" className={styles.actionCard}>
                <Briefcase size={32} />
                <h3>Gerenciar Vagas</h3>
                <p>Criar, editar e visualizar suas vagas</p>
              </Link>

              <Link href="/empresa/candidatos" className={styles.actionCard}>
                <Users size={32} />
                <h3>Ver Candidatos</h3>
                <p>Analisar perfis indicados para suas vagas</p>
              </Link>

              <Link href="/empresa/entrevistas" className={styles.actionCard}>
                <Calendar size={32} />
                <h3>Calendário</h3>
                <p>Agendar e gerenciar entrevistas</p>
              </Link>

              <Link href="/empresa/perfil" className={styles.actionCard}>
                <TrendingUp size={32} />
                <h3>Perfil da Empresa</h3>
                <p>Editar informações e preferências</p>
              </Link>
            </div>
          </div>

          {/* Recent Activities */}
          <div className={styles.recentSection}>
            <h2>Atividades Recentes</h2>
            <div className={styles.activitiesList}>
              {recentActivities.map((activity) => (
                <div key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityIcon}>
                    {activity.type === 'vaga' && <Briefcase size={16} />}
                    {activity.type === 'candidato' && <Users size={16} />}
                    {activity.type === 'entrevista' && <Calendar size={16} />}
                    {activity.type === 'contratacao' && <UserCheck size={16} />}
                  </div>
                  <div className={styles.activityContent}>
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className={styles.activityDate}>
                      {new Date(activity.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 