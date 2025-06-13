import { useState } from 'react';
import LogoIcon from '../../../Assets/LogoIcon.svg?react';
import SimpleFooter from '../../../Components/Footer/SimpleFooter';
import InputField from '../../../Components/Form/InputField';
import PasswordField from '../../../Components/Form/PasswordField';
import { Link } from 'react-router-dom';
import MainHeader from '../../../Components/Header/MainHeader';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const response = await fetch('http://localhost:3001/doctor/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/doctor/dashboard';
      } else {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Erro ao fazer login.' });
        }
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: 'Erro de conexão com o servidor.' });
    }
  };

  return (
    <div>
      <MainHeader />
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
            onSubmit={handleSubmit}
            className="flex flex-col w-full space-y-4 pr-6 pl-6 pt-8 pb-8 rounded-xl border border-gray-06 bg-gray-01"
          >
            <InputField
              label="Username ou E-mail"
              type="email"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email || errors.general) {
                  setErrors((prev) => ({ ...prev, email: '', general: '' }));
                }
              }}
              hasError={!!errors.email}
              errorMessage={errors.email}
            />

            <PasswordField
              label="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password || errors.general) {
                  setErrors((prev) => ({ ...prev, password: '', general: '' }));
                }
              }}
              hasError={!!errors.password}
              errorMessage={errors.password}
            />

            <a
              className="self-end font-roboto text-gray-11 text-xs font-normal hover:underline"
              href="#"
            >
              Esqueci minha senha
            </a>

            {errors.general && (
              <p className="font-roboto text-red-500 text-sm">
                {errors.general}
              </p>
            )}

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
            <Link
              to="/singin/doctor"
              className="font-roboto text-gray-12 text-sm font-normal mt-2 border border-gray-06 rounded py-2 px-4 hover:bg-gray-2 pr-28 pl-28 bg-gray-02 hover:bg-gray-03 transition shadow-xs"
            >
              Crie uma nova conta
            </Link>
          </div>

          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}
