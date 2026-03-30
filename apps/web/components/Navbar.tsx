'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-blue-900 text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-yellow-400">🎓</span>
          <span>
            PORTECOS <span className="text-yellow-400">ACADEMIC</span> IA
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/cursos" className="hover:text-yellow-400 transition-colors">
            Cursos
          </Link>
          <Link href="/licao" className="hover:text-yellow-400 transition-colors">
            Lições
          </Link>
          <Link href="/perfil" className="hover:text-yellow-400 transition-colors">
            Perfil
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/perfil"
            className="text-sm px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-800 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/cursos"
            className="text-sm px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold transition-colors"
          >
            Começar Grátis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-blue-800 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-blue-800 pt-4 flex flex-col gap-3 text-sm">
          <Link href="/cursos" className="hover:text-yellow-400" onClick={() => setMobileOpen(false)}>Cursos</Link>
          <Link href="/licao" className="hover:text-yellow-400" onClick={() => setMobileOpen(false)}>Lições</Link>
          <Link href="/perfil" className="hover:text-yellow-400" onClick={() => setMobileOpen(false)}>Perfil</Link>
          <Link href="/cursos" className="btn-primary text-center mt-2" onClick={() => setMobileOpen(false)}>
            Começar Grátis
          </Link>
        </div>
      )}
    </nav>
  );
}
