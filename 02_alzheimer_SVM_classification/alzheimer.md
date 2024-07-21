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
