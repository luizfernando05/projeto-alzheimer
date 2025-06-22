import React, { useEffect, useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import SelectField from '../../../Components/Form/SelectField';
import InputField from '../../../Components/Form/InputField';
import { boolean } from '../../../Utils/boolean';
import { ArrowLeft } from '@phosphor-icons/react';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessToast from '../../../Components/Form/SuccessToast';

const CreateMedicalData = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    smoking: '',
    alcoholConsumption: '',
    physicalActivity: '',
    weight: '',
    height: '',
    bmi: '',
    dietQuality: '',
    sleepQuality: '',
    familyHistory: '',
    cardiovascularDisease: '',
    diabetes: '',
    depression: '',
    headTrauma: '',
    hypertension: '',
    mmse: '',
    functionalAssessment: '',
    memoryComplaints: '',
    behavioralProblems: '',
    adl: '',
    confusion: '',
    disorientation: '',
    personalityChanges: '',
    difficultyCompletingTasks: '',
    forgetfulness: '',
    systolicBP: '',
    diastolicBP: '',
    cholesterolTotal: '',
    cholesterolLdl: '',
    cholesterolHdl: '',
    cholesterolTriglycerides: '',
    dateExam: '',
  });

  useEffect(() => {
    const peso = parseFloat(formData.weight);
    const altura = parseFloat(formData.height) / 100;

    if (!isNaN(peso) && !isNaN(altura) && altura > 0) {
      const imc = peso / (altura * altura);
      setFormData((prev) => ({
        ...prev,
        bmi: imc.toFixed(2),
      }));
    }
  }, [formData.weight, formData.height]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      value === 'true' ? true : value === 'false' ? false : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setErrorMessage('');

    const cleanFormData = Object.fromEntries(
      Object.entries(formData)
        .filter(([_, value]) => value !== '' && value !== undefined)
        .map(([key, value]) => [key, key === 'bmi' ? parseFloat(value) : value])
    );

    const body = {
      ...cleanFormData,
      patientId,
    };

    try {
      const response = await fetch('http://localhost:3001/data/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          setErrorMessage(result.message || 'Erro ao cadastrar dadps.');
        } else {
          setErrorMessage(result.message || 'Erro ao cadastrar dadps.');
        }
        return;
      }

      setShowToast(true);
      setTimeout(() => navigate('/doctor/dashboard'), 4000);
    } catch (error) {
      setErrorMessage('Erro inesperado no envio do formulário.');
      console.error(error);
    }
  };

  return (
    <DoctorLayout>
      <section className="w-full">
        {showToast && (
          <SuccessToast
            message="Dados médicos cadastrados com sucesso!"
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
          <div className="flex gap-6 pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
            <button className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03">
              <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
                <ArrowLeft size={16} />
              </div>
              <span className="pr-2 pl-2 pt-1 pb-1">Voltar</span>
            </button>

            <h2 className="text-xl font-poppins font-normal text-gray-12">
              Inserir dados médicos
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="pt-6 pr-8 pl-8">
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
                value={formData.smoking}
                onChange={handleChange}
                hasError={!!errors.smoking}
                errorMessage={errors.smoking}
              />
              <SelectField
                label="Consumo de álcool?"
                name="alcoholConsumption"
                options={boolean}
                value={formData.alcoholConsumption}
                onChange={handleChange}
                hasError={!!errors.alcoholConsumption}
                errorMessage={errors.alcoholConsumption}
              />
              <SelectField
                label="Atividade física?"
                name="physicalActivity"
                options={boolean}
                value={formData.physicalActivity}
                onChange={handleChange}
                hasError={!!errors.physicalActivity}
                errorMessage={errors.physicalActivity}
              />
              <InputField
                label="Peso (em kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                hasError={!!errors.weight}
                errorMessage={errors.weight}
                required
              />
              <InputField
                label="Altura (em cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                hasError={!!errors.height}
                errorMessage={errors.height}
                required
              />
              <InputField
                label="Índice de Massa Corporal (IMC)"
                name="bmi"
                type="number"
                tooltip="Cálculo que relaciona o peso e a altura de uma pessoa para avaliar a sua composição corporal e estimar o nível de gordura."
                value={formData.bmi}
                onChange={handleChange}
                hasError={!!errors.bmi}
                errorMessage={errors.bmi}
                disabled
                required
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
                value={formData.dietQuality}
                onChange={handleChange}
                hasError={!!errors.dietQuality}
                errorMessage={errors.dietQuality}
              />
              <InputField
                label="Quantificação da qualidade do sono (de 0 até 10)"
                name="sleepQuality"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                value={formData.sleepQuality}
                onChange={handleChange}
                hasError={!!errors.sleepQuality}
                errorMessage={errors.sleepQuality}
                required
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
                value={formData.familyHistory}
                onChange={handleChange}
                hasError={!!errors.familyHistory}
                errorMessage={errors.familyHistory}
              />
              <SelectField
                label="Doença cardiovascular?"
                name="cardiovascularDisease"
                options={boolean}
                value={formData.cardiovascularDisease}
                onChange={handleChange}
                hasError={!!errors.cardiovascularDisease}
                errorMessage={errors.cardiovascularDisease}
              />
              <SelectField
                label="Diabetes?"
                name="diabetes"
                options={boolean}
                value={formData.diabetes}
                onChange={handleChange}
                hasError={!!errors.diabetes}
                errorMessage={errors.diabetes}
              />
              <SelectField
                label="Depressão?"
                name="depression"
                options={boolean}
                value={formData.depression}
                onChange={handleChange}
                hasError={!!errors.depression}
                errorMessage={errors.depression}
              />
              <SelectField
                label="Traumatismo craniano?"
                name="headTrauma"
                options={boolean}
                value={formData.headTrauma}
                onChange={handleChange}
                hasError={!!errors.headTrauma}
                errorMessage={errors.headTrauma}
              />
              <SelectField
                label="Hipertensão?"
                name="hypertension"
                options={boolean}
                value={formData.hypertension}
                onChange={handleChange}
                hasError={!!errors.hypertension}
                errorMessage={errors.hypertension}
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
                value={formData.mmse}
                onChange={handleChange}
                hasError={!!errors.mmse}
                errorMessage={errors.mmse}
                required
              />

              <InputField
                label="Atividades Funcionais (de 0 até 10)"
                name="functionalAssessment"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                tooltip="Exercícios aeróbicos como caminhada e natação, atividades de estimulação cognitiva como jogos de memória e quebra-cabeças, e atividades cotidianas adaptadas, como escovar os dentes e pentear o cabelo."
                value={formData.functionalAssessment}
                onChange={handleChange}
                hasError={!!errors.functionalAssessment}
                errorMessage={errors.functionalAssessment}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <SelectField
                label="Queixas de problemas de memória?"
                name="memoryComplaints"
                tooltip="Refere-se a relatos do paciente sobre esquecimentos recorrentes."
                options={boolean}
                value={formData.memoryComplaints}
                onChange={handleChange}
                hasError={!!errors.memoryComplaints}
                errorMessage={errors.memoryComplaints}
                required
              />
              <SelectField
                label="Queixas de problemas comportamentais?"
                name="behavioralProblems"
                tooltip="Refere-se a relatos do paciente sobre mudanças comportamentais extremas."
                options={boolean}
                value={formData.behavioralProblems}
                onChange={handleChange}
                hasError={!!errors.behavioralProblems}
                errorMessage={errors.behavioralProblems}
                required
              />
              <InputField
                label="Atividades diárias (ADL) (de 0 até 10)"
                name="adl"
                type="number"
                max={10}
                min={0}
                placeholder="De 0 a 10..."
                tooltip="Tarefas básicas que as pessoas realizam diariamente para cuidar de si mesmas e manter sua independência."
                value={formData.adl}
                onChange={handleChange}
                hasError={!!errors.adl}
                errorMessage={errors.adl}
                required
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
                value={formData.confusion}
                onChange={handleChange}
                hasError={!!errors.confusion}
                errorMessage={errors.confusion}
              />
              <SelectField
                label="Desorientação?"
                name="disorientation"
                options={boolean}
                value={formData.disorientation}
                onChange={handleChange}
                hasError={!!errors.disorientation}
                errorMessage={errors.disorientation}
              />
              <SelectField
                label="Mudanças na personalidade?"
                name="personalityChanges"
                options={boolean}
                value={formData.personalityChanges}
                onChange={handleChange}
                hasError={!!errors.personalityChanges}
                errorMessage={errors.personalityChanges}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SelectField
                label="Dificuldade em completar tarefas?"
                name="difficultyCompletingTasks"
                options={boolean}
                value={formData.difficultyCompletingTasks}
                onChange={handleChange}
                hasError={!!errors.difficultyCompletingTasks}
                errorMessage={errors.difficultyCompletingTasks}
              />

              <SelectField
                label="Esquecimento?"
                name="forgetfulness"
                options={boolean}
                value={formData.forgetfulness}
                onChange={handleChange}
                hasError={!!errors.forgetfulness}
                errorMessage={errors.forgetfulness}
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
                value={formData.cholesterolTotal}
                onChange={handleChange}
                hasError={!!errors.cholesterolTotal}
                errorMessage={errors.cholesterolTotal}
              />

              <InputField
                label="Colesterol LDL"
                name="cholesterolLdl"
                type="number"
                tooltip="O colesterol LDL (lipoproteína de baixa densidade) é uma das lipoproteínas responsáveis por transportar o colesterol pelo corpo."
                value={formData.cholesterolLdl}
                onChange={handleChange}
                hasError={!!errors.cholesterolLdl}
                errorMessage={errors.cholesterolLdl}
                required
              />

              <InputField
                label="Colesterol HDL"
                name="cholesterolHdl"
                type="number"
                tooltip="HDL significa lipoproteína de alta densidade. É uma partícula que transporta colesterol do sangue e tecidos para o fígado, onde é processado e excretado."
                value={formData.cholesterolHdl}
                onChange={handleChange}
                hasError={!!errors.cholesterolHdl}
                errorMessage={errors.cholesterolHdl}
                required
              />

              <InputField
                label="Colesterol Triglicerídeos"
                name="cholesterolTriglycerides"
                type="number"
                tooltip="Gordura presentes no sangue, ambos importantes para o funcionamento do corpo, mas com funções distintas e níveis elevados podem trazer riscos à saúde."
                value={formData.cholesterolTriglycerides}
                onChange={handleChange}
                hasError={!!errors.cholesterolTriglycerides}
                errorMessage={errors.cholesterolTriglycerides}
                required
              />

              <InputField
                label="Pressão sistólica"
                name="systolicBP"
                type="number"
                tooltip="Pressão do sangue nas artérias no momento em que o coração se contrai para bombear o sangue para o corpo."
                value={formData.systolicBP}
                onChange={handleChange}
                hasError={!!errors.systolicBP}
                errorMessage={errors.systolicBP}
              />

              <InputField
                label="Pressão diastólica"
                name="diastolicBP"
                type="number"
                tooltip="Pressão do sangue nas artérias quando o coração está relaxado entre os batimentos cardíacos."
                value={formData.diastolicBP}
                onChange={handleChange}
                hasError={!!errors.diastolicBP}
                errorMessage={errors.diastolicBP}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
              <InputField
                label="Data do exame"
                name="dateExam"
                type="date"
                value={formData.dateExam}
                onChange={handleChange}
                hasError={!!errors.dateExam}
                errorMessage={errors.dateExam}
                required
              />
            </div>

            {errorMessage && (
              <p className="font-roboto font-normal text-xs text-red-500 text-center mb-4">
                {errorMessage}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                type="submit"
                className="bg-indigo-09 text-gray-01 px-6 py-2 rounded-md hover:bg-indigo-10 shadow-xs"
              >
                Realizar Cadastro
              </button>
              <button className="bg-red-50 text-red-600 border border-red-400 px-6 py-2 rounded-md hover:bg-red-100 shadow-xs">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default CreateMedicalData;
