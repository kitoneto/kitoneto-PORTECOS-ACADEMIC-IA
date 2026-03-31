import Link from 'next/link';
import CourseCard from '@/components/CourseCard';

const featuredCourses = [
  {
    id: '1',
    title: 'Fundações em Solo Laterítico',
    area: 'Engenharia Civil',
    icon: '🏗️',
    level: 'Intermédio',
    lessons: 12,
    students: 342,
    description: 'Aprenda a projetar fundações seguras no solo laterítico característico de Luanda.',
  },
  {
    id: '2',
    title: 'Perfuração Offshore — Cabinda',
    area: 'Petróleo & Gás',
    icon: '🛢️',
    level: 'Avançado',
    lessons: 18,
    students: 187,
    description: 'Técnicas de perfuração em blocos offshore da Bacia do Congo.',
  },
  {
    id: '3',
    title: 'Instalação Solar no Namibe',
    area: 'Energias Renováveis',
    icon: '☀️',
    level: 'Iniciante',
    lessons: 8,
    students: 521,
    description: 'Dimensionamento e instalação de sistemas fotovoltaicos no Namibe.',
  },
  {
    id: '4',
    title: 'Redes de Fibra Óptica — Angola Cables',
    area: 'Telecomunicações',
    icon: '📡',
    level: 'Intermédio',
    lessons: 14,
    students: 263,
    description: 'Infraestrutura de fibra óptica e conectividade em Angola.',
  },
  {
    id: '5',
    title: 'IA para Produção Petrolífera',
    area: 'Inteligência Artificial',
    icon: '🤖',
    level: 'Avançado',
    lessons: 20,
    students: 145,
    description: 'Machine Learning aplicado à previsão de produção e manutenção preditiva.',
  },
  {
    id: '6',
    title: 'Avaliação de Impacto — Rio Kwanza',
    area: 'Ambiente',
    icon: '🌿',
    level: 'Intermédio',
    lessons: 10,
    students: 198,
    description: 'Metodologias de avaliação de impacto ambiental em projetos hídricos.',
  },
];

const areas = [
  { name: 'Engenharia Civil', icon: '🏗️', courses: 24 },
  { name: 'Petróleo & Gás', icon: '🛢️', courses: 18 },
  { name: 'Ambiente', icon: '🌿', courses: 15 },
  { name: 'Obras & Fiscalização', icon: '🔨', courses: 12 },
  { name: 'Mecânica', icon: '⚙️', courses: 16 },
  { name: 'Energias Renováveis', icon: '☀️', courses: 14 },
  { name: 'Eletricidade & Eletrónica', icon: '⚡', courses: 20 },
  { name: 'Telecomunicações', icon: '📡', courses: 13 },
  { name: 'Inteligência Artificial', icon: '🤖', courses: 22 },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-2 mb-6 text-yellow-300 text-sm font-medium">
            🇦🇴 Feito para Angola
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Aprende Técnica.{' '}
            <span className="text-yellow-400">Resolve Problemas Reais.</span>
          </h1>
          <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
            Plataforma de formação técnica com IA inspirada no Brilliant.org — mas focada em
            resolver os desafios reais das obras e projetos angolanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/cursos" className="btn-primary text-base px-8 py-4">
              Explorar Cursos →
            </Link>
            <Link
              href="/licao"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
            >
              Ver Exemplo de Lição
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400">1200+</div>
              <div className="text-blue-300 text-sm">Alunos Ativos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">154</div>
              <div className="text-blue-300 text-sm">Cursos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">9</div>
              <div className="text-blue-300 text-sm">Áreas Técnicas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Áreas de Formação</h2>
          <p className="section-subtitle text-center">
            Formação técnica especializada nas áreas mais críticas de Angola
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-9 gap-4">
            {areas.map((area) => (
              <Link
                key={area.name}
                href={`/cursos?area=${encodeURIComponent(area.name)}`}
                className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer"
              >
                <span className="text-3xl mb-2">{area.icon}</span>
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-900 text-center leading-tight">
                  {area.name}
                </span>
                <span className="text-xs text-gray-400 mt-1">{area.courses} cursos</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="section-title mb-1">Cursos em Destaque</h2>
              <p className="text-gray-600">Problemas reais das obras de Angola</p>
            </div>
            <Link href="/cursos" className="btn-outline text-sm">
              Ver Todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor CTA */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Tutor IA Personalizado</h2>
          <p className="text-blue-800 text-lg mb-8">
            O nosso tutor com IA guia-te passo a passo na resolução de problemas técnicos reais —
            como um engenheiro sénior sempre disponível.
          </p>
          <Link href="/licao" className="btn-secondary">
            Experimentar o Tutor IA →
          </Link>
        </div>
      </section>
    </div>
  );
}
