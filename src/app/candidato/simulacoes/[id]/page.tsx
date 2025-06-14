'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { AuthService, User as UserType } from '@/lib/auth';
import DashboardHeader from '@/components/DashboardHeader';
import { 
  ArrowLeft,
  Clock,
  CheckCircle,
  Target,
  Star,
  BarChart3,
  ArrowRight,
  Home
} from 'lucide-react';
import styles from './simulacao.module.css';

interface Question {
  id: number;
  text: string;
  tips?: string[];
}

interface SimulationData {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  estimatedTime: number;
}

interface Answer {
  questionId: number;
  text: string;
}

export default function SimulacaoDetalhePage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [simulation, setSimulation] = useState<SimulationData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getUser();
    if (!currentUser || currentUser.type !== 'candidato') {
      router.push('/candidato/login');
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadSimulation();
  }, [params.id]);

  const loadSimulation = () => {
    // Mock data - em produção viria da API
    const mockSimulation: SimulationData = {
      id: Number(params.id),
      title: 'Entrevista Comportamental Básica',
      description: 'Simulação focada em perguntas comportamentais para avaliar experiências e motivações.',
      estimatedTime: 20,
      questions: [
        {
          id: 1,
          text: 'Fale sobre você e sua experiência profissional.',
          tips: [
            'Mantenha uma apresentação objetiva de 2-3 minutos',
            'Destaque suas principais conquistas',
            'Conecte sua experiência com a vaga desejada'
          ]
        },
        {
          id: 2,
          text: 'Por que você quer trabalhar nos Emirados Árabes Unidos?',
          tips: [
            'Demonstre conhecimento sobre o mercado local',
            'Fale sobre crescimento profissional',
            'Mencione a diversidade cultural'
          ]
        },
        {
          id: 3,
          text: 'Conte sobre um desafio profissional que você superou.',
          tips: [
            'Use a técnica STAR (Situação, Tarefa, Ação, Resultado)',
            'Seja específico nos resultados alcançados',
            'Mostre suas habilidades de resolução de problemas'
          ]
        },
        {
          id: 4,
          text: 'Quais são seus pontos fortes e como eles se aplicam ao trabalho?',
          tips: [
            'Cite 2-3 pontos fortes principais',
            'Dê exemplos práticos de como utilizou essas qualidades',
            'Relacione com resultados concretos'
          ]
        },
        {
          id: 5,
          text: 'Onde você se vê profissionalmente em 5 anos?',
          tips: [
            'Mostre ambição e planejamento de carreira',
            'Conecte seus objetivos com oportunidades na região',
            'Demonstre comprometimento de longo prazo'
          ]
        }
      ]
    };

    setSimulation(mockSimulation);
    setLoading(false);
  };

  const saveCurrentAnswer = () => {
    if (!currentAnswer.trim()) return;

    const answer: Answer = {
      questionId: simulation!.questions[currentQuestion].id,
      text: currentAnswer.trim()
    };

    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === answer.questionId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = answer;
        return updated;
      }
      return [...prev, answer];
    });
  };

  const nextQuestion = () => {
    saveCurrentAnswer();
    
    if (currentQuestion < simulation!.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      // Carregar resposta existente se houver
      const existingAnswer = answers.find(a => a.questionId === simulation!.questions[currentQuestion + 1].id);
      setCurrentAnswer(existingAnswer?.text || '');
    } else {
      finishSimulation();
    }
  };

  const previousQuestion = () => {
    saveCurrentAnswer();
    
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Carregar resposta existente
      const existingAnswer = answers.find(a => a.questionId === simulation!.questions[currentQuestion - 1].id);
      setCurrentAnswer(existingAnswer?.text || '');
    }
  };

  const finishSimulation = () => {
    saveCurrentAnswer();
    setIsCompleted(true);
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

  if (!simulation) {
    return (
      <div className={styles.errorPage}>
        <h1>Simulação não encontrada</h1>
        <Link href="/candidato/simulacoes" className="btn btn-primary">
          Voltar para Simulações
        </Link>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className={styles.simulacaoPage}>
        <DashboardHeader user={user} userType="candidato" />
        <div className={styles.completedContainer}>
          <div className={styles.completedContent}>
            <div className={styles.completedIcon}>
              <CheckCircle size={64} />
            </div>
            
            <h1>Simulação Concluída!</h1>
            <p>Parabéns! Você completou todas as perguntas da simulação.</p>

            <div className={styles.completedStats}>
              <div className={styles.completedStat}>
                <span className={styles.statNumber}>{simulation.questions.length}</span>
                <span className={styles.statLabel}>Perguntas Respondidas</span>
              </div>
              <div className={styles.completedStat}>
                <span className={styles.statNumber}>{simulation.estimatedTime}min</span>
                <span className={styles.statLabel}>Tempo Estimado</span>
              </div>
            </div>

            <div className={styles.completedActions}>
              <Link href="/candidato/simulacoes" className="btn btn-primary">
                <Home size={16} />
                Voltar às Simulações
              </Link>
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setIsCompleted(false);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setCurrentAnswer('');
                }}
              >
                Refazer Simulação
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / simulation.questions.length) * 100;

  return (
    <div className={styles.simulacaoPage}>
      <DashboardHeader user={user} userType="candidato" />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className="container">
          <div className={styles.simulationContainer}>
            <div className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <h2>Pergunta {currentQuestion + 1}</h2>
              </div>
              
              <div className={styles.questionText}>
                <p>{simulation.questions[currentQuestion].text}</p>
              </div>

              {simulation.questions[currentQuestion].tips && (
                <div className={styles.questionTips}>
                  <h4>💡 Dicas para uma boa resposta:</h4>
                  <ul>
                    {simulation.questions[currentQuestion].tips!.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.answerSection}>
                <label htmlFor="answer">Sua resposta:</label>
                <textarea
                  id="answer"
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  placeholder="Digite sua resposta aqui... Seja claro e objetivo."
                  rows={8}
                />
                <div className={styles.answerInfo}>
                  <span>{currentAnswer.length} caracteres</span>
                </div>
              </div>

              <div className={styles.questionActions}>
                <button 
                  className="btn btn-secondary"
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                >
                  Anterior
                </button>
                
                <button 
                  className="btn btn-primary"
                  onClick={nextQuestion}
                  disabled={!currentAnswer.trim()}
                >
                  {currentQuestion === simulation.questions.length - 1 ? 'Finalizar' : 'Próxima'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 