import { Bell, House, User, SignOut } from '@phosphor-icons/react';
import Logo from '../../Assets/Logo24.svg?react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const PatientHeader = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`${apiUrl}/patient/get/data`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPatient(data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do paciente:', error);
      }
    };

    fetchPatient();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/patient/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        navigate('/login/patient');
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

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

        {/* Dropdown do usuário */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="rounded-full overflow-hidden border w-8 h-8 hover:ring-2 hover:ring-indigo-06 transition-all"
          >
            {patient?.selfiePhoto ? (
              <img
                src={`${apiUrl}/${patient.selfiePhoto.replace(/\\/g, '/')}`}
                alt="Foto do paciente"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-02 text-xs text-indigo-09 font-semibold">
                {patient?.name ? patient.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              {/* Overlay para fechar o dropdown */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />

              <div className="absolute right-0 top-full mt-2 w-64 bg-gray-01 border border-gray-06 rounded-lg shadow-md z-20">
                {/* Info do usuário */}
                <div className="px-4 py-3 border-b border-gray-06">
                  <p className="font-poppins text-sm font-semibold text-gray-12 truncate">
                    {patient?.name || 'Paciente'}
                  </p>
                  <p className="font-roboto text-xs text-gray-10 truncate">
                    {patient?.email || 'email@exemplo.com'}
                  </p>
                </div>

                {/* Menu items */}
                <div className="py-2">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/patient/profile');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-11 hover:bg-gray-02 hover:text-gray-12 transition-colors"
                  >
                    <User size={16} />
                    Meu Perfil
                  </button>

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-09 hover:bg-red-02 hover:text-red-10 transition-colors"
                  >
                    <SignOut size={16} />
                    Sair
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
