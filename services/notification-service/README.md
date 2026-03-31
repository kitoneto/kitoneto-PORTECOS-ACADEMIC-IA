# PORTECOS ACADEMIC IA — Notification Service

## Canais de Notificação
- ✉️ **Email** (SMTP / SendGrid)
- 📱 **WhatsApp** (Twilio WhatsApp Business API)
- 🔔 **Push Notifications** (Firebase Cloud Messaging — futuro)

## Endpoints
- `POST /api/notifications/welcome` — Email de boas-vindas
- `POST /api/notifications/course-complete` — Email de conclusão de curso
- `POST /api/notifications/whatsapp` — Notificação WhatsApp

## Templates
Ver pasta `templates/` para os templates HTML dos emails.

## Configuração
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@portecosacademic.ao
SMTP_PASSWORD=...
```
