# 🧠 Classificação da Doença de Alzheimer

Este projeto visa a classificação da Doença de Alzheimer utilizando dois modelos de aprendizado de máquina: Support Vector Machine (SVM) e Random Forest. O dataset utilizado - [Alzheimer's Disease Dataset](https://www.kaggle.com/datasets/rabieelkharoua/alzheimers-disease-dataset) - contém várias características clínicas dos pacientes, e o objetivo é prever a presença ou ausência da doença.

## 🗂️ Sobre a base de dados

A base de dados utilizada apresenta dados de saúde coletados de 2.149 pacientes, incluindo: dados demográficos, fatores relacionados ao estilo de vida, diagnósticos clínicos e cognitivos, sintomas e o diagnóstico (ou não) da doença. São, ao todo, 35 colunas, sendo elas:

```
['PatientID', 'Age', 'Gender', 'Ethnicity', 'EducationLevel', 'BMI', 'Smoking', 'AlcoholConsumption', 'PhysicalActivity', 'DietQuality', 'SleepQuality', 'FamilyHistoryAlzheimers', 'CardiovascularDisease', 'Diabetes', 'Depression', 'HeadInjury', 'Hypertension', 'SystolicBP', 'DiastolicBP', 'CholesterolTotal', 'CholesterolLDL', 'CholesterolHDL', 'CholesterolTriglycerides', 'MMSE', 'FunctionalAssessment', 'MemoryComplaints', 'BehavioralProblems', 'ADL', 'Confusion', 'Disorientation', 'PersonalityChanges', 'DifficultyCompletingTasks', 'Forgetfulness', 'Diagnosis', 'DoctorInCharge']
```

É possível organizar e classificar os itens presentes na base de dados da seguinte forma (excluindo as colunas 'DoctorInCharge' e 'PatientID'):

| Biomarcadores Cerebrais                                      | Dados Genéticos                                           | Biomarcadores de Fluidos Corporais                      | Dados adicionais                              |
| ------------------------------------------------------------ | --------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------- |
| MMSE (Mini-Mental State Examination)                         | FamilyHistoryAlzheimers (Histórico Familiar de Alzheimer) | BMI (Índice de Massa Corporal)                          | Age (Idade)                                   |
| FunctionalAssessment (Avaliação Funcional)                   |                                                           | SystolicBP (Pressão Arterial Sistólica)                 | Gender (Gênero)                               |
| MemoryComplaints (Queixas de Memória)                        |                                                           | DiastolicBP (Pressão Arterial Diastólica)               | Ethnicity (Etnia)                             |
| BehavioralProblems (Problemas Comportamentais)               |                                                           | CholesterolTotal (Colesterol Total)                     | EducationLevel (Nível de Educação)            |
| ADL (Atividades da Vida Diária)                              |                                                           | CholesterolLDL (Colesterol LDL)                         | Smoking (Tabagismo)                           |
| Confusion (Confusão)                                         |                                                           | CholesterolHDL (Colesterol HDL)                         | AlcoholConsumption (Consumo de Álcool)        |
| Disorientation (Desorientação)                               |                                                           | CholesterolTriglycerides (Triglicerídeos do Colesterol) | PhysicalActivity (Atividade Física)           |
| PersonalityChanges (Mudanças de Personalidade)               |                                                           |                                                         | DietQuality (Qualidade da Dieta)              |
| DifficultyCompletingTasks (Dificuldade em Completar Tarefas) |                                                           |                                                         | SleepQuality (Qualidade do Sono)              |
| Forgetfulness (Esquecimento)                                 |                                                           |                                                         | CardiovascularDisease (Doença Cardiovascular) |
|                                                              |                                                           |                                                         | Diabetes (Diabetes)                           |
|                                                              |                                                           |                                                         | Depression (Depressão)                        |
|                                                              |                                                           |                                                         | HeadInjury (Lesão na Cabeça)                  |
|                                                              |                                                           |                                                         | Hypertension (Hipertensão)                    |
|                                                              |                                                           |                                                         | Diagnosis (Diagnóstico)                       |

Cada uma dessas categorias representam o seguinte:

- Biomarcadores Cerebrais: indicadores biológicos específicos relacionados ao funcionamento ou anomalias do cérebro;
- Dados Genéticos: informações sobre o material genético de um indivíduo que podem predispor ou proteger contra certas doenças;
- Biomarcadores de Fluidos Corporais: substâncias encontradas em fluidos corporais (como sangue, urina, etc.) que podem indicar processos biológicos, condições ou doenças;
- Dados adicionais: informações que não se enquadram nas categorias acima, mas são relevantes para a saúde e diagnósticos.

## 🤖 Treinamento dos modelos

### Metodologia

A seguinte metodologia foi seguida para o treinamento dos modelos de ML:

- Pré-processamento dos Dados: remoção de colunas desnecessárias e padronização dos dados;
- Divisão dos Dados: os dados foram divididos em conjuntos de treino e teste (80% treino, 20% teste);
- Treinamento do Modelo: o modelo Random Forest foi treinado utilizando o conjunto de treino;
- Avaliação do Modelo: o modelo foi avaliado utilizando o conjunto de teste, gerando um relatório de classificação e uma matriz de confusão.

### Resultados

### Usando o SVM com todas as colunas da tabela

Ao utilizar o SVM (Support Vector Machine) com todas as colunas da tabela foram observados os seguintes resultados:

<b>Relatório de Classificação:</b>

```
precision    recall  f1-score   support

0       0.84      0.89      0.86       277
1       0.78      0.70      0.74       153

accuracy                           0.82       430
macro avg       0.81      0.79      0.80       430
weighted avg       0.82      0.82      0.82       430
```

<b>Matriz de Confusão:</b>

```
[[246  31]
 [ 46 107]]
```

<b>Interpretação dos Resultados:</b>

- Precisão (Precision): a precisão para a classe 0 (Não-Alzheimer) é de 84% e para a classe 1 (Alzheimer) é de 78%;
- Revocação (Recall): a revocação para a classe 0 é de 89% e para a classe 1 é de 70%;
- Acurácia Geral: o modelo tem uma acurácia geral de 82%;
- Matriz de Confusão: A matriz de confusão mostra que o modelo previu corretamente 246 casos de Não-Alzheimer e 107 casos de Alzheimer. Houve 31 falsos negativos e 46 falsos positivos.

### Usando o SVM com as melhores características

Ao utilizar o SVM (Support Vector Machine) com melhores características foram observados os seguintes resultados:

<b>Relatório de Classificação:</b>

```
precision    recall  f1-score   support

0       0.85      0.89      0.87       277
1       0.78      0.73      0.75       153

accuracy                           0.83       430
macro avg       0.82      0.81      0.81       430
weighted avg       0.83      0.83      0.83       430
```

<b>Matriz de Confusão:</b>

```
[[246  31]
 [ 42 111]]

```

<b>Interpretação dos Resultados:</b>

- Precisão (Precision): a precisão para a classe 0 (Não-Alzheimer) é de 85% e para a classe 1 (Alzheimer) é de 78%;
- Revocação (Recall): a revocação para a classe 0 é de 89% e para a classe 1 é de 73%;
- Acurácia Geral: o modelo tem uma acurácia geral de 83%;
- Matriz de Confusão: A matriz de confusão mostra que o modelo previu corretamente 246 casos de Não-Alzheimer e 111 casos de Alzheimer. Houve 31 falsos negativos e 42 falsos positivos.

### Usando o Random Forest com todas as colunas da tabela

Ao utilizar o Random Forest com todas as colunas da tabela foram observados os seguintes resultados:

<b>Relatório de Classificação:</b>

```
precision    recall  f1-score   support

0       0.91      0.98      0.94       277
1       0.96      0.82      0.89       153

accuracy                           0.93       430
macro avg       0.94      0.90      0.92       430
weighted avg       0.93      0.93      0.92       430
```

<b>Matriz de Confusão:</b>

```
[[246  31]
 [ 46 107]]
```

<b>Interpretação dos Resultados:</b>

- Precisão (Precision): a precisão para a classe 0 (Não-Alzheimer) é de 91% e para a classe 1 (Alzheimer) é de 96%;
- Revocação (Recall): a revocação para a classe 0 é de 98% e para a classe 1 é de 82%;
- Acurácia Geral: o modelo tem uma acurácia geral de 93%;
- Matriz de Confusão: A matriz de confusão mostra que o modelo previu corretamente 246 casos de Não-Alzheimer e 107 casos de Alzheimer. Houve 31 falsos negativos e 46 falsos positivos.

### Usando o Random Forest com as melhores características

Ao utilizar o Random Forest com melhores características foram observados os seguintes resultados:

<b>Relatório de Classificação:</b>

```
precision    recall  f1-score   support

0       0.94      0.98      0.96       277
1       0.96      0.88      0.92       153

accuracy                           0.95       430
macro avg       0.95      0.93      0.94       430
weighted avg       0.95      0.95      0.95       430
```

<b>Matriz de Confusão:</b>

```
[[246  31]
 [ 42 111]]

```

<b>Interpretação dos Resultados:</b>

- Precisão (Precision): a precisão para a classe 0 (Não-Alzheimer) é de 94% e para a classe 1 (Alzheimer) é de 96%;
- Revocação (Recall): a revocação para a classe 0 é de 98% e para a classe 1 é de 88%;
- Acurácia Geral: o modelo tem uma acurácia geral de 95%;
- Matriz de Confusão: A matriz de confusão mostra que o modelo previu corretamente 246 casos de Não-Alzheimer e 111 casos de Alzheimer. Houve 31 falsos negativos e 42 falsos positivos.
