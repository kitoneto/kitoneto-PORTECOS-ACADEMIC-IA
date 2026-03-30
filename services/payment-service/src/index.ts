import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PAYMENT_SERVICE_PORT ?? 4002;

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS Payment Service' });
});

// Subscription plans
const PLANS = {
  free: { name: 'Gratuito', priceAOA: 0, features: ['5 cursos', 'Tutor IA limitado'] },
  pro: { name: 'Pro', priceAOA: 5000, features: ['Cursos ilimitados', 'Tutor IA completo', 'Certificados'] },
  enterprise: { name: 'Enterprise', priceAOA: 25000, features: ['Tudo do Pro', 'API access', 'Suporte prioritário'] },
};

app.get('/api/payments/plans', (_req, res) => {
  res.json({ data: PLANS });
});

// Multicaixa Express webhook (placeholder)
app.post('/api/payments/multicaixa/webhook', (req, res) => {
  const payload = req.body as Record<string, unknown>;
  console.log('Multicaixa webhook received:', payload);
  // TODO: Verify signature and update subscription
  res.json({ received: true });
});

// Unitel Money webhook (placeholder)
app.post('/api/payments/unitel-money/webhook', (req, res) => {
  const payload = req.body as Record<string, unknown>;
  console.log('Unitel Money webhook received:', payload);
  res.json({ received: true });
});

app.listen(PORT, () => {
  console.log(`💳 PORTECOS Payment Service running on http://localhost:${PORT}`);
});
