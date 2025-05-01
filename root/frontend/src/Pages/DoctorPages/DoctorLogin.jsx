import { useState } from 'react';
import LogoIcon from '../../Assets/LogoIcon.svg?react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

export default function DoctorLogin() {
  const [showPasword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-6 p-8 ">
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
              className="rounded-sm border border-gray-06 bg-gray-02 p-3 font-roboto text-gray-12 text-sm font-normal focus:outline-indigo-07"
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

            <div className="relative">
              <input
                type={showPasword ? 'text' : 'password'}
                className="w-full rounded-sm border border-gray-06 bg-gray-02 p-3 pr-10 font-roboto text-gray-12 text-sm font-normal focus:outline-indigo-07"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPasword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-11"
              >
                {showPasword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <a
              className="self-end font-roboto text-gray-11 text-xs font-normal hover:underline"
              href="#"
            >
              Esqueci minha senha
            </a>
          </div>

          <button
            type="submit"
            className="bg-indigo-09 text-gray-01 rounded py-2 font-roboto text-base font-normal hover:bg-indigo-10 transition shadow-xs"
          >
            Entrar
          </button>
        </form>

        <div className="flex flex-col items-center w-full pr-6 pl-6 pt-6 pb-6 rounded-xl border border-gray-06 bg-gray-01">
          <p className="font-roboto text-gray-12 text-sm font-normal">
            Não tem uma conta do AlzCheck?
          </p>
          <button className="font-roboto text-gray-12 text-sm font-normal mt-2 border border-gray-06 rounded py-2 px-4 hover:bg-gray-2 pr-28 pl-28 bg-gray-02 hover:bg-gray-03 transition shadow-xs">
            Crie uma nova conta
          </button>
        </div>

        <p className="font-roboto text-gray-11 text-xs font-normal text-center">
          © AlzCheck, 2025.{' '}
          <a href="#" className="hover:text-indigo-12">
            Termos
          </a>
          .{' '}
          <a href="#" className="hover:text-indigo-12">
            Política de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
