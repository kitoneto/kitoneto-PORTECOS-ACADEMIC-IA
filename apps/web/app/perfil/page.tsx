import ProgressBar from '@/components/ProgressBar';
import Link from 'next/link';

const userProfile = {
  name: 'João Manuel',
  email: 'joao.manuel@example.com',
  role: 'Engenheiro Civil',
  location: 'Luanda, Angola',
  joinDate: 'Janeiro 2026',
  avatar: '👨‍💼',
  stats: {
    coursesCompleted: 3,
    coursesInProgress: 2,
    totalLessons: 47,
    certificates: 2,
    streak: 12,
    points: 2340,
  },
};

const enrolledCourses = [
  {
    id: '1',
    title: 'Fundações em Solo Laterítico',
    area: 'Engenharia Civil',
    icon: '🏗️',
    progress: 75,
    lastActivity: '2 dias atrás',
    status: 'in-progress',
  },
  {
    id: '2',
    title: 'Instalação Solar no Namibe',
    area: 'Energias Renováveis',
    icon: '☀️',
    progress: 100,
    lastActivity: '1 semana atrás',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Fiscalização de Obras — LNEC',
    area: 'Obras & Fiscalização',
    icon: '🔨',
    progress: 100,
    lastActivity: '2 semanas atrás',
    status: 'completed',
  },
  {
    id: '4',
    title: 'IA para Produção Petrolífera',
    area: 'Inteligência Artificial',
    icon: '🤖',
    progress: 30,
    lastActivity: 'Hoje',
    status: 'in-progress',
  },
];

const achievements = [
  { icon: '🔥', title: 'Streak de 12 dias', description: 'Estudou 12 dias seguidos' },
  { icon: '🎯', title: 'Primeiro Certificado', description: 'Concluiu o primeiro curso' },
  { icon: '⚡', title: 'Aprendiz Rápido', description: 'Completou 5 lições num dia' },
  { icon: '🏆', title: 'Top 10%', description: 'No ranking de Eng. Civil' },
];

export default function PerfilPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-2xl p-8 text-white mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="text-6xl">{userProfile.avatar}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{userProfile.name}</h1>
            <p className="text-blue-200">{userProfile.role} · {userProfile.location}</p>
            <p className="text-blue-300 text-sm mt-1">Membro desde {userProfile.joinDate}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProfile.stats.points}</div>
              <div className="text-blue-200 text-xs">Pontos XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{userProfile.stats.streak}</div>
              <div className="text-blue-200 text-xs">Dias Seguidos 🔥</div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-700">
          <div className="text-center">
            <div className="text-xl font-bold">{userProfile.stats.coursesCompleted}</div>
            <div className="text-blue-200 text-xs">Cursos Concluídos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{userProfile.stats.coursesInProgress}</div>
            <div className="text-blue-200 text-xs">Em Progresso</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{userProfile.stats.totalLessons}</div>
            <div className="text-blue-200 text-xs">Lições Completadas</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">{userProfile.stats.certificates}</div>
            <div className="text-blue-200 text-xs">Certificados</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Os Meus Cursos</h2>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="card p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{course.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800 truncate">{course.title}</h3>
                      {course.status === 'completed' && (
                        <span className="badge bg-green-100 text-green-700 ml-2 shrink-0">
                          ✅ Concluído
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{course.area} · {course.lastActivity}</p>
                    <ProgressBar progress={course.progress} />
                    <p className="text-xs text-gray-400 mt-1">{course.progress}% completo</p>
                  </div>
                </div>
                {course.status === 'in-progress' && (
                  <Link
                    href="/licao"
                    className="mt-3 inline-flex items-center text-sm text-blue-700 hover:text-blue-900 font-medium"
                  >
                    Continuar →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Certificates */}
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">Conquistas</h2>
          <div className="space-y-3 mb-8">
            {achievements.map((achievement) => (
              <div key={achievement.title} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{achievement.title}</p>
                  <p className="text-xs text-gray-500">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-blue-900 mb-4">Certificados</h2>
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl text-white">
              <div className="text-yellow-400 text-sm font-semibold mb-1">🏆 Certificado PORTECOS</div>
              <p className="font-bold">Energias Renováveis — Solar</p>
              <p className="text-blue-300 text-xs mt-1">Emitido em Janeiro 2026</p>
              <button className="mt-2 text-xs bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors">
                📄 Descarregar PDF
              </button>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl text-white">
              <div className="text-yellow-400 text-sm font-semibold mb-1">🏆 Certificado PORTECOS</div>
              <p className="font-bold">Obras & Fiscalização</p>
              <p className="text-blue-300 text-xs mt-1">Emitido em Fevereiro 2026</p>
              <button className="mt-2 text-xs bg-yellow-400 text-blue-900 px-3 py-1 rounded font-semibold hover:bg-yellow-300 transition-colors">
                📄 Descarregar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
