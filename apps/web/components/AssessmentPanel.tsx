'use client';

import { useState } from 'react';

interface QuizOption {
  id: string;
  text: string;
}

interface AssessmentPanelProps {
  title: string;
  type: 'quiz' | 'project' | 'exam';
  description: string;
  options?: QuizOption[];
  maxAttempts?: number;
  currentAttempt?: number;
  lastResult?: 'competent' | 'not_yet_competent';
  feedback?: string;
}

export default function AssessmentPanel({
  title, type, description, options = [], maxAttempts = 3,
  currentAttempt = 1, lastResult, feedback,
}: AssessmentPanelProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if ((type === 'quiz' && !selected) || (type === 'project' && !file)) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{type === 'quiz' ? '📝' : type === 'project' ? '🔧' : '📋'}</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              {type === 'quiz' ? 'Quiz de Avaliação' : type === 'project' ? 'Projeto Prático' : 'Exame'}
            </span>
          </div>
          <h3 className="font-bold text-blue-900 text-lg">{title}</h3>
        </div>
        <span className="text-xs text-gray-500">Tentativa {currentAttempt}/{maxAttempts}</span>
      </div>

      <p className="text-gray-600 text-sm mb-6">{description}</p>

      {/* Previous result */}
      {lastResult && (
        <div className={`rounded-xl p-3 mb-4 ${lastResult === 'competent' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`text-sm font-semibold ${lastResult === 'competent' ? 'text-green-700' : 'text-red-700'}`}>
            {lastResult === 'competent' ? '✅ Competente' : '🔄 Ainda Não Competente'}
          </p>
          {feedback && <p className="text-xs text-gray-600 mt-1">{feedback}</p>}
        </div>
      )}

      {/* Quiz options */}
      {type === 'quiz' && !submitted && (
        <div className="space-y-3 mb-6">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-colors ${
                selected === opt.id
                  ? 'border-blue-900 bg-blue-50 text-blue-900 font-medium'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {/* Project upload */}
      {type === 'project' && !submitted && (
        <div className="mb-6">
          <label className="block w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
            <div className="text-3xl mb-2">📁</div>
            <p className="text-sm font-medium text-gray-700">{file ? file.name : 'Clique para carregar o seu projeto'}</p>
            <p className="text-xs text-gray-500 mt-1">PDF, ZIP, DOC — máx. 50MB</p>
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
        </div>
      )}

      {submitted ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-2">⏳</div>
          <p className="font-semibold text-blue-900">Avaliação Submetida</p>
          <p className="text-sm text-gray-500 mt-1">O resultado será comunicado em até 24h.</p>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={(type === 'quiz' && !selected) || (type === 'project' && !file)}
          className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          Submeter Avaliação
        </button>
      )}
    </div>
  );
}
