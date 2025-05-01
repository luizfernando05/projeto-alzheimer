import { useState } from 'react';
import { indigo, gray } from '@radix-ui/colors';
import LogoIcon from '../../Assets/LogoIcon.svg?react';

export default function DoctorLogin() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-lg space-y-6 p-8 ">
        <div className="mb-8">
          <div className="flex flex-col items-center space-y-4 pb-4">
            <LogoIcon />
          </div>
          <h1 className="font-poppins text-gray-12 text-2xl font-medium">
            Login como médico
          </h1>
        </div>

        <form
          className="flex flex-col w-full space-y-4 pr-6 pl-6 pt-8 pb-8 rounded-xl border border-gray-06 bg-gray-01"
          action=""
        >
          <div className="flex flex-col space-y-1">
            <label
              className="font-roboto text-gray-12 text-sm font-normal"
              htmlFor=""
            >
              Username ou E-mail
            </label>
            <input
              className="rounded-sm border border-gray-06 bg-gray-02 p-3 font-roboto text-gray-12 text-sm font-normal"
              type="email"
              placeholder="exemplo@email.com"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              className="font-roboto text-gray-12 text-sm font-normal"
              htmlFor=""
            >
              Senha
            </label>
            <input
              className="rounded-sm border border-gray-06 bg-gray-02 p-3 font-roboto text-gray-12 text-sm font-normal"
              type="password"
            />
            <a
              className="font-roboto text-gray-11 text-sm font-normal"
              href="#"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="bg-indigo-09 text-gray-01 rounded py-2 font-roboto text-base font-normal hover:bg-indigo-10 transition"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-col items-center w-full pr-6 pl-6 pt-6 pb-6 rounded-xl border border-gray-06 bg-gray-01">
          <p className="font-roboto text-gray-12 text-sm font-normal">
            Não tem uma conta do AlzCheck?
          </p>
          <button className="font-roboto text-gray-12 text-sm font-normal mt-2 border border-gray-5 rounded py-2 px-4 hover:bg-gray-2">
            Crie uma nova conta
          </button>
        </div>

        <p className="font-roboto text-gray-11 text-sm font-normal text-center">
          © AlzCheck, 2025.{' '}
          <a href="#" className="underline">
            Termos
          </a>
          .{' '}
          <a href="#" className="underline">
            Política de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
