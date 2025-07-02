import {
  Bell,
  Gear,
  MagnifyingGlass,
  User,
  Wind,
  SignOut,
  Sun,
  Moon,
} from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const DoctorHeader = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    setDarkMode(isDark);

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

  const handleLogout = async () => {
    try {
      await fetch(`${apiUrl}/doctor/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/login/doctor';
    } catch (error) {
      console.error('Erro ao fazer logout: ', error);
    }
  };
  return (
    <header className="w-full h-16 px-6 flex items-center justify-between border-b border-gray-06 bg-gray-01">
      <div className="relative w-64">
        <MagnifyingGlass
          size={16}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-11"
        />
        <input
          type="text"
          placeholder="Pesquisar"
          className="w-full h-10 pl-10 text-gray-12 pr-4 font-roboto text-sm border border-gray-05 rounded-lg bg-gray-01 focus:outline-none focus:ring-1 focus:ring-gray-05"
        />
      </div>

      <div className="flex items-center gap-4 text-gray-11">
        <button className="hover:text-gray-12 transition relative group cursor-pointer">
          <Bell size={24} />
          <div className="absolute right-0 mt-2 w-40 bg-gray-02/70 shadow-lg border border-gray-06 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
            <div className="flex flex-col gap-3 items-center text-gray-11 m-3">
              <Wind size={32} />
              <span className="font-roboto font-normal text-xs">
                Tudo tranquilo por aqui!
              </span>
            </div>
          </div>
        </button>
        <button className="hover:text-gray-12 transition">
          <Gear size={24} />
        </button>
        <button
          onClick={() => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            setDarkMode(isDark);
          }}
          className="hover:text-gray-12 transition"
        >
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
        <button className="border border-indigo-09 rounded-full p-1 hover:border-indigo-12 transition relative group cursor-pointer">
          {doctor?.selfiePhoto ? (
            <img
              src={`${apiUrl}/${doctor.selfiePhoto.replace(/\\/g, '/')}`}
              alt="Foto do médico"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-05 flex items-center justify-center text-xs text-gray-01">
              ?
            </div>
          )}
          <div className="absolute right-0 mt-2 w-40 bg-gray-02/70 shadow-lg border border-gray-06 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
            <ul className="flex flex-col font-roboto text-sm text-gray-11">
              <li
                className="flex gap-3 items-center px-4 py-2 hover:bg-gray-04 hover:text-gray-12 cursor-pointer"
                onClick={() => navigate('/doctor/profile')}
              >
                <User size={14} />
                Ver Perfil
              </li>
              <li
                className="flex gap-3 items-center px-4 py-2 hover:bg-red-100 hover:text-red-950 cursor-pointer"
                onClick={handleLogout}
              >
                <SignOut size={14} />
                Sair
              </li>
            </ul>
          </div>
        </button>
      </div>
    </header>
  );
};

export default DoctorHeader;
