'use client';

import Link from 'next/link';

const menuItems = [
  { href: '/', icon: '🏠', label: 'Início' },
  { href: '/cursos', icon: '📚', label: 'Cursos' },
  { href: '/licao', icon: '✏️', label: 'Lições' },
  { href: '/perfil', icon: '👤', label: 'Perfil' },
];

const areas = [
  { href: '/cursos?area=Engenharia Civil', icon: '🏗️', label: 'Eng. Civil' },
  { href: '/cursos?area=Petróleo & Gás', icon: '🛢️', label: 'Petróleo & Gás' },
  { href: '/cursos?area=Ambiente', icon: '🌿', label: 'Ambiente' },
  { href: '/cursos?area=Mecânica', icon: '⚙️', label: 'Mecânica' },
  { href: '/cursos?area=Energias Renováveis', icon: '☀️', label: 'Energias' },
  { href: '/cursos?area=Eletricidade & Eletrónica', icon: '⚡', label: 'Eletricidade' },
  { href: '/cursos?area=Telecomunicações', icon: '📡', label: 'Telecom' },
  { href: '/cursos?area=Inteligência Artificial', icon: '🤖', label: 'IA' },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-gray-100 py-6 px-4 shrink-0 min-h-screen">
      {/* Main Navigation */}
      <nav className="mb-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Navegação
        </p>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm font-medium"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Areas */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Áreas
        </p>
        <ul className="space-y-1">
          {areas.map((area) => (
            <li key={area.href}>
              <Link
                href={area.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm"
              >
                <span>{area.icon}</span>
                <span>{area.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Upgrade CTA */}
      <div className="mt-auto pt-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-4 text-white text-center">
          <div className="text-2xl mb-2">⭐</div>
          <p className="text-xs font-bold text-yellow-400 mb-1">PRO</p>
          <p className="text-xs text-blue-200 mb-3">
            Acesso ilimitado + Certificados + Tutor IA
          </p>
          <button className="w-full py-2 px-3 bg-yellow-400 text-blue-900 rounded-lg text-xs font-bold hover:bg-yellow-300 transition-colors">
            Upgrade → 5.000 AOA/mês
          </button>
        </div>
      </div>
    </aside>
  );
}
