import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  area: string;
  icon: string;
  level: string;
  lessons: number;
  students: number;
  description: string;
}

const levelColors: Record<string, string> = {
  Iniciante: 'bg-green-100 text-green-700',
  Intermédio: 'bg-yellow-100 text-yellow-700',
  Avançado: 'bg-red-100 text-red-700',
};

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="card flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{course.icon}</span>
          <span className={`badge ${levelColors[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
            {course.level}
          </span>
        </div>
        <p className="text-xs font-medium text-blue-600 mb-1">{course.area}</p>
        <h3 className="font-bold text-gray-800 mb-2 leading-snug">{course.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
      </div>
      <div className="px-5 pb-4">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <span>📖 {course.lessons} lições</span>
          <span>👥 {course.students} alunos</span>
        </div>
        <Link
          href="/licao"
          className="block w-full text-center py-2 px-4 bg-blue-900 hover:bg-blue-800 text-white rounded-lg text-sm font-semibold transition-colors"
        >
          Ver Curso →
        </Link>
      </div>
    </div>
  );
}
