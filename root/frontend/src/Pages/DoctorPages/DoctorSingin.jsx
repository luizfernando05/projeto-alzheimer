import React, { useState } from 'react';
import LogoIcon from '../../Assets/LogoIcon.svg?react';
import InputField from '../../Components/Form/InputField';
import SelectField from '../../Components/Form/SelectField';
import { estadosBrasileiros } from '../../Utils/states';
import FileUpload from '../../Components/Form/FileUpload';
import PasswordField from '../../Components/Form/PasswordField';
import SimpleFooter from '../../Components/Footer/SimpleFooter';

function DoctorSingin() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConfirm: '',
    username: '',
    crm: '',
    estado: '',
    celphone: '',
    password: '',
    passConfirm: '',
  });
  const [crmPhoto, setCrmPhoto] = useState(null);
  const [selfiePhoto, setSelfiePhoto] = useState(null);
  const [errors, setErrors] = useState({
    emailConfirm: '',
    passConfirm: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'crm') {
      setFormData((prev) => ({
        ...prev,
        crm: value,
      }));
    } else if (name === 'estado') {
      setFormData((prev) => ({
        ...prev,
        estado: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCRMFile = (file) => {
    setCrmPhoto(file);
  };

  const handleFaceFile = (file) => {
    setSelfiePhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email !== formData.emailConfirm) {
      setErrors((prev) => ({
        ...prev,
        emailConfirm: 'Os emails não correspondem.',
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        emailConfirm: '',
      }));
    }

    if (formData.password !== formData.passConfirm) {
      setErrors((prev) => ({
        ...prev,
        passConfirm: 'As senhas não correspondem.',
      }));
      return;
    } else {
      setErrors((prev) => ({
        ...prev,
        passConfirm: '',
      }));
    }

    const crmCombinado = `${formData.crm}-${formData.estado}`;

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('emailConfirm', formData.emailConfirm);
    data.append('username', formData.username);
    data.append('crm', crmCombinado);
    data.append('password', formData.password);
    data.append('passConfirm', formData.passConfirm);
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
        alert(`Erro: ${responseData.message}`);
      } else {
        alert('Cadastro enviado com sucesso!');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Ocorreu um erro de rede ao enviar o cadastro.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-6 p-8">
        <div>
          <div className="flex flex-col items-center space-y-4 pb-4">
            <LogoIcon />
          </div>
          <h1 className="font-poppins text-gray-12 text-2xl font-medium">
            Crie a sua conta como médico
          </h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full max-w-4xl pr-6 pl-6 pt-8 pb-8 rounded-xl border border-gray-06 bg-gray-01 mb-4"
        action=""
      >
        <InputField
          label="Nome completo"
          name="name"
          type="text"
          placeholder="Seu nome"
          onChange={handleInputChange}
        />

        <InputField
          label="Telefone"
          name="celphone"
          type="text"
          placeholder="Seu telefone"
          onChange={handleInputChange}
        />

        <InputField
          label="Usuário"
          name="username"
          type="text"
          placeholder="Seu usuário"
          onChange={handleInputChange}
        />

        <InputField
          label="Email"
          name="email"
          type="text"
          placeholder="Seu email"
          onChange={handleInputChange}
        />

        <SelectField
          label="Estado"
          name="estado"
          options={estadosBrasileiros}
          onChange={handleInputChange}
        />

        <InputField
          label="Confirmar email"
          name="emailConfirm"
          type="text"
          placeholder="Confirme seu email"
          value={formData.emailConfirm}
          onChange={handleInputChange}
        />

        <InputField
          label="Número do CRM"
          name="crm"
          type="text"
          placeholder="Apenas números"
          value={formData.crm}
          onChange={handleInputChange}
        />

        <FileUpload
          label="Foto do CRM"
          name="crmPhoto"
          accept=".jpg,.jpeg,.png,.pdf"
          formatsText="Formatos: .jpg, .jpeg, .png, .pdf"
          onFileChange={handleCRMFile}
          className="col-span-2"
        />

        <FileUpload
          label="Foto do rosto"
          name="selfiePhoto"
          accept=".jpg,.jpeg,.png"
          formatsText="Formatos: .jpg, .jpeg, .png"
          onFileChange={handleFaceFile}
          className="col-span-2"
        />

        <PasswordField
          label="Senha"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <PasswordField
          label="Confirmar senha"
          name="passConfirm"
          value={formData.passConfirm}
          onChange={handleInputChange}
        />

        <div className="flex items-end">
          <div className="w-full">
            <p className="text-xs mb-0.5 text-gray-11 col-span-2">
              O seu cadastro será analisado em até 15 dias úteis.
            </p>
            <button
              type="submit"
              className="bg-indigo-09 w-full text-indigo-01 rounded py-2 font-roboto text-base font-normal hover:bg-indigo-10 transition shadow-xs"
            >
              Solicitar Cadastro
            </button>
          </div>
        </div>
      </form>

      <div className="max-w-4xl flex flex-col items-center w-full pr-6 pl-6 pt-6 pb-6 rounded-xl border border-gray-06 bg-gray-01 mb-6">
        <p className="font-roboto text-gray-12 text-sm font-normal">
          Já tem um conta no AlzCheck?
        </p>
        <button className="w-full font-roboto text-gray-12 text-sm font-normal mt-2 border border-gray-06 rounded py-2 px-4 hover:bg-gray-2 pr-28 pl-28 bg-gray-02 hover:bg-gray-03 transition shadow-xs">
          Entre na sua conta
        </button>
      </div>

      <SimpleFooter />
    </div>
  );
}

export default DoctorSingin;
