'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/api/client'

export default function AdminLoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Se já estiver logado e for admin, redirecionar para dashboard
    if (isAuthenticated()) {
      router.push('/admin')
    }
  }, [isAuthenticated, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Limpa o erro do campo quando ele é modificado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const result = await login(formData.email, formData.senha, 'admin')
      
      if (result.sucesso) {
        // Login bem-sucedido - redirecionar para dashboard admin
        router.push('/admin')
      } else {
        setErrors({
          email: result.erro || 'Credenciais inválidas',
          senha: result.erro || 'Credenciais inválidas'
        })
      }
    } catch (error: any) {
      setErrors({
        email: error.message || 'Erro no login',
        senha: error.message || 'Erro no login'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Leão Careers</h1>
          <h2 className="text-2xl font-bold text-gray-900">Área Administrativa</h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesse o painel de controle da plataforma
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail Administrativo
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1">
                <input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.senha}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.senha ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100`}
                />
                {errors.senha && <p className="mt-2 text-sm text-red-600">{errors.senha}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {isLoading ? 'Entrando...' : 'Entrar no Painel'}
              </button>
            </div>
          </form>

          {/* Credenciais de Teste */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="text-sm font-medium text-blue-800">Credenciais de Teste:</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p><strong>E-mail:</strong> admin@leaocareers.com</p>
              <p><strong>Senha:</strong> LeaoAdmin2024!</p>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Use estas credenciais para acessar o sistema de administração
            </p>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Acesso Restrito</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Esta área é restrita para uso exclusivo da equipe administrativa da Leão Careers.
                <br />
                Acesso não autorizado é proibido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 