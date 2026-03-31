# PORTECOS ACADEMIC IA — Payment Service

## Plano de Integração com Pagamentos Angolanos

### Métodos de Pagamento a Integrar

#### 1. Multicaixa Express (Prioridade Alta)
- Maior sistema de pagamentos digitais em Angola
- API REST disponível para parceiros
- Suporte a pagamentos por referência e por QR Code
- Integração com Banco BFA, BIC, BAI, BCA

#### 2. Unitel Money (Prioridade Alta)
- Carteira móvel da operadora Unitel
- Muito usado no interior de Angola (sem conta bancária)
- API via USSD e REST

#### 3. Movicel (Prioridade Média)
- Carteira móvel da Movicel
- Alternativa ao Unitel Money

#### 4. Stripe (Pagamentos Internacionais)
- Para clientes fora de Angola (Diaspora angolana)
- Cartões Visa/Mastercard

### Planos de Subscrição

| Plano | Preço/mês | Características |
|-------|-----------|----------------|
| Gratuito | 0 AOA | 5 cursos, Tutor IA limitado |
| Pro | 5.000 AOA | Cursos ilimitados, Tutor IA, Certificados |
| Enterprise | 25.000 AOA | Tudo + API, Suporte prioritário |

### Fluxo de Pagamento Multicaixa

1. Cliente escolhe plano Pro
2. Sistema gera referência Multicaixa (entidade + referência + valor)
3. Cliente paga no Multicaixa Express app, ATM, ou internet banking
4. Webhook notifica o sistema → ativa subscrição
5. Certificado de pagamento enviado por email

### TODO
- [ ] Integração com API Multicaixa Express
- [ ] Integração com API Unitel Money
- [ ] Sistema de faturação automática (NIF Angola)
- [ ] Reembolsos e gestão de disputas
- [ ] Dashboard de relatórios financeiros
