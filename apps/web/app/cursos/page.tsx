import CourseCard from '@/components/CourseCard';
import Link from 'next/link';

const courses = [
  { id: '1', title: 'Fundações em Solo Laterítico', area: 'Engenharia Civil', icon: '🏗️', level: 'Intermédio', lessons: 12, students: 342, description: 'Projete fundações seguras no solo laterítico de Luanda.' },
  { id: '2', title: 'Estruturas de Betão Armado', area: 'Engenharia Civil', icon: '🏗️', level: 'Avançado', lessons: 20, students: 215, description: 'Cálculo estrutural de edifícios com betão armado.' },
  { id: '3', title: 'Topografia Aplicada', area: 'Engenharia Civil', icon: '🏗️', level: 'Iniciante', lessons: 8, students: 412, description: 'Levantamento topográfico e cartografia para obras.' },
  { id: '4', title: 'Perfuração Offshore — Cabinda', area: 'Petróleo & Gás', icon: '🛢️', level: 'Avançado', lessons: 18, students: 187, description: 'Técnicas de perfuração em blocos offshore da Bacia do Congo.' },
  { id: '5', title: 'Produção e Recuperação de Petróleo', area: 'Petróleo & Gás', icon: '🛢️', level: 'Intermédio', lessons: 15, students: 156, description: 'Métodos de recuperação secundária e terciária.' },
  { id: '6', title: 'Avaliação de Impacto — Rio Kwanza', area: 'Ambiente', icon: '🌿', level: 'Intermédio', lessons: 10, students: 198, description: 'AIA em projetos hídricos e barragens.' },
  { id: '7', title: 'Gestão de Resíduos em Luanda', area: 'Ambiente', icon: '🌿', level: 'Iniciante', lessons: 7, students: 287, description: 'Sistemas de gestão de resíduos sólidos urbanos.' },
  { id: '8', title: 'Fiscalização de Obras — Normas LNEC', area: 'Obras & Fiscalização', icon: '🔨', level: 'Intermédio', lessons: 12, students: 234, description: 'Normas e metodologias de fiscalização angolana.' },
  { id: '9', title: 'Manutenção de Equipamentos Petrolíferos', area: 'Mecânica', icon: '⚙️', level: 'Avançado', lessons: 16, students: 143, description: 'Manutenção preventiva e preditiva em refinarias.' },
  { id: '10', title: 'Instalação Solar no Namibe', area: 'Energias Renováveis', icon: '☀️', level: 'Iniciante', lessons: 8, students: 521, description: 'Dimensionamento de sistemas fotovoltaicos.' },
  { id: '11', title: 'Instalações Elétricas em Angola', area: 'Eletricidade & Eletrónica', icon: '⚡', level: 'Intermédio', lessons: 14, students: 389, description: 'Normas e instalações elétricas residenciais e industriais.' },
  { id: '12', title: 'Redes de Fibra Óptica', area: 'Telecomunicações', icon: '📡', level: 'Intermédio', lessons: 14, students: 263, description: 'Infraestrutura de fibra óptica — Angola Cables.' },
  { id: '13', title: 'IA para Produção Petrolífera', area: 'Inteligência Artificial', icon: '🤖', level: 'Avançado', lessons: 20, students: 145, description: 'ML para previsão de produção e manutenção preditiva.' },
  { id: '14', title: 'Deep Learning e Visão Computacional', area: 'Inteligência Artificial', icon: '🤖', level: 'Avançado', lessons: 24, students: 98, description: 'Redes neurais convolucionais e detecção de objetos.' },
];

const areas = ['Todas', 'Engenharia Civil', 'Petróleo & Gás', 'Ambiente', 'Obras & Fiscalização', 'Mecânica', 'Energias Renováveis', 'Eletricidade & Eletrónica', 'Telecomunicações', 'Inteligência Artificial'];
const levels = ['Todos', 'Iniciante', 'Intermédio', 'Avançado'];

export default function CursosPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Catálogo de Cursos</h1>
        <p className="text-gray-600 text-lg">
          {courses.length} cursos disponíveis em 9 áreas técnicas
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Área</p>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <Link
                key={area}
                href={area === 'Todas' ? '/cursos' : `/cursos?area=${encodeURIComponent(area)}`}
                className="px-3 py-1 rounded-full text-sm border border-blue-200 hover:bg-blue-900 hover:text-white hover:border-blue-900 transition-colors"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Nível</p>
          <div className="flex gap-2">
            {levels.map((level) => (
              <button
                key={level}
                className="px-3 py-1 rounded-full text-sm border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
