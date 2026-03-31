# PORTECOS ACADEMIC IA — REST API

## Descrição
API REST principal da plataforma, construída com Node.js + Express + TypeScript.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /health | Health check |
| GET | /api/courses | Listar todos os cursos |
| GET | /api/courses/:id | Detalhes de um curso |
| POST | /api/courses | Criar curso (auth) |
| PUT | /api/courses/:id | Atualizar curso (auth) |
| DELETE | /api/courses/:id | Apagar curso (auth) |
| GET | /api/lessons/course/:courseId | Lições de um curso |
| GET | /api/lessons/:id | Detalhes de uma lição |
| GET | /api/users/me | Perfil do utilizador autenticado |
| PUT | /api/users/me | Atualizar perfil |
| GET | /api/progress/me | Progresso geral do utilizador |
| PUT | /api/progress/lesson/:lessonId | Atualizar progresso numa lição |

## Autenticação
JWT Bearer token. Obter o token via `POST /api/auth/login` (auth-service).

## Iniciar

```bash
cd services/api
npm install
npm run dev
# API disponível em http://localhost:4000
```

## Variáveis de Ambiente
Ver `.env.example` na raiz do projeto.
