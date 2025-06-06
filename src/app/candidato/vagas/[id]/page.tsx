'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

type Props = {
  params: {
    id: string;
  };
}

export default function DetalhesVagaPage({ params }: Props) {
  const router = useRouter();
  const [vaga, setVaga] = useState({
    id: params.id,
    titulo: 'Desenvolvedor Full Stack',
    empresa: 'Tech Solutions',
    localizacao: 'Remoto',
    tipo: 'Tempo Integral',
    salario: 'R$ 8.000 - R$ 12.000',
    descricao: 'Estamos procurando um desenvolvedor Full Stack experiente para se juntar à nossa equipe...',
    requisitos: [
      'Experiência com React e Node.js',
      'Conhecimento em banco de dados SQL e NoSQL',
      'Experiência com metodologias ágeis',
      'Boa comunicação e trabalho em equipe'
    ],
    beneficios: [
      'Plano de saúde',
      'Vale refeição',
      'Gympass',
      'Horário flexível',
      'PLR'
    ],
    dataPublicacao: '15/03/2024',
    candidatos: 45,
    matchScore: 92
  });

  const [candidaturaEnviada, setCandidaturaEnviada] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está logado
    const userType = Cookies.get('userType');
    if (!userType || userType !== 'candidato') {
      router.push('/candidato/login');
    }
  }, [router]);

  const handleCandidatura = () => {
    // Aqui você implementaria a lógica para enviar a candidatura
    setCandidaturaEnviada(true);
    // Simular envio da candidatura
    setTimeout(() => {
      router.push('/candidato/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cabeçalho */}
        <div className="mb-8">
          <Link href="/candidato/dashboard" className="text-[#D4AF37] hover:text-[#B38F2E] mb-4 inline-block">
            ← Voltar para o Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{vaga.titulo}</h1>
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-gray-600">{vaga.empresa}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{vaga.localizacao}</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{vaga.tipo}</span>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6">
            {/* Informações Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Informações da Vaga</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Salário:</span> {vaga.salario}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Publicada em:</span> {vaga.dataPublicacao}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Candidatos:</span> {vaga.candidatos}
                  </p>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Seu Match</h2>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#D4AF37] h-2.5 rounded-full"
                      style={{ width: `${vaga.matchScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-4 text-lg font-medium text-gray-900">{vaga.matchScore}%</span>
                </div>
              </div>
            </div>

            {/* Descrição */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Descrição</h2>
              <p className="text-gray-600 whitespace-pre-line">{vaga.descricao}</p>
            </div>

            {/* Requisitos */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Requisitos</h2>
              <ul className="list-disc list-inside space-y-2">
                {vaga.requisitos.map((requisito, index) => (
                  <li key={index} className="text-gray-600">{requisito}</li>
                ))}
              </ul>
            </div>

            {/* Benefícios */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Benefícios</h2>
              <ul className="list-disc list-inside space-y-2">
                {vaga.beneficios.map((beneficio, index) => (
                  <li key={index} className="text-gray-600">{beneficio}</li>
                ))}
              </ul>
            </div>

            {/* Botão de Candidatura */}
            <div className="border-t pt-6">
              {candidaturaEnviada ? (
                <div className="text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-md bg-green-100 text-green-800">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Candidatura enviada com sucesso!
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleCandidatura}
                  className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#D4AF37] hover:bg-[#B38F2E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37]"
                >
                  Candidatar-se
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 