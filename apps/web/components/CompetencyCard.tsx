import Link from 'next/link';

interface CompetencyCardProps {
  id: string;
  title: string;
  description?: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'competent' | 'not_yet_competent';
  dueDate?: string;
  assessmentType?: 'quiz' | 'project' | 'exam';
}

const statusConfig = {
  not_started:       { label: 'Não Iniciado',    bg: 'bg-gray-100',   text: 'text-gray-600',   dot: 'bg-gray-400'   },
  in_progress:       { label: 'Em Progresso',     bg: 'bg-blue-100',   text: 'text-blue-700',   dot: 'bg-blue-500'   },
  competent:         { label: 'Competente',        bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500'  },
  not_yet_competent: { label: 'Não Competente',   bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500'    },
};

const assessmentIcons = { quiz: '📝', project: '🔧', exam: '📋' };

export default function CompetencyCard({
  id, title, description, progress, status, dueDate, assessmentType,
}: CompetencyCardProps) {
  const cfg = statusConfig[status];

  return (
    <Link
      href={`/dashboard/competencia/${id}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-blue-900 text-sm truncate">{title}</h3>
          {description && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{description}</p>}
        </div>
        <span className={`ml-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text} whitespace-nowrap`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
          {cfg.label}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-yellow-400 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        {assessmentType && (
          <span>{assessmentIcons[assessmentType]} {assessmentType === 'quiz' ? 'Quiz' : assessmentType === 'project' ? 'Projeto' : 'Exame'}</span>
        )}
        {dueDate && <span>📅 {dueDate}</span>}
      </div>
    </Link>
  );
}
