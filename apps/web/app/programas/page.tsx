'use client';

import { useState } from 'react';
import ProgramCard from '@/components/ProgramCard';
import { PROGRAMS, AREAS } from '@shared/types';

const AREA_MAP = Object.fromEntries(AREAS.map((a) => [a.id, a]));

type Level = 'all' | 'bachelor' | 'master' | 'certificate';

const LEVEL_LABELS: Record<Level, string> = {
  all: 'Todos',
  bachelor: 'Licenciatura',
  master: 'Mestrado',
  certificate: 'Certificado',
};

export default function ProgramasPage() {
  const [level, setLevel] = useState<Level>('all');
  const [areaId, setAreaId] = useState<string>('all');

  const filtered = PROGRAMS.filter((p) => {
    const matchLevel = level === 'all' || p.level === level;
    const matchArea  = areaId === 'all' || p.areaId === areaId;
    return matchLevel && matchArea;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Programas de Grau</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Licenciaturas, Mestrados e Certificados em Engenharia — 100% online, modelo CBE,
            focado nos desafios reais de Angola.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center">
          {/* Level filter */}
          <div className="flex gap-2">
            {(Object.keys(LEVEL_LABELS) as Level[]).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  level === l ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {LEVEL_LABELS[l]}
              </button>
            ))}
          </div>

          {/* Area filter */}
          <select
            value={areaId}
            onChange={(e) => setAreaId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">Todas as Áreas</option>
            {AREAS.map((a) => (
              <option key={a.id} value={a.id}>{a.icon} {a.name}</option>
            ))}
          </select>

          <span className="text-sm text-gray-500 ml-auto">{filtered.length} programa{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Program grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-5xl mb-4">🔍</div>
            <p>Nenhum programa encontrado para estes filtros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => {
              const area = AREA_MAP[p.areaId];
              return (
                <ProgramCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  icon={area?.icon ?? '📚'}
                  level={p.level}
                  description={p.description}
                  durationTerms={p.durationTerms}
                  competencyCount={p.competencyCount}
                  pricePerTermAoa={p.pricePerTermAoa}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
