# PORTECOS ACADEMIC IA — A Primeira Universidade Virtual de Engenharia de Angola

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql)](https://postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> **Modelo CBE (Competency-Based Education)** — Sem notas, sem horários fixos.
> Demonstras o que sabes e obténs o teu grau. Inspirado no modelo WGU (Western Governors University).

---

## 🇦🇴 O que é a PORTECOS?

A **PORTECOS ACADEMIC IA** é a primeira universidade virtual de engenharia de Angola.
Oferece Licenciaturas, Mestrados e Certificados em Engenharia, 100% online, com recurso a
Inteligência Artificial personalizada e o modelo académico CBE.

### Modelo CBE — Como funciona?

| Educação Tradicional | PORTECOS (CBE) |
|---|---|
| Notas de 0–20 | Competente / Ainda Não |
| Semestres fixos | Termos de 6 meses, ritmo próprio |
| Paga por disciplina | Paga por termo (6 meses), preço fixo |
| Reprovações | Novas tentativas sempre disponíveis |
| Professores com horário | Mentor IA disponível 24/7 |

**Quanto mais rápido concluíres, menos pagas.**

---

## 🎓 Programas Disponíveis

### Licenciaturas (B.S.) — 8 termos × 6 meses

| Programa | Competências | Preço/Termo |
|---|---|---|
| B.S. Engenharia Civil | 40 | 45 000 AOA |
| B.S. Engenharia de Petróleo & Gás | 42 | 55 000 AOA |
| B.S. Engenharia Ambiental | 38 | 42 000 AOA |
| B.S. Engenharia Mecânica | 40 | 45 000 AOA |
| B.S. Engenharia de Energias Renováveis | 36 | 48 000 AOA |
| B.S. Engenharia Electrotécnica | 40 | 45 000 AOA |
| B.S. Engenharia de Telecomunicações | 38 | 48 000 AOA |
| B.S. Inteligência Artificial & Data Science | 42 | 55 000 AOA |

### Mestrados (M.S.) — 4 termos × 6 meses

| Programa | Competências | Preço/Termo |
|---|---|---|
| M.S. Gestão de Obras & Fiscalização | 20 | 75 000 AOA |
| M.S. Engenharia de Petróleo (Avançado) | 22 | 85 000 AOA |
| M.S. Inteligência Artificial Aplicada | 20 | 80 000 AOA |

### Certificados — 1 termo × 6 meses

| Programa | Competências | Preço/Termo |
|---|---|---|
| Certificado em Fiscalização de Obras | 8 | 35 000 AOA |
| Certificado em Energias Renováveis | 6 | 30 000 AOA |
| Certificado em IA para Engenharia | 6 | 35 000 AOA |

---

## 🏗️ Stack Tecnológico

```
apps/
  web/          — Next.js 15 + Tailwind CSS (frontend principal)
  admin/        — Painel de administração

services/
  ai-engine/    — Motor de IA (Mentor, Avaliador, Tutor)
  api/          — REST API (Express + PostgreSQL)
  auth-service/ — Autenticação JWT

shared/
  types/        — Interfaces TypeScript partilhadas

database/
  schemas/      — Schema PostgreSQL (CBE + Legacy)
  migrations/   — Migrações de base de dados

content/
  engenharia-civil/
  petroleo-gas/
  ambiente/
  ... (9 áreas)

docs/
  wgu-model.md       — Explicação do modelo CBE
  student-journey.md — Jornada do estudante
```

### Tecnologias Principais

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript
- **Base de Dados:** PostgreSQL 16
- **IA:** OpenAI-compatible API (GPT-4o / Ollama local)
- **Autenticação:** JWT + bcrypt
- **Infraestrutura:** Docker, Nginx

---

## 🚀 Como Começar

### Pré-requisitos
- Node.js 20+
- PostgreSQL 16+
- npm ou yarn

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/kitoneto/PORTECOS-ACADEMIC-IA.git
cd PORTECOS-ACADEMIC-IA

# 2. Instala dependências
npm install

# 3. Copia as variáveis de ambiente
cp .env.example .env
# Edita o .env com as tuas credenciais

# 4. Inicializa a base de dados
psql -U postgres -c "CREATE DATABASE portecos_db;"
psql -U postgres -d portecos_db -f database/schemas/schema.sql

# 5. Inicia o servidor de desenvolvimento
npm run dev
```

### Aceder à aplicação

- **Frontend:** http://localhost:3000
- **API:** http://localhost:4000
- **Admin:** http://localhost:3001

---

## 📁 Estrutura de Páginas (Web)

| Rota | Descrição |
|---|---|
| `/` | Homepage WGU-style |
| `/programas` | Catálogo de programas |
| `/programas/[slug]` | Página individual de programa |
| `/admissao` | Formulário de candidatura |
| `/mensalidade` | Preços e calculadora |
| `/dashboard` | Portal do estudante |
| `/dashboard/competencia/[id]` | Página de competência |
| `/dashboard/mentor` | Interface do Mentor IA |
| `/cursos` | Cursos legados |
| `/licao` | Exemplo de lição |

---

## 🤖 Serviços de IA

### Mentor IA (`services/ai-engine/src/mentor.ts`)
- `analyzeProgress(studentId)` — Analisa o progresso actual
- `generateWeeklyPlan(studentId)` — Cria plano de estudo semanal
- `sendMotivation(studentId)` — Envia motivação quando necessário
- `checkTermDeadlines(studentId)` — Alerta sobre prazos do termo

### Avaliador IA (`services/ai-engine/src/assessor.ts`)
- `generateAssessment(competencyId, difficulty)` — Gera avaliação adaptativa
- `evaluateSubmission(submissionId, content)` — Avalia submissão de projeto
- `determineCompetency(results)` — Determina se o estudante é competente

---

## 📄 Documentação

- [`docs/wgu-model.md`](./docs/wgu-model.md) — Explicação do modelo CBE/WGU
- [`docs/student-journey.md`](./docs/student-journey.md) — Jornada completa do estudante
- [`docs/api/README.md`](./docs/api/README.md) — Documentação da API
- [`docs/architecture/README.md`](./docs/architecture/README.md) — Arquitectura do sistema

---

## 🌍 Design System

- **Azul Escuro:** `#1a365d` (blue-900)
- **Dourado:** `#d69e2e` (yellow-500)
- **Branco:** `#ffffff`
- **Língua:** Português angolano (pt-AO)
- **Interface:** Tailwind CSS

---

## 📜 Licença

MIT License — ver [LICENSE](./LICENSE)

---

## 🤝 Contribuição

Consulta o guia de contribuição antes de submeter pull requests.
Reporta bugs e sugestões em Issues.

---

**PORTECOS ACADEMIC IA** — *Engenharia para Angola, por Angola.* 🇦🇴
