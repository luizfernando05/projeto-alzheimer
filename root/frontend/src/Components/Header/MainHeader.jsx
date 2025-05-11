import React, { useState } from 'react';
import Logo from '../../Assets/Logo.svg?react';
import { Link } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';

const MainHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        <Link
          to="/singin/doctor"
          className="hidden md:block bg-indigo-09 hover:bg-indigo-10 text-gray-01 font-poppins text-xs px-4 py-2 rounded transition"
        >
          Crie uma conta
        </Link>
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
