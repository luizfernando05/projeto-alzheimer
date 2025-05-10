import React, { useState } from 'react';
import LogoIcon from '../../Assets/LogoIcon.svg?react';
import InputField from '../../Components/Form/InputField';
import SelectField from '../../Components/Form/SelectField';
import { estadosBrasileiros } from '../../Utils/states';
import FileUpload from '../../Components/Form/FileUpload';
import PasswordField from '../../Components/Form/PasswordField';
import SimpleFooter from '../../Components/Footer/SimpleFooter';
import { Link } from 'react-router-dom';

function DoctorSignin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    crm: '',
    estado: '',
    celphone: '',
    password: '',
  });
  const [crmPhoto, setCrmPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCRMFile = (file) => {
    setCrmPhoto(file);
  };

  const handleFaceFile = (file) => {
    setSelfiePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name) newErrors.name = 'Campo obrigatório';
    if (!formData.email) newErrors.email = 'Campo obrigatório';
    if (!formData.username) newErrors.username = 'Campo obrigatório';
    if (!formData.crm) newErrors.crm = 'Campo obrigatório';
    if (!formData.estado) newErrors.estado = 'Campo obrigatório';
    if (!formData.celphone) newErrors.celphone = 'Campo obrigatório';
    if (!formData.password) newErrors.password = 'Campo obrigatório';
    if (!crmPhoto) newErrors.crmPhoto = 'Campo obrigatório';
    if (!selfiePhoto) newErrors.selfiePhoto = 'Campo obrigatório';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setErrorMessage('');

    const crmCombinado = `${formData.crm}-${formData.estado}`;

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('username', formData.username);
    data.append('crm', crmCombinado);
    data.append('password', formData.password);
    data.append('celphone', formData.celphone);
    if (crmPhoto) data.append('crmPhoto', crmPhoto);
    if (selfiePhoto) data.append('selfiePhoto', selfiePhoto);

    try {
      const response = await fetch('http://localhost:3001/doctor/', {
        method: 'POST',
        body: data,
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('Erro ao cadastrar:', responseData);

        if (responseData.errors) {
          setErrors(responseData.errors);
          setErrorMessage(responseData.message || 'Erro ao cadastrar.');
        } else {
          setErrorMessage(responseData.message || 'Erro ao cadastrar.');
        }
      } else {
        alert('Cadastro enviado com sucesso!');
        setErrors({});
        setFormData({
          name: '',
          email: '',
          username: '',
          crm: '',
          estado: '',
          celphone: '',
          password: '',
        });
        setCrmPhoto(null);
        setSelfiePhoto(null);
      }
    } catch (err) {
      setErrorMessage('Erro ao enviar dados: ' + err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-6 p-8 w-full max-w-lg">
        <div className="mb-8">
          <div className="flex flex-col items-center space-y-4 pb-4">
            <LogoIcon />
          </div>
          <h1 className="font-poppins text-gray-12 text-2xl font-medium text-center">
            Crie a sua conta como médico
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-4 pr-6 pl-6 pt-8 pb-8 rounded-xl border border-gray-06 bg-gray-01"
        >
          <InputField
            label="Nome completo"
            name="name"
            type="text"
            placeholder="Seu nome"
            onChange={handleInputChange}
            hasError={!!errors.name}
            errorMessage={errors.name}
          />

          <InputField
            label="Telefone"
            name="celphone"
            type="text"
            placeholder="Seu telefone"
            onChange={handleInputChange}
            hasError={!!errors.celphone}
            errorMessage={errors.celphone}
          />

          <InputField
            label="Usuário"
            name="username"
            type="text"
            placeholder="Seu usuário"
            onChange={handleInputChange}
            hasError={!!errors.username}
            errorMessage={errors.username}
          />

          <InputField
            label="Email"
            name="email"
            type="text"
            placeholder="Seu email"
            onChange={handleInputChange}
            hasError={!!errors.email}
            errorMessage={errors.email}
          />

          <SelectField
            label="Estado"
            name="estado"
            options={estadosBrasileiros}
            onChange={handleInputChange}
            hasError={!!errors.estado}
            errorMessage={errors.estado}
          />

          <InputField
            label="Número do CRM"
            name="crm"
            type="text"
            placeholder="Apenas números"
            value={formData.crm}
            onChange={handleInputChange}
            hasError={!!errors.crm}
            errorMessage={errors.crm}
          />

          <FileUpload
            label="Foto do CRM"
            name="crmPhoto"
            accept=".jpg,.jpeg,.png,.pdf"
            formatsText="Formatos: .jpg, .jpeg, .png, .pdf"
            onFileChange={handleCRMFile}
            hasError={!!errors.crmPhoto}
            errorMessage={errors.crmPhoto}
          />

          <FileUpload
            label="Foto do rosto"
            name="selfiePhoto"
            accept=".jpg,.jpeg,.png"
            formatsText="Formatos: .jpg, .jpeg, .png"
            onFileChange={handleFaceFile}
            hasError={!!errors.selfiePhoto}
            errorMessage={errors.selfiePhoto}
          />

          <PasswordField
            label="Senha"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            hasError={!!errors.password}
            errorMessage={errors.password}
          />

          {errorMessage && (
            <p className="font-roboto font-normal text-xs text-red-500 text-center">
              {errorMessage}
            </p>
          )}

          <div className="w-full">
            <p className="text-xs mb-0.5 text-gray-11 text-center">
              O seu cadastro será analisado em até 15 dias úteis.
            </p>
            <button
              type="submit"
              className="bg-indigo-09 w-full text-indigo-01 rounded py-2 font-roboto text-base font-normal hover:bg-indigo-10 transition shadow-xs mt-2"
            >
              Solicitar Cadastro
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center w-full pr-6 pl-6 pt-6 pb-6 rounded-xl border border-gray-06 bg-gray-01">
          <p className="font-roboto text-gray-12 text-sm font-normal">
            Já tem uma conta no AlzCheck?
          </p>
          <Link
            to="/login/doctor"
            className="font-roboto text-gray-12 text-sm font-normal mt-2 border border-gray-06 rounded py-2 px-4 hover:bg-gray-2 pr-28 pl-28 bg-gray-02 hover:bg-gray-03 transition shadow-xs"
          >
            Entre na sua conta
          </Link>
        </div>

        <SimpleFooter />
      </div>
    </div>
  );
}

export default DoctorSignin;
