# PORTECOS ACADEMIC IA — Documentação da API REST

## Base URL
- **Development:** `http://localhost:4000`
- **Production:** `https://api.portecosacademic.ao`

## Autenticação
Todas as rotas protegidas requerem header:
```
Authorization: Bearer {access_token}
```

Obter token via `POST /api/auth/login`.

---

## Endpoints

### Auth

#### POST /api/auth/register
Registar novo utilizador.

**Request:**
```json
{
  "email": "joao@example.com",
  "password": "MyPassword123!",
  "name": "João Manuel"
}
```

**Response 201:**
```json
{
  "data": {
    "user": { "id": "uuid", "email": "joao@example.com", "name": "João Manuel", "role": "student" },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

#### POST /api/auth/login
Login com credenciais.

---

### Courses

#### GET /api/courses
Listar todos os cursos publicados.

**Query params:** `?area=engenharia-civil&level=beginner&page=1&limit=20`

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Fundações em Solo Laterítico",
      "area": { "slug": "engenharia-civil", "name": "Engenharia Civil", "icon": "🏗️" },
      "level": "intermediate",
      "lessonCount": 12,
      "priceAoa": 0
    }
  ],
  "total": 154
}
```

#### GET /api/courses/:id
Detalhes de um curso específico.

#### POST /api/courses *(auth: instructor, admin)*
Criar novo curso.

---

### Lessons

#### GET /api/lessons/course/:courseId
Listar lições de um curso.

#### GET /api/lessons/:id
Detalhes de uma lição específica.

---

### Progress

#### GET /api/progress/me *(auth)*
Obter progresso geral do utilizador autenticado.

#### PUT /api/progress/lesson/:lessonId *(auth)*
Atualizar progresso numa lição.

**Request:**
```json
{ "completed": true, "score": 85 }
```

---

### AI Engine

#### POST /api/ai/tutor
Interagir com o Tutor IA.

**Request:**
```json
{
  "question": "Como calcular a área de uma sapata?",
  "area": "engenharia-civil",
  "context": "Estou na lição sobre fundações em solo laterítico"
}
```

**Response:**
```json
{
  "data": "Para calcular a área de uma sapata, usa-se a fórmula: A = P / σ_adm, onde P é a carga do pilar e σ_adm é a tensão admissível do solo. Por exemplo..."
}
```

---

## Códigos de Erro

| Código | Significado |
|--------|-------------|
| 400 | Pedido inválido (dados em falta ou incorretos) |
| 401 | Não autenticado (token em falta ou expirado) |
| 403 | Não autorizado (permissões insuficientes) |
| 404 | Recurso não encontrado |
| 409 | Conflito (ex: email já registado) |
| 500 | Erro interno do servidor |
