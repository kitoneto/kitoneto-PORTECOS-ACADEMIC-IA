<div align="center">
  <h1>🎓 PORTECOS ACADEMIC IA</h1>
  <p><strong>Plataforma de formação técnica com IA para o mercado angolano lusófono</strong></p>

  ![License](https://img.shields.io/badge/license-MIT-blue.svg)
  ![Node](https://img.shields.io/badge/node-%3E%3D18-green.svg)
  ![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192.svg)
  ![Docker](https://img.shields.io/badge/Docker-ready-2496ED.svg)

  <p>
    <a href="#-início-rápido">Início Rápido</a> ·
    <a href="#-stack">Stack</a> ·
    <a href="#-áreas-de-formação">Áreas de Formação</a> ·
    <a href="#-estrutura-do-projeto">Estrutura</a> ·
    <a href="docs/product/README.md">Roadmap</a>
  </p>
</div>

---

> Inspirada no Brilliant.org — mas focada em **resolver problemas reais de obra** nas áreas técnicas de Angola. 🇦🇴

## 📸 Screenshots

| Homepage | Catálogo de Cursos | Lição Interativa |
|:---:|:---:|:---:|
| *[screenshot placeholder]* | *[screenshot placeholder]* | *[screenshot placeholder]* |

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 16 (ou usar Docker)

### Instalação

```bash
# 1. Clonar o repositório
git clone https://github.com/kitoneto/kitoneto-PORTECOS-ACADEMIC-IA.git
cd kitoneto-PORTECOS-ACADEMIC-IA

# 2. Copiar variáveis de ambiente
cp .env.example .env.local

# 3. Instalar dependências
npm install

# 4. Iniciar serviços com Docker
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# 5. Correr migrações da base de dados
npm run db:migrate

# 6. Iniciar em modo desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) 🎉

## 🛠️ Stack

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | Next.js 14, React 18, Tailwind CSS, TypeScript |
| **Backend** | Node.js, Express, TypeScript |
| **Base de Dados** | PostgreSQL 16 |
| **IA** | OpenAI GPT-4o / Google Gemini |
| **Auth** | JWT + Refresh Tokens |
| **Infra** | Docker, GitHub Actions |
| **Monorepo** | Turborepo + npm workspaces |
| **Cache** | Redis |

## 🎓 Áreas de Formação

| Área | Módulos | Problema Real Angola |
|------|---------|---------------------|
| 🏗️ Engenharia Civil | Fundações, Estruturas, Betão, Topografia | Solo laterítico em Luanda |
| 🛢️ Petróleo & Gás | Perfuração, Produção, Refino | Perfuração offshore Cabinda |
| 🌿 Ambiente | Avaliação de Impacto, Gestão Resíduos | Rio Kwanza |
| 🔨 Obras & Fiscalização | Fiscalização, Normas, Qualidade | Normas angolanas LNEC |
| ⚙️ Mecânica | Termodinâmica, Máquinas, Manutenção | Equipamentos petrolíferos |
| ☀️ Energias Renováveis | Solar, Eólica, Hídrica | Painéis solares no Namibe |
| ⚡ Eletricidade & Eletrónica | Circuitos, Instalações, Automação | Instalações em Luanda |
| 📡 Telecomunicações | Redes, Fibra Óptica, 5G | Angola Cables |
| 🤖 Inteligência Artificial | ML, Deep Learning, NLP | Previsão produção petrolífera |

## 📁 Estrutura do Projeto

```
portecos-academic-ia/
├── apps/
│   ├── web/          → Next.js 14 (app principal)
│   ├── admin/        → Painel administrativo
│   └── mobile/       → React Native/Expo (futuro)
├── services/
│   ├── api/          → Express REST API
│   ├── ai-engine/    → Motor de IA (tutor, avaliação, recomendação)
│   ├── auth-service/ → Autenticação JWT
│   ├── payment-service/     → Pagamentos angolanos
│   ├── certificate-service/ → Geração de certificados PDF
│   └── notification-service/→ Email, WhatsApp, push
├── database/
│   ├── migrations/   → Migrações SQL
│   ├── schemas/      → Schema PostgreSQL
│   └── seeds/        → Dados de exemplo
├── content/          → Conteúdo por área técnica
├── shared/           → Tipos, UI, utils partilhados
├── infrastructure/   → Docker, CI/CD, monitoring
└── docs/             → Documentação completa
```

## 🤝 Contribuir

1. Fork o repositório
2. Cria uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit as mudanças (`git commit -m 'feat: adicionar nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abre um Pull Request

## 📜 Licença

MIT © 2026 [PORTECOS ACADEMIC IA](https://portecosacademic.ao)

---

<div align="center">
  <p>Feito com ❤️ para Angola 🇦🇴</p>
  <p><strong>PORTECOS ACADEMIC IA</strong> — Transformando a formação técnica em Angola</p>
</div>
