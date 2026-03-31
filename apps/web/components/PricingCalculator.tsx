'use client';

import { useState } from 'react';
import { PROGRAMS } from '@shared/types';

export default function PricingCalculator() {
  const [programId, setProgramId] = useState('1');
  const [months, setMonths] = useState(48);

  const program = PROGRAMS.find((p) => p.id === programId) ?? PROGRAMS[0];
  const minMonths = program.durationTerms * 3;
  const maxMonths = program.durationTerms * 6;
  const terms = Math.ceil(months / 6);
  const actualTerms = Math.min(terms, program.durationTerms);
  const total = actualTerms * program.pricePerTermAoa;
  const fullPrice = program.durationTerms * program.pricePerTermAoa;
  const savings = fullPrice - total;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-lg mx-auto">
      <h3 className="font-bold text-blue-900 text-lg mb-4">🧮 Calculadora de Mensalidade</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Programa</label>
        <select
          value={programId}
          onChange={(e) => { setProgramId(e.target.value); setMonths(24); }}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
        >
          {PROGRAMS.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Duração pretendida: <span className="text-blue-900 font-bold">{months} meses</span>
        </label>
        <input
          type="range"
          min={minMonths}
          max={maxMonths}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full accent-yellow-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{minMonths} meses (mínimo)</span>
          <span>{maxMonths} meses (padrão)</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Termos necessários:</span>
          <span className="font-semibold">{actualTerms} × 6 meses</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Preço por termo:</span>
          <span className="font-semibold">{program.pricePerTermAoa.toLocaleString('pt-AO')} AOA</span>
        </div>
        <div className="flex justify-between text-base font-bold text-blue-900 border-t border-blue-200 pt-2">
          <span>Total estimado:</span>
          <span>{total.toLocaleString('pt-AO')} AOA</span>
        </div>
        {savings > 0 && (
          <div className="text-center text-sm text-green-700 font-medium bg-green-50 rounded-lg p-2">
            🎉 Poupas {savings.toLocaleString('pt-AO')} AOA ao concluir mais rápido!
          </div>
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3 text-center">
        * Cada termo (6 meses) tem um preço fixo. Quanto mais rápido concluíres, menos pagas.
      </p>
    </div>
  );
}
