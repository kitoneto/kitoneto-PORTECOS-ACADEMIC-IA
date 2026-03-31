# PORTECOS ACADEMIC IA — Deployment

## Ambientes

| Ambiente | URL | Branch | Auto-deploy |
|----------|-----|--------|-------------|
| Development | localhost | any | — |
| Staging | staging.portecosacademic.ao | develop | ✅ |
| Production | portecosacademic.ao | main | Manual |

## Deploy em Produção

### Opção 1: VPS + Docker Compose (Recomendado para início)
```bash
# 1. Acesso ao servidor
ssh deploy@portecosacademic.ao

# 2. Pull da imagem mais recente
docker pull portecosacademic/web:latest
docker pull portecosacademic/api:latest

# 3. Deploy com zero downtime
docker-compose -f infrastructure/docker/docker-compose.yml up -d --no-deps --build web api

# 4. Verificar saúde
curl https://portecosacademic.ao/health
curl https://api.portecosacademic.ao/health
```

### Opção 2: Kubernetes (Escala)
- Helm charts em `infrastructure/k8s/` (a criar)
- HPA (Horizontal Pod Autoscaler) para picos de tráfego
- Liveness e readiness probes configurados

### Opção 3: Cloud (AWS/Azure)
- **Frontend**: Vercel (Next.js otimizado) ou AWS Amplify
- **API**: AWS ECS Fargate ou Azure Container Apps
- **Database**: AWS RDS PostgreSQL ou Azure Database

## Servidores Recomendados para Angola
Para baixa latência em Luanda, considerar:
- **VPS em Cape Town** (AWS af-south-1) — ~30ms de latência para Luanda
- **Servidor dedicado em Luanda** (Angola Telecom Data Center) — <5ms local
- **CDN**: Cloudflare (PoP em Johannesburg para África)

## Variáveis de Ambiente em Produção
Usar **secrets management**:
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault (self-hosted)

**NUNCA** commitar `.env` com credenciais reais no repositório.

## Backup da Base de Dados
```bash
# Backup diário automático (cron)
0 3 * * * pg_dump $DATABASE_URL | gzip > /backups/portecos_$(date +%Y%m%d).sql.gz

# Retenção: 30 dias locais + upload para S3
aws s3 cp /backups/portecos_$(date +%Y%m%d).sql.gz s3://portecos-backups/
```
