# Inteligência Artificial — PORTECOS ACADEMIC IA 🤖

## Módulos

### Módulo 1: Machine Learning Fundamental
- Regressão linear e logística
- Árvores de decisão, Random Forest, XGBoost
- Validação cruzada e métricas (MAE, RMSE, AUC)
- Python + scikit-learn

### Módulo 2: Deep Learning
- Redes neurais artificiais — perceptrão, backpropagation
- CNNs para visão computacional (inspeção industrial)
- RNNs/LSTMs para séries temporais (produção petrolífera)
- TensorFlow e PyTorch

### Módulo 3: NLP — Processamento de Linguagem Natural
- Modelos de linguagem em português
- Hugging Face e modelos BERT em português
- RAG (Retrieval-Augmented Generation) para documentação técnica

### Módulo 4: MLOps
- MLflow para gestão de experimentos
- Deploy de modelos com FastAPI
- Monitorização de modelos em produção

---

## 🔧 Problema Real — "Prever Declínio de Produção — Bloco 0 (Cabinda)"

**Contexto:** Os engenheiros de reservatórios do Bloco 0 (Cabinda) querem prever a produção diária de um poço para os próximos 12 meses usando Machine Learning.

**Dados Disponíveis (últimos 3 anos):**
- Produção diária histórica (bbl/dia)
- Pressão do reservatório (bar)
- Temperatura do poço (°C)
- GOR — Gas-Oil Ratio
- BSW — Basic Sediment and Water
- Tempo de operação do ESP

**Abordagem: LSTM para Séries Temporais**

```python
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import MinMaxScaler

# 1. Preparar dados
features = ['production_bbl', 'reservoir_pressure', 'GOR', 'BSW', 'ESP_hours']
X_train, y_train = prepare_sequences(data[features], lookback=30, horizon=7)

# 2. Construir modelo LSTM
model = tf.keras.Sequential([
    tf.keras.layers.LSTM(64, return_sequences=True, input_shape=(30, 5)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.LSTM(32),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(7)  # 7 dias de previsão
])

model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# 3. Treinar
history = model.fit(X_train, y_train, epochs=50, validation_split=0.2, batch_size=32)
```

**Resultados Típicos:**
- MAE: ±80 bbl/dia (3-5% do caudal médio)
- R² score: 0.94

**Valor para Angola:** Este modelo pode antecipar falhas de ESP com 5-7 dias de antecedência, permitindo manutenção preventiva. Na Sonangol, uma paragem não planeada de 1 poço de 3.000 bbl/dia custa ~$300.000/dia.

**Extensões:**
- Anomaly detection com Autoencoders para detetar falhas de equipamento
- Otimização de gas lift com Reinforcement Learning
- Digital Twin do reservatório com Physics-Informed Neural Networks (PINNs)
