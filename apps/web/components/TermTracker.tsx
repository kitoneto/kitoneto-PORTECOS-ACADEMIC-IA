'use client';

interface TermTrackerProps {
  startDate: string;
  endDate: string;
  termNumber: number;
  programName: string;
}

export default function TermTracker({ startDate, endDate, termNumber, programName }: TermTrackerProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const elapsed = Math.ceil((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const remaining = Math.max(0, totalDays - elapsed);
  const progress = Math.min(100, Math.round((elapsed / totalDays) * 100));

  const fmt = (d: Date) => d.toLocaleDateString('pt-AO', { day: '2-digit', month: 'short', year: 'numeric' });

  const urgencyColor = remaining < 30 ? 'bg-red-500' : remaining < 60 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Termo Actual</p>
          <h3 className="font-bold text-blue-900">Termo {termNumber} — {programName}</h3>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${remaining < 30 ? 'text-red-600' : 'text-blue-900'}`}>{remaining}</p>
          <p className="text-xs text-gray-500">dias restantes</p>
        </div>
      </div>

      <div className="w-full bg-gray-100 rounded-full h-3 mb-3 relative overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${urgencyColor}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between text-xs text-gray-500">
        <span>📅 Início: {fmt(start)}</span>
        <span className="font-semibold">{progress}%</span>
        <span>🏁 Fim: {fmt(end)}</span>
      </div>

      {remaining < 30 && (
        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2 text-xs text-red-700 font-medium">
          ⚠️ O teu termo termina em breve. Contacta o teu mentor para avaliar o progresso.
        </div>
      )}
    </div>
  );
}
