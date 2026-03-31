# Petróleo & Gás — PORTECOS ACADEMIC IA 🛢️

## Módulos

### Módulo 1: Perfuração
- Anatomia de um poço, equipamentos, fluidos de perfuração
- Perfuração direcional e controlo de poço (BOP)

### Módulo 2: Produção
- Escoamento em reservatório (Darcy's Law)
- Artificial lift: ESP, gas lift
- FPSOs (Girassol, Dalia, Pazflor — Bloco 17)

### Módulo 3: Processamento e Refino
- Destilação, separação gás-óleo-água
- Refinaria de Luanda — produtos e capacidade

---

## 🔧 Problema Real — "BHP num Poço do Bloco 17"

**Contexto:** Poço offshore em águas profundas (lâmina d'água 1.400m), profundidade 3.200m TVD.

**Dados:**
- Pressão de reservatório: 380 bar
- Gradiente do fluido: 0,87 g/cm³
- Pressão na cabeça (wellhead): 45 bar

**Calcular:** Bottom Hole Flowing Pressure (BHFP)

**Solução:**
```
ΔP_hidrostática = 0,87 × 9,81 × 3200 / 100 ≈ 272,9 bar
BHFP = 45 + 272,9 ≈ 317,9 bar
Drawdown = 380 - 317,9 = 62,1 bar
```

**Conclusão:** Drawdown de 62 bar indica potencial de aumento de produção com gas lift ou ESP.

**Contexto Angola:** Os FPSOs do Bloco 17 (Total Energies) produzem 200.000+ bbl/dia. Estes cálculos são feitos diariamente pelos engenheiros de produção angolanos.
