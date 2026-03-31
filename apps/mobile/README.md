# PORTECOS ACADEMIC IA — App Mobile

## Plano de Desenvolvimento

### Tecnologias
- **React Native** com **Expo SDK 51+**
- **TypeScript**
- **NativeWind** (Tailwind para React Native)
- **Expo Router** (navegação baseada em ficheiros)

### Funcionalidades Previstas
- [ ] Autenticação (login/registo)
- [ ] Catálogo de cursos offline-first
- [ ] Lições interativas no mobile
- [ ] Notificações push (lembretes de estudo)
- [ ] Progresso sincronizado com a web
- [ ] Download de conteúdo para uso offline
- [ ] Certificados digitais no wallet do telemóvel

### Estrutura Planeada

```
apps/mobile/
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/
│   │   ├── index.tsx      → Home
│   │   ├── courses.tsx    → Catálogo
│   │   ├── lesson.tsx     → Lição ativa
│   │   └── profile.tsx    → Perfil
│   └── _layout.tsx
├── components/
├── assets/
└── package.json
```

### Início Rápido (futuro)

```bash
cd apps/mobile
npm install
npx expo start
```

### Target de Mercado
- Android (prioridade — maior quota em Angola)
- iOS
- Web (Expo Web)

### Requisitos de Rede
A app deve funcionar com conexões lentas (2G/3G), comuns em Angola fora de Luanda.
Implementar cache offline e sincronização em background.
