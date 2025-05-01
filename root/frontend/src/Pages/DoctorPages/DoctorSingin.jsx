import React from 'react';
import LogoIcon from '../../Assets/LogoIcon.svg?react';
import InputField from '../../Components/Form/InputField';
import SelectField from '../../Components/Form/SelectField';
import { estadosBrasileiros } from '../../Utils/states';

function DoctorSingin() {
  return (
    <div>
      <div className="flex flex-col items-center space-y-6 p-8 ">
        <div className="mb-8">
          <div className="flex flex-col items-center space-y-4 pb-4">
            <LogoIcon />
          </div>
          <h1 className="font-poppins text-gray-12 text-2xl font-medium">
            Crie a sua conta como médico
          </h1>
        </div>
      </div>

      <form action="">
        <div>
          <InputField
            label="Nome completo"
            type="text"
            placeholder="Seu nome"
          />

          <InputField label="Usuário" type="text" placeholder="Seu usuário" />

          <SelectField label="Estado" options={estadosBrasileiros} />

          <InputField
            label="Número do CRM"
            type="mumber"
            placeholder="Apenas números"
          />
        </div>
      </form>
    </div>
  );
}

export default DoctorSingin;
