'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthService, User as UserType } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import { 
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  MoreVertical,
  Briefcase,
  ChevronDown,
  Clock
} from 'lucide-react';
import styles from './vagas.module.css';

interface Vaga {
  id: number;
  titulo: string;
  descricao: string;
  localizacao: string;
  salario: string;
  tipo: 'CLT' | 'PJ' | 'Freelancer';
  nivel: 'Junior' | 'Pleno' | 'Senior' | 'Especialista';
  status: 'ativa' | 'pausada' | 'fechada';
  candidatosIndicados: number;
  dataPublicacao: string;
  dataExpiracao: string;
}

export default function EmpresaVagasPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos os Status');
  const [typeFilter, setTypeFilter] = useState('Todos os Tipos');

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'empresa') {
      router.push('/empresa/login');
      return;
    }
    setUser(currentUser);
    loadVagas();
  }, [router]);

  const loadVagas = () => {
    // Mock data - em produção viria da API
    const mockVagas: Vaga[] = [
      {
        id: 1,
        titulo: 'Desenvolvedor Full Stack Senior',
        descricao: 'Desenvolvedor experiente para liderar projetos de e-commerce',
        localizacao: 'Dubai, UAE',
        salario: 'AED 15.000 - 20.000',
        tipo: 'CLT',
        nivel: 'Senior',
        status: 'ativa',
        candidatosIndicados: 12,
        dataPublicacao: '2024-01-10',
        dataExpiracao: '2024-02-10'
      },
      {
        id: 2,
        titulo: 'Analista de Marketing Digital',
        descricao: 'Especialista em campanhas digitais para mercado árabe',
        localizacao: 'Abu Dhabi, UAE',
        salario: 'AED 8.000 - 12.000',
        tipo: 'CLT',
        nivel: 'Pleno',
        status: 'ativa',
        candidatosIndicados: 8,
        dataPublicacao: '2024-01-12',
        dataExpiracao: '2024-02-12'
      },
      {
        id: 3,
        titulo: 'Gerente de Vendas',
        descricao: 'Liderança de equipe comercial para expansão regional',
        localizacao: 'Sharjah, UAE',
        salario: 'AED 18.000 - 25.000',
        tipo: 'CLT',
        nivel: 'Senior',
        status: 'pausada',
        candidatosIndicados: 5,
        dataPublicacao: '2024-01-08',
        dataExpiracao: '2024-02-08'
      }
    ];

    setVagas(mockVagas);
    setLoading(false);
  };

  const filteredVagas = vagas.filter(vaga => {
    const matchesSearch = vaga.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vaga.localizacao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos os Status' || vaga.status === statusFilter.toLowerCase();
    const matchesTipo = typeFilter === 'Todos os Tipos' || vaga.tipo === typeFilter;
    
    return matchesSearch && matchesStatus && matchesTipo;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ativa':
        return <span className={`${styles.statusBadge} ${styles.statusAtiva}`}>Ativa</span>;
      case 'pausada':
        return <span className={`${styles.statusBadge} ${styles.statusPausada}`}>Pausada</span>;
      case 'fechada':
        return <span className={`${styles.statusBadge} ${styles.statusFechada}`}>Fechada</span>;
      default:
        return null;
    }
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
    <div className={styles.vagasPage}>
      <DashboardHeader user={user} userType="empresa" />

      <main className={styles.mainContent}>
        <div className="container">
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div className={styles.headerContent}>
              <h1>Gerenciar Vagas</h1>
              <p>Crie, edite e gerencie suas oportunidades de trabalho</p>
            </div>
            <Link href="/empresa/vagas/nova" className="btn btn-primary">
              <Plus size={20} />
              NOVA VAGA
            </Link>
          </div>

          {/* Filters */}
          <div className={styles.filtersSection}>
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Buscar por título ou localização..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.filterDropdowns}>
              <div className={styles.dropdown}>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option>Todos os Status</option>
                  <option>Ativa</option>
                  <option>Pausada</option>
                  <option>Expirada</option>
                </select>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </div>
              
              <div className={styles.dropdown}>
                <select 
                  value={typeFilter} 
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option>Todos os Tipos</option>
                  <option>CLT</option>
                  <option>PJ</option>
                  <option>Freelancer</option>
                </select>
                <ChevronDown size={16} className={styles.dropdownIcon} />
              </div>
            </div>
          </div>

          {/* Vagas List */}
          <div className={styles.vagasSection}>
            {filteredVagas.length === 0 ? (
              <div className={styles.emptyState}>
                <Briefcase size={48} className={styles.emptyIcon} />
                <h3>Nenhuma vaga encontrada</h3>
                <p>Crie sua primeira vaga para começar a receber candidatos qualificados.</p>
                <Link href="/empresa/vagas/nova" className="btn btn-primary">
                  <Plus size={16} />
                  Criar Primeira Vaga
                </Link>
              </div>
            ) : (
              <div className={styles.vagasList}>
                {filteredVagas.map((vaga) => (
                  <div key={vaga.id} className={styles.vagaCard}>
                    <div className={styles.vagaHeader}>
                      <div className={styles.vagaTitle}>
                        <h3>{vaga.titulo}</h3>
                        {getStatusBadge(vaga.status)}
                      </div>
                      <p className={styles.vagaDescricao}>{vaga.descricao}</p>
                    </div>

                    <div className={styles.vagaDetails}>
                      <div className={styles.detailItem}>
                        <MapPin size={16} />
                        <span>{vaga.localizacao}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <DollarSign size={16} />
                        <span>{vaga.salario}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Clock size={16} />
                        <span>{vaga.tipo} • {vaga.nivel}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <Users size={16} />
                        <span>{vaga.candidatosIndicados} candidatos</span>
                      </div>
                    </div>

                    <div className={styles.vagaFooter}>
                      <div className={styles.vagaDates}>
                        <div className={styles.dateInfo}>
                          <span className={styles.dateLabel}>Publicada:</span>
                          <span className={styles.dateValue}>{new Date(vaga.dataPublicacao).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className={styles.dateInfo}>
                          <span className={styles.dateLabel}>Expira:</span>
                          <span className={styles.dateValue}>{new Date(vaga.dataExpiracao).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      <div className={styles.vagaActions}>
                        <Link 
                          href={`/empresa/candidatos?vaga=${vaga.id}`}
                          className={styles.actionBtn}
                          title="Ver candidatos"
                        >
                          <Users size={16} />
                          Candidatos
                        </Link>
                        <Link 
                          href={`/empresa/vagas/${vaga.id}/editar`}
                          className={styles.actionBtn}
                          title="Editar vaga"
                        >
                          <Edit size={16} />
                          Editar
                        </Link>
                        <Link 
                          href={`/empresa/vagas/${vaga.id}`}
                          className={styles.actionBtn}
                          title="Ver detalhes"
                        >
                          <Eye size={16} />
                          Ver
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 