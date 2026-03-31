# Mecânica — PORTECOS ACADEMIC IA ⚙️

## Módulos

### Módulo 1: Termodinâmica Aplicada
- 1ª e 2ª Leis da Termodinâmica
- Ciclos de Carnot, Otto, Diesel
- Turbinas a gás e compressores — setor petrolífero

### Módulo 2: Máquinas e Equipamentos
- Bombas centrífugas — curva, NPSH, cavitação
- Compressores — centrífugos e alternativos
- Motores elétricos e diesel — aplicações industriais

### Módulo 3: Manutenção Industrial
- Manutenção preventiva (planos e intervalos)
- Manutenção preditiva (vibrações, termografia, análise de óleo)
- RCM — Reliability Centered Maintenance

---

## 🔧 Problema Real — "Bomba a Cavitar na Refinaria de Luanda"

**Contexto:** Na Refinaria de Luanda, uma bomba centrífuga de alimentação de crude apresenta ruído anormal e oscilação de pressão de descarga. O técnico suspeita de cavitação.

**Dados da Bomba:**
- Fluido: crude (ρ = 850 kg/m³)
- Caudal de operação: 120 m³/h
- Pressão de vapor do fluido a 40°C: 0,15 bar absolutos
- Pressão na sucção (medida): 1,8 bar absoluto
- Velocidade do fluido na sucção: 2,1 m/s
- NPSH requerido (fabricante): 4,2 m

**Calcular:** NPSH disponível e verificar se há cavitação.

**Solução:**
```
NPSH_disponível = (P_s - P_v) / (ρ × g) + v²/2g
= (1,8 - 0,15) × 10⁵ / (850 × 9,81) + 2,1²/(2×9,81)
= 19.800 + 0,22
≈ 19,8 m + 0,2 m ≈ 20 m
```

**NPSH_disp (20m) >> NPSH_req (4,2m)** → cavitação improvável por NPSH.

**Diagnóstico Real:** A causa mais provável é **ar no circuito** ou **desgaste do rotor**. Recomenda-se:
1. Verificar purga de ar na linha de sucção
2. Inspecionar rotor (desgaste, erosão)
3. Verificar vedações mecânicas

**Lição:** Em Angola, o calor elevado e o crude de alta viscosidade tornam as bombas mais vulneráveis. Manutenção preditiva por análise de vibração é essencial nas refinarias.
