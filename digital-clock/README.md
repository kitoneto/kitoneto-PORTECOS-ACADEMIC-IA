# 🕐 Relógio Mundial — PORTECOS ACADEMIC IA

Mini-projeto de relógio digital com múltiplos fusos horários, desenvolvido em HTML, CSS e JavaScript puro.

## 📋 Funcionalidades

- **Relógio em tempo real** — atualiza a cada segundo
- **7 fusos horários** apresentados em simultâneo
- **Toggle 12h / 24h** — botão no cabeçalho para alternar o formato
- **Design responsivo** — funciona em telemóvel e computador
- **Tema escuro moderno** com gradiente e efeitos de brilho

## 🌍 Fusos Horários Incluídos

| Cidade | País | Fuso | Destaque |
|--------|------|------|----------|
| 🇦🇴 Luanda | Angola | WAT (UTC+1) | ⭐ Relógio principal |
| 🇵🇹 Lisboa | Portugal | WET/WEST (UTC+0/+1) | — |
| 🇧🇷 São Paulo | Brasil | BRT/BRST (UTC-3/-2) | — |
| 🇺🇸 New York | EUA | EST/EDT (UTC-5/-4) | — |
| 🇬🇧 London | Reino Unido | GMT/BST (UTC+0/+1) | — |
| 🇦🇪 Dubai | EAU | GST (UTC+4) | — |
| 🇯🇵 Tokyo | Japão | JST (UTC+9) | — |

> Os fusos com horário de verão (ex: Lisboa, London, New York) mostram a abreviação correta automaticamente.

## 📁 Estrutura dos Ficheiros

```
digital-clock/
├── index.html   — Página principal
├── style.css    — Estilos (tema escuro, grid, animações)
├── script.js    — Lógica dos relógios e toggle 12h/24h
└── README.md    — Esta documentação
```

## 🚀 Como Executar

1. Clone o repositório ou faça download dos ficheiros
2. Abra o ficheiro `digital-clock/index.html` diretamente no browser
3. Não são necessários servidores, dependências ou instalações

## 🎨 Detalhes de Design

- **Fundo**: Gradiente escuro `#0f0f23 → #1a1a3e`
- **Card Luanda**: Borda e destaque dourado (`#ffd54f`)
- **Cards secundários**: Borda e destaque azul (`#4fc3f7`)
- **Fonte dos dígitos**: Monospace (Courier New) para estabilidade visual
- **Efeito hover**: Cards elevam-se suavemente ao passar o rato

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Grid layout, backdrop-filter, transições suaves
- **JavaScript (ES6+)** — `Intl.DateTimeFormat` para fusos horários precisos, `setInterval` para atualização em tempo real

## 📖 Detalhes Técnicos

O script utiliza a API nativa `Intl.DateTimeFormat` com a opção `timeZone` para converter a hora atual para cada fuso sem bibliotecas externas. A deteção de horário de verão é feita comparando os offsets UTC de Janeiro e Julho para cada zona.

---

© 2026 PORTECOS ACADEMIC IA — Plataforma de formação técnica com IA para o mercado angolano lusófono
