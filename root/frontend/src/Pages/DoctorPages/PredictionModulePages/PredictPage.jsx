import React, { useEffect, useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import InputField from '../../../Components/Form/InputField';
import { ArrowLeft, FilePdf, Sparkle, Warning } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import translate from 'translate';

const apiUrl = import.meta.env.VITE_API_URL;

const PredictPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [advice, setAdvice] = useState('');
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [selectedExamIndex, setSelectedExamIndex] = useState(0);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${apiUrl}/patient/${patientId}`, {
          withCredentials: true,
        });
        setPatientData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleDownloadPdf = async () => {
    try {
      const response = await axios.get(`${apiUrl}/patient/${patientId}/pdf`, {
        responseType: 'blob',
        withCredentials: true,
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      const sanitizedName = patientData.name.replace(/\s+/g, '_');
      link.href = url;
      link.setAttribute('download', `${sanitizedName}_relatorio.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao gerar o PDF:', error);
      alert('Erro ao gerar o PDF.');
    }
  };

  useEffect(() => {
    if (patientData?.weight && patientData?.height) {
      const heightInMeters = patientData.height / 100;
      const bmi = (
        patientData.weight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      setPatientData((prev) => ({
        ...prev,
        bmi: parseFloat(bmi),
      }));
    }
  }, [patientData?.weight, patientData?.height]);

  if (!patientData) {
    return (
      <DoctorLayout>
        <section className="w-full p-8">
          <p className="text-gray-11">Carregando dados do paciente...</p>
        </section>
      </DoctorLayout>
    );
  }

  const handleSelectExam = (index) => {
    setSelectedExamIndex(index);
  };

  const mapBooleanToSimNao = (value) => {
    if (value === true || value === 'true') return 'Sim';
    if (value === false || value === 'false') return 'Não';
    return value ?? '';
  };

  const getAge = (birthDate) => {
    if (!birthDate) return '';
    const [year, month, day] = birthDate.split('-').map(Number);
    const today = new Date();
    const birth = new Date(year, month - 1, day);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handlePredict = async () => {
    if (!patientData || !patientData.medicalData?.length) return;
    setLoadingPrediction(true);
    try {
      const selectedExam = patientData.medicalData[selectedExamIndex];

      const predResponse = await axios.post(
        `${apiUrl}/predict`,
        { medicalDataId: selectedExam.id },
        { withCredentials: true }
      );

      setPrediction(predResponse.data);

      const adviceResponse = await axios.post(
        `${apiUrl}/advice`,
        { medicalDataId: selectedExam.id },
        { withCredentials: true }
      );

      // Traduzir para pt-br
      const advicePtBr = await translate(adviceResponse.data.tips, {
        to: 'pt',
      });
      setAdvice(advicePtBr);
    } catch (error) {
      console.error('Erro ao gerar predição ou conselho:', error);
      alert('Erro ao gerar predição ou conselho.');
    } finally {
      setLoadingPrediction(false);
    }
  };

  if (!patientData) {
    return (
      <DoctorLayout>
        <section className="w-full p-8">
          <p className="text-gray-11">Carregando dados do paciente...</p>
        </section>
      </DoctorLayout>
    );
  }

  const selectedExam = patientData.medicalData[selectedExamIndex];

  return (
    <DoctorLayout>
      <section className="w-full">
        <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
          <div className="flex place-content-between pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
            <div className="flex gap-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03"
              >
                <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
                  <ArrowLeft size={16} />
                </div>
                <span className="pr-2 pl-2 pt-1 pb-1">Voltar</span>
              </button>

              <div className="flex gap-3 items-center">
                <h2 className="text-xl font-poppins font-normal text-gray-12">
                  {patientData.name}
                </h2>
                <div className="flex gap-2 items-center">
                  <p className="text-xs font-poppins font-light text-gray-11">
                    {patientData.gender === 'Masculino'
                      ? 'Homem'
                      : patientData.gender === 'Feminino'
                      ? 'Mulher'
                      : patientData.gender}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="4"
                    height="4"
                    viewBox="0 0 4 4"
                    fill="none"
                  >
                    <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
                  </svg>
                  <p className="text-xs font-poppins font-light text-gray-11">
                    {getAge(patientData.birthDate)} anos
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03"
            >
              <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
                <FilePdf size={16} />
              </div>
              <span className="pr-2 pl-2 pt-1 pb-1">Baixar PDF</span>
            </button>
          </div>

          <div className="pt-6 pr-8 pl-8">
            <div className="mb-4">
              <div className="flex flex-col gap-3 mb-5">
                <h3 className="font-roboto text-base font-normal text-gray-12">
                  Predição
                </h3>
                <p className="font-roboto text-sm font-normal text-gray-12">
                  São consideradas as seguintes características para essa
                  predição: Mini-Exame do Estado Mental, Tarefas Diárias,
                  Problemas de Memória, Problemas de Comportamento e Avaliação
                  Funcional.
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-5">
                <h3 className="font-roboto text-base font-normal text-gray-12">
                  Resultado
                </h3>
                <div className="border border-gray-06 rounded-lg bg-gray-02 font-roboto font-normal p-4">
                  {loadingPrediction ? (
                    <div className="flex flex-col items-center gap-2 py-4">
                      <div className="flex gap-1">
                        <span className="dot-animate bg-indigo-09"></span>
                        <span className="dot-animate bg-indigo-09 animation-delay-200"></span>
                        <span className="dot-animate bg-indigo-09 animation-delay-400"></span>
                      </div>
                      <p className="text-gray-11 text-sm">
                        Gerando predição...
                      </p>
                    </div>
                  ) : prediction ? (
                    <>
                      <p className="text-gray-11 text-sm">
                        Resultado da predição:{' '}
                        <span
                          className={
                            prediction.result === '0'
                              ? 'text-red-09'
                              : 'text-green-09'
                          }
                        >
                          {prediction.result === '0' ? 'Positivo' : 'Negativo'}
                        </span>
                      </p>
                      <p className="text-gray-11 text-sm">
                        Score de confiança:{' '}
                        <span className="text-gray-12">
                          {Math.round(prediction.confidenceScore * 100)}%
                        </span>
                      </p>
                      <div className="border border-gray-06 rounded-sm bg-gray-02 font-roboto font-normal p-4 mt-3">
                        <p className="flex gap-1 items-center text-gray-11 text-sm mb-2">
                          <Sparkle color="#3E63DD" /> Gerado por IA
                        </p>
                        <p className="text-gray-11 text-sm">{advice}</p>
                      </div>
                      <p className="text-gray-11 text-sm mt-2 flex gap-2 items-center">
                        <Warning />
                        {prediction.result === '0'
                          ? 'Este resultado aponta para um risco elevado de Alzheimer, mas não constitui um diagnóstico definitivo. Confira as informações do paciente e confirme o diagnóstico.'
                          : 'Este resultado indica baixo risco para Alzheimer. Mesmo assim, continue acompanhando o paciente e incentive hábitos saudáveis.'}
                      </p>
                    </>
                  ) : (
                    <button
                      onClick={handlePredict}
                      className="animated-gradient border border-indigo-06 text-gray-01 px-6 py-2 rounded-md hover:bg-indigo-10 shadow-xs transition-colors duration-300 flex gap-2 items-center cursor-pointer"
                    >
                      <Sparkle size={24} />
                      Gerar Predição
                    </button>
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-roboto text-base font-normal text-gray-12">
                  Características do paciente
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {patientData.medicalData &&
                  patientData.medicalData.length > 0 ? (
                    (() => {
                      const lastExam =
                        patientData.medicalData[
                          patientData.medicalData.length - 1
                        ];
                      return (
                        <>
                          <InputField
                            label="Data do exame"
                            value={selectedExam.dateExam
                              ?.split('-')
                              .reverse()
                              .join('/')}
                            readOnly
                          />
                          <InputField
                            label="Peso (kg)"
                            value={selectedExam.weight}
                            readOnly
                          />
                          <InputField
                            label="Altura (cm)"
                            value={selectedExam.height}
                            readOnly
                          />
                          <InputField
                            label="IMC"
                            value={selectedExam.bmi}
                            readOnly
                          />
                          <InputField
                            label="Qualidade da dieta"
                            value={selectedExam.dietQuality}
                            readOnly
                          />
                          <InputField
                            label="Qualidade do sono"
                            value={selectedExam.sleepQuality}
                            readOnly
                          />
                          <InputField
                            label="Tabagismo"
                            value={mapBooleanToSimNao(selectedExam.smoking)}
                            readOnly
                          />
                          <InputField
                            label="Álcool"
                            value={mapBooleanToSimNao(
                              selectedExam.alcoholConsumption
                            )}
                            readOnly
                          />
                          <InputField
                            label="Atividade física"
                            value={mapBooleanToSimNao(
                              selectedExam.physicalActivity
                            )}
                            readOnly
                          />
                          <InputField
                            label="Alzheimer na família"
                            value={mapBooleanToSimNao(
                              selectedExam.familyHistory
                            )}
                            readOnly
                          />
                          <InputField
                            label="Doença cardiovascular"
                            value={mapBooleanToSimNao(
                              selectedExam.cardiovascularDisease
                            )}
                            readOnly
                          />
                          <InputField
                            label="Diabetes"
                            value={mapBooleanToSimNao(selectedExam.diabetes)}
                            readOnly
                          />
                          <InputField
                            label="Depressão"
                            value={mapBooleanToSimNao(selectedExam.depression)}
                            readOnly
                          />
                          <InputField
                            label="Traumatismo craniano"
                            value={mapBooleanToSimNao(selectedExam.headTrauma)}
                            readOnly
                          />
                          <InputField
                            label="Hipertensão"
                            value={mapBooleanToSimNao(
                              selectedExam.hypertension
                            )}
                            readOnly
                          />
                          <InputField
                            label="Mini-Exame do Estado Mental (MMSE)"
                            value={selectedExam.mmse}
                            readOnly
                          />
                          <InputField
                            label="Atividades Funcionais"
                            value={selectedExam.functionalAssessment}
                            readOnly
                          />
                          <InputField
                            label="Problemas de memória"
                            value={mapBooleanToSimNao(
                              selectedExam.memoryComplaints
                            )}
                            readOnly
                          />
                          <InputField
                            label="Problemas comportamentais"
                            value={mapBooleanToSimNao(
                              selectedExam.behavioralProblems
                            )}
                            readOnly
                          />
                          <InputField
                            label="Atividades diárias (ADL)"
                            value={selectedExam.adl}
                            readOnly
                          />
                          <InputField
                            label="Confusão"
                            value={mapBooleanToSimNao(selectedExam.confusion)}
                            readOnly
                          />
                          <InputField
                            label="Desorientação"
                            value={mapBooleanToSimNao(
                              selectedExam.disorientation
                            )}
                            readOnly
                          />
                          <InputField
                            label="Mudanças na personalidade"
                            value={mapBooleanToSimNao(
                              selectedExam.personalityChanges
                            )}
                            readOnly
                          />
                          <InputField
                            label="Dificuldade em completar tarefas"
                            value={mapBooleanToSimNao(
                              selectedExam.difficultyCompletingTasks
                            )}
                            readOnly
                          />
                          <InputField
                            label="Esquecimento"
                            value={mapBooleanToSimNao(
                              selectedExam.forgetfulness
                            )}
                            readOnly
                          />
                          <InputField
                            label="Colesterol Total"
                            value={selectedExam.cholesterolTotal}
                            readOnly
                          />
                          <InputField
                            label="Colesterol LDL"
                            value={selectedExam.cholesterolLdl}
                            readOnly
                          />
                          <InputField
                            label="Colesterol HDL"
                            value={selectedExam.cholesterolHdl}
                            readOnly
                          />
                          <InputField
                            label="Triglicerídeos"
                            value={selectedExam.cholesterolTriglycerides}
                            readOnly
                          />
                          <InputField
                            label="Pressão sistólica"
                            value={selectedExam.systolicBP}
                            readOnly
                          />
                          <InputField
                            label="Pressão diastólica"
                            value={selectedExam.diastolicBP}
                            readOnly
                          />
                        </>
                      );
                    })()
                  ) : (
                    <p className="text-gray-11">
                      Nenhum dado médico cadastrado.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {patientData.medicalData?.length > 1 && (
              <div className="mb-6">
                <label className="block text-sm text-gray-12 mb-2">
                  Selecionar data do exame
                </label>
                <div className="flex flex-wrap gap-2">
                  {patientData.medicalData.map((item, index) => {
                    const formattedDate = item.dateExam
                      .split('-')
                      .reverse()
                      .join('/');
                    const isSelected = selectedExamIndex === index;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedExamIndex(index)}
                        className={`px-4 py-2 text-sm rounded-md border transition
                          ${
                            isSelected
                              ? 'bg-gray-04 text-gray-12 border-gray-06'
                              : 'bg-gray-02 text-gray-11 border-gray-06 hover:bg-gray-03'
                          }
                        `}
                      >
                        {formattedDate}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                type="submit"
                className="bg-indigo-09 border border-indigo-06 text-gray-01 px-6 py-2 rounded-md hover:bg-indigo-10 shadow-xs"
              >
                Confirmar Diagnóstico
              </button>
              <button className="bg-red-03 text-red-12 border border-red-06 px-6 py-2 rounded-md hover:bg-red-04 shadow-xs">
                Descartar Diagnóstico
              </button>
            </div>
          </div>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default PredictPage;
