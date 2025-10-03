import { Bell, House, User } from '@phosphor-icons/react';
import Logo from '../../Assets/Logo24.svg?react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const PatientHeader = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`${apiUrl}/doctor/get/data`, {
          credentials: 'include',
        });
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Erro ao buscar dados do médico:', error);
      }
    };

    fetchDoctor();
  }, []);

  return (
    <header className="w-full h-14 px-6 flex items-center justify-between border-b border-gray-06 bg-gray-01">
      <Logo />

      {/* Navegação */}
      <nav className="flex gap-2">
        <button
          onClick={() => navigate('/patient/dashboard')}
          className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-06 text-sm hover:bg-gray-03"
        >
          <House size={16} />
          Início
        </button>
        <button
          onClick={() => navigate('/patient/profile')}
          className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-06 text-sm hover:bg-gray-03"
        >
          <User size={16} />
          Meu Perfil
        </button>
      </nav>

      {/* Ações */}
      <div className="flex items-center gap-4">
        <button className="hover:text-gray-11 transition">
          <Bell size={20} />
        </button>

        <button className="rounded-full overflow-hidden border w-8 h-8">
          {doctor?.selfiePhoto ? (
            <img
              src={`${apiUrl}/${doctor.selfiePhoto.replace(/\\/g, '/')}`}
              alt="Foto do médico"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-02 text-xs text-gray-12">
              ?
            </div>
          )}
        </button>
      </div>
    </header>
  );
};

export default PatientHeader;
