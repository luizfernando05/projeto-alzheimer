import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../Assets/Logo.svg?react';
import { Link } from 'react-router-dom';
import { List, X, CaretDown } from '@phosphor-icons/react';

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!loginDropdownOpen);
  };

  return (
    <header>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <button
          className="md:hidden text-indigo-09"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          {menuOpen ? <X size={24} /> : <List size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-8 font-poppins text-sm text-gray-12 font-medium">
          <Link
            to="/funcionalidades"
            className="hover:text-indigo-09 transition"
          >
            Funcionalidades
          </Link>
          <Link to="/sobre" className="hover:text-indigo-09 transition">
            Sobre
          </Link>
          <Link to="/contato" className="hover:text-indigo-09 transition">
            Contato
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Dropdown de Login */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleLoginDropdown}
              className="flex items-center gap-1 text-gray-12 hover:text-indigo-09 font-poppins text-sm font-medium transition"
            >
              Login
              <CaretDown
                size={16}
                className={`transition-transform ${
                  loginDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {loginDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-01 border border-gray-06 rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/login/doctor"
                  className="block px-4 py-2 text-sm text-gray-12 hover:bg-gray-02 hover:text-indigo-09 transition"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  Login como Médico
                </Link>
                <Link
                  to="/login/patient"
                  className="block px-4 py-2 text-sm text-gray-12 hover:bg-gray-02 hover:text-indigo-09 transition"
                  onClick={() => setLoginDropdownOpen(false)}
                >
                  Login como Paciente
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/singin/doctor"
            className="bg-indigo-09 hover:bg-indigo-10 text-gray-01 font-poppins text-xs px-4 py-2 rounded transition"
          >
            Crie uma conta
          </Link>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 font-poppins text-sm text-gray-12">
          <Link to="/funcionalidades" onClick={() => setMenuOpen(false)}>
            Funcionalidades
          </Link>
          <Link to="/sobre" onClick={() => setMenuOpen(false)}>
            Sobre
          </Link>
          <Link to="/contato" onClick={() => setMenuOpen(false)}>
            Contato
          </Link>

          {/* Menu Mobile - Login */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-11 text-xs font-medium">Login:</span>
            <Link
              to="/login/doctor"
              className="text-gray-12 hover:text-indigo-09 pl-2"
              onClick={() => setMenuOpen(false)}
            >
              Como Médico
            </Link>
            <Link
              to="/login/patient"
              className="text-gray-12 hover:text-indigo-09 pl-2"
              onClick={() => setMenuOpen(false)}
            >
              Como Paciente
            </Link>
          </div>

          <Link
            to="/singin/doctor"
            className="bg-indigo-09 hover:bg-indigo-10 text-gray-01 text-xs px-4 py-2 rounded transition w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Crie uma conta
          </Link>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
