import {
  Bell,
  Gear,
  MagnifyingGlass,
  User,
  Wind,
  SignOut,
} from '@phosphor-icons/react';
import DoctorProfile from '../../Assets/DoctorProfile.svg?react';
import React from 'react';

const DoctorHeader = () => {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/doctor/logout', {
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
          className="w-full h-10 pl-10 pr-4 font-roboto text-sm border border-gray-05 rounded-lg bg-gray-01 focus:outline-none focus:ring-1 focus:ring-gray-05"
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
        <button className="border border-indigo-09 rounded-full p-1 hover:border-indigo-12 transition relative group cursor-pointer">
          <DoctorProfile size={24} />
          <div className="absolute right-0 mt-2 w-40 bg-gray-02/70 shadow-lg border border-gray-06 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
            <ul className="flex flex-col font-roboto text-sm text-gray-11">
              <li className="flex gap-3 items-center px-4 py-2 hover:bg-gray-04 hover:text-gray-12 cursor-pointer">
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
