'use client';

import { useState } from 'react';
import { PROGRAMS } from '@shared/types';

type AppStatus = 'draft' | 'submitted' | 'reviewing' | 'accepted' | 'rejected';

const STATUS_STEPS: { key: AppStatus; label: string; icon: string }[] = [
  { key: 'draft',     label: 'Rascunho',   icon: '📝' },
  { key: 'submitted', label: 'Submetida',  icon: '📤' },
  { key: 'reviewing', label: 'Em Análise', icon: '🔍' },
  { key: 'accepted',  label: 'Aceite',     icon: '✅' },
];

export default function AdmissaoPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', province: '',
    programId: '', educationLevel: '', institution: '', year: '',
  });
  const [status, setStatus] = useState<AppStatus>('draft');
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) => setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitted');
    setSubmitted(true);
  };

  const currentStep = STATUS_STEPS.findIndex((s) => s.key === status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Candidatura de Admissão</h1>
          <p className="text-blue-200 text-lg">Dá o primeiro passo para a tua licenciatura em engenharia</p>
          <p className="text-blue-300 text-sm mt-2">✅ Candidatura gratuita · ⚡ Resposta em 48h · 🇦🇴 100% online</p>
        </div>
      </div>

      {/* Application status tracker */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {STATUS_STEPS.map((step, i) => (
              <div key={step.key} className="flex items-center">
                <div className={`flex flex-col items-center ${i <= currentStep ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${i < currentStep ? 'bg-green-500 text-white' : i === currentStep ? 'bg-blue-900 text-white' : 'bg-gray-200'}`}>
                    {step.icon}
                  </div>
                  <span className="text-xs mt-1 text-gray-600 hidden sm:block">{step.label}</span>
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${i < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {submitted ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Candidatura Submetida!</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Recebemos a tua candidatura. A nossa equipa irá analisá-la e responder em até 48 horas para o e-mail fornecido.
            </p>
            <div className="bg-blue-50 rounded-xl p-4 inline-block text-sm text-blue-800">
              📧 Verifica o teu e-mail: <strong>{formData.email}</strong>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              {/* Personal info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-blue-900 text-lg mb-4">👤 Dados Pessoais</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { field: 'name',     label: 'Nome Completo',    type: 'text',  required: true },
                    { field: 'email',    label: 'E-mail',           type: 'email', required: true },
                    { field: 'phone',    label: 'Telefone (+244)',   type: 'tel',   required: true },
                    { field: 'province', label: 'Província',        type: 'text',  required: true },
                  ].map((f) => (
                    <div key={f.field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{f.label} {f.required && <span className="text-red-500">*</span>}</label>
                      <input
                        type={f.type}
                        required={f.required}
                        value={(formData as Record<string, string>)[f.field]}
                        onChange={(e) => update(f.field, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Program selection */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-blue-900 text-lg mb-4">🎓 Programa Desejado</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona o Programa <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={formData.programId}
                    onChange={(e) => update('programId', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="">Escolhe um programa...</option>
                    <optgroup label="Licenciaturas">
                      {PROGRAMS.filter((p) => p.level === 'bachelor').map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </optgroup>
                    <optgroup label="Mestrados">
                      {PROGRAMS.filter((p) => p.level === 'master').map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </optgroup>
                    <optgroup label="Certificados">
                      {PROGRAMS.filter((p) => p.level === 'certificate').map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* Academic background */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-blue-900 text-lg mb-4">📚 Formação Académica</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Escolaridade <span className="text-red-500">*</span></label>
                    <select required value={formData.educationLevel} onChange={(e) => update('educationLevel', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900">
                      <option value="">Seleccionar...</option>
                      <option>10.ª Classe</option>
                      <option>12.ª Classe</option>
                      <option>Licenciatura</option>
                      <option>Mestrado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                    <input type="text" value={formData.institution} onChange={(e) => update('institution', e.target.value)} placeholder="Ex: Escola Secundária..." className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900" />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="font-bold text-blue-900 text-lg mb-4">📁 Documentos</h2>
                <div className="space-y-3">
                  {[
                    { label: 'Bilhete de Identidade (frente e verso)', required: true },
                    { label: 'Certificado / Histórico Escolar', required: true },
                    { label: 'Fotografia Recente (formato passport)', required: true },
                    { label: 'Carta de Motivação (opcional)', required: false },
                  ].map((doc) => (
                    <label key={doc.label} className="flex items-center justify-between p-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                      <span className="text-sm text-gray-700">{doc.label} {doc.required && <span className="text-red-500">*</span>}</span>
                      <span className="text-xs text-blue-600 font-medium">📎 Anexar</span>
                      <input type="file" className="hidden" />
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Formatos aceites: PDF, JPG, PNG — máx. 5MB por ficheiro</p>
              </div>

              <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 rounded-xl transition-colors text-lg">
                Submeter Candidatura →
              </button>
            </form>

            {/* Requirements sidebar */}
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-5">
                <h3 className="font-bold text-blue-900 mb-3">📌 Requisitos Gerais</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex gap-2"><span>✅</span> 12.ª Classe (Licenciatura)</li>
                  <li className="flex gap-2"><span>✅</span> Licenciatura (Mestrado)</li>
                  <li className="flex gap-2"><span>✅</span> BI angolano válido</li>
                  <li className="flex gap-2"><span>✅</span> Acesso à internet</li>
                  <li className="flex gap-2"><span>✅</span> Computador ou smartphone</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                <h3 className="font-bold text-green-800 mb-2">🎁 Bolsas Disponíveis</h3>
                <p className="text-sm text-green-700">Candidatos de excelência (12.ª Classe ≥ 16 valores) podem candidatar-se a 50% de desconto.</p>
              </div>
              <div className="bg-yellow-50 rounded-2xl border border-yellow-200 p-5">
                <h3 className="font-bold text-yellow-800 mb-2">⏱️ Processo</h3>
                <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                  <li>Preenche o formulário</li>
                  <li>Recebe confirmação em 48h</li>
                  <li>Entrevista online (opcional)</li>
                  <li>Aceite → Registo no portal</li>
                  <li>Inicia o primeiro termo</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
