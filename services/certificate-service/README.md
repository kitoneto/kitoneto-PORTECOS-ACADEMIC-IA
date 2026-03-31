# PORTECOS ACADEMIC IA — Certificate Service

## Descrição
Serviço de geração automática de certificados PDF para conclusão de cursos.

## Como Funciona
1. Aluno conclui o curso com aprovação
2. API principal chama o endpoint de geração
3. Template HTML é preenchido com dados do aluno e curso
4. Puppeteer converte o HTML em PDF
5. PDF é guardado no storage (S3) e URL devolvida ao aluno

## Endpoint
`POST /api/certificates/generate`

```json
{
  "studentName": "João Manuel",
  "courseName": "Fundações em Solo Laterítico",
  "area": "Engenharia Civil",
  "completionDate": "30 de Março de 2026",
  "certificateId": "CERT-2026-001234",
  "instructorName": "Eng. Carlos Ferreira"
}
```

## Template
Ver `templates/certificate.html` — design profissional com cores PORTECOS, bandeira de Angola e espaço para assinaturas.

## Verificação de Autenticidade
Cada certificado tem um ID único verificável em `portecosacademic.ao/verify/{certificateId}`.
