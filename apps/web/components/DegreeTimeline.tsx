interface TermItem {
  termNumber: number;
  title: string;
  competencies: string[];
  months: string;
}

interface DegreeTimelineProps {
  terms: TermItem[];
  programName: string;
}

export default function DegreeTimeline({ terms, programName }: DegreeTimelineProps) {
  return (
    <div>
      <h3 className="font-bold text-blue-900 text-lg mb-6">{programName} — Plano de Estudos</h3>
      <div className="space-y-4">
        {terms.map((term) => (
          <div key={term.termNumber} className="flex gap-4">
            {/* Timeline connector */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                T{term.termNumber}
              </div>
              {term.termNumber < terms.length && (
                <div className="w-0.5 flex-1 bg-blue-200 mt-1" />
              )}
            </div>
            {/* Content */}
            <div className="flex-1 pb-4">
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="font-semibold text-blue-900">{term.title}</h4>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{term.months}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {term.competencies.map((comp, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-lg border border-blue-200">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
