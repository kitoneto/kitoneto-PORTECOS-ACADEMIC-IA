# Energias Renováveis — PORTECOS ACADEMIC IA ☀️

## Módulos

### Módulo 1: Energia Solar Fotovoltaica
- Princípio de funcionamento das células fotovoltaicas
- Dimensionamento de sistemas autónomos e ligados à rede
- Baterias — chumbo-ácido, lítio, cálculo de autonomia
- Inversores e reguladores de carga

### Módulo 2: Energia Eólica
- Recurso eólico em Angola — Atlas Eólico Nacional
- Turbinas de eixo horizontal e vertical
- Parque Eólico do Tômbwa (Namibe)

### Módulo 3: Pequenas Centrais Hídricas (PCH)
- Avaliação do recurso hídrico
- Turbinas Francis, Pelton, Kaplan
- PCHs no Rio Kwanza e afluentes

### Módulo 4: Sistemas Híbridos Solar-Diesel
- Otimização para comunidades rurais angolanas
- Programa PRODEL — eletrificação rural

---

## 🔧 Problema Real — "Sistema Solar para Escola no Namibe"

**Contexto:** Uma escola primária no Namibe (500 km a sul de Luanda) precisa de eletricidade para 10 salas de aula. Atualmente não tem rede elétrica.

**Consumo Estimado:**
| Equipamento | Qtd | Potência | Horas/dia | Energia/dia |
|-------------|-----|----------|-----------|-------------|
| Lâmpadas LED | 40 | 10W | 6h | 2,4 kWh |
| Ventiladores | 10 | 50W | 8h | 4,0 kWh |
| Computadores | 10 | 100W | 4h | 4,0 kWh |
| Projetor | 2 | 200W | 4h | 1,6 kWh |
| **TOTAL** | | | | **12 kWh/dia** |

**Dados do Local:**
- Irradiação Solar Pico (HSP) no Namibe: **6,2 horas/dia**
- Eficiência do sistema (η): 0,75
- Autonomia desejada: **2 dias** (fins de semana)
- DOD (Depth of Discharge) bateria: 80%
- Tensão banco baterias: 48V

**Cálculos:**

**Potência FV necessária:**
```
P_FV = E_dia / (HSP × η) = 12 / (6,2 × 0,75) ≈ 2,6 kWp
→ Usar 8 módulos × 330Wp = 2,64 kWp ✓
```

**Capacidade das baterias:**
```
C = (E × dias_autonomia) / (DOD × V)
= (12.000 Wh × 2) / (0,8 × 48V)
= 24.000 / 38,4 ≈ 625 Ah
→ 8 baterias × 200Ah em 48V (4s × 2p) ✓
```

**Custo estimado:** ~$12.000 USD → Payback vs diesel: 3-4 anos

**Lição:** O Namibe tem irradiação excecional (5,5-6,5 kWh/m²/dia), tornando a energia solar a opção mais económica para eletrificação rural na região.
