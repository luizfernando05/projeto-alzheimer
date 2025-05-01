import React from 'react';
import LogoIcon from '../../Assets/LogoIcon.svg?react';
import InputField from '../../Components/Form/InputField';
import SelectField from '../../Components/Form/SelectField';
import { estadosBrasileiros } from '../../Utils/states';
import FileUpload from '../../Components/Form/FileUpload';
import PasswordField from '../../Components/Form/PasswordField';
import SimpleFooter from '../../Components/Footer/SimpleFooter';

function DoctorSingin() {
  const handleCRMFile = (file) => {
    console.log('CRM file:', file);
  };

  const handleFaceFile = (file) => {
    console.log('CRM file:', file);
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
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 w-full max-w-4xl pr-6 pl-6 pt-8 pb-8 rounded-xl border border-gray-06 bg-gray-01 mb-4"
        action=""
      >
        <InputField label="Nome completo" type="text" placeholder="Seu nome" />
        <InputField label="Telefone" type="text" placeholder="Seu telefone" />

        <InputField label="Usuário" type="text" placeholder="Seu usuário" />
        <InputField label="Email" type="text" placeholder="Seu email" />

        <SelectField label="Estado" options={estadosBrasileiros} />
        <InputField
          label="Confirmar email"
          type="text"
          placeholder="Confirme seu email"
        />

        <InputField
          label="Número do CRM"
          type="text"
          placeholder="Apenas números"
        />

        <FileUpload
          label="Foto do CRM"
          accept=".jpg,.jpeg,.png,.pdf"
          formatsText="Formatos: .jpg, .jpeg, .png, .pdf"
          onFileChange={handleCRMFile}
          className="col-span-2"
        />

        <FileUpload
          label="Foto do rosto"
          accept=".jpg,.jpeg,.png"
          formatsText="Formatos: .jpg, .jpeg, .png"
          onFileChange={handleFaceFile}
          className="col-span-2"
        />

        <PasswordField label="Senha" />
        <PasswordField label="Confirmar senha" />

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
