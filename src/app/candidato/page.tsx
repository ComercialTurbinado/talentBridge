'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function CandidatoPage() {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o usuário está logado
    const userType = Cookies.get('userType');
    if (userType === 'candidato') {
      router.push('/candidato/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Bem-vindo à Conexões Dubai
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Conectamos talentos brasileiros com oportunidades internacionais. Comece sua jornada conosco.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {/* Card de Cadastro */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Novo Candidato
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Cadastre-se e comece a encontrar as melhores oportunidades para sua carreira.
                </p>
              </div>
              <div className="mt-5">
                <Link
                  href="/candidato/cadastro"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cadastrar Candidato
                </Link>
              </div>
            </div>
          </div>

          {/* Card de Login */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Já é Cadastrado?
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  Acesse sua conta para gerenciar seu perfil e candidaturas.
                </p>
              </div>
              <div className="mt-5">
                <Link
                  href="/candidato/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Fazer Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefícios */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Por que escolher a Conexões Dubai?
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Oportunidades Exclusivas</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Acesso a vagas em empresas internacionais de destaque
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Suporte Completo</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Acompanhamento em todo o processo de contratação e adaptação
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Crescimento Profissional</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Desenvolvimento de carreira em um ambiente internacional
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 