import { useState } from 'react';
import { indigo, gray } from '@radix-ui/colors';
import LogoIcon from '../../Assets/LogoIcon.svg?react';

export default function DoctorLogin() {
  return (
    <div className="">
      <div className="mb-8">
        <div className="">
          <LogoIcon />
        </div>
        <h1 className="font-poppins text-gray-12 text-2xl font-normal">
          Login como médico
        </h1>
      </div>
      <div className="form">
        <form action="">
          <label
            className="font-roboto text-gray-12 text-sm font-normal"
            htmlFor=""
          >
            Username ou E-mail
          </label>
          <input type="email" placeholder="exemplo@email.com" />
          <label
            className="font-roboto text-gray-12 text-sm font-normal"
            htmlFor=""
          >
            Senha
          </label>
          <input type="password" />
          <a className="font-roboto text-gray-11 text-sm font-normal" href="#">
            Esqueci minha senha
          </a>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div className="singin">
        <p className="font-roboto text-gray-12 text-sm font-normal">
          Não tem uma conta do AlzCheck?
        </p>
        <button>Crie uma nova conta</button>
      </div>
      <p className="font-roboto text-gray-12 text-sm font-normal">
        © AlzCheck, 2025. <a href="#">Termos</a>.{' '}
        <a href="#">Política de privacidade</a>.
      </p>
    </div>
  );
}
