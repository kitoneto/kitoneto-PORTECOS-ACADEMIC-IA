import Link from 'next/link';
import StepIndicator from '@/components/StepIndicator';
import ProgramCard from '@/components/ProgramCard';
import TestimonialCard from '@/components/TestimonialCard';
import { AREAS, PROGRAMS } from '@shared/types';

const STEPS = [
  { number: 1, icon: '📋', title: 'Inscrição',    description: 'Candidata-te online e escolhe o teu programa de engenharia.' },
  { number: 2, icon: '🤝', title: 'Mentor',       description: 'Recebe o teu Mentor IA pessoal que te acompanha ao longo do curso.' },
  { number: 3, icon: '📚', title: 'Estudo',       description: 'Estuda ao teu ritmo com materiais adaptados ao contexto angolano.' },
  { number: 4, icon: '🏆', title: 'Competência',  description: 'Demonstra o que sabes e obtém o teu grau académico.' },
];

const TESTIMONIALS = [
  { quote: 'Consegui concluir a licenciatura em 3 anos enquanto trabalhava na Sonangol. O modelo CBE é revolucionário para Angola.', name: 'Celestino Mbala', program: 'B.S. Petróleo & Gás', year: 2024, province: 'Cabinda', avatarEmoji: '👨🏿‍🎓' },
  { quote: 'Como mulher engenheira em Luanda, esta plataforma deu-me acesso à educação de qualidade sem deixar a família.', name: 'Fernanda Kapinga', program: 'B.S. Energias Renováveis', year: 2024, province: 'Luanda', avatarEmoji: '👩🏿‍🎓' },
  { quote: 'Os materiais focam nos problemas reais de Angola. Aprendi sobre solo laterítico e construção em clima tropical.', name: 'Eduardo Lussati', program: 'B.S. Engenharia Civil', year: 2023, province: 'Benguela', avatarEmoji: '👨🏿‍💻' },
];

const FEATURED_PROGRAMS = PROGRAMS.filter((p) => p.isPublished).slice(0, 6);

const AREA_ICONS: Record<string, string> = AREAS.reduce((acc, a) => ({ ...acc, [a.slug]: a.icon }), {});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full px-4 py-2 mb-6 text-yellow-300 text-sm font-medium">
            <span aria-label="Bandeira de Angola" role="img">🇦🇴</span> Modelo CBE — Competency-Based Education
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            A Primeira Universidade Virtual{' '}
            <span className="text-yellow-400">de Engenharia de Angola</span>
          </h1>
          <p className="text-xl text-blue-200 mb-4 max-w-3xl mx-auto">
            Inspirado no modelo WGU — sem notas, sem horários fixos. Demonstras o que sabes e obténs o teu grau.
            Paga por termo (6 meses), não por disciplina.
          </p>
          <p className="text-base text-blue-300 mb-10 max-w-2xl mx-auto">
            Licenciaturas, Mestrados e Certificados em Engenharia — 100% online, 100% focado nos desafios reais de Angola.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissao" className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl transition-colors text-base inline-flex items-center gap-2">
              Inscreva-se Agora →
            </Link>
            <Link href="/programas" className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-blue-900 font-semibold px-8 py-4 rounded-xl transition-colors text-base">
              Ver Programas
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-yellow-400">2 400+</div>
              <div className="text-blue-300 text-sm mt-1">Estudantes Activos</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">87%</div>
              <div className="text-blue-300 text-sm mt-1">Taxa de Conclusão</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400">14</div>
              <div className="text-blue-300 text-sm mt-1">Programas</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Como Funciona ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">Como Funciona</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              O modelo CBE permite-te avançar ao teu ritmo. Estudas, demonstras competência e recebes o grau.
            </p>
          </div>
          <StepIndicator steps={STEPS} />
        </div>
      </section>

      {/* ── Programas de Grau ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">Programas de Grau</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Licenciaturas, Mestrados e Certificados — todos focados nos desafios reais da engenharia angolana.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {FEATURED_PROGRAMS.map((p) => (
              <ProgramCard
                key={p.id}
                slug={p.slug}
                name={p.name}
                icon={AREA_ICONS[AREAS.find(a => a.id === p.areaId)?.slug ?? ''] ?? '📚'}
                level={p.level}
                description={p.description}
                durationTerms={p.durationTerms}
                competencyCount={p.competencyCount}
                pricePerTermAoa={p.pricePerTermAoa}
              />
            ))}
          </div>
          <div className="text-center">
            <Link href="/programas" className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-xl transition-colors">
              Ver Todos os 14 Programas →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Porquê PORTECOS? ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">Porquê PORTECOS?</h2>
            <p className="text-gray-600 text-lg">A educação de engenharia que Angola merece</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'Preço Justo', description: 'Paga por termo (6 meses), não por disciplina. Quanto mais rápido concluíres, menos pagas. A partir de 30 000 AOA/termo.' },
              { icon: '🤖', title: 'IA Personalizada', description: 'Mentor IA disponível 24/7, tutor adaptativo e avaliações geradas automaticamente para o teu nível.' },
              { icon: '🇦🇴', title: 'Feito para Angola', description: 'Casos práticos sobre solo laterítico, blocos petrolíferos, sistema elétrico nacional e desafios reais angolanos.' },
              { icon: '⏰', title: 'Sem Horários Fixos', description: 'Estuda quando quiseres, onde quiseres. Compatível com trabalho e família. 100% assíncrono.' },
              { icon: '🏆', title: 'Grau Reconhecido', description: 'Licenciaturas e Mestrados com valor no mercado de trabalho angolano. Certificado digital verificável.' },
              { icon: '🔄', title: 'Sem Reprovações', description: 'No modelo CBE não há reprovações — apenas "Competente" ou "Ainda não competente". Podes tentar sempre.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-blue-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Teaser ── */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Preços Transparentes</h2>
          <p className="text-blue-200 text-lg mb-6">
            Licenciaturas a partir de <span className="text-yellow-400 font-bold">42 000 AOA/termo</span> · Mestrados a partir de <span className="text-yellow-400 font-bold">75 000 AOA/termo</span> · Certificados a partir de <span className="text-yellow-400 font-bold">30 000 AOA/termo</span>
          </p>
          <p className="text-blue-300 text-sm mb-8">
            Cada termo = 6 meses. Paga apenas pelos termos que utilizas. Bolsas disponíveis para candidatos de excelência.
          </p>
          <Link href="/mensalidade" className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold px-8 py-4 rounded-xl transition-colors">
            🧮 Calcular o Meu Custo →
          </Link>
        </div>
      </section>

      {/* ── Testemunhos ── */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-3">O que dizem os nossos estudantes</h2>
            <p className="text-gray-600">Histórias reais de Angola</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Final ── */}
      <section className="py-20 px-6 bg-yellow-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Comece Hoje</h2>
          <p className="text-blue-800 text-lg mb-8">
            Junta-te a mais de 2 400 estudantes angolanos que já estão a construir o futuro de Angola.
          </p>
          <Link href="/admissao" className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-10 py-5 rounded-xl transition-colors text-lg">
            Inscreva-se Agora — É Gratuito →
          </Link>
          <p className="text-blue-800 text-sm mt-4">Sem compromisso. Candidatura gratuita. Resposta em 48h.</p>
        </div>
      </section>
    </div>
  );
}
