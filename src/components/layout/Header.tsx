'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/images/logo.png"
                alt="Leão Careers"
                width={180}
                height={40}
                className="h-8 w-auto"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/candidato" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Área do Candidato
            </Link>
            <Link href="/empresa" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Área da Empresa
            </Link>
            <Link href="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Área Administrativa
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <span className="sr-only">Abrir menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/candidato" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              Área do Candidato
            </Link>
            <Link href="/empresa" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              Área da Empresa
            </Link>
            <Link href="/admin" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600">
              Área Administrativa
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}; 