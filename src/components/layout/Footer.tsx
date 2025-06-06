'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-gray-400 text-sm">
              Conectando talentos e oportunidades no mercado de trabalho.
              Nossa missão é facilitar o encontro entre profissionais qualificados
              e empresas que buscam excelência.
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/candidato" className="text-gray-400 hover:text-white text-sm">
                  Área do Candidato
                </Link>
              </li>
              <li>
                <Link href="/empresa" className="text-gray-400 hover:text-white text-sm">
                  Área da Empresa
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-400 hover:text-white text-sm">
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: contato@leaocareers.com</li>
              <li>Telefone: (11) 9999-9999</li>
              <li>Endereço: São Paulo, SP</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Leão Careers. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}; 