import Link from 'next/link';
import { PROGRAMS, AREAS } from '@shared/types';
import DegreeTimeline from '@/components/DegreeTimeline';

interface Props {
  params: { slug: string };
}

// Sample competencies per program area (shared mock data)
const SAMPLE_COMPETENCIES: Record<string, string[]> = {
  '1': ['Resistência dos Materiais','Mecânica dos Solos','Betão Armado','Fundações','Vias de Comunicação','Hidrologia','Gestão de Obras','Orçamentação','Topografia','BIM – Modelação 3D'],
  '2': ['Geologia do Petróleo','Perfuração Direccional','Completação de Poços','Reservatórios','Produção Petrolífera','Refinação','HSE Petrolífera','Simulação de Reservatórios','Economia Petrolífera','Operações Offshore'],
  '3': ['Ecologia Angolana','Avaliação de Impacto Ambiental','Gestão de Resíduos','Qualidade da Água','Biodiversidade','Legislação Ambiental','Remediação de Solos','Monitorização Ambiental','SIG Ambiental','Auditoria Ambiental'],
  '4': ['Gestão de Projecto','Fiscalização de Obras','Medições e Orçamentos','Controlo de Qualidade','Segurança em Obra','Gestão de Contratos','Planeamento com MS Project','Reclamações','Gestão de Subempreiteiros','Relatórios de Obra'],
  '5': ['Termodinâmica','Mecânica dos Fluidos','Projecto de Máquinas','Manutenção Industrial','CAD/CAM','Processos de Fabrico','Automação Industrial','Materiais de Engenharia','Dinâmica de Sistemas','Turbomáquinas'],
  '6': ['Energia Solar Fotovoltaica','Energia Eólica','Hidreletricidade','Biomassa','Redes Inteligentes','Armazenamento de Energia','Sistemas Híbridos','Eficiência Energética','Dimensionamento de Sistemas','Manutenção de Sistemas'],
  '7': ['Circuitos Elétricos','Máquinas Elétricas','Sistemas de Potência','Electrónica de Potência','Automação','Instrumentação','Redes Elétricas AT/MT/BT','Proteções Elétricas','SCADA','Qualidade de Energia'],
  '8': ['Redes de Telecomunicações','Fibra Óptica','Sistemas Rádio','5G e LTE','Antenas e Propagação','Segurança de Redes','VoIP','Satélites','Protocolos TCP/IP','Sistemas Embebidos'],
  '9': ['Python para IA','Machine Learning','Deep Learning','Processamento de Linguagem Natural','Visão Computacional','Big Data','Bases de Dados NoSQL','MLOps','Ética em IA','IA Aplicada à Engenharia'],
};

const SAMPLE_TERMS: Record<string, { termNumber: number; title: string; competencies: string[]; months: string }[]> = {
  bachelor: [
    { termNumber: 1, title: 'Fundamentos I',          competencies: ['Matemática','Física','Química','Programação'], months: 'Meses 1–6' },
    { termNumber: 2, title: 'Fundamentos II',         competencies: ['Estatística','Termodinâmica','Mecânica','Comunicação Técnica'], months: 'Meses 7–12' },
    { termNumber: 3, title: 'Competências Nucleares I',   competencies: ['Disciplina Técnica 1','Disciplina Técnica 2','Disciplina Técnica 3','Laboratório 1'], months: 'Meses 13–18' },
    { termNumber: 4, title: 'Competências Nucleares II',  competencies: ['Disciplina Técnica 4','Disciplina Técnica 5','Gestão de Projecto','Ética Profissional'], months: 'Meses 19–24' },
    { termNumber: 5, title: 'Especialização I',       competencies: ['Especialidade 1','Especialidade 2','Especialidade 3','Sistemas Avançados'], months: 'Meses 25–30' },
    { termNumber: 6, title: 'Especialização II',      competencies: ['Especialidade 4','Especialidade 5','Projeto Integrador I','Segurança Profissional'], months: 'Meses 31–36' },
    { termNumber: 7, title: 'Projeto Final I',        competencies: ['Investigação Aplicada','Metodologia','Caso de Estudo Angola','Projeto Final – Fase 1'], months: 'Meses 37–42' },
    { termNumber: 8, title: 'Projeto Final II',       competencies: ['Projeto Final – Fase 2','Defesa do Projeto','Estágio Virtual','Licenciatura'], months: 'Meses 43–48' },
  ],
  master: [
    { termNumber: 1, title: 'Fundamentos Avançados',  competencies: ['Base Avançada 1','Base Avançada 2','Metodologia de Investigação','Revisão de Literatura'], months: 'Meses 1–6' },
    { termNumber: 2, title: 'Competências Especializadas', competencies: ['Especialidade Avançada 1','Especialidade Avançada 2','Caso de Estudo Angola','Análise Quantitativa'], months: 'Meses 7–12' },
    { termNumber: 3, title: 'Projecto de Mestrado I', competencies: ['Proposta de Dissertação','Recolha de Dados','Metodologia Avançada','Publicação Científica'], months: 'Meses 13–18' },
    { termNumber: 4, title: 'Dissertação',            competencies: ['Dissertação – Escrita','Dissertação – Defesa','Transferência de Conhecimento','Mestrado'], months: 'Meses 19–24' },
  ],
  certificate: [
    { termNumber: 1, title: 'Certificação Profissional', competencies: ['Competência 1','Competência 2','Competência 3','Avaliação Final','Projecto Prático','Certificado'], months: 'Meses 1–6' },
  ],
};

export function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export default function ProgramaDetailPage({ params }: Props) {
  const program = PROGRAMS.find((p) => p.slug === params.slug);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <div>
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-blue-900 mb-2">Programa não encontrado</h1>
          <Link href="/programas" className="text-yellow-600 underline">Ver todos os programas</Link>
        </div>
      </div>
    );
  }

  const area = AREAS.find((a) => a.id === program.areaId);
  const competencies = SAMPLE_COMPETENCIES[program.areaId] ?? [];
  const termsData = SAMPLE_TERMS[program.level] ?? [];
  const levelLabel = { bachelor: 'Licenciatura', master: 'Mestrado', certificate: 'Certificado' }[program.level];
  const levelColor = { bachelor: 'bg-blue-100 text-blue-800', master: 'bg-purple-100 text-purple-800', certificate: 'bg-green-100 text-green-800' }[program.level];
  const totalPrice = program.durationTerms * program.pricePerTermAoa;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <Link href="/programas" className="text-blue-300 hover:text-white text-sm mb-6 inline-flex items-center gap-1">
            ← Voltar aos Programas
          </Link>
          <div className="flex items-start gap-6">
            <span className="text-6xl">{area?.icon ?? '📚'}</span>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${levelColor}`}>{levelLabel}</span>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                  {area?.name}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{program.name}</h1>
              <p className="text-blue-200 text-lg">{program.description}</p>
              <div className="flex flex-wrap gap-6 mt-6 text-sm">
                <div><span className="text-blue-300">Duração:</span> <strong>{program.durationTerms * 6} meses ({program.durationTerms} termos)</strong></div>
                <div><span className="text-blue-300">Competências:</span> <strong>{program.competencyCount}</strong></div>
                <div><span className="text-blue-300">Preço/Termo:</span> <strong className="text-yellow-400">{program.pricePerTermAoa.toLocaleString('pt-AO')} AOA</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Competencies */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-blue-900 text-xl mb-4">📋 Competências do Programa</h2>
              <p className="text-gray-600 text-sm mb-4">
                No modelo CBE, és avaliado por competências — não por disciplinas. Cada competência tem critérios claros de "Competente".
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {competencies.map((comp, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg text-sm text-blue-800">
                    <span className="text-green-500 font-bold">✓</span>
                    {comp}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-blue-900 text-xl mb-4">📅 Plano de Estudos por Termo</h2>
              <DegreeTimeline terms={termsData} programName={program.name} />
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="font-bold text-blue-900 text-xl mb-4">📌 Requisitos de Admissão</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {program.level === 'bachelor' && (
                  <>
                    <li className="flex gap-2"><span>✅</span> Certificado do Ensino Médio (12.ª Classe)</li>
                    <li className="flex gap-2"><span>✅</span> Bilhete de Identidade angolano válido</li>
                    <li className="flex gap-2"><span>✅</span> Histórico escolar do Ensino Médio</li>
                    <li className="flex gap-2"><span>✅</span> Fotografia recente</li>
                    <li className="flex gap-2"><span>✅</span> Declaração de motivação (opcional)</li>
                  </>
                )}
                {program.level === 'master' && (
                  <>
                    <li className="flex gap-2"><span>✅</span> Licenciatura na área relevante ou afim</li>
                    <li className="flex gap-2"><span>✅</span> Média de licenciatura ≥ 12 valores</li>
                    <li className="flex gap-2"><span>✅</span> Bilhete de Identidade válido</li>
                    <li className="flex gap-2"><span>✅</span> Carta de motivação</li>
                    <li className="flex gap-2"><span>✅</span> Duas referências profissionais</li>
                  </>
                )}
                {program.level === 'certificate' && (
                  <>
                    <li className="flex gap-2"><span>✅</span> 10.ª Classe completa ou equivalente</li>
                    <li className="flex gap-2"><span>✅</span> Bilhete de Identidade válido</li>
                    <li className="flex gap-2"><span>✅</span> Interesse na área técnica</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Pricing card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-20">
              <div className="text-center mb-4">
                <p className="text-3xl font-bold text-blue-900">{program.pricePerTermAoa.toLocaleString('pt-AO')}</p>
                <p className="text-gray-500 text-sm">AOA por termo (6 meses)</p>
              </div>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <div className="flex justify-between"><span>Termos totais:</span><span className="font-semibold">{program.durationTerms}</span></div>
                <div className="flex justify-between"><span>Duração total:</span><span className="font-semibold">{program.durationTerms * 6} meses</span></div>
                <div className="flex justify-between border-t border-gray-100 pt-2 font-bold text-blue-900"><span>Total estimado:</span><span>{totalPrice.toLocaleString('pt-AO')} AOA</span></div>
              </div>
              <p className="text-xs text-gray-500 mb-4 text-center">
                ⚡ Estuda mais rápido → paga menos termos!
              </p>
              <Link
                href="/admissao"
                className="block text-center bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 rounded-xl transition-colors"
              >
                Candidatar-se →
              </Link>
              <Link
                href="/mensalidade"
                className="block text-center text-blue-900 text-sm mt-2 underline hover:no-underline"
              >
                Calcular o meu custo
              </Link>
            </div>

            {/* Info */}
            <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4 text-sm">
              <p className="font-semibold text-blue-900 mb-2">ℹ️ Como funciona o modelo CBE</p>
              <p className="text-blue-800 text-xs">
                Sem notas — apenas Competente ou Ainda Não Competente. Avança ao teu ritmo.
                Paga por termo de 6 meses. Termina mais cedo e poupa dinheiro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
