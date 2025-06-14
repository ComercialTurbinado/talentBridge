'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Crown, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  GraduationCap,
  Award,
  Star,
  Edit3,
  Save,
  X,
  Plus,
  Trash2,
  Bell,
  Settings,
  LogOut,
  Camera,
  Eye,
  EyeOff,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  Upload,
  Download,
  FileText,
  Languages,
  TrendingUp
} from 'lucide-react';
import { AuthService, User as UserType } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import styles from './perfil.module.css';

export default function CandidatoPerfil() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pessoal');
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    personalInfo: {
      fullName: 'João Silva',
      email: 'joao.silva@email.com',
      phone: '+55 11 99999-9999',
      location: 'São Paulo, Brasil',
      birthDate: '1990-05-15',
      nationality: 'Brasileira',
      aboutMe: 'Desenvolvedor Full Stack com 8 anos de experiência em tecnologias web modernas. Especializado em React, Node.js e arquiteturas de microserviços.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      linkedin: 'https://linkedin.com/in/joaosilva',
      github: 'https://github.com/joaosilva',
      website: 'https://joaosilva.dev'
    },
    experience: [
      {
        id: 1,
        company: 'TechCorp Brasil',
        position: 'Desenvolvedor Sênior',
        location: 'São Paulo, Brasil',
        startDate: '2020-03',
        endDate: 'atual',
        description: 'Desenvolvimento de aplicações web escaláveis usando React, Node.js e AWS. Liderança técnica de equipe de 5 desenvolvedores.'
      },
      {
        id: 2,
        company: 'StartupXYZ',
        position: 'Desenvolvedor Full Stack',
        location: 'Rio de Janeiro, Brasil',
        startDate: '2018-01',
        endDate: '2020-02',
        description: 'Criação de MVP e desenvolvimento de produtos digitais. Stack: React, Express, MongoDB, Docker.'
      }
    ],
    education: [
      {
        id: 1,
        institution: 'USP - Universidade de São Paulo',
        degree: 'Bacharelado em Ciência da Computação',
        location: 'São Paulo, Brasil',
        startDate: '2012-02',
        endDate: '2016-12',
        gpa: '8.5/10'
      }
    ],
    skills: [
      { id: 1, name: 'JavaScript', level: 'Avançado', years: 8 },
      { id: 2, name: 'React', level: 'Avançado', years: 6 },
      { id: 3, name: 'Node.js', level: 'Avançado', years: 5 },
      { id: 4, name: 'TypeScript', level: 'Intermediário', years: 4 },
      { id: 5, name: 'AWS', level: 'Intermediário', years: 3 },
      { id: 6, name: 'Docker', level: 'Intermediário', years: 3 }
    ],
    languages: [
      { id: 1, language: 'Português', level: 'Nativo' },
      { id: 2, language: 'Inglês', level: 'Fluente' },
      { id: 3, language: 'Espanhol', level: 'Intermediário' }
    ],
    certifications: [
      {
        id: 1,
        name: 'AWS Certified Solutions Architect',
        issuer: 'Amazon Web Services',
        date: '2023-08',
        url: 'https://aws.amazon.com/certification/'
      },
      {
        id: 2,
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022-12',
        url: 'https://developers.facebook.com/certification/'
      }
    ]
  });

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'candidato') {
      router.push('/candidato/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  const handleSave = () => {
    // Aqui salvaria os dados no backend
    setEditMode(false);
    // Simular sucesso
    alert('Perfil atualizado com sucesso!');
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    setProfileData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const removeExperience = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addSkill = () => {
    const newSkill = {
      id: Date.now(),
      name: '',
      level: 'Básico',
      years: 1
    };
    setProfileData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
  };

  const removeSkill = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      institution: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: ''
    };
    setProfileData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const removeEducation = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now(),
      name: '',
      issuer: '',
      date: '',
      url: ''
    };
    setProfileData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCert]
    }));
  };

  const removeCertification = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  };

  const addLanguage = () => {
    const newLang = {
      id: Date.now(),
      language: '',
      level: 'Básico'
    };
    setProfileData(prev => ({
      ...prev,
      languages: [...prev.languages, newLang]
    }));
  };

  const removeLanguage = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  };

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

  return (
    <div className={styles.perfilPage}>
      <DashboardHeader user={user} userType="candidato" />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className="container">
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.profileInfo}>
              <div className={styles.avatarSection}>
                <Image 
                  src={profileData.personalInfo.avatar} 
                  alt={profileData.personalInfo.fullName}
                  className={styles.avatar}
                  width={150}
                  height={150}
                    />
                <button className={styles.avatarEdit}>
                  <Camera size={16} />
                </button>
              </div>
              
              <div className={styles.basicInfo}>
                <h1>{profileData.personalInfo.fullName}</h1>
                <p className={styles.email}>{profileData.personalInfo.email}</p>
                <div className={styles.location}>
                  <MapPin size={16} />
                  <span>{profileData.personalInfo.location}</span>
                </div>
                
                <div className={styles.socialLinks}>
                  {profileData.personalInfo.linkedin && (
                    <a href={profileData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {profileData.personalInfo.github && (
                    <a href={profileData.personalInfo.github} target="_blank" rel="noopener noreferrer">
                      <Github size={20} />
                    </a>
                  )}
                  {profileData.personalInfo.website && (
                    <a href={profileData.personalInfo.website} target="_blank" rel="noopener noreferrer">
                      <Globe size={20} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.profileActions}>
              <div className={styles.profileScore}>
                <div className={styles.scoreValue}>87%</div>
                <div className={styles.scoreLabel}>Perfil Completo</div>
              </div>
              
              {!editMode ? (
                <button 
                  className="btn btn-primary"
                  onClick={() => setEditMode(true)}
                >
                  <Edit3 size={16} />
                  Editar Perfil
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button 
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    <Save size={16} />
                    Salvar
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setEditMode(false)}
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Navigation */}
          <div className={styles.profileNav}>
            <button 
              className={`${styles.navTab} ${activeTab === 'pessoal' ? styles.active : ''}`}
              onClick={() => setActiveTab('pessoal')}
            >
              <User size={18} />
              Informações Pessoais
            </button>
            <button 
              className={`${styles.navTab} ${activeTab === 'experiencia' ? styles.active : ''}`}
              onClick={() => setActiveTab('experiencia')}
            >
              <Briefcase size={18} />
              Experiência
            </button>
            <button 
              className={`${styles.navTab} ${activeTab === 'educacao' ? styles.active : ''}`}
              onClick={() => setActiveTab('educacao')}
            >
              <GraduationCap size={18} />
              Educação
            </button>
            <button 
              className={`${styles.navTab} ${activeTab === 'habilidades' ? styles.active : ''}`}
              onClick={() => setActiveTab('habilidades')}
            >
              <Star size={18} />
              Habilidades
            </button>
            <button 
              className={`${styles.navTab} ${activeTab === 'certificacoes' ? styles.active : ''}`}
              onClick={() => setActiveTab('certificacoes')}
            >
              <Award size={18} />
              Certificações
            </button>
          </div>

          {/* Profile Content */}
          <div className={styles.profileContent}>
            {/* Informações Pessoais */}
            {activeTab === 'pessoal' && (
              <div className={styles.tabContent}>
                <div className={styles.section}>
                  <h3>Informações Pessoais</h3>
                  
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label>Nome Completo</label>
                      {editMode ? (
                        <input 
                          type="text" 
                          value={profileData.personalInfo.fullName}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                          }))}
                        />
                      ) : (
                        <p>{profileData.personalInfo.fullName}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Email</label>
                      {editMode ? (
                        <input 
                          type="email" 
                          value={profileData.personalInfo.email}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, email: e.target.value }
                          }))}
                        />
                      ) : (
                        <p>{profileData.personalInfo.email}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Telefone</label>
                      {editMode ? (
                        <input 
                          type="tel" 
                          value={profileData.personalInfo.phone}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, phone: e.target.value }
                          }))}
                        />
                      ) : (
                        <p>{profileData.personalInfo.phone}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Localização</label>
                      {editMode ? (
                        <input 
                          type="text" 
                          value={profileData.personalInfo.location}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, location: e.target.value }
                          }))}
                        />
                      ) : (
                        <p>{profileData.personalInfo.location}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Data de Nascimento</label>
                      {editMode ? (
                        <input 
                          type="date" 
                          value={profileData.personalInfo.birthDate}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, birthDate: e.target.value }
                          }))}
                        />
                      ) : (
                        <p>{new Date(profileData.personalInfo.birthDate).toLocaleDateString('pt-BR')}</p>
                      )}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Nacionalidade</label>
                      {editMode ? (
                        <input 
                          type="text" 
                          value={profileData.personalInfo.nationality}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            personalInfo: { ...prev.personalInfo, nationality: e.target.value }
                          }))}
                        />
                      ) : (
                        <p>{profileData.personalInfo.nationality}</p>
                      )}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Sobre Mim</label>
                    {editMode ? (
                      <textarea 
                        rows={4}
                        value={profileData.personalInfo.aboutMe}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, aboutMe: e.target.value }
                        }))}
                      />
                    ) : (
                      <p>{profileData.personalInfo.aboutMe}</p>
                    )}
                  </div>

                  <div className={styles.socialSection}>
                    <h4>Redes Sociais</h4>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label>LinkedIn</label>
                        {editMode ? (
                          <input 
                            type="url" 
                            value={profileData.personalInfo.linkedin}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                            }))}
                          />
                        ) : (
                          <a href={profileData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                            {profileData.personalInfo.linkedin}
                          </a>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>GitHub</label>
                        {editMode ? (
                          <input 
                            type="url" 
                            value={profileData.personalInfo.github}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, github: e.target.value }
                            }))}
                          />
                        ) : (
                          <a href={profileData.personalInfo.github} target="_blank" rel="noopener noreferrer">
                            {profileData.personalInfo.github}
                          </a>
                        )}
                      </div>

                      <div className={styles.formGroup}>
                        <label>Website</label>
                        {editMode ? (
                          <input 
                            type="url" 
                            value={profileData.personalInfo.website}
                            onChange={(e) => setProfileData(prev => ({
                              ...prev,
                              personalInfo: { ...prev.personalInfo, website: e.target.value }
                            }))}
                          />
                        ) : (
                          <a href={profileData.personalInfo.website} target="_blank" rel="noopener noreferrer">
                            {profileData.personalInfo.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Experiência */}
            {activeTab === 'experiencia' && (
              <div className={styles.tabContent}>
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h3>Experiência Profissional</h3>
                    {editMode && (
                      <button className="btn btn-secondary btn-small" onClick={addExperience}>
                        <Plus size={16} />
                        Adicionar
                      </button>
                    )}
                  </div>

                  <div className={styles.experienceList}>
                    {profileData.experience.map((exp) => (
                      <div key={exp.id} className={styles.experienceItem}>
                        {editMode && (
                          <button 
                            className={styles.removeBtn}
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        
                        <div className={styles.expHeader}>
                          <div className={styles.expInfo}>
                            {editMode ? (
                              <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                  <label>Cargo</label>
                                  <input 
                                    type="text" 
                                    value={exp.position}
                                    onChange={(e) => setProfileData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, position: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Ex: Desenvolvedor Full Stack"
                                  />
                                </div>
                                <div className={styles.formGroup}>
                                  <label>Empresa</label>
                                  <input 
                                    type="text" 
                                    value={exp.company}
                                    onChange={(e) => setProfileData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, company: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Ex: TechCorp Brasil"
                                  />
                                </div>
                                <div className={styles.formGroup}>
                                  <label>Localização</label>
                                  <input 
                                    type="text" 
                                    value={exp.location}
                                    onChange={(e) => setProfileData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, location: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Ex: São Paulo, Brasil"
                                  />
                                </div>
                                <div className={styles.formGroup}>
                                  <label>Data de Início</label>
                                  <input 
                                    type="month" 
                                    value={exp.startDate}
                                    onChange={(e) => setProfileData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, startDate: e.target.value } : item
                                      )
                                    }))}
                                  />
                                </div>
                                <div className={styles.formGroup}>
                                  <label>Data de Fim</label>
                                  <input 
                                    type="month" 
                                    value={exp.endDate}
                                    onChange={(e) => setProfileData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, endDate: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Deixe vazio se ainda trabalha aqui"
                                  />
                                </div>
                                <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                                  <label>Descrição</label>
                                  <textarea 
                                    rows={3}
                                    value={exp.description}
                                    onChange={(e) => setProfileData(prev => ({
                                      ...prev,
                                      experience: prev.experience.map(item => 
                                        item.id === exp.id ? { ...item, description: e.target.value } : item
                                      )
                                    }))}
                                    placeholder="Descreva suas principais responsabilidades e conquistas..."
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <h4>{exp.position}</h4>
                                <p className={styles.company}>{exp.company}</p>
                                <div className={styles.expMeta}>
                                  <span className={styles.location}>
                                    <MapPin size={14} />
                                    {exp.location}
                                  </span>
                                  <span className={styles.period}>
                                    <Calendar size={14} />
                                    {exp.startDate} - {exp.endDate || 'atual'}
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {!editMode && (
                          <div className={styles.expDescription}>
                            <p>{exp.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Habilidades */}
            {activeTab === 'habilidades' && (
              <div className={styles.tabContent}>
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h3>Habilidades Técnicas</h3>
                    {editMode && (
                      <button className="btn btn-secondary btn-small" onClick={addSkill}>
                        <Plus size={16} />
                        Adicionar
                      </button>
                    )}
                  </div>

                  <div className={styles.skillsGrid}>
                    {profileData.skills.map((skill) => (
                      <div key={skill.id} className={styles.skillCard}>
                        {editMode && (
                          <button 
                            className={styles.removeBtn}
                            onClick={() => removeSkill(skill.id)}
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                        
                        <div className={styles.skillInfo}>
                          {editMode ? (
                            <div className={styles.skillEditForm}>
                              <div className={styles.formGroup}>
                                <label>Nome da Habilidade</label>
                                <input 
                                  type="text" 
                                  value={skill.name}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    skills: prev.skills.map(item => 
                                      item.id === skill.id ? { ...item, name: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: JavaScript"
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Nível</label>
                                <select 
                                  value={skill.level}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    skills: prev.skills.map(item => 
                                      item.id === skill.id ? { ...item, level: e.target.value } : item
                                    )
                                  }))}
                                >
                                  <option value="Básico">Básico</option>
                                  <option value="Intermediário">Intermediário</option>
                                  <option value="Avançado">Avançado</option>
                                </select>
                              </div>
                              <div className={styles.formGroup}>
                                <label>Anos de Experiência</label>
                                <input 
                                  type="number" 
                                  min="1" 
                                  max="50"
                                  value={skill.years}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    skills: prev.skills.map(item => 
                                      item.id === skill.id ? { ...item, years: parseInt(e.target.value) || 1 } : item
                                    )
                                  }))}
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <h4>{skill.name}</h4>
                              <p className={styles.skillLevel}>{skill.level}</p>
                              <span className={styles.skillYears}>{skill.years} anos</span>
                            </>
                          )}
                        </div>
                        
                        {!editMode && (
                          <div className={styles.skillProgress}>
                            <div 
                              className={styles.progressBar}
                              style={{ 
                                width: skill.level === 'Básico' ? '30%' : 
                                       skill.level === 'Intermediário' ? '60%' : '90%' 
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className={styles.languagesSection}>
                    <div className={styles.sectionHeader}>
                      <h4>Idiomas</h4>
                      {editMode && (
                        <button className="btn btn-secondary btn-small" onClick={addLanguage}>
                          <Plus size={16} />
                          Adicionar
                        </button>
                      )}
                    </div>
                    <div className={styles.languagesList}>
                      {profileData.languages.map((lang) => (
                        <div key={lang.id} className={styles.languageItem}>
                          {editMode && (
                            <button 
                              className={styles.removeBtn}
                              onClick={() => removeLanguage(lang.id)}
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                          <div className={styles.languageInfo}>
                            {editMode ? (
                              <div className={styles.languageEditForm}>
                                <input 
                                  type="text" 
                                  value={lang.language}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    languages: prev.languages.map(item => 
                                      item.id === lang.id ? { ...item, language: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: Português"
                                />
                                <select 
                                  value={lang.level}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    languages: prev.languages.map(item => 
                                      item.id === lang.id ? { ...item, level: e.target.value } : item
                                    )
                                  }))}
                                >
                                  <option value="Básico">Básico</option>
                                  <option value="Intermediário">Intermediário</option>
                                  <option value="Avançado">Avançado</option>
                                  <option value="Fluente">Fluente</option>
                                  <option value="Nativo">Nativo</option>
                                </select>
                              </div>
                            ) : (
                              <>
                                <span className={styles.languageName}>{lang.language}</span>
                                <span className={styles.languageLevel}>{lang.level}</span>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Outras abas seguem o mesmo padrão... */}
            {activeTab === 'educacao' && (
              <div className={styles.tabContent}>
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h3>Educação</h3>
                    {editMode && (
                      <button className="btn btn-secondary btn-small" onClick={addEducation}>
                        <Plus size={16} />
                        Adicionar
                      </button>
                    )}
                  </div>
                  <div className={styles.educationList}>
                    {profileData.education.map((edu) => (
                      <div key={edu.id} className={styles.educationItem}>
                        {editMode && (
                          <button 
                            className={styles.removeBtn}
                            onClick={() => removeEducation(edu.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        <div className={styles.eduHeader}>
                          {editMode ? (
                            <div className={styles.formGrid}>
                              <div className={styles.formGroup}>
                                <label>Curso/Grau</label>
                                <input 
                                  type="text" 
                                  value={edu.degree}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    education: prev.education.map(item => 
                                      item.id === edu.id ? { ...item, degree: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: Bacharelado em Ciência da Computação"
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Instituição</label>
                                <input 
                                  type="text" 
                                  value={edu.institution}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    education: prev.education.map(item => 
                                      item.id === edu.id ? { ...item, institution: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: USP - Universidade de São Paulo"
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Localização</label>
                                <input 
                                  type="text" 
                                  value={edu.location}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    education: prev.education.map(item => 
                                      item.id === edu.id ? { ...item, location: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: São Paulo, Brasil"
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Data de Início</label>
                                <input 
                                  type="month" 
                                  value={edu.startDate}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    education: prev.education.map(item => 
                                      item.id === edu.id ? { ...item, startDate: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Data de Fim</label>
                                <input 
                                  type="month" 
                                  value={edu.endDate}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    education: prev.education.map(item => 
                                      item.id === edu.id ? { ...item, endDate: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Nota/CRA (opcional)</label>
                                <input 
                                  type="text" 
                                  value={edu.gpa || ''}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    education: prev.education.map(item => 
                                      item.id === edu.id ? { ...item, gpa: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: 8.5/10"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <h4>{edu.degree}</h4>
                              <p className={styles.institution}>{edu.institution}</p>
                              <div className={styles.eduMeta}>
                                <span className={styles.location}>
                                  <MapPin size={14} />
                                  {edu.location}
                                </span>
                                <span className={styles.period}>
                                  <Calendar size={14} />
                                  {edu.startDate} - {edu.endDate}
                                </span>
                              </div>
                              {edu.gpa && (
                                <div className={styles.gpa}>
                                  <TrendingUp size={14} />
                                  CRA: {edu.gpa}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'certificacoes' && (
              <div className={styles.tabContent}>
                <div className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <h3>Certificações</h3>
                    {editMode && (
                      <button className="btn btn-secondary btn-small" onClick={addCertification}>
                        <Plus size={16} />
                        Adicionar
                      </button>
                    )}
                  </div>
                  <div className={styles.certificationsList}>
                    {profileData.certifications.map((cert) => (
                      <div key={cert.id} className={styles.certificationItem}>
                        {editMode && (
                          <button 
                            className={styles.removeBtn}
                            onClick={() => removeCertification(cert.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                        {!editMode && (
                          <div className={styles.certIcon}>
                            <Award size={24} />
                          </div>
                        )}
                        <div className={styles.certInfo}>
                          {editMode ? (
                            <div className={styles.formGrid}>
                              <div className={styles.formGroup}>
                                <label>Nome da Certificação</label>
                                <input 
                                  type="text" 
                                  value={cert.name}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, name: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: AWS Certified Solutions Architect"
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Emissor</label>
                                <input 
                                  type="text" 
                                  value={cert.issuer}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, issuer: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="Ex: Amazon Web Services"
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>Data de Emissão</label>
                                <input 
                                  type="month" 
                                  value={cert.date}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, date: e.target.value } : item
                                    )
                                  }))}
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label>URL da Certificação (opcional)</label>
                                <input 
                                  type="url" 
                                  value={cert.url}
                                  onChange={(e) => setProfileData(prev => ({
                                    ...prev,
                                    certifications: prev.certifications.map(item => 
                                      item.id === cert.id ? { ...item, url: e.target.value } : item
                                    )
                                  }))}
                                  placeholder="https://..."
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <h4>{cert.name}</h4>
                              <p className={styles.issuer}>{cert.issuer}</p>
                              <span className={styles.certDate}>
                                <Calendar size={14} />
                                {cert.date}
                              </span>
                            </>
                          )}
                        </div>
                        {!editMode && cert.url && (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 