import { X } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const PatientSearchModal = ({ onClose, onSelect, title }) => {
  const [search, setSearch] = useState('');
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${apiUrl}/patient/doctors/list`, {
          credentials: 'include',
        });
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-12/60">
      <div className="bg-gray-02 rounded-md border border-gray-06 shadow-lg w-full max-w-md p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-11 hover:text-gray-12"
        >
          <X size={20} />
        </button>
        <h2 className="text-lg font-poppins text-gray-12 mb-4">{title}</h2>
        <input
          type="text"
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome do paciente..."
          className="w-full border border-gray-06 rounded px-3 py-2 text-sm text-gray-11 font-roboto"
        />
        <ul className="mt-3 max-h-60 overflow-y-auto border border-gray-06 rounded text-sm font-roboto">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <li
                key={p.id}
                onClick={() => onSelect(p.id)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-03 text-gray-11"
              >
                {p.name}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-gray-11">
              Nenhum paciente encontrado
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PatientSearchModal;
