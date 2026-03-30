import express from 'express';
import { rateLimit } from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.CERTIFICATE_SERVICE_PORT ?? 4003;

/** Rate limiter for certificate generation: max 20 per 15 min per IP */
const certLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados pedidos de certificado. Tente novamente mais tarde.' },
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'PORTECOS Certificate Service' });
});

interface CertificateData {
  studentName: string;
  courseName: string;
  area: string;
  completionDate: string;
  certificateId: string;
  instructorName: string;
}

app.post('/api/certificates/generate', certLimiter, async (req, res) => {
  try {
    const data = req.body as CertificateData;

    // Load HTML template
    const templatePath = path.join(__dirname, '..', 'templates', 'certificate.html');
    const templateHtml = fs.readFileSync(templatePath, 'utf-8');

    // Render with Handlebars
    const template = Handlebars.compile(templateHtml);
    const html = template({
      ...data,
      year: new Date().getFullYear(),
      logoUrl: process.env.APP_URL + '/logo.png',
    });

    // In production: use puppeteer to generate PDF
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.setContent(html);
    // const pdf = await page.pdf({ format: 'A4', landscape: true });
    // await browser.close();
    // res.set('Content-Type', 'application/pdf');
    // res.send(pdf);

    // For now, return the HTML
    res.set('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar certificado' });
  }
});

app.listen(PORT, () => {
  console.log(`📜 PORTECOS Certificate Service running on http://localhost:${PORT}`);
});
