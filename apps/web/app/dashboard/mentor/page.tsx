'use client';

import MentorChat from '@/components/MentorChat';

const WEEKLY_GOALS = [
  { week: 1, goal: 'Completar módulos 1–3 de Resistência dos Materiais', done: true },
  { week: 1, goal: 'Realizar quiz de preparação', done: true },
  { week: 2, goal: 'Estudar Betão Armado — capítulos 1–2', done: false },
  { week: 2, goal: 'Exercício prático: Dimensionamento de Pilar', done: false },
  { week: 3, goal: 'Revisão de Resistência dos Materiais para exame', done: false },
  { week: 3, goal: 'Submeter avaliação de Resistência dos Materiais', done: false },
];

const PROGRESS_REPORT = [
  { label: 'Competências Concluídas', value: '1 / 5', color: 'text-green-700' },
  { label: 'Progresso do Termo', value: '47%', color: 'text-blue-700' },
  { label: 'Dias Restantes', value: '112', color: 'text-yellow-700' },
  { label: 'Streak de Estudo', value: '7 dias', color: 'text-purple-700' },
];

const MOTIVATION = [
  "Estás no caminho certo! Cada dia de estudo é um passo mais perto da tua licenciatura. 💪",
  "Angola precisa de engenheiros como tu. O teu esforço hoje é o futuro do país. 🇦🇴",
  "Lembra-te: no modelo CBE não há reprovações — só aprendizagem contínua. 📚",
];

export default function MentorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-900 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-1">🤖 Mentor IA — O teu guia académico</h1>
          <p className="text-blue-200">Disponível 24/7 para te ajudar a atingir os teus objetivos</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat — full height */}
          <div className="lg:col-span-2" style={{ minHeight: '600px' }}>
            <MentorChat
              initialMessages={[
                { role: 'assistant', content: 'Olá, Celestino! Analisei o teu progresso desta semana. Estás a 47% do termo 3. Para atingirmos os objetivos, sugiro que focuses nas avaliações de Resistência dos Materiais nos próximos 5 dias. Posso ajudar-te com alguma dúvida específica?', timestamp: new Date().toISOString() },
              ]}
            />
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Progress Report */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-blue-900 mb-4">📊 Relatório de Progresso</h2>
              <div className="space-y-3">
                {PROGRESS_REPORT.map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className={`font-bold text-sm ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Plan */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-bold text-blue-900 mb-4">📅 Plano Semanal</h2>
              <div className="space-y-2">
                {WEEKLY_GOALS.map((g, i) => (
                  <div key={i} className={`flex items-start gap-2 p-2 rounded-lg text-xs ${g.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <span className="mt-0.5">{g.done ? '✅' : '⬜'}</span>
                    <div>
                      <span className="text-gray-700">{g.goal}</span>
                      <span className="text-gray-400 ml-1">— Sem. {g.week}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Motivation */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-5">
              <h2 className="font-bold text-blue-900 mb-3">💫 Mensagem do Mentor</h2>
              <p className="text-blue-900 text-sm leading-relaxed">{MOTIVATION[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
