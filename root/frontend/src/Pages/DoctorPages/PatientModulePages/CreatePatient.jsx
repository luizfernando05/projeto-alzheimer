import React, { useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import { ArrowLeft } from '@phosphor-icons/react';
import InputField from '../../../Components/Form/InputField';
import SelectField from '../../../Components/Form/SelectField';
import FileUpload from '../../../Components/Form/FileUpload';
import { estadosBrasileiros } from '../../../Utils/states';
import { ethnicity } from '../../../Utils/ethnicity';
import { gender } from '../../../Utils/gender';
import { education } from '../../../Utils/education';
import { useNavigate } from 'react-router-dom';
import SuccessToast from '../../../Components/Form/SuccessToast';

const CreatePatient = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    state: '',
    ethnicity: '',
    educationLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFaceFile = (file) => {
    setSelfiePhoto(file);
  };

  const handleSubmitPatient = async (e) => {
    e.preventDefault();

    const newErrors = {};
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setErrorMessage('');

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) form.append(key, value);
    });
    if (selfiePhoto) form.append('selfiePhoto', selfiePhoto);

    try {
      const response = await fetch('http://localhost:3001/patient/', {
        method: 'POST',
        credentials: 'include',
        body: form,
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
          setErrorMessage(result.message || 'Erro ao cadastrar paciente.');
        } else {
          setErrorMessage(result.message || 'Erro ao cadastrar paciente.');
        }
        return;
      }

      const patientId = result.id;
      setShowToast(true);
      setTimeout(() => navigate(`/patients/${patientId}/medical-data`), 4000);
    } catch (err) {
      setErrorMessage('Erro inesperado no envio do formulário.');
      console.error(err);
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
              Criar novo paciente
            </h2>
          </div>

          <form onSubmit={handleSubmitPatient} className="pt-6 pr-8 pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <InputField
                label="Nome completo"
                name="name"
                type="text"
                placeholder="Nome do paciente..."
                value={formData.name}
                onChange={handleChange}
                hasError={!!errors.name}
                errorMessage={errors.name}
                required
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email do paciente..."
                value={formData.email}
                onChange={handleChange}
                hasError={!!errors.email}
                errorMessage={errors.email}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <SelectField
                label="Etnia"
                name="ethnicity"
                options={ethnicity}
                value={formData.ethnicity}
                onChange={handleChange}
                hasError={!!errors.ethnicity}
                errorMessage={errors.ethnicity}
                required
              />
              <SelectField
                label="Nível educacional"
                name="educationLevel"
                options={education}
                value={formData.educationLevel}
                onChange={handleChange}
                hasError={!!errors.educationLevel}
                errorMessage={errors.educationLevel}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <InputField
                label="Telefone"
                name="phoneNumber"
                type="tel"
                placeholder="Telefone do paciente..."
                value={formData.phoneNumber}
                onChange={handleChange}
                hasError={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber}
                required
              />
              <SelectField
                label="Estado"
                name="state"
                options={estadosBrasileiros}
                value={formData.state}
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
                value={formData.birthDate}
                onChange={handleChange}
                hasError={!!errors.birthDate}
                errorMessage={errors.birthDate}
                required
              />
              <SelectField
                label="Gênero"
                name="gender"
                options={gender}
                value={formData.gender}
                onChange={handleChange}
                hasError={!!errors.gender}
                errorMessage={errors.gender}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              <FileUpload
                label="Foto do rosto"
                name="selfiePhoto"
                accept=".jpg,.jpeg,.png"
                formatsText="Formatos: .jpg, .jpeg, .png"
                onFileChange={handleFaceFile}
                hasError={!!errors.selfiePhoto}
                errorMessage={errors.selfiePhoto}
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
                Cadastrar paciente
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

export default CreatePatient;
