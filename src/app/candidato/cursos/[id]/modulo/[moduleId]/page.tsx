'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Crown, 
  ArrowLeft,
  ArrowRight,
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  RotateCcw,
  Clock, 
  CheckCircle,
  Lock,
  BookOpen,
  FileText,
  Video,
  Download,
  User,
  Bell,
  LogOut,
  Target,
  List,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Eye,
  Users,
  Star
} from 'lucide-react';
import { AuthService, User as UserType } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import styles from './modulo.module.css';

interface CourseModule {
  id: number;
  title: string;
  description: string;
  duration: number; // em minutos
  type: 'video' | 'text' | 'quiz' | 'assignment';
  completed: boolean;
  locked: boolean;
  videoUrl?: string;
  textContent?: string;
  resources?: {
    type: 'pdf' | 'link' | 'code';
    title: string;
    url: string;
    size?: string;
  }[];
  quiz?: {
    questions: {
      id: number;
      question: string;
      options: string[];
      correct: number;
    }[];
  };
}

interface Course {
  id: number;
  title: string;
  modules: CourseModule[];
  instructor: string;
  instructorAvatar: string;
}

export default function ModuloTreinamento() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;
  const moduleId = params.moduleId as string;
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);
  const [currentModuleData, setCurrentModuleData] = useState<CourseModule | null>(null);
  const [activeTab, setActiveTab] = useState('content');
  
  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'candidato') {
      router.push('/candidato/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
    loadCourse();
  }, [router]);

  const loadCourse = () => {
    // Mock data - em produção viria de uma API
    const mockCourse: Course = {
      id: parseInt(courseId),
      title: 'React.js Completo - Do Zero ao Avançado',
      instructor: 'Carlos Silva',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face',
      modules: [
        {
          id: 1,
          title: 'Introdução ao React',
          description: 'Conceitos básicos, instalação e primeiro componente',
          duration: 45,
          type: 'video',
          completed: true,
          locked: false,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          textContent: `
# Introdução ao React

React é uma biblioteca JavaScript para construir interfaces de usuário. Foi criada pelo Facebook e é mantida por uma comunidade ativa de desenvolvedores.

## O que é React?

React é uma biblioteca declarativa, eficiente e flexível para criar interfaces de usuário. Ela permite compor UIs complexas a partir de pequenos e isolados pedaços de código chamados "componentes".

## Principais Conceitos

### 1. Componentes
Componentes são como funções JavaScript. Eles aceitam entradas arbitrárias (chamadas "props") e retornam elementos React que descrevem o que deve aparecer na tela.

### 2. JSX
JSX é uma extensão de sintaxe para JavaScript. É recomendado usar JSX com React para descrever como a UI deveria parecer.

### 3. Props
Props são argumentos passados para componentes React. Props são passadas para componentes via atributos HTML.

### 4. State
State é similar a props, mas é privado e totalmente controlado pelo componente.

## Instalação

Para começar com React, você pode usar o Create React App:

\`\`\`bash
npx create-react-app meu-app
cd meu-app
npm start
\`\`\`

## Primeiro Componente

Aqui está um exemplo de um componente React simples:

\`\`\`jsx
function Welcome(props) {
  return <h1>Olá, {props.name}</h1>;
}
\`\`\`

Este componente aceita uma prop chamada "name" e retorna um elemento JSX.
          `,
          resources: [
            { type: 'pdf', title: 'Guia de Instalação React', url: '#', size: '2.5 MB' },
            { type: 'code', title: 'Código do Projeto Inicial', url: '#', size: '1.2 MB' },
            { type: 'link', title: 'Documentação Oficial React', url: 'https://reactjs.org' }
          ]
        },
        {
          id: 2,
          title: 'Componentes e Props',
          description: 'Criando componentes reutilizáveis e passando dados',
          duration: 60,
          type: 'video',
          completed: true,
          locked: false,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
        },
        {
          id: 3,
          title: 'State e Eventos',
          description: 'Gerenciando estado e manipulando eventos',
          duration: 75,
          type: 'video',
          completed: true,
          locked: false
        },
        {
          id: 4,
          title: 'Hooks Essenciais',
          description: 'useState, useEffect e outros hooks fundamentais',
          duration: 90,
          type: 'video',
          completed: false,
          locked: false,
          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
          textContent: `
# Hooks Essenciais do React

Os Hooks são uma adição ao React 16.8. Eles permitem que você use state e outras funcionalidades do React sem escrever uma classe.

## useState

O Hook useState permite adicionar state a componentes funcionais:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
\`\`\`

## useEffect

O Hook useEffect permite executar efeitos colaterais em componentes funcionais:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Você clicou \${count} vezes\`;
  });

  return (
    <div>
      <p>Você clicou {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>
        Clique aqui
      </button>
    </div>
  );
}
\`\`\`

## Regras dos Hooks

1. Apenas chame Hooks no nível superior
2. Apenas chame Hooks de funções React
3. Use o ESLint plugin para React Hooks
          `,
          quiz: {
            questions: [
              {
                id: 1,
                question: 'Qual Hook é usado para adicionar state a componentes funcionais?',
                options: ['useEffect', 'useState', 'useContext', 'useReducer'],
                correct: 1
              },
              {
                id: 2,
                question: 'O que o useEffect permite fazer?',
                options: [
                  'Apenas gerenciar state',
                  'Apenas fazer requisições HTTP',
                  'Executar efeitos colaterais',
                  'Apenas manipular eventos'
                ],
                correct: 2
              },
              {
                id: 3,
                question: 'Onde devemos chamar os Hooks?',
                options: [
                  'Dentro de loops',
                  'Dentro de condições',
                  'No nível superior da função',
                  'Dentro de outras funções'
                ],
                correct: 2
              }
            ]
          }
        },
        {
          id: 5,
          title: 'Context API',
          description: 'Gerenciamento de estado global com Context',
          duration: 80,
          type: 'video',
          completed: false,
          locked: false
        }
      ]
    };

    const currentModuleData = mockCourse.modules.find(m => m.id === parseInt(moduleId));
    setCourse(mockCourse);
    setCurrentModuleData(currentModuleData || null);
    setLoading(false);
  };

  const handleLogout = () => {
    AuthService.logout();
    router.push('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    const video = document.querySelector('video');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = document.querySelector('video');
    const newTime = parseFloat(e.target.value);
    if (video) {
      video.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    const video = document.querySelector('video');
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const video = document.querySelector('video');
    if (video) {
      if (isMuted) {
        video.volume = volume;
        setIsMuted(false);
      } else {
        video.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const changePlaybackRate = (rate: number) => {
    const video = document.querySelector('video');
    if (video) {
      video.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const skipTime = (seconds: number) => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    }
  };

  const handleQuizAnswer = (questionId: number, answerIndex: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
  };

  const getQuizScore = () => {
    if (!currentModuleData?.quiz) return 0;
    
    let correct = 0;
    currentModuleData.quiz.questions.forEach(question => {
      if (quizAnswers[question.id] === question.correct) {
        correct++;
      }
    });
    
    return Math.round((correct / currentModuleData.quiz.questions.length) * 100);
  };

  const getNextModule = () => {
    if (!course || !currentModuleData) return null;
    const currentIndex = course.modules.findIndex(m => m.id === currentModuleData.id);
    return currentIndex < course.modules.length - 1 ? course.modules[currentIndex + 1] : null;
  };

  const getPreviousModule = () => {
    if (!course || !currentModuleData) return null;
    const currentIndex = course.modules.findIndex(m => m.id === currentModuleData.id);
    return currentIndex > 0 ? course.modules[currentIndex - 1] : null;
  };

  const markAsCompleted = () => {
    // Em produção, isso faria uma chamada para a API
    if (currentModuleData) {
      setCurrentModuleData(prev => prev ? { ...prev, completed: true } : null);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!course || !currentModuleData) {
    return (
      <div className={styles.errorPage}>
        <h1>Módulo não encontrado</h1>
        <Link href={`/candidato/cursos/${courseId}`} className="btn btn-primary">
          Voltar ao Curso
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.moduloPage}>
      <DashboardHeader user={user} userType="candidato" />

      <div className={styles.moduleLayout}>
        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Video Player */}
          {currentModuleData.type === 'video' && currentModuleData.videoUrl && (
            <div className={styles.videoContainer}>
              <div 
                className={styles.videoPlayer}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  src={currentModuleData.videoUrl}
                  onTimeUpdate={handleVideoTimeUpdate}
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                  onLoadedMetadata={handleVideoTimeUpdate}
                  className={styles.video}
                />
                
                {showControls && (
                  <div className={styles.videoControls}>
                    <div className={styles.progressContainer}>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className={styles.progressBar}
                      />
                    </div>
                    
                    <div className={styles.controlsRow}>
                      <div className={styles.leftControls}>
                        <button onClick={togglePlayPause} className={styles.playBtn}>
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        
                        <button onClick={() => skipTime(-10)} className={styles.skipBtn}>
                          <SkipBack size={18} />
                        </button>
                        
                        <button onClick={() => skipTime(10)} className={styles.skipBtn}>
                          <SkipForward size={18} />
                        </button>
                        
                        <div className={styles.volumeControl}>
                          <button onClick={toggleMute} className={styles.volumeBtn}>
                            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                          </button>
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={isMuted ? 0 : volume}
                            onChange={handleVolumeChange}
                            className={styles.volumeSlider}
                          />
                        </div>
                        
                        <span className={styles.timeDisplay}>
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                      </div>
                      
                      <div className={styles.rightControls}>
                        <select 
                          value={playbackRate} 
                          onChange={(e) => changePlaybackRate(parseFloat(e.target.value))}
                          className={styles.speedSelect}
                        >
                          <option value={0.5}>0.5x</option>
                          <option value={0.75}>0.75x</option>
                          <option value={1}>1x</option>
                          <option value={1.25}>1.25x</option>
                          <option value={1.5}>1.5x</option>
                          <option value={2}>2x</option>
                        </select>
                        
                        <button className={styles.fullscreenBtn}>
                          <Maximize size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Content Tabs */}
          <div className={styles.contentTabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'content' ? styles.active : ''}`}
              onClick={() => setActiveTab('content')}
            >
              <BookOpen size={16} />
              Conteúdo
            </button>
            
            {currentModuleData.resources && currentModuleData.resources.length > 0 && (
              <button 
                className={`${styles.tab} ${activeTab === 'resources' ? styles.active : ''}`}
                onClick={() => setActiveTab('resources')}
              >
                <Download size={16} />
                Recursos ({currentModuleData.resources.length})
              </button>
            )}
            
            {currentModuleData.quiz && (
              <button 
                className={`${styles.tab} ${activeTab === 'quiz' ? styles.active : ''}`}
                onClick={() => setActiveTab('quiz')}
              >
                <Target size={16} />
                Quiz ({currentModuleData.quiz.questions.length} questões)
              </button>
            )}
            
            <button 
              className={`${styles.tab} ${activeTab === 'discussion' ? styles.active : ''}`}
              onClick={() => setActiveTab('discussion')}
            >
              <MessageSquare size={16} />
              Discussão
            </button>
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {activeTab === 'content' && (
              <div className={styles.contentTab}>
                <div className={styles.moduleHeader}>
                  <h1>{currentModuleData.title}</h1>
                  <p>{currentModuleData.description}</p>
                  
                  <div className={styles.moduleStats}>
                    <div className={styles.statItem}>
                      <Clock size={16} />
                      <span>{currentModuleData.duration} minutos</span>
                    </div>
                    <div className={styles.statItem}>
                      <Eye size={16} />
                      <span>1.2k visualizações</span>
                    </div>
                    {currentModuleData.completed && (
                      <div className={styles.statItem}>
                        <CheckCircle size={16} className={styles.completed} />
                        <span>Concluído</span>
                      </div>
                    )}
                  </div>
                </div>

                {currentModuleData.textContent && (
                  <div className={styles.textContent}>
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: currentModuleData.textContent
                          .replace(/\n/g, '<br>')
                          .replace(/```[\s\S]*?```/g, (match) => `<pre><code>${match.slice(3, -3)}</code></pre>`)
                          .replace(/`(.*?)`/g, '<code>$1</code>')
                          .replace(/### (.*)/g, '<h3>$1</h3>')
                          .replace(/## (.*)/g, '<h2>$1</h2>')
                          .replace(/# (.*)/g, '<h1>$1</h1>')
                      }} 
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'resources' && currentModuleData.resources && (
              <div className={styles.resourcesTab}>
                <h2>Recursos do Módulo</h2>
                <div className={styles.resourcesList}>
                  {currentModuleData.resources.map((resource, index) => (
                    <div key={index} className={styles.resourceItem}>
                      <div className={styles.resourceIcon}>
                        {resource.type === 'pdf' && <FileText size={24} />}
                        {resource.type === 'code' && <BookOpen size={24} />}
                        {resource.type === 'link' && <Download size={24} />}
                      </div>
                      
                      <div className={styles.resourceInfo}>
                        <h3>{resource.title}</h3>
                        {resource.size && <span className={styles.resourceSize}>{resource.size}</span>}
                      </div>
                      
                      <a href={resource.url} className="btn btn-secondary btn-small" download>
                        <Download size={16} />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && currentModuleData.quiz && (
              <div className={styles.quizTab}>
                <h2>Quiz do Módulo</h2>
                <p>Teste seus conhecimentos sobre o conteúdo apresentado.</p>
                
                <div className={styles.quizQuestions}>
                  {currentModuleData.quiz.questions.map((question, index) => (
                    <div key={question.id} className={styles.questionCard}>
                      <h3>Questão {index + 1}</h3>
                      <p>{question.question}</p>
                      
                      <div className={styles.options}>
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className={styles.option}>
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={optionIndex}
                              checked={quizAnswers[question.id] === optionIndex}
                              onChange={() => handleQuizAnswer(question.id, optionIndex)}
                              disabled={showQuizResults}
                            />
                            <span className={`${styles.optionText} ${
                              showQuizResults ? (
                                optionIndex === question.correct ? styles.correct :
                                quizAnswers[question.id] === optionIndex ? styles.incorrect : ''
                              ) : ''
                            }`}>
                              {option}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                {!showQuizResults ? (
                  <button 
                    onClick={submitQuiz}
                    className="btn btn-primary"
                    disabled={Object.keys(quizAnswers).length !== currentModuleData.quiz.questions.length}
                  >
                    Enviar Respostas
                  </button>
                ) : (
                  <div className={styles.quizResults}>
                    <h3>Resultado do Quiz</h3>
                    <div className={styles.score}>
                      <span className={styles.scoreNumber}>{getQuizScore()}%</span>
                      <span className={styles.scoreText}>
                        {getQuizScore() >= 70 ? 'Parabéns! Você passou!' : 'Você precisa estudar mais.'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'discussion' && (
              <div className={styles.discussionTab}>
                <h2>Perguntas e Respostas</h2>
                <p>Compartilhe suas dúvidas.</p>
                
                <div className={styles.discussionStats}>
                  <div className={styles.statItem}>
                    <MessageSquare size={16} />
                    <span>24 comentários</span>
                  </div>
                  <div className={styles.statItem}>
                    <Users size={16} />
                    <span>18 participantes</span>
                  </div>
                </div>
                
                <div className={styles.commentForm}>
                  <textarea 
                    placeholder="Faça uma pergunta ou compartilhe sua opinião..."
                    className={styles.commentInput}
                  />
                  <button className="btn btn-primary">Comentar</button>
                </div>
                
                <div className={styles.commentsList}>
                  <div className={styles.comment}>
                    <img 
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face" 
                      alt="Ana Silva" 
                    />
                    <div className={styles.commentContent}>
                      <div className={styles.commentHeader}>
                        <span className={styles.commentAuthor}>Ana Silva</span>
                        <span className={styles.commentTime}>há 2 horas</span>
                      </div>
                      <p>Excelente explicação sobre hooks! Consegui entender melhor o conceito de useState.</p>
                      <div className={styles.commentActions}>
                        <button className={styles.commentAction}>
                          <ThumbsUp size={14} />
                          12
                        </button>
                        <button className={styles.commentAction}>
                          <MessageSquare size={14} />
                          Responder
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Module Progress */}
          <div className={styles.sidebarCard}>
            <h3>Progresso do Módulo</h3>
            <div className={styles.progressInfo}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: currentModuleData.completed ? '100%' : '60%' }}
                ></div>
              </div>
              <span>{currentModuleData.completed ? '100%' : '60%'} concluído</span>
            </div>
            
            {!currentModuleData.completed && (
              <button onClick={markAsCompleted} className="btn btn-primary w-full">
                <CheckCircle size={16} />
                Marcar como Concluído
              </button>
            )}
          </div>

          {/* Module Navigation */}
          <div className={styles.sidebarCard}>
            <h3>Navegação</h3>
            <div className={styles.moduleNav}>
              {getPreviousModule() && (
                <Link 
                  href={`/candidato/cursos/${courseId}/modulo/${getPreviousModule()!.id}`}
                  className={styles.navButton}
                >
                  <ArrowLeft size={16} />
                  <div>
                    <span className={styles.navLabel}>Anterior</span>
                    <span className={styles.navTitle}>{getPreviousModule()!.title}</span>
                  </div>
                </Link>
              )}
              
              {getNextModule() && (
                <Link 
                  href={`/candidato/cursos/${courseId}/modulo/${getNextModule()!.id}`}
                  className={styles.navButton}
                >
                  <div>
                    <span className={styles.navLabel}>Próximo</span>
                    <span className={styles.navTitle}>{getNextModule()!.title}</span>
                  </div>
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Course Modules List */}
          <div className={styles.sidebarCard}>
            <h3>Módulos do Curso</h3>
            <div className={styles.modulesList}>
              {course.modules.map((module, index) => (
                <Link
                  key={module.id}
                  href={`/candidato/cursos/${courseId}/modulo/${module.id}`}
                  className={`${styles.moduleItem} ${
                    module.id === currentModuleData.id ? styles.active : ''
                  } ${module.locked ? styles.locked : ''}`}
                >
                  <div className={styles.moduleNumber}>
                    {module.completed ? (
                      <CheckCircle size={16} className={styles.completed} />
                    ) : module.locked ? (
                      <Lock size={16} />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  
                  <div className={styles.moduleInfo}>
                    <span className={styles.moduleTitle}>{module.title}</span>
                    <span className={styles.moduleDuration}>{module.duration} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div className={styles.sidebarCard}>
            <h3>Instrutor</h3>
            <div className={styles.instructorInfo}>
              <img src={course.instructorAvatar} alt={course.instructor} />
              <div>
                <h4>{course.instructor}</h4>
                <p>Desenvolvedor Full Stack</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 