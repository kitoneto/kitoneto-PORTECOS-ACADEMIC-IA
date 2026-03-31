# PORTECOS ACADEMIC IA — Arquitetura do Sistema

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    PORTECOS ACADEMIC IA                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────────┐  │
│  │  apps/web    │   │  apps/admin  │   │   apps/mobile      │  │
│  │  Next.js 14  │   │  Next.js 14  │   │   React Native     │  │
│  │  Port: 3000  │   │  Port: 3001  │   │   (futuro)         │  │
│  └──────┬───────┘   └──────┬───────┘   └─────────┬──────────┘  │
│         │                  │                      │              │
│         └──────────────────┼──────────────────────┘              │
│                            │ HTTP/REST                           │
│  ┌─────────────────────────▼───────────────────────────────┐   │
│  │                    API Gateway / Nginx                   │   │
│  └────┬──────────┬──────────┬──────────┬──────────┬────────┘   │
│       │          │          │          │          │             │
│  ┌────▼──┐  ┌────▼──┐  ┌───▼───┐  ┌──▼────┐  ┌─▼──────┐     │
│  │  API  │  │  Auth │  │  AI   │  │ Cert  │  │ Notify │     │
│  │  :4000│  │ :4001 │  │Engine │  │ :4003 │  │ :4004  │     │
│  │Express│  │  JWT  │  │ :5000 │  │  PDF  │  │ Email  │     │
│  └───┬───┘  └───┬───┘  └───┬───┘  └──┬────┘  └─┬──────┘     │
│      │          │          │          │          │              │
│  ┌───▼──────────▼──┐    ┌──▼──┐   ┌──▼──┐   ┌──▼──┐          │
│  │   PostgreSQL 16  │    │Redis│   │OpenAI   │SMTP │          │
│  │     Port: 5432   │    │:6379│   │ API │   │     │          │
│  └─────────────────┘    └─────┘   └─────┘   └─────┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Decisões Técnicas

### Monorepo com Turborepo
- Facilita partilha de código (shared/)
- Build caching entre pacotes
- Execução paralela de scripts

### Next.js 14 App Router
- Server-side rendering para SEO
- Streaming para carregamento progressivo
- Server Actions para formulários simples

### Microserviços Leves
- Separação de responsabilidades
- Deploy independente por serviço
- Escalabilidade horizontal seletiva

### PostgreSQL como Base Principal
- ACID compliance para dados críticos (pagamentos, certificados)
- JSONB para dados flexíveis (opções de quiz, conteúdo de lições)
- pgcrypto para hash de passwords no BD

### Redis para Cache
- Sessões de utilizador
- Cache de cursos populares
- Rate limiting nas APIs

### OpenAI GPT-4o para IA
- Melhor performance em português técnico
- Function calling para respostas estruturadas
- Fallback para Gemini Pro em caso de quota

## Considerações para Angola

### Conectividade
- API com cache agressivo (Redis) para compensar latência
- Assets estáticos via CDN (Cloudflare PoP Johannesburg)
- Compressão Brotli em todas as respostas

### Pagamentos
- Multicaixa Express como método primário
- Unitel Money para interior de Angola
- Stripe para diaspora angolana internacional

### Idioma e Localização
- Interface em português (Angola/Brasil)
- Código e comentários em inglês
- Suporte a formatos angolanos (AOA, datas pt-AO)
