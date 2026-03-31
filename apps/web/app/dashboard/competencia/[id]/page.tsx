'use client';

import Link from 'next/link';
import AssessmentPanel from '@/components/AssessmentPanel';
import MentorChat from '@/components/MentorChat';
import ProgressRing from '@/components/ProgressRing';

// Mock competency detail data
const MOCK_COMPETENCIES: Record<string, {
  title: string; description: string; progress: number;
  status: 'not_started' | 'in_progress' | 'competent' | 'not_yet_competent';
  materials: { type: string; title: string; duration?: string }[];
  assessment: { title: string; type: 'quiz' | 'project' | 'exam'; description: string; options?: { id: string; text: string }[] };
}> = {
  '1': {
    title: 'Resistência dos Materiais',
    description: 'Analisa o comportamento de materiais de construção sob cargas e tensões. Inclui cálculo de tensões normais e de corte, dimensionamento de vigas e pilares.',
    progress: 80,
    status: 'in_progress',
    materials: [
      { type: '📹', title: 'Introdução às Tensões e Deformações', duration: '45 min' },
      { type: '📄', title: 'Manual: Cálculo de Vigas em Betão', duration: '30 min leitura' },
      { type: '🔧', title: 'Exercício Prático: Dimensionamento de Pilar' },
      { type: '📝', title: 'Quiz de Preparação — 20 questões' },
      { type: '🇦🇴', title: 'Caso Prático: Edifício em Luanda — Solo Laterítico' },
    ],
    assessment: {
      title: 'Exame de Resistência dos Materiais',
      type: 'exam',
      description: 'Este exame avalia a tua capacidade de calcular tensões e deformações em estruturas reais. Tens 3 horas e podes consultar formulários.',
      options: [
        { id: 'a', text: 'σ = F/A (Tensão Normal)' },
        { id: 'b', text: 'σ = F·d (Momento Fletor)' },
        { id: 'c', text: 'σ = E·ε (Lei de Hooke)' },
        { id: 'd', text: 'σ = P/V (Pressão Volumétrica)' },
      ],
    },
  },
  '2': {
    title: 'Mecânica dos Solos',
    description: 'Estuda o comportamento dos solos angolanos — laterítico, argiloso, arenoso — e sua aplicação em fundações e taludes.',
    progress: 100,
    status: 'competent',
    materials: [
      { type: '📹', title: 'Solos Lateríticos de Angola — Características', duration: '50 min' },
      { type: '📄', title: 'Normas Angolanas para Ensaios de Solo' },
      { type: '🔧', title: 'Relatório de Sondagem — Caso Real Luanda' },
    ],
    assessment: {
      title: 'Projeto de Mecânica dos Solos',
      type: 'project',
      description: 'Submete o relatório de sondagem e análise do solo para o projeto de fundação.',
    },
  },
};

interface Props {
  params: { id: string };
}

export default function CompetenciaPage({ params }: Props) {
  const comp = MOCK_COMPETENCIES[params.id] ?? MOCK_COMPETENCIES['1'];
  const statusConfig = {
    not_started:       { label: 'Não Iniciado',   color: 'bg-gray-100 text-gray-700'   },
    in_progress:       { label: 'Em Progresso',   color: 'bg-blue-100 text-blue-700'   },
    competent:         { label: 'Competente',      color: 'bg-green-100 text-green-700' },
    not_yet_competent: { label: 'Ainda Não',       color: 'bg-red-100 text-red-700'     },
  };
  const cfg = statusConfig[comp.status];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <Link href="/dashboard" className="text-blue-300 hover:text-white text-sm inline-flex items-center gap-1 mb-4">
            ← Voltar ao Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${cfg.color}`}>
                {cfg.label}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{comp.title}</h1>
              <p className="text-blue-200 text-base max-w-2xl">{comp.description}</p>
            </div>
            <div className="hidden md:flex flex-col items-center ml-8">
              <ProgressRing percentage={comp.progress} size={96} color="#ffffff" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Materials */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-blue-900 text-lg mb-4">📚 Materiais de Estudo</h2>
              <div className="space-y-3">
                {comp.materials.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                    <span className="text-xl">{m.type}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">{m.title}</p>
                      {m.duration && <p className="text-xs text-gray-500">{m.duration}</p>}
                    </div>
                    <span className="text-blue-400 text-xs">→</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment */}
            <AssessmentPanel
              title={comp.assessment.title}
              type={comp.assessment.type}
              description={comp.assessment.description}
              options={comp.assessment.options}
              maxAttempts={3}
              currentAttempt={1}
              lastResult={comp.status === 'not_yet_competent' ? 'not_yet_competent' : undefined}
            />
          </div>

          {/* Sidebar: AI Tutor */}
          <div className="space-y-4">
            <div className="h-96">
              <MentorChat
                compact
                initialMessages={[
                  { role: 'assistant', content: `Olá! Estou aqui para te ajudar com "${comp.title}". Tens alguma dúvida sobre os materiais ou a avaliação?`, timestamp: new Date().toISOString() },
                ]}
              />
            </div>

            {/* CBE Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-sm">
              <p className="font-semibold text-yellow-800 mb-1">⚖️ Como és avaliado</p>
              <p className="text-yellow-700 text-xs">
                Não há notas. O resultado é <strong>Competente</strong> ou <strong>Ainda Não Competente</strong>.
                Podes repetir a avaliação até 3 vezes por termo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
