# Guia de Deployment no Vercel — PORTECOS ACADEMIC IA

Este guia descreve como fazer o deployment da plataforma PORTECOS ACADEMIC IA no Vercel, passo a passo.

---

## Pré-requisitos

- Conta no [Vercel](https://vercel.com) (gratuita para começar)
- Conta no [Supabase](https://supabase.com) com o projecto configurado
- Repositório GitHub ligado à conta Vercel
- Node.js 18 ou superior

---

## Passo 1 — Ligar o repositório GitHub ao Vercel

1. Acede a [vercel.com/new](https://vercel.com/new)
2. Clica em **"Import Git Repository"**
3. Selecciona o repositório `kitoneto-PORTECOS-ACADEMIC-IA`
4. O Vercel detectará automaticamente as configurações do `vercel.json` na raiz do projecto
5. Clica em **"Deploy"** para fazer o primeiro deployment

> **Nota:** O `vercel.json` já está configurado para usar `apps/web` como directório raiz da aplicação Next.js.

---

## Passo 2 — Configurar as variáveis de ambiente no Vercel

No painel do Vercel, acede a **Settings → Environment Variables** e adiciona as seguintes variáveis:

### Variáveis obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `OPENAI_API_KEY` | Chave da API OpenAI para o Mentor IA | `sk-proj-...` |
| `OPENAI_MODEL` | Modelo OpenAI a utilizar (padrão: gpt-4o) | `gpt-4o` |
| `SUPABASE_URL` | URL do projecto Supabase | `https://xxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Chave pública (anon) do Supabase | `eyJ...` |
| `SUPABASE_SERVICE_KEY` | Chave de serviço do Supabase (secreta) | `eyJ...` |
| `NEXT_PUBLIC_SUPABASE_URL` | URL pública do Supabase (para o cliente) | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anon pública (para o cliente) | `eyJ...` |
| `JWT_SECRET` | Segredo para assinar tokens JWT | `string-longa-e-aleatória` |
| `REFRESH_TOKEN_SECRET` | Segredo para os refresh tokens | `outra-string-longa` |

> **Atenção:** As variáveis com prefixo `NEXT_PUBLIC_` são expostas ao browser. Nunca uses a `SUPABASE_SERVICE_KEY` com prefixo `NEXT_PUBLIC_`.

### Como adicionar no Vercel

1. No projecto Vercel, clica em **Settings**
2. Selecciona **Environment Variables**
3. Para cada variável: insere o nome, o valor e selecciona os ambientes (Production, Preview, Development)
4. Clica em **Save**

---

## Passo 3 — Configurar o Supabase

### 3.1 — Criar o projecto

1. Acede a [supabase.com](https://supabase.com) e cria um novo projecto
2. Escolhe a região mais próxima de Angola (ex: `eu-west-1` ou `af-south-1` se disponível)
3. Guarda a password da base de dados em local seguro

### 3.2 — Executar o schema

1. No Supabase, acede a **SQL Editor**
2. Copia o conteúdo de `database/schemas/schema.sql`
3. Cola e clica em **Run** ▶️
4. Verifica que todas as tabelas foram criadas sem erros

### 3.3 — Carregar dados iniciais (opcional)

1. Copia o conteúdo de `database/seeds/seed.sql`
2. Cola no SQL Editor e executa

### 3.4 — Obter as chaves

1. Acede a **Settings → API** no Supabase
2. Copia:
   - **Project URL** → `SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_URL`
   - **anon (public) key** → `SUPABASE_ANON_KEY` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_KEY` ⚠️ (manter secreta)

---

## Passo 4 — Configurar o domínio personalizado

### 4.1 — Adicionar domínio no Vercel

1. No projecto Vercel, acede a **Settings → Domains**
2. Adiciona o teu domínio: ex. `portecosacademic.ao`
3. O Vercel fornecerá registos DNS para configurar

### 4.2 — Configurar DNS

No teu registrador de domínio (ex. .AO Domain Registry), adiciona:

| Tipo | Nome | Valor |
|------|------|-------|
| A | @ | `76.76.21.21` (IP do Vercel) |
| CNAME | www | `cname.vercel-dns.com` |

### 4.3 — Certificado SSL

O Vercel gera automaticamente certificados SSL (HTTPS) via Let's Encrypt. Não é necessária configuração adicional.

---

## Passo 5 — Verificar o deployment

Após configurar todas as variáveis de ambiente:

1. Acede ao painel do Vercel e clica em **Redeploy**
2. Aguarda o build completar (normalmente 2-3 minutos)
3. Acede ao URL do deployment e verifica:
   - [ ] Página inicial carrega correctamente
   - [ ] Página de login (`/login`) funciona
   - [ ] Página de registo (`/registar`) funciona
   - [ ] Dashboard (`/dashboard`) redireciona para login se não autenticado
   - [ ] Mentor IA responde (pode usar respostas mock sem `OPENAI_API_KEY`)

---

## Variáveis de ambiente por ambiente

| Variável | Development | Preview | Production |
|----------|-------------|---------|------------|
| `OPENAI_API_KEY` | Opcional (usa mock) | ✅ | ✅ |
| `SUPABASE_URL` | Opcional (usa mock) | ✅ | ✅ |
| `JWT_SECRET` | `dev-secret` | ✅ | ✅ (forte) |
| `NODE_ENV` | `development` | `preview` | `production` |

---

## Resolução de problemas comuns

### Build falha com "Module not found"
- Verifica que o `rootDirectory` no `vercel.json` está correcto (`apps/web`)
- Executa `npm ci` localmente para verificar dependências

### Erro de autenticação Supabase
- Confirma que `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão correctos
- Verifica que o schema foi executado no Supabase

### Mentor IA não responde
- Confirma que `OPENAI_API_KEY` está configurada em Production
- Sem a chave, o sistema usa respostas mock (útil para testes)

---

## Referências

- [Documentação Vercel Next.js](https://vercel.com/docs/frameworks/nextjs)
- [Supabase + Next.js](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [`.env.example`](../../.env.example) — Lista completa de variáveis de ambiente
