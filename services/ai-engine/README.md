# PORTECOS ACADEMIC IA — Motor de IA

## Descrição
Motor de Inteligência Artificial responsável por tutoria personalizada, avaliação automática de respostas e recomendação de conteúdos.

## Componentes

### 🤖 Tutor IA (`src/tutor.ts`)
Guia o aluno na resolução de problemas técnicos reais, utilizando prompts especializados por área.

### �� Avaliador (`src/evaluator.ts`)
Avalia respostas abertas dos alunos usando GPT-4o, fornecendo feedback em português.

### 🎯 Recomendador (`src/recommender.ts`)
Recomenda cursos e lições com base no histórico e interesses do aluno.

## Endpoints
- `POST /api/ai/tutor` — Fazer pergunta ao tutor
- `POST /api/ai/evaluate` — Avaliar resposta do aluno
- `GET /api/ai/recommend/:userId` — Obter recomendações

## Modelos Suportados
- OpenAI GPT-4o (principal)
- Google Gemini Pro (alternativa)

## Iniciar

```bash
cd services/ai-engine
npm install
OPENAI_API_KEY=sk-... npm run dev
```
