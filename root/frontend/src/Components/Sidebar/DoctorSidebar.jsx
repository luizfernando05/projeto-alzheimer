import { Stack, UsersFour, CaretDown, CaretRight } from '@phosphor-icons/react';
import { ArrowElbowDownRight } from '@phosphor-icons/react/dist/ssr';
import SquareIcon from '../../Assets/SquareIcon.svg?react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DoctorSidebar = () => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPacientOpen, setIsPacientOpen] = useState(true);

  const isActive = (to) => pathname === to;

  return (
    <aside className="w-64 h-screen bg-gray-02 border-r border-gray-06">
      <div className="p-4 font-poppins font-normal text-xl text-gray-12 flex gap-3 items-center">
        <SquareIcon />
        Médico
      </div>

      <div className="px-2 mt-2">
        <div className="flex items-center justify-between px-2 mb-4 text-sm font-normal text-gray-12">
          <span className="font-roboto font-normal text-sm text-gray-12">
            Navegue
          </span>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-11 hover:text-gray-12 transition"
          >
            <CaretDown
              size={16}
              className={`transition-transform duration-200 ${
                isCollapsed ? '-rotate-90' : 'rotate-0'
              }`}
            />
          </button>
        </div>

        {!isCollapsed && (
          <nav className="font-roboto text-sm font-normal text-gray-11 flex flex-col gap-1">
            <Link
              to="/doctor/dashboard"
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-normal transition 
                ${
                  isActive('/doctor/dashboard')
                    ? 'bg-gray-01 text-gray-12 border border-gray-06'
                    : 'hover:bg-gray-03'
                }`}
            >
              <Stack size={16} />
              Dashboard
            </Link>

            <div>
              <div
                className={`flex items-center justify-between w-full px-4 py-2 rounded-md text-sm font-normal transition
                hover:bg-gray-03
                ${
                  pathname.startsWith('/doctor/patient')
                    ? 'bg-gray-01 text-gray-12 border border-gray-06'
                    : ''
                }`}
              >
                <Link
                  to="/doctor/patient"
                  className="flex items-center gap-3 text-gray-12"
                >
                  <UsersFour size={16} />
                  Pacientes
                </Link>

                <button
                  onClick={() => setIsPacientOpen(!isPacientOpen)}
                  className="text-gray-11 hover:text-gray-12 transition"
                >
                  <CaretDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      isPacientOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>
              </div>

              {isPacientOpen && (
                <div className="ml-8 flex flex-col gap-1 mt-1">
                  <Link
                    to="/doctor/patient/create"
                    className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm transition
                    ${
                      isActive('/doctor/patient/create')
                        ? 'bg-gray-01 text-indigo-09'
                        : 'hover:bg-gray-03 text-gray-11'
                    }`}
                  >
                    <ArrowElbowDownRight size={14} />
                    Criar Paciente
                  </Link>

                  <Link
                    to="/doctor/patient/list"
                    className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm transition
                    ${
                      isActive('/doctor/patient/list')
                        ? 'bg-gray-01 text-indigo-09'
                        : 'hover:bg-gray-03 text-gray-11'
                    }`}
                  >
                    <ArrowElbowDownRight size={14} />
                    Listar Pacientes
                  </Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </aside>
  );
};

export default DoctorSidebar;
