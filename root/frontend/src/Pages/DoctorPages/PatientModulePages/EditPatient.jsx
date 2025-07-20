import React, { useEffect, useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';
import { ArrowLeft, FilePdf } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { estadosBrasileiros } from '../../../Utils/states';
import { ethnicity } from '../../../Utils/ethnicity';
import { gender } from '../../../Utils/gender';
import { education } from '../../../Utils/education';
import { boolean } from '../../../Utils/boolean';

const apiUrl = import.meta.env.VITE_API_URL;

const EditPatient = () => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPatient = {
        name: patientData.name,
        email: patientData.email,
        phoneNumber: patientData.phoneNumber,
        birthDate: patientData.birthDate,
        gender: patientData.gender,
        state: patientData.state,
        ethnicity: patientData.ethnicity,
        educationLevel: patientData.educationLevel,
      };

      await axios.put(`${apiUrl}/patient/${patientId}`, updatedPatient, {
        withCredentials: true,
      });

      alert('Paciente atualizado com sucesso!');
      navigate(-1);
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      alert('Erro ao atualizar paciente.');
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

              <h2 className="text-xl font-poppins font-normal text-gray-12">
                {patientData.name}
              </h2>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03"
            >
              <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
                <FilePdf size={16} />
              </div>
              <span className="pr-2 pl-2 pt-1 pb-1">Baixar PDF</span>
            </button>
          </div>

          <form className="pt-6 pr-8 pl-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Nome completo"
                name="name"
                type="text"
                value={patientData.name}
                onChange={handleInputChange}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                value={patientData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SelectField
                label="Etnia"
                name="ethnicity"
                value={patientData.ethnicity}
                options={ethnicity}
                onChange={handleInputChange}
              />

              <SelectField
                label="Nível educacional"
                name="educationLevel"
                value={patientData.educationLevel}
                options={education}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <InputField
                label="Telefone"
                name="phoneNumber"
                type="tel"
                value={patientData.phoneNumber}
                onChange={handleInputChange}
              />

              <SelectField
                label="Estado"
                name="state"
                value={patientData.state}
                options={estadosBrasileiros}
                onChange={handleInputChange}
              />

              <InputField
                label="Nascimento"
                name="birthDate"
                type="date"
                value={patientData.birthDate}
                onChange={handleInputChange}
              />

              <SelectField
                label="Gênero"
                name="gender"
                value={patientData.gender}
                options={gender}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                type="submit"
                className="bg-gray-03 border border-gray-06 text-gray-12 px-6 py-2 rounded-md hover:bg-gray-04 shadow-xs"
              >
                Atualizar paciente
              </button>
              <button className="bg-red-03 text-red-12 border border-red-06 px-6 py-2 rounded-md hover:bg-red-04 shadow-xs">
                Cancelar
              </button>
            </div>
          </form>
          <form className="pt-6 pr-8 pl-8 border-t border-gray-06">
            <p className="font-roboto text-base text-gray-12 font-normal mb-4">
              Exame pré-laboratorial
            </p>

            <p className="font-roboto text-sm text-gray-12 font-normal mb-4">
              Fatores de estilo de vida
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField
                label="Tabagismo?"
                name="smoking"
                options={boolean}
                value={patientData.medicalData?.[0]?.smoking || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Consumo de álcool?"
                name="alcoholConsumption"
                options={boolean}
                value={patientData.medicalData?.[0]?.alcoholConsumption || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Atividade física?"
                name="physicalActivity"
                options={boolean}
                value={patientData.medicalData?.[0]?.physicalActivity || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Peso (em kg)"
                name="weight"
                type="number"
                value={patientData.medicalData?.[0]?.weight || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Altura (em cm)"
                name="height"
                type="number"
                value={patientData.medicalData?.[0]?.height || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Índice de Massa Corporal (IMC)"
                name="bmi"
                type="number"
                tooltip="Cálculo que relaciona o peso e a altura de uma pessoa para avaliar a sua composição corporal e estimar o nível de gordura."
                value={patientData.medicalData?.[0]?.bmi || ''}
                disabled
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Quantificação da qualidade da dieta (de 0 até 10)"
                name="dietQuality"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                value={patientData.medicalData?.[0]?.dietQuality || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Quantificação da qualidade do sono (de 0 até 10)"
                name="sleepQuality"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                value={patientData.medicalData?.[0]?.sleepQuality || ''}
                onChange={handleInputChange}
              />
            </div>

            <p className="font-roboto text-sm text-gray-12 font-normal mb-4">
              Histórico médico
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField
                label="Alzheimer na família?"
                name="familyHistory"
                options={boolean}
                value={patientData.medicalData?.[0]?.familyHistory || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Doença cardiovascular?"
                name="cardiovascularDisease"
                options={boolean}
                value={
                  patientData.medicalData?.[0]?.cardiovascularDisease || ''
                }
                onChange={handleInputChange}
              />
              <SelectField
                label="Diabetes?"
                name="diabetes"
                options={boolean}
                value={patientData.medicalData?.[0]?.diabetes || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Depressão?"
                name="depression"
                options={boolean}
                value={patientData.medicalData?.[0]?.depression || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Traumatismo craniano?"
                name="headTrauma"
                options={boolean}
                value={patientData.medicalData?.[0]?.headTrauma || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Hipertensão?"
                name="hypertension"
                options={boolean}
                value={patientData.medicalData?.[0]?.hypertension || ''}
                onChange={handleInputChange}
              />
            </div>

            <p className="font-roboto text-sm text-gray-12 font-normal mb-4">
              Funções cognitivas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Pontuação do Mini-Exame do Estado Mental (de 0 até 30)"
                name="mmse"
                type="number"
                max={30}
                min={0}
                placeholder="De 0 a 30..."
                tooltip="Teste simples e rápido, utilizado para rastrear déficits cognitivos, especialmente aqueles relacionados à demência. Ele avalia áreas como orientação, memória, atenção, linguagem e habilidades construtivas."
                value={patientData.medicalData?.[0]?.mmse || ''}
                onChange={handleInputChange}
              />

              <InputField
                label="Atividades Funcionais (de 0 até 10)"
                name="functionalAssessment"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                tooltip="Exercícios aeróbicos como caminhada e natação, atividades de estimulação cognitiva como jogos de memória e quebra-cabeças, e atividades cotidianas adaptadas, como escovar os dentes e pentear o cabelo."
                value={patientData.medicalData?.[0]?.functionalAssessment || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField
                label="Queixas de problemas de memória?"
                name="memoryComplaints"
                tooltip="Refere-se a relatos do paciente sobre esquecimentos recorrentes."
                options={boolean}
                value={patientData.medicalData?.[0]?.memoryComplaints || ''}
                onChange={handleInputChange}
              />
              <SelectField
                label="Queixas de problemas comportamentais?"
                name="behavioralProblems"
                tooltip="Refere-se a relatos do paciente sobre mudanças comportamentais extremas."
                options={boolean}
                value={patientData.medicalData?.[0]?.behavioralProblems || ''}
                onChange={handleInputChange}
              />
              <InputField
                label="Atividades diárias (ADL) (de 0 até 10)"
                name="adl"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                tooltip="Tarefas básicas que as pessoas realizam diariamente para cuidar de si mesmas e manter sua independência."
                value={patientData.medicalData?.[0]?.adl || ''}
                onChange={handleInputChange}
              />
            </div>

            <p className="font-roboto text-sm text-gray-12 font-normal mb-4">
              Sintomas principais
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField
                label="Confusão?"
                name="confusion"
                options={boolean}
                value={patientData.medicalData?.[0]?.confusion || ''}
                onChange={handleInputChange}
              />

              <SelectField
                label="Desorientação?"
                name="disorientation"
                options={boolean}
                value={patientData.medicalData?.[0]?.disorientation || ''}
                onChange={handleInputChange}
              />

              <SelectField
                label="Mudanças na personalidade?"
                name="personalityChanges"
                options={boolean}
                value={patientData.medicalData?.[0]?.personalityChanges || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SelectField
                label="Dificuldade em completar tarefas?"
                name="difficultyCompletingTasks"
                options={boolean}
                value={
                  patientData.medicalData?.[0]?.difficultyCompletingTasks || ''
                }
                onChange={handleInputChange}
              />

              <SelectField
                label="Esquecimento?"
                name="forgetfulness"
                options={boolean}
                value={patientData.medicalData?.[0]?.forgetfulness || ''}
                onChange={handleInputChange}
              />
            </div>

            <p className="font-roboto text-sm text-gray-12 font-normal mb-4">
              Medições clínicas
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Colesterol Total"
                name="cholesterolTotal"
                type="number"
                tooltip="Soma de todas as frações de colesterol no sangue, incluindo o colesterol LDL (ruim), HDL (bom) e VLDL."
                value={patientData.medicalData?.[0]?.cholesterolTotal || ''}
                onChange={handleInputChange}
              />

              <InputField
                label="Colesterol LDL"
                name="cholesterolLdl"
                type="number"
                tooltip="O colesterol LDL (lipoproteína de baixa densidade) é uma das lipoproteínas responsáveis por transportar o colesterol pelo corpo."
                value={patientData.medicalData?.[0]?.cholesterolLdl || ''}
                onChange={handleInputChange}
              />

              <InputField
                label="Colesterol HDL"
                name="cholesterolHdl"
                type="number"
                tooltip="HDL significa lipoproteína de alta densidade. É uma partícula que transporta colesterol do sangue e tecidos para o fígado, onde é processado e excretado."
                value={patientData.medicalData?.[0]?.cholesterolHdl || ''}
                onChange={handleInputChange}
              />

              <InputField
                label="Colesterol Triglicerídeos"
                name="cholesterolTriglycerides"
                type="number"
                tooltip="Gordura presentes no sangue, ambos importantes para o funcionamento do corpo, mas com funções distintas e níveis elevados podem trazer riscos à saúde."
                value={
                  patientData.medicalData?.[0]?.cholesterolTriglycerides || ''
                }
                onChange={handleInputChange}
              />

              <InputField
                label="Pressão sistólica"
                name="systolicBP"
                type="number"
                tooltip="Pressão do sangue nas artérias no momento em que o coração se contrai para bombear o sangue para o corpo."
                value={patientData.medicalData?.[0]?.systolicBP || ''}
                onChange={handleInputChange}
              />

              <InputField
                label="Pressão diastólica"
                name="diastolicBP"
                type="number"
                tooltip="Pressão do sangue nas artérias quando o coração está relaxado entre os batimentos cardíacos."
                value={patientData.medicalData?.[0]?.diastolicBP || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
              <InputField
                label="Data do exame"
                name="dateExam"
                type="date"
                value={patientData.medicalData?.[0]?.dateExam || ''}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default EditPatient;
