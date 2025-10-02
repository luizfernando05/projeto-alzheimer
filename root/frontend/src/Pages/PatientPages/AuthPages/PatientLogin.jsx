import { useState } from 'react';
import LogoIcon from '../../../Assets/LogoIcon.svg?react';
import SimpleFooter from '../../../Components/Footer/SimpleFooter';
import InputField from '../../../Components/Form/InputField';
import PasswordField from '../../../Components/Form/PasswordField';
import { Link } from 'react-router-dom';
import MainHeader from '../../../Components/Header/MainHeader';

export default function PatientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
    status: '',
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '', status: '' });

    try {
      const response = await fetch(`${apiUrl}/patient/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('patientToken', data.token);
          localStorage.setItem('patientData', JSON.stringify(data.patient));
        }

        window.location.href = '/patient/dashboard';
      } else {
        if (data.errors) {
          setErrors({
            email: data.errors.email || '',
            password: data.errors.password || '',
            status: data.errors.status || '',
            general: data.message || 'Erro ao fazer login.',
          });
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
        <div className="flex flex-col items-center space-y-6 p-8 w-full max-w-md">
          <div className="mb-8">
            <div className="flex flex-col items-center space-y-4 pb-4">
              <LogoIcon />
            </div>
            <h1 className="font-poppins text-gray-12 text-2xl font-medium">
              Login como paciente
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full space-y-4 pr-8 pl-8 pt-8 pb-8 rounded-xl border border-gray-06 bg-gray-01"
          >
            <InputField
              label="E-mail"
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

            {errors.status && (
              <p className="font-roboto text-yellow-600 text-sm">
                {errors.status}
              </p>
            )}

            <button
              type="submit"
              className="bg-indigo-09 text-gray-01 rounded py-2 font-roboto text-base font-normal hover:bg-indigo-10 transition shadow-xs"
            >
              Entrar
            </button>
          </form>
          <SimpleFooter />
        </div>
      </div>
    </div>
  );
}
