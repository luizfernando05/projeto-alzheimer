import {
  Gear,
  HeadCircuit,
  ListNumbers,
  Microscope,
  Pencil,
  Plus,
  Sparkle,
  X,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const PatientOptionsPanel = () => {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
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
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePatientSelect = (id) => {
    setSearchOpen(false);
    navigate(`/doctor/predict/${id}`);
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      {/* Painel principal */}
      <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
        <div className="flex gap-3 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
          <div className="border border-gray-06 p-1 rounded-sm">
            <Gear size={16} />
          </div>
          <h2 className="text-base font-poppins font-normal text-gray-12">
            Opções
          </h2>
        </div>
        <div className="pt-4 pb-5 pr-6 pl-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/doctor/patient/create')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <Plus size={12} />
            <span className="text-gray-12">Adicionar paciente</span>
          </button>
          <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03">
            <Pencil size={12} />
            <span className="text-gray-12">Editar paciente</span>
          </button>
          <button
            onClick={() => navigate('/doctor/patient/list')}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <ListNumbers size={12} />
            <span className="text-gray-12">Listar pacientes</span>
          </button>
          <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03">
            <Microscope size={12} />
            <span className="text-gray-12">Inserir resultados de exames</span>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03"
          >
            <Sparkle size={12} />
            <span className="text-gray-12">Predição</span>
          </button>
          <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 px-2 py-1 hover:bg-gray-03">
            <HeadCircuit size={12} />
            <span className="text-gray-12">Roteiro do Mini-Exame Mental</span>
          </button>
        </div>
      </div>

      {/* Modal de busca */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-12/60">
          <div className="bg-gray-02 rounded-md border border-gray-06 shadow-lg w-full max-w-md p-5 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute font-roboto top-3 right-3 text-gray-11 hover:text-gray-12"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-poppins text-gray-12 mb-4">
              Buscar Paciente para Predição
            </h2>
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite o nome do paciente..."
              className="w-full font-roboto border border-gray-06 rounded px-3 py-2 text-sm text-gray-12"
            />
            <ul className="mt-3 max-h-60 overflow-y-auto border border-gray-06 rounded font-roboto text-sm text-gray-11">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((p) => (
                  <li
                    key={p.id}
                    onClick={() => handlePatientSelect(p.id)}
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
      )}
    </>
  );
};

export default PatientOptionsPanel;
