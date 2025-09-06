import React, { useEffect, useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import InputField from '../../../Components/Form/InputField';
import { ArrowLeft, FilePdf, Sparkle, Warning } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const PredictPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [patientData, setPatientData] = useState(null);

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
                  Foram consideradas as seguintes características para essa
                  predição: Índice de Massa Corporal, Qualidade do Sono,
                  Colesterol ILDL, Colesterol IHDL, Colesterol Triglicerídeos,
                  Mini-Exame do Estado Mental, Tarefas Diárias, Problemas de
                  Memória, Problemas de Comportamento e Avaliação Funcional.
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-5">
                <h3 className="font-roboto text-base font-normal text-gray-12">
                  Resultado
                </h3>
                <div className="border border-gray-06 rounded-lg bg-gray-02 font-roboto font-normal p-4">
                  <p className="text-gray-11 text-sm">
                    Resultado da predição:{' '}
                    <span className="text-red-09">Positivo</span>
                  </p>
                  <p className="text-gray-11 text-sm">
                    Socore de confiança:{' '}
                    <span className="text-gray-12">93%</span>
                  </p>

                  <div className="border border-gray-06 rounded-sm bg-gray-02 font-roboto font-normal p-4 mt-3">
                    <p className="flex gap-1 items-center text-gray-11 text-sm mb-2">
                      <Sparkle color="#3E63DD" /> Gerado por IA
                    </p>
                    <p className="text-gray-11 text-sm">
                      Com base nas informações fornecidas, nosso sistema
                      identificou um padrão compatível com um possível quadro de
                      Alzheimer. Essa predição foi feita a partir da análise de
                      diversos fatores relacionados à saúde física,
                      comportamental e cognitiva do paciente: O IMC (Índice de
                      Massa Corporal) está fora da faixa considerada saudável, o
                      que pode influenciar a saúde cerebral. A qualidade do sono
                      foi avaliada como baixa, um fator frequentemente associado
                      a alterações cognitivas. Os níveis de colesterol LDL, HDL
                      e triglicerídeos mostraram desequilíbrios que podem afetar
                      negativamente o funcionamento do cérebro. O desempenho no
                      Mini Exame do Estado Mental (MMSE) indica uma possível
                      redução nas capacidades cognitivas. A avaliação funcional
                      mostra dificuldade na realização de tarefas do dia a dia.
                      Foram registradas queixas frequentes de memória e
                      alterações comportamentais, ambos sinais comuns nos
                      estágios iniciais da doença. Além disso, foram observadas
                      limitações nas chamadas Atividades da Vida Diária (ADL),
                      que reforçam o indício de comprometimento funcional.
                    </p>
                  </div>

                  <p className="text-gray-11 text-sm mt-2 flex gap-2 items-center">
                    <Warning /> Este resultado aponta para um risco elevado, mas
                    não constitui um diagnóstico definitivo. Confira as
                    informações do paciente e confirme o diagnóstico.
                  </p>
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
                            value={lastExam.dateExam
                              ?.split('-')
                              .reverse()
                              .join('/')}
                            readOnly
                          />
                          <InputField
                            label="Peso (kg)"
                            value={lastExam.weight}
                            readOnly
                          />
                          <InputField
                            label="Altura (cm)"
                            value={lastExam.height}
                            readOnly
                          />
                          <InputField
                            label="IMC"
                            value={lastExam.bmi}
                            readOnly
                          />
                          <InputField
                            label="Qualidade da dieta"
                            value={lastExam.dietQuality}
                            readOnly
                          />
                          <InputField
                            label="Qualidade do sono"
                            value={lastExam.sleepQuality}
                            readOnly
                          />
                          <InputField
                            label="Tabagismo"
                            value={mapBooleanToSimNao(lastExam.smoking)}
                            readOnly
                          />
                          <InputField
                            label="Álcool"
                            value={mapBooleanToSimNao(
                              lastExam.alcoholConsumption
                            )}
                            readOnly
                          />
                          <InputField
                            label="Atividade física"
                            value={mapBooleanToSimNao(
                              lastExam.physicalActivity
                            )}
                            readOnly
                          />
                          <InputField
                            label="Alzheimer na família"
                            value={mapBooleanToSimNao(lastExam.familyHistory)}
                            readOnly
                          />
                          <InputField
                            label="Doença cardiovascular"
                            value={mapBooleanToSimNao(
                              lastExam.cardiovascularDisease
                            )}
                            readOnly
                          />
                          <InputField
                            label="Diabetes"
                            value={mapBooleanToSimNao(lastExam.diabetes)}
                            readOnly
                          />
                          <InputField
                            label="Depressão"
                            value={mapBooleanToSimNao(lastExam.depression)}
                            readOnly
                          />
                          <InputField
                            label="Traumatismo craniano"
                            value={mapBooleanToSimNao(lastExam.headTrauma)}
                            readOnly
                          />
                          <InputField
                            label="Hipertensão"
                            value={mapBooleanToSimNao(lastExam.hypertension)}
                            readOnly
                          />
                          <InputField
                            label="Mini-Exame do Estado Mental (MMSE)"
                            value={lastExam.mmse}
                            readOnly
                          />
                          <InputField
                            label="Atividades Funcionais"
                            value={lastExam.functionalAssessment}
                            readOnly
                          />
                          <InputField
                            label="Problemas de memória"
                            value={mapBooleanToSimNao(
                              lastExam.memoryComplaints
                            )}
                            readOnly
                          />
                          <InputField
                            label="Problemas comportamentais"
                            value={mapBooleanToSimNao(
                              lastExam.behavioralProblems
                            )}
                            readOnly
                          />
                          <InputField
                            label="Atividades diárias (ADL)"
                            value={lastExam.adl}
                            readOnly
                          />
                          <InputField
                            label="Confusão"
                            value={mapBooleanToSimNao(lastExam.confusion)}
                            readOnly
                          />
                          <InputField
                            label="Desorientação"
                            value={mapBooleanToSimNao(lastExam.disorientation)}
                            readOnly
                          />
                          <InputField
                            label="Mudanças na personalidade"
                            value={mapBooleanToSimNao(
                              lastExam.personalityChanges
                            )}
                            readOnly
                          />
                          <InputField
                            label="Dificuldade em completar tarefas"
                            value={mapBooleanToSimNao(
                              lastExam.difficultyCompletingTasks
                            )}
                            readOnly
                          />
                          <InputField
                            label="Esquecimento"
                            value={mapBooleanToSimNao(lastExam.forgetfulness)}
                            readOnly
                          />
                          <InputField
                            label="Colesterol Total"
                            value={lastExam.cholesterolTotal}
                            readOnly
                          />
                          <InputField
                            label="Colesterol LDL"
                            value={lastExam.cholesterolLdl}
                            readOnly
                          />
                          <InputField
                            label="Colesterol HDL"
                            value={lastExam.cholesterolHdl}
                            readOnly
                          />
                          <InputField
                            label="Triglicerídeos"
                            value={lastExam.cholesterolTriglycerides}
                            readOnly
                          />
                          <InputField
                            label="Pressão sistólica"
                            value={lastExam.systolicBP}
                            readOnly
                          />
                          <InputField
                            label="Pressão diastólica"
                            value={lastExam.diastolicBP}
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
