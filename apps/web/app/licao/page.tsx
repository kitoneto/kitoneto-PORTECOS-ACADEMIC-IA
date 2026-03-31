'use client';

import { useState } from 'react';
import LessonStep from '@/components/LessonStep';
import ProgressBar from '@/components/ProgressBar';

const lesson = {
  title: 'Fundações em Solo Laterítico — Luanda',
  area: 'Engenharia Civil',
  steps: [
    {
      id: 1,
      type: 'concept' as const,
      title: 'O que é Solo Laterítico?',
      content:
        'O solo laterítico é um tipo de solo tropical muito comum em Angola, especialmente em Luanda. É formado pela decomposição de rochas em climas quentes e húmidos, resultando num solo rico em óxidos de ferro e alumínio.\n\n**Características principais:**\n- Alta plasticidade\n- Baixa capacidade de carga comparada a solos argilosos tradicionais\n- Expansão com variação de humidade\n- Coloração avermelhada ou amarelada',
      question: 'Qual é a principal preocupação ao construir fundações em solo laterítico?',
      options: [
        'A cor vermelha do solo',
        'A variação de volume com humidade e baixa capacidade de carga',
        'A presença de água subterrânea',
        'A profundidade do bedrock',
      ],
      correctAnswer: 1,
      explanation:
        'O solo laterítico pode expandir ou contrair significativamente com mudanças de humidade, o que pode causar recalques diferenciais nas fundações. A sua baixa capacidade de carga exige cuidados especiais no dimensionamento.',
    },
    {
      id: 2,
      type: 'problem' as const,
      title: 'Problema Real: Edifício de 4 Andares em Luanda',
      content:
        'Um cliente em Luanda quer construir um edifício de 4 andares de betão armado. O relatório geotécnico indica:\n\n- Solo laterítico até 3m de profundidade\n- Solo de fundação (saprolito) dos 3m aos 6m\n- Nível freático a 5m de profundidade\n- Tensão admissível do solo: **120 kPa**\n\nA carga por pilar é estimada em **600 kN**.',
      question: 'Qual a área mínima de uma sapata isolada para este pilar?',
      options: [
        '2 m² (1.4m × 1.4m)',
        '3 m² (1.73m × 1.73m)',
        '5 m² (2.24m × 2.24m)',
        '6 m² (2.45m × 2.45m)',
      ],
      correctAnswer: 2,
      explanation:
        'Área = Carga / Tensão admissível = 600 kN / 120 kPa = **5 m²**. Logo, a sapata deve ter pelo menos 2.24m × 2.24m ≈ 2.25m × 2.25m. Note que a sapata deve ser colocada no solo de fundação (abaixo dos 3m de laterítico).',
    },
    {
      id: 3,
      type: 'concept' as const,
      title: 'Tipos de Fundações para Solo Laterítico',
      content:
        'Consoante a profundidade do solo competente e as cargas, podem ser usadas:\n\n**1. Sapatas Corridas/Isoladas** — para cargas leves e solo competente superficial\n\n**2. Estacas** — quando o solo laterítico é profundo (>3m). Em Angola, são frequentes:\n- Estacas de betão moldadas in situ (Franki)\n- Estacas CFA (Continuous Flight Auger)\n- Microestacas para reforço de fundações existentes\n\n**3. Radier Geral** — para estruturas com cargas distribuídas e solo de baixa capacidade',
      question: 'Para um edifício de 10 andares com solo laterítico até 8m, qual é a solução de fundação mais indicada?',
      options: [
        'Sapatas isoladas superficiais',
        'Radier a 1m de profundidade',
        'Estacas atingindo o solo competente abaixo dos 8m',
        'Nenhuma fundação especial é necessária',
      ],
      correctAnswer: 2,
      explanation:
        'Com solo laterítico de baixa capacidade até 8m, a solução mais adequada são estacas que transferem as cargas pesadas do edifício de 10 andares para o solo competente abaixo desta profundidade.',
    },
  ],
};

export default function LicaoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const step = lesson.steps[currentStep];
  const progress = ((currentStep) / lesson.steps.length) * 100;

  const handleAnswer = (stepId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [stepId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleAskTutor = () => {
    setShowAITutor(true);
    setAiMessage(
      '🤖 **Tutor IA:** Olá! Estou aqui para ajudar. Sobre fundações em solo laterítico em Angola, posso explicar qualquer conceito com mais detalhe. O que gostarias de saber mais sobre este problema?'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span className="text-blue-900 font-medium">{lesson.area}</span>
          <span>›</span>
          <span>{lesson.title}</span>
        </div>
        <h1 className="text-2xl font-bold text-blue-900">{lesson.title}</h1>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>Passo {currentStep + 1} de {lesson.steps.length}</span>
          <span>{Math.round(progress)}% completo</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Lesson Step */}
      <LessonStep
        step={step}
        selectedAnswer={answers[step.id]}
        onAnswer={(answer) => handleAnswer(step.id, answer)}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>

        <button
          onClick={handleAskTutor}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors text-sm font-medium"
        >
          🤖 Pedir Ajuda ao Tutor IA
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === lesson.steps.length - 1 || answers[step.id] === undefined}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === lesson.steps.length - 1 ? '✅ Concluir' : 'Próximo →'}
        </button>
      </div>

      {/* AI Tutor Panel */}
      {showAITutor && (
        <div className="mt-8 p-6 bg-purple-50 border border-purple-200 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-purple-900 flex items-center gap-2">
              🤖 Tutor IA — PORTECOS
            </h3>
            <button
              onClick={() => setShowAITutor(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <p className="text-purple-800 text-sm whitespace-pre-wrap">{aiMessage}</p>
          <div className="mt-4 flex gap-2">
            <input
              type="text"
              placeholder="Escreve a tua pergunta..."
              className="flex-1 px-4 py-2 border border-purple-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors">
              Enviar
            </button>
          </div>
          <p className="text-xs text-purple-400 mt-2">
            * Tutor IA em desenvolvimento — integração com GPT-4o em breve
          </p>
        </div>
      )}
    </div>
  );
}
