import React, { useState, useEffect } from 'react';
import PatientLayout from './PatientLayout';
import {
  User,
  ClipboardText,
  PencilSimple,
  Check,
  X,
  CaretLeft,
  CaretRight,
  CalendarBlank,
  Heart,
  Brain,
  Flask,
} from '@phosphor-icons/react';
import InputField from '../../Components/Form/InputField';
import SelectField from '../../Components/Form/SelectField';
import { estadosBrasileiros } from '../../Utils/states';
import { ethnicity } from '../../Utils/ethnicity';
import { gender } from '../../Utils/gender';
import { education } from '../../Utils/education';
import SuccessToast from '../../Components/Form/SuccessToast';

const PatientProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [medicalData, setMedicalData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [personalData, setPersonalData] = useState({});
  const [editData, setEditData] = useState({});
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPatientData();
    fetchMedicalData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await fetch(`${apiUrl}/patient/get/data`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();

        // Formatando a data de nascimento para o formato brasileiro
        const formattedBirthDate = data.birthDate
          ? new Date(data.birthDate).toLocaleDateString('pt-BR')
          : '';

        const patientInfo = {
          name: data.name || '',
          email: data.email || '',
          phoneNumber: data.phoneNumber || '',
          birthDate: formattedBirthDate,
          gender: data.gender || '',
          state: data.state || '',
          ethnicity: data.ethnicity || '',
          educationLevel: data.educationLevel || '',
        };

        setPersonalData(patientInfo);
        setEditData(patientInfo);
      } else {
        setErrorMessage('Erro ao carregar dados do paciente');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do paciente:', error);
      setErrorMessage('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicalData = async () => {
    try {
      const response = await fetch(`${apiUrl}/patient/medical/history`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setMedicalData(data);
      } else {
        console.log('Nenhum histórico médico encontrado');
        setMedicalData([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados médicos:', error);
      setMedicalData([]);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...personalData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...personalData });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editData.name?.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!editData.email?.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(editData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!editData.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Telefone é obrigatório';
    }

    if (
      editData.birthDate &&
      !/^\d{2}\/\d{2}\/\d{4}$/.test(editData.birthDate)
    ) {
      newErrors.birthDate = 'Data deve estar no formato DD/MM/AAAA';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/patient/profile/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setPersonalData({ ...editData });
        setIsEditing(false);
        setShowToast(true);
        setErrorMessage('');

        // Recarregar os dados para garantir sincronização
        await fetchPatientData();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Erro ao salvar dados pessoais.');
      }
    } catch (error) {
      setErrorMessage('Erro de conexão com o servidor.');
      console.error('Erro ao salvar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Data não informada';

    if (dateString.includes('-')) {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    }

    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatBoolean = (value) => {
    return value ? 'Sim' : 'Não';
  };

  const currentMedicalRecord = medicalData[currentPage];
  const totalPages = medicalData.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="p-6 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="p-6 space-y-6">
        {showToast && (
          <SuccessToast
            message="Dados pessoais atualizados com sucesso!"
            onClose={() => setShowToast(false)}
          />
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-semibold text-gray-12 mb-1">
              Meu Perfil
            </h1>
            <p className="font-roboto text-gray-11">
              Gerencie suas informações pessoais e visualize seu histórico
              médico
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-01 rounded-xl border border-gray-06 shadow-xs">
          <div className="flex border-b border-gray-06">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-3 px-6 py-4 font-roboto text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'personal'
                  ? 'border-indigo-09 text-indigo-09 bg-indigo-02'
                  : 'border-transparent text-gray-11 hover:text-gray-12'
              }`}
            >
              <User size={20} />
              Dados Pessoais
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`flex items-center gap-3 px-6 py-4 font-roboto text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'medical'
                  ? 'border-indigo-09 text-indigo-09 bg-indigo-02'
                  : 'border-transparent text-gray-11 hover:text-gray-12'
              }`}
            >
              <ClipboardText size={20} />
              Histórico Médico
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'personal' && (
              <div className="space-y-6">
                {/* Header da seção pessoal */}
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins text-lg font-semibold text-gray-12">
                    Informações Pessoais
                  </h3>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-09 text-gray-01 rounded-lg hover:bg-indigo-10 transition-colors"
                    >
                      <PencilSimple size={16} />
                      Editar
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-green-09 text-gray-01 rounded-lg hover:bg-green-10 transition-colors"
                      >
                        <Check size={16} />
                        Salvar
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-red-09 text-gray-01 rounded-lg hover:bg-red-10 transition-colors"
                      >
                        <X size={16} />
                        Cancelar
                      </button>
                    </div>
                  )}
                </div>

                {/* Formulário */}
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Nome completo"
                        name="name"
                        type="text"
                        value={editData.name}
                        onChange={handleChange}
                        hasError={!!errors.name}
                        errorMessage={errors.name}
                        required
                      />
                      <InputField
                        label="Email"
                        name="email"
                        type="email"
                        value={editData.email}
                        onChange={handleChange}
                        hasError={!!errors.email}
                        errorMessage={errors.email}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectField
                        label="Etnia"
                        name="ethnicity"
                        options={ethnicity}
                        value={editData.ethnicity}
                        onChange={handleChange}
                        hasError={!!errors.ethnicity}
                        errorMessage={errors.ethnicity}
                        required
                      />
                      <SelectField
                        label="Nível educacional"
                        name="educationLevel"
                        options={education}
                        value={editData.educationLevel}
                        onChange={handleChange}
                        hasError={!!errors.educationLevel}
                        errorMessage={errors.educationLevel}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <InputField
                        label="Telefone"
                        name="phoneNumber"
                        type="tel"
                        value={editData.phoneNumber}
                        onChange={handleChange}
                        hasError={!!errors.phoneNumber}
                        errorMessage={errors.phoneNumber}
                        required
                      />
                      <SelectField
                        label="Estado"
                        name="state"
                        options={estadosBrasileiros}
                        value={editData.state}
                        onChange={handleChange}
                        hasError={!!errors.state}
                        errorMessage={errors.state}
                        required
                      />
                      <InputField
                        label="Data de Nascimento"
                        name="birthDate"
                        type="text"
                        placeholder="DD/MM/AAAA"
                        value={editData.birthDate}
                        onChange={handleChange}
                        hasError={!!errors.birthDate}
                        errorMessage={errors.birthDate}
                        required
                      />
                      <SelectField
                        label="Gênero"
                        name="gender"
                        options={gender}
                        value={editData.gender}
                        onChange={handleChange}
                        hasError={!!errors.gender}
                        errorMessage={errors.gender}
                        required
                      />
                    </div>
                  </div>
                ) : (
                  /* Visualização dos dados reais da API */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <User size={20} className="text-gray-09" />
                        <span className="font-roboto text-sm text-gray-11">
                          Nome
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.name || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-roboto text-sm text-gray-11">
                          Email
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.email || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-roboto text-sm text-gray-11">
                          Telefone
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.phoneNumber || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <CalendarBlank size={20} className="text-gray-09" />
                        <span className="font-roboto text-sm text-gray-11">
                          Data de Nascimento
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.birthDate || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-roboto text-sm text-gray-11">
                          Gênero
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.gender || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-roboto text-sm text-gray-11">
                          Estado
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.state || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-roboto text-sm text-gray-11">
                          Etnia
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.ethnicity || 'Não informado'}
                      </p>
                    </div>

                    <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-roboto text-sm text-gray-11">
                          Nível Educacional
                        </span>
                      </div>
                      <p className="font-poppins font-semibold text-gray-12">
                        {personalData.educationLevel || 'Não informado'}
                      </p>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <p className="font-roboto font-normal text-xs text-red-09 text-center">
                    {errorMessage}
                  </p>
                )}
              </div>
            )}

            {activeTab === 'medical' && (
              <div className="space-y-6">
                {/* Header da seção médica */}
                <div className="flex items-center justify-between">
                  <h3 className="font-poppins text-lg font-semibold text-gray-12">
                    Histórico de Exames Médicos
                  </h3>
                  {totalPages > 0 && (
                    <div className="flex items-center gap-4">
                      <span className="font-roboto text-sm text-gray-11">
                        Exame {currentPage + 1} de {totalPages}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 0}
                          className={`p-2 rounded-lg border transition-colors ${
                            currentPage === 0
                              ? 'border-gray-06 text-gray-07 bg-gray-02 cursor-not-allowed'
                              : 'border-gray-06 text-gray-11 bg-gray-01 hover:bg-gray-02'
                          }`}
                        >
                          <CaretLeft size={16} />
                        </button>
                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages - 1}
                          className={`p-2 rounded-lg border transition-colors ${
                            currentPage === totalPages - 1
                              ? 'border-gray-06 text-gray-07 bg-gray-02 cursor-not-allowed'
                              : 'border-gray-06 text-gray-11 bg-gray-01 hover:bg-gray-02'
                          }`}
                        >
                          <CaretRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {totalPages === 0 ? (
                  <div className="text-center py-12">
                    <ClipboardText
                      size={48}
                      className="text-gray-08 mx-auto mb-4"
                    />
                    <h4 className="font-poppins text-lg font-semibold text-gray-11 mb-2">
                      Nenhum exame encontrado
                    </h4>
                    <p className="font-roboto text-gray-10">
                      Aguarde seu médico cadastrar seus primeiros exames.
                    </p>
                  </div>
                ) : (
                  currentMedicalRecord && (
                    <div className="space-y-6">
                      {/* Data do exame */}
                      <div className="bg-indigo-02 rounded-lg p-4 border border-indigo-06">
                        <div className="flex items-center gap-3">
                          <CalendarBlank size={24} className="text-indigo-09" />
                          <div>
                            <p className="font-roboto text-sm font-medium text-indigo-11">
                              Data do Exame
                            </p>
                            <p className="font-poppins text-lg font-semibold text-indigo-10">
                              {formatDate(currentMedicalRecord.dateExam)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Funções Cognitivas */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Brain size={24} className="text-purple-09" />
                          <h4 className="font-poppins text-lg font-semibold text-gray-12">
                            Funções Cognitivas
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Mini-Exame Mental (MMSE)
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.mmse}/30
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Atividades Funcionais
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.functionalAssessment}/10
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Atividades Diárias (ADL)
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.adl || 'N/A'}/10
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dados Físicos */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Heart size={24} className="text-red-09" />
                          <h4 className="font-poppins text-lg font-semibold text-gray-12">
                            Dados Físicos e Laboratoriais
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              IMC
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.bmi}
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Colesterol LDL
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.cholesterolLdl} mg/dL
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Colesterol HDL
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.cholesterolHdl} mg/dL
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Triglicerídeos
                            </p>
                            <p className="font-poppins text-xl font-bold text-gray-12">
                              {currentMedicalRecord.cholesterolTriglycerides}{' '}
                              mg/dL
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Estilo de Vida */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Flask size={24} className="text-green-09" />
                          <h4 className="font-poppins text-lg font-semibold text-gray-12">
                            Estilo de Vida
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Tabagismo
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(currentMedicalRecord.smoking)}
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Consumo de Álcool
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(
                                currentMedicalRecord.alcoholConsumption
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Atividade Física
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(
                                currentMedicalRecord.physicalActivity
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Sintomas */}
                      <div className="space-y-4">
                        <h4 className="font-poppins text-lg font-semibold text-gray-12">
                          Sintomas Relatados
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Queixas de Memória
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(
                                currentMedicalRecord.memoryComplaints
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Problemas Comportamentais
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(
                                currentMedicalRecord.behavioralProblems
                              )}
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Confusão
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(currentMedicalRecord.confusion)}
                            </p>
                          </div>
                          <div className="bg-gray-02 rounded-lg p-4 border border-gray-06">
                            <p className="font-roboto text-sm text-gray-11 mb-1">
                              Esquecimento
                            </p>
                            <p className="font-poppins text-lg font-semibold text-gray-12">
                              {formatBoolean(
                                currentMedicalRecord.forgetfulness
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientProfile;
