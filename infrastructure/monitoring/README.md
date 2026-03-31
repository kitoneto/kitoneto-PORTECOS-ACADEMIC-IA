# PORTECOS ACADEMIC IA — Monitoring & Logging

## Stack de Monitorização Planeado

### Métricas de Aplicação
- **Prometheus** — coleta de métricas (custom metrics + Node.js default)
- **Grafana** — dashboards de visualização
- Métricas chave:
  - Alunos ativos (DAU/MAU)
  - Taxa de conclusão de cursos
  - Latência da API (p50, p95, p99)
  - Sessões do Tutor IA (custo OpenAI)
  - Erros por rota

### Logging
- **Winston** — logging estruturado (JSON) em todos os serviços
- **Loki** — agregação de logs (integra com Grafana)
- Níveis: `error`, `warn`, `info`, `debug`

### Error Tracking
- **Sentry** — captura de exceções em tempo real
  - Frontend (Next.js)
  - Backend (Express)
  - Source maps para debugging

### Alertas
- **Grafana Alerting** ou **PagerDuty**
- Alertas críticos:
  - API down (uptime < 99,5%)
  - Database connection errors
  - OpenAI API quota atingida
  - Pagamento falhado (> 5 em 1h)

### Uptime Monitoring
- **BetterUptime** ou **UptimeRobot**
  - Verificação a cada 60 segundos
  - Alertas por email e WhatsApp

## Dashboards Grafana

### Dashboard 1: Plataforma Overview
- Alunos online agora
- Cursos mais populares
- Taxa de erros API

### Dashboard 2: AI Engine
- Tokens OpenAI consumidos/dia
- Tempo médio de resposta do tutor
- Sessões ativas

### Dashboard 3: Infraestrutura
- CPU/RAM dos containers
- Conexões PostgreSQL
- Cache hit rate (Redis)

## TODO
- [ ] Configurar Prometheus + exporters
- [ ] Criar dashboards Grafana
- [ ] Integrar Sentry no frontend e backend
- [ ] Configurar alertas WhatsApp para equipa técnica
