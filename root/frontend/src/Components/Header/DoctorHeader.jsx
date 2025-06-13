import { Bell, Gear, MagnifyingGlass, Sun } from '@phosphor-icons/react';
import DoctorProfile from '../../Assets/DoctorProfile.svg?react';
import React from 'react';

const DoctorHeader = () => {
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
        <button className="hover:text-gray-12 transition">
          <Bell size={24} />
        </button>
        <button className="hover:text-gray-12 transition">
          <Gear size={24} />
        </button>
        <button className="hover:text-gray-12 transition">
          <Sun size={24} />
        </button>
        <button className="border border-indigo-09 rounded-full p-1 hover:border-indigo-12 transition">
          <DoctorProfile size={24} />
        </button>
      </div>
    </header>
  );
};

export default DoctorHeader;
