# PORTECOS ACADEMIC IA — Auth Service

## Descrição
Serviço de autenticação e autorização baseado em JWT para a plataforma PORTECOS ACADEMIC IA.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /api/auth/register | Registo de novo utilizador |
| POST | /api/auth/login | Login com email/password |
| POST | /api/auth/refresh | Renovar access token |
| POST | /api/auth/forgot-password | Recuperação de password |

## Roles
- **student** — Aluno da plataforma
- **instructor** — Professor/criador de conteúdo
- **admin** — Acesso total à plataforma

## Tokens
- **Access Token**: JWT válido por 7 dias
- **Refresh Token**: JWT válido por 30 dias

## Iniciar

```bash
cd services/auth-service
npm install
npm run dev
# Disponível em http://localhost:4001
```
