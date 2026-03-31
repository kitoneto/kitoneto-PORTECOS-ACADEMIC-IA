'use client';

import Link from 'next/link';
import CompetencyCard from '@/components/CompetencyCard';
import TermTracker from '@/components/TermTracker';
import ProgressRing from '@/components/ProgressRing';
import MentorChat from '@/components/MentorChat';

// Mock student data
const STUDENT = {
  name: 'Celestino Mbala',
  program: 'B.S. Engenharia Civil',
  term: 3,
  overallProgress: 32,
};

const TERM = {
  startDate: '2025-01-15',
  endDate: '2025-07-15',
  termNumber: 3,
};

const COMPETENCIES = [
  { id: '1', title: 'Resistência dos Materiais', description: 'Análise de tensões e deformações em elementos estruturais.', progress: 80, status: 'in_progress' as const, assessmentType: 'exam' as const, dueDate: '15 Mar 2025' },
  { id: '2', title: 'Mecânica dos Solos',        description: 'Comportamento dos solos angolanos (laterítico, argiloso).', progress: 100, status: 'competent' as const,   assessmentType: 'project' as const },
  { id: '3', title: 'Betão Armado',              description: 'Projecto de estruturas em betão armado.', progress: 45, status: 'in_progress' as const, assessmentType: 'quiz' as const,    dueDate: '30 Mar 2025' },
  { id: '4', title: 'Fundações',                 description: 'Tipos de fundações e critérios de dimensionamento.', progress: 0,  status: 'not_started' as const,  assessmentType: 'exam' as const },
  { id: '5', title: 'Vias de Comunicação',       description: 'Projecto geométrico de estradas e traçado.', progress: 0,  status: 'not_started' as const,  assessmentType: 'project' as const },
];

const NOTIFICATIONS = [
  { id: '1', icon: '⚠️', text: 'Prazo da avaliação de Resistência dos Materiais em 5 dias', time: 'Hoje', urgent: true },
  { id: '2', icon: '✅', text: 'Competência "Mecânica dos Solos" marcada como Competente', time: 'Ontem' },
  { id: '3', icon: '🤖', text: 'O teu Mentor IA enviou um novo plano semanal', time: '2 dias atrás' },
  { id: '4', icon: '📅', text: 'Reunião de orientação disponível — agenda com o mentor', time: '3 dias atrás' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-blue-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Portal do Estudante</h1>
            <p className="text-blue-300 text-sm">Bem-vindo de volta, {STUDENT.name}!</p>
          </div>
          <div className="text-right text-sm">
            <p className="text-blue-200">{STUDENT.program}</p>
            <p className="text-yellow-400 font-semibold">Termo {TERM.termNumber}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Term tracker */}
            <TermTracker
              startDate={TERM.startDate}
              endDate={TERM.endDate}
              termNumber={TERM.termNumber}
              programName={STUDENT.program}
            />

            {/* Progress overview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-blue-900 text-lg mb-4">Progresso Geral do Programa</h2>
              <div className="flex items-center gap-6">
                <ProgressRing percentage={STUDENT.overallProgress} size={100} />
                <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-green-700">1</p>
                    <p className="text-xs text-gray-500">Competente</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-blue-700">2</p>
                    <p className="text-xs text-gray-500">Em Progresso</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-gray-600">2</p>
                    <p className="text-xs text-gray-500">Não Iniciado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active competencies */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-blue-900 text-lg">Competências do Termo Actual</h2>
                <span className="text-xs text-gray-500">{COMPETENCIES.length} competências</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COMPETENCIES.map((c) => (
                  <CompetencyCard key={c.id} {...c} />
                ))}
              </div>
            </div>

            {/* Upcoming assessments */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-blue-900 text-lg mb-4">📋 Próximas Avaliações</h2>
              <div className="space-y-3">
                {[
                  { comp: 'Resistência dos Materiais', type: 'Exame', date: '15 Mar 2025', urgent: true },
                  { comp: 'Betão Armado', type: 'Quiz', date: '30 Mar 2025', urgent: false },
                ].map((a) => (
                  <div key={a.comp} className={`flex items-center justify-between p-3 rounded-xl border ${a.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                    <div>
                      <p className="font-medium text-sm text-blue-900">{a.comp}</p>
                      <p className="text-xs text-gray-500">{a.type}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${a.urgent ? 'text-red-600' : 'text-gray-700'}`}>{a.date}</p>
                      {a.urgent && <p className="text-xs text-red-500">Urgente!</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Quick access */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h2 className="font-bold text-blue-900 mb-3">Acesso Rápido</h2>
              <div className="space-y-2">
                <Link href="/dashboard/mentor" className="flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors text-sm font-medium text-blue-900">
                  <span className="text-xl">🤖</span> Falar com Mentor
                </Link>
                <Link href="/programas" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700">
                  <span className="text-xl">📚</span> Ver Programa
                </Link>
                <Link href="/mensalidade" className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-gray-700">
                  <span className="text-xl">💳</span> Mensalidade
                </Link>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <h2 className="font-bold text-blue-900 mb-3">🔔 Notificações</h2>
              <div className="space-y-3">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className={`flex items-start gap-2 p-2 rounded-lg text-xs ${n.urgent ? 'bg-red-50' : 'bg-gray-50'}`}>
                    <span className="text-base">{n.icon}</span>
                    <div>
                      <p className="text-gray-700">{n.text}</p>
                      <p className="text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini mentor chat */}
            <div className="h-80">
              <MentorChat compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
