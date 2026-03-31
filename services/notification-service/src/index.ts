import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.NOTIFICATION_SERVICE_PORT ?? 4004;

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

function renderTemplate(templateName: string, data: Record<string, unknown>): string {
  const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateHtml);
  return template(data);
}

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS Notification Service' });
});

app.post('/api/notifications/welcome', async (req, res) => {
  const { email, name } = req.body as { email: string; name: string };
  try {
    const html = renderTemplate('welcome', { name, year: new Date().getFullYear() });
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `Bem-vindo(a) ao PORTECOS ACADEMIC IA, ${name}! 🎓`,
      html,
    });
    res.json({ message: 'Email de boas-vindas enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
});

app.post('/api/notifications/course-complete', async (req, res) => {
  const { email, name, courseName } = req.body as { email: string; name: string; courseName: string };
  try {
    const html = renderTemplate('course-complete', { name, courseName, year: new Date().getFullYear() });
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: `🏆 Parabéns! Concluíste "${courseName}"`,
      html,
    });
    res.json({ message: 'Email de conclusão enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar email' });
  }
});

// WhatsApp notification (Twilio WABA)
app.post('/api/notifications/whatsapp', async (req, res) => {
  const { phone, message } = req.body as { phone: string; message: string };
  // In production: use Twilio WhatsApp API
  console.log(`WhatsApp notification to ${phone}: ${message}`);
  res.json({ message: 'Notificação WhatsApp enfileirada', phone, messageLength: message.length });
});

app.listen(PORT, () => {
  console.log(`📨 PORTECOS Notification Service running on http://localhost:${PORT}`);
});
