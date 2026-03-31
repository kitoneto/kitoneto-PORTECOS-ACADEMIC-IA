# Telecomunicações — PORTECOS ACADEMIC IA 📡

## Módulos

### Módulo 1: Fundamentos de Telecomunicações
- Sinais analógicos e digitais — modulação, ruído
- Arquitetura de redes TCP/IP
- Protocolos essenciais (DNS, HTTP, BGP, OSPF)

### Módulo 2: Fibra Óptica
- Tipos de fibra — monomodo (SMF) e multimodo (MMF)
- Técnicas de fusão (splicing)
- OTDR — medição de atenuação
- Cabos submarinos — Angola Cables (WACS, SACS)

### Módulo 3: Redes Móveis 4G/5G
- Arquitetura LTE/NR — eNodeB, EPC, core 5G
- Cobertura e capacidade — Angola (Unitel, Movicel)
- Expansão 5G em Luanda (2026+)

### Módulo 4: Sistemas de Satélite
- VSAT para Angola rural — banda Ku e Ka
- Satélite ANGOSAT-2
- Cálculo de link budget

---

## 🔧 Problema Real — "Link Budget para VSAT em Dundo (Lunda Norte)"

**Contexto:** Uma empresa mineira em Dundo (Lunda Norte, sem fibra óptica) precisa instalar ligação VSAT para acesso à internet e VoIP.

**Dados do Sistema:**
- Satélite: ANGOSAT-2 (4°E, banda Ku)
- Elevação do satélite em Dundo: **64°**
- PIRE do satélite: **52 dBW** (Spot Beam Angola)
- G/T do satélite: **4 dB/K**
- Frequência uplink: **14 GHz**
- Frequência downlink: **12 GHz**
- Tamanho da antena terrestre: **1,8m**

**Cálculo simplificado do link budget (downlink):**

```
Caminho livre no espaço (FSL):
FSL = 92,44 + 20×log(d_km) + 20×log(f_GHz)
FSL = 92,44 + 20×log(35.786) + 20×log(12)
= 92,44 + 91,07 + 21,58 ≈ 205 dB

EIRP recebido: 52 - 205 = -153 dBW

Potência na antena receptora (G=34 dBi para 1,8m a 12 GHz):
P_rx = -153 + 34 = -119 dBW = -89 dBm

SNR: típico 8-12 dB para DVB-S2 com QPSK
Margem de chuva: adicionar 3-5 dB para Angola (zona de chuva M)
```

**Conclusão:** O link é viável com antena 1,8m. Débito típico: 5-20 Mbps downlink, suficiente para 50+ utilizadores simultâneos.

**Lição:** Angola tem cobertura VSAT em quase todo o território graças ao ANGOSAT-2 e operadores como Geoverse e SpeedNet. É a solução de conectividade principal para mineração e oil&gas no interior.
