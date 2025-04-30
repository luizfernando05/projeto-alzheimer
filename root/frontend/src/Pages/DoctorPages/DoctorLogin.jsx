import { useState } from 'react';
import { indigo, gray } from '@radix-ui/colors';
import LogoIcon from '../../Assets/LogoIcon.svg?react';

export default function DoctorLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="title">
        <LogoIcon />
        <h1>Login como médico</h1>
      </div>
      <div className="form">
        <form action="">
          <label htmlFor="">Username ou E-mail</label>
          <input type="email" placeholder="exemplo@email.com" />
          <label htmlFor="">Senha</label>
          <input type="password" />
          <a href="#" className="text-gray-500 hover:underline">
            Esqueci minha senha
          </a>
          <button type="submit">Entrar</button>
        </form>
      </div>
      <div className="singin">
        <p className="mb-2">Não tem uma conta do AlzCheck?</p>
        <button>Crie uma nova conta</button>
      </div>
      <p>
        © AlzCheck, 2025. <a href="#">Termos</a>.{' '}
        <a href="#">Política de privacidade</a>.
      </p>
    </div>
  );
}
