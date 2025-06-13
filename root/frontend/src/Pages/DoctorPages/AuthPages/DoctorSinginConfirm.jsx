import React from 'react';
import MainHeader from '../../../Components/Header/MainHeader';
import LogoIcon from '../../../Assets/LogoIcon.svg?react';
import SimpleFooter from '../../../Components/Footer/SimpleFooter';
import { Link } from 'react-router-dom';

function DoctorSinginConfirm() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-gray-01 border border-gray-06 rounded-xl p-10 text-center shadow-sm">
          <div className="flex justify-center mb-3">
            <div className="bg-brand-500 rounded-full">
              <LogoIcon />
            </div>
          </div>
          <h1 className="font-poppins text-2xl font-medium text-gray-12 mb-3">
            Sua solicitação foi enviada para análise!
          </h1>
          <p className="font-roboto text-sm text-gray-12">
            Um de nossos administradores irá analisar os seus dados e em breve
            você receberá um email informando o resultado do processamento.{' '}
            <span className="font-medium text-indigo-12">
              Fique de olho no seu email, inclusive, na caixa de spam.
            </span>{' '}
            Enquanto você aguarda,{' '}
            <Link
              to="/funcionalidades"
              className="underline hover:text-indigo-09"
            >
              descubra as nossas funcionalidades
            </Link>
            .
          </p>
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}

export default DoctorSinginConfirm;
