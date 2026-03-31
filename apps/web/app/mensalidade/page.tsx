import Link from 'next/link';
import PricingCalculator from '@/components/PricingCalculator';

const PRICE_TABLE = [
  { level: 'Certificado', duration: '6 meses (1 termo)', price: '30 000 – 35 000', total: '30 000 – 35 000', color: 'bg-green-50 border-green-200' },
  { level: 'Licenciatura', duration: '24–48 meses (4–8 termos)', price: '42 000 – 55 000', total: '168 000 – 440 000', color: 'bg-blue-50 border-blue-200', highlight: true },
  { level: 'Mestrado', duration: '12–24 meses (2–4 termos)', price: '75 000 – 85 000', total: '150 000 – 340 000', color: 'bg-purple-50 border-purple-200' },
];

const PAYMENT_METHODS = [
  { icon: '📱', name: 'Multicaixa Express', desc: 'Pagamento instantâneo via app ou USSD. Código de referência enviado por e-mail.', available: true },
  { icon: '💚', name: 'Unitel Money', desc: 'Transferência via Unitel Money. Referência disponível no portal do estudante.', available: true },
  { icon: '🏦', name: 'Transferência Bancária', desc: 'BFA, BAI, BIC, Millennium. IBAN disponível após confirmação de inscrição.', available: true },
  { icon: '💳', name: 'Cartão Internacional', desc: 'Visa/Mastercard via Stripe. Disponível em breve.', available: false },
];

const FAQ = [
  { q: 'O que é um "termo" no modelo CBE?', a: 'Um termo é um período de 6 meses de estudo. Pagas um valor fixo por termo, independentemente do número de competências que concluíres dentro desse período.' },
  { q: 'Posso concluir mais rápido e pagar menos?', a: 'Sim! Se concluíres todas as competências em 3 termos em vez de 8, pagas apenas 3 termos. O incentivo é estudar de forma mais eficiente.' },
  { q: 'O que acontece se não concluir todas as competências num termo?', a: 'Podes renovar o termo. As competências já concluídas são mantidas — recomeças onde paraste.' },
  { q: 'Existem bolsas de estudo?', a: 'Sim. Candidatos com 12.ª Classe ≥ 16 valores podem aceder a 50% de desconto. Empresas parceiras (Sonangol, ENDE, etc.) oferecem patrocínios.' },
  { q: 'O preço inclui todos os materiais?', a: 'Sim. O preço por termo inclui acesso a todos os materiais de estudo, avaliações, Mentor IA e certificados digitais.' },
];

export default function MensalidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Preços e Pagamento</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Transparência total. Pagas por termo (6 meses), não por disciplina.
            Quanto mais rápido concluíres, menos pagas.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {/* Price Table */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Tabela de Preços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRICE_TABLE.map((row) => (
              <div key={row.level} className={`rounded-2xl border p-6 ${row.color} ${row.highlight ? 'ring-2 ring-blue-500' : ''}`}>
                {row.highlight && <p className="text-xs text-center font-semibold text-blue-600 mb-2 uppercase tracking-wide">Mais Popular</p>}
                <h3 className="font-bold text-blue-900 text-xl mb-1">{row.level}</h3>
                <p className="text-sm text-gray-600 mb-4">{row.duration}</p>
                <p className="text-2xl font-bold text-blue-900 mb-1">{row.price}</p>
                <p className="text-xs text-gray-500 mb-4">AOA por termo</p>
                <p className="text-sm text-gray-700">Total estimado: <strong>{row.total} AOA</strong></p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            * Os preços variam conforme o programa específico. Consulta a página de cada programa.
          </p>
        </section>

        {/* Calculator */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">🧮 Calcula o teu custo</h2>
          <PricingCalculator />
        </section>

        {/* Payment methods */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Métodos de Pagamento</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PAYMENT_METHODS.map((m) => (
              <div key={m.name} className={`bg-white rounded-2xl border p-5 flex gap-4 ${!m.available ? 'opacity-60' : ''}`}>
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-blue-900">{m.name}</h3>
                    {!m.available && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Em Breve</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scholarships */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-3">🎓 Bolsas de Estudo</h2>
          <p className="text-blue-900 mb-6 max-w-2xl mx-auto">
            Acreditamos que o talento não deve ser limitado por recursos financeiros.
            Temos bolsas parciais e totais disponíveis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { icon: '🏆', title: 'Bolsa de Mérito', desc: '50% de desconto para candidatos com média ≥ 16 valores no Ensino Médio' },
              { icon: '🏢', title: 'Bolsa Empresarial', desc: 'Patrocínio por empresas parceiras (Sonangol, ENDE, Telecom)' },
              { icon: '♀️', title: 'Bolsa Género', desc: '25% de desconto para candidatas do sexo feminino em programas STEM' },
            ].map((b) => (
              <div key={b.title} className="bg-white/80 rounded-xl p-4 text-left">
                <p className="text-2xl mb-2">{b.icon}</p>
                <p className="font-semibold text-blue-900 text-sm">{b.title}</p>
                <p className="text-xs text-blue-800 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/admissao" className="inline-flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white font-bold px-8 py-3 rounded-xl transition-colors">
            Candidatar-se a Bolsa →
          </Link>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">❓ Perguntas Frequentes</h2>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl border border-gray-200 p-5">
                <h3 className="font-semibold text-blue-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
