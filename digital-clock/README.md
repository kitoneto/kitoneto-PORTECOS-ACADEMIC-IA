# 🕐 Relógio Mundial — PORTECOS ACADEMIC IA

Mini-projeto web que exibe a hora atual em múltiplos fusos horários, com design moderno e tema escuro.

## 🌍 Fusos Horários Incluídos

| Cidade         | País                  | Fuso      | Destaque       |
|----------------|-----------------------|-----------|----------------|
| 🇦🇴 Luanda     | Angola                | WAT       | ⭐ Principal   |
| 🇵🇹 Lisboa     | Portugal              | WET/WEST  |                |
| 🇧🇷 São Paulo  | Brasil                | BRT       |                |
| 🇺🇸 Nova Iorque | EUA                  | EST/EDT   |                |
| 🇬🇧 Londres    | Reino Unido           | GMT/BST   |                |
| 🇦🇪 Dubai      | Emirados Árabes Unidos| GST       |                |
| 🇯🇵 Tóquio     | Japão                 | JST       |                |

## ✨ Funcionalidades

- ⏱ Atualização em tempo real a cada segundo
- 🔄 Botão para alternar entre formato **24h** e **12h**
- 📱 Design responsivo — funciona em mobile e desktop
- 🎨 Tema escuro com gradiente, cards semi-transparentes e efeitos hover
- ⭐ Relógio de Luanda em destaque (card maior, borda dourada)
- Animação suave no tick dos segundos

## 🗂 Estrutura dos Ficheiros

```
digital-clock/
├── index.html   — Estrutura HTML principal
├── style.css    — Estilos: tema escuro, grid, cards, animações
├── script.js    — Lógica: Intl.DateTimeFormat, setInterval, toggle 12h/24h
└── README.md    — Esta documentação
```

## 🚀 Como Usar

1. Abra o ficheiro `index.html` diretamente no browser, **ou**
2. Sirva com qualquer servidor HTTP estático, por exemplo:

```bash
# Com Python 3
python -m http.server 8080

# Com Node.js (npx serve)
npx serve .
```

Depois aceda a `http://localhost:8080/digital-clock/`

## 🛠 Tecnologias

- **HTML5** — Estrutura semântica
- **CSS3** — Grid, Flexbox, variáveis CSS, animações keyframe
- **JavaScript (ES6+)** — `Intl.DateTimeFormat` para fusos horários nativos, `setInterval` para atualização em tempo real
- Sem dependências externas — 100% vanilla

## 🎨 Detalhes de Design

| Elemento          | Valor                                      |
|-------------------|--------------------------------------------|
| Fundo             | Gradiente escuro `#0f0f23` → `#1a1a3e`    |
| Acento principal  | Azul `#4fc3f7`                             |
| Acento Luanda     | Dourado `#ffd54f`                          |
| Fonte do relógio  | Monospace (`Courier New`)                  |
| Efeito hover      | `translateY(-4px)` + glow suave            |

---

© 2026 **PORTECOS ACADEMIC IA** — Plataforma de formação técnica com IA para o mercado angolano lusófono
