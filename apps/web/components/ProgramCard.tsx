import Link from 'next/link';

interface ProgramCardProps {
  slug: string;
  name: string;
  icon: string;
  level: 'bachelor' | 'master' | 'certificate';
  description: string;
  durationTerms: number;
  competencyCount: number;
  pricePerTermAoa: number;
}

const levelConfig = {
  bachelor:    { label: 'Licenciatura', bg: 'bg-blue-100',   text: 'text-blue-800'   },
  master:      { label: 'Mestrado',     bg: 'bg-purple-100', text: 'text-purple-800' },
  certificate: { label: 'Certificado',  bg: 'bg-green-100',  text: 'text-green-800'  },
};

export default function ProgramCard({
  slug, name, icon, level, description, durationTerms, competencyCount, pricePerTermAoa,
}: ProgramCardProps) {
  const cfg = levelConfig[level];
  const totalPrice = durationTerms * pricePerTermAoa;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{icon}</span>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
          {cfg.label}
        </span>
      </div>
      <h3 className="font-bold text-blue-900 text-lg leading-tight mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>

      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-sm font-bold text-blue-900">{durationTerms * 6} <span className="text-xs font-normal">meses</span></div>
          <div className="text-xs text-gray-500">Duração</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-sm font-bold text-blue-900">{competencyCount}</div>
          <div className="text-xs text-gray-500">Competências</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="text-sm font-bold text-yellow-600">{(pricePerTermAoa / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-500">AOA/termo</div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center mb-4">
        Total estimado: <span className="font-semibold text-blue-900">{(totalPrice).toLocaleString('pt-AO')} AOA</span>
      </div>

      <Link
        href={`/programas/${slug}`}
        className="block text-center bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm"
      >
        Ver Programa →
      </Link>
    </div>
  );
}
