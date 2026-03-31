'use client';

import { useState } from 'react';

interface Step {
  id: number;
  type: 'concept' | 'problem';
  title: string;
  content: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Props {
  step: Step;
  selectedAnswer: number | undefined;
  onAnswer: (index: number) => void;
}

export default function LessonStep({ step, selectedAnswer, onAnswer }: Props) {
  const [showExplanation, setShowExplanation] = useState(false);
  const hasAnswered = selectedAnswer !== undefined;
  const isCorrect = selectedAnswer === step.correctAnswer;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      {/* Step Header */}
      <div className={`px-6 py-4 ${step.type === 'problem' ? 'bg-orange-50 border-b border-orange-100' : 'bg-blue-50 border-b border-blue-100'}`}>
        <div className="flex items-center gap-2">
          <span className={`badge ${step.type === 'problem' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
            {step.type === 'problem' ? '🔧 Problema Real' : '📖 Conceito'}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mt-2">{step.title}</h2>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="prose max-w-none mb-6">
          {step.content.split('\n').map((line, i) => (
            <p key={i} className="text-gray-700 mb-2 text-sm leading-relaxed">
              {line.startsWith('**') && line.endsWith('**') ? (
                <strong>{line.replace(/\*\*/g, '')}</strong>
              ) : line.startsWith('- ') ? (
                <span className="flex gap-2">
                  <span className="text-blue-500 shrink-0">•</span>
                  <span>{line.slice(2)}</span>
                </span>
              ) : (
                line
              )}
            </p>
          ))}
        </div>

        {/* Question */}
        <div className="bg-gray-50 rounded-xl p-5">
          <p className="font-semibold text-gray-800 mb-4">❓ {step.question}</p>
          <div className="space-y-3">
            {step.options.map((option, index) => {
              let btnClass =
                'w-full text-left px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-150 ';
              if (!hasAnswered) {
                btnClass += 'border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700';
              } else if (index === step.correctAnswer) {
                btnClass += 'border-green-400 bg-green-50 text-green-800';
              } else if (index === selectedAnswer) {
                btnClass += 'border-red-400 bg-red-50 text-red-800';
              } else {
                btnClass += 'border-gray-200 bg-gray-100 text-gray-400';
              }

              return (
                <button
                  key={index}
                  onClick={() => !hasAnswered && onAnswer(index)}
                  disabled={hasAnswered}
                  className={btnClass}
                >
                  <span className="font-bold mr-2 text-gray-500">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                  {hasAnswered && index === step.correctAnswer && ' ✅'}
                  {hasAnswered && index === selectedAnswer && index !== step.correctAnswer && ' ❌'}
                </button>
              );
            })}
          </div>

          {/* Result */}
          {hasAnswered && (
            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? '✅ Correto! Excelente trabalho!' : '❌ Não está correto. Tenta de novo!'}
              </p>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-sm text-blue-600 hover:underline"
              >
                {showExplanation ? 'Esconder' : 'Ver'} explicação
              </button>
              {showExplanation && (
                <p className="mt-2 text-sm text-gray-700">{step.explanation}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
