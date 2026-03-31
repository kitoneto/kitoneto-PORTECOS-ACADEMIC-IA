# Eletricidade & Eletrónica — PORTECOS ACADEMIC IA ⚡

## Módulos

### Módulo 1: Fundamentos de Circuitos
- Leis de Ohm e Kirchhoff
- Circuitos AC — fasores, potência ativa e reativa
- Análise de circuitos trifásicos

### Módulo 2: Instalações Elétricas
- Normas angolanas (RSICE) e IEC 60364
- Instalações residenciais — Luanda tipo
- Instalações industriais — quadros, disjuntores, fusíveis
- Proteções diferenciais (IDR)

### Módulo 3: Motores Elétricos
- Motores de indução trifásica — características
- Partida direta, estrela-triângulo, variador de frequência
- Proteção de motores

### Módulo 4: Automação Industrial
- PLCs — Siemens S7, Schneider Modicon
- Sensores — temperatura, pressão, nível
- SCADA para indústria angolana

---

## 🔧 Problema Real — "Dimensionar Instalação para Fábrica em Viana"

**Contexto:** Fábrica de processamento de alimentos no Complexo Industrial de Viana (Luanda) precisa de nova instalação elétrica.

**Cargas Elétricas:**
| Carga | Potência | Fator de Uso | Fator de Potência |
|-------|----------|--------------|-------------------|
| Motor principal (3φ) | 75 kW | 0,85 | 0,87 |
| Câmaras frigoríficas | 30 kW | 1,0 | 0,90 |
| Iluminação industrial | 8 kW | 1,0 | 1,0 |
| Tomadas e equipamentos | 15 kW | 0,6 | 0,85 |

**Pergunta:** Qual a potência total instalada e a corrente do ramal de entrada (400V trifásico)?

**Solução:**
```
P_total = (75×0,85 + 30×1,0 + 8×1,0 + 15×0,6) kW
= (63,75 + 30 + 8 + 9) = 110,75 kW

S_total = P / fp_médio = 110,75 / 0,88 ≈ 125,9 kVA

I_entrada = S / (√3 × V) = 125.900 / (1,732 × 400) ≈ 181,8 A

→ Disjuntor geral: 200 A, curva C, poder de corte 25 kA (rede ENDE Viana)
→ Secção cabo: 95 mm² Cu (conduta enterrada) ou 120 mm² Al
```

**Lição:** Em Angola, as quedas de tensão são frequentes na rede ENDE. É obrigatório verificar a tensão mínima nas cargas críticas e instalar reguladores de tensão nas câmaras frigoríficas.
