import React, { useEffect, useState } from 'react';
import DoctorLayout from '../DoctorLayout';
import {
  ArrowLeft,
  CaretDown,
  CaretLeft,
  CaretRight,
  Funnel,
  MagnifyingGlass,
  User,
  Sparkle,
  PencilSimple,
  Trash,
} from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

const apiUrl = import.meta.env.VITE_API_URL;

const calculateAge = (birthDate) => {
  const birth = new Date(birthDate);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const ListPatients = () => {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    minAge: '',
    maxAge: '',
    gender: '',
    prediction: '',
    sortOrder: 'DESC',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;
  const [showFilters, setShowFilters] = useState(false);

  const fetchPatients = async () => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: '10',
      ...filters,
    });

    const response = await fetch(
      `${apiUrl}/patient/doctors/list/filters?${query}`,
      {
        credentials: 'include',
      }
    );

    const result = await response.json();
    setPatients(result.data || []);
    setTotalItems(result.total || 0);
    setTotalPages(Math.ceil(result.total / itemsPerPage));
  };

  useEffect(() => {
    fetchPatients();
  }, [page, JSON.stringify(filters)]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <DoctorLayout>
      <div className="bg-gray-02 rounded-xl shadow-sm border border-gray-06 overflow-hidden">
        <div className="flex gap-6 pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03"
          >
            <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
              <ArrowLeft size={16} />
            </div>
            <span className="pr-2 pl-2 pt-1 pb-1">Voltar</span>
          </button>

          <h2 className="text-xl font-poppins font-normal text-gray-12">
            Listar pacientes
          </h2>
        </div>

        <div className="flex items-center gap-2 pt-4 pr-8 pl-8">
          <div className="relative w-64">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-11"
            />
            <input
              type="text"
              name="name"
              placeholder="Pesquisar por nome"
              value={filters.name}
              onChange={handleChange}
              className="w-full h-10 pl-10 text-gray-11 pr-4 font-roboto text-sm border border-gray-05 rounded-lg bg-gray-01 focus:outline-none focus:ring-1 focus:ring-gray-05"
            />
          </div>
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-stretch gap-2 border border-gray-06 bg-gray-01 rounded-lg px-3 h-10 text-base text-gray-11 font-roboto hover:bg-gray-03"
          >
            <div className="flex items-center">
              <Funnel size={16} />
            </div>
            <div className="w-px h-full bg-gray-06" />
            <div className="flex items-center px-1">Inserir filtros</div>
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-4 pt-4 pr-8 pl-8">
            <input
              name="minAge"
              placeholder="Idade mínima"
              type="number"
              value={filters.minAge}
              onChange={handleChange}
              className="h-10 text-gray-11 p-4 font-roboto text-sm border border-gray-05 rounded-lg bg-gray-01 focus:outline-none focus:ring-1 focus:ring-gray-05"
            />
            <input
              name="maxAge"
              placeholder="Idade máxima"
              type="number"
              value={filters.maxAge}
              onChange={handleChange}
              className="h-10 text-gray-11 p-4 font-roboto text-sm border border-gray-05 rounded-lg bg-gray-01 focus:outline-none focus:ring-1 focus:ring-gray-05"
            />
            <div className="relative w-52">
              <select
                name="gender"
                value={filters.gender}
                onChange={handleChange}
                className="w-full h-full appearance-none border border-gray-05 bg-gray-01 rounded-lg pr-4 pl-4 font-roboto text-sm text-gray-11 focus:outline-none focus:ring-1 focus:ring-gray-05"
              >
                <option value="">Todos os gêneros</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-11">
                <CaretDown size={16} />
              </div>
            </div>
            <div className="relative w-52">
              <select
                name="prediction"
                value={filters.prediction}
                onChange={handleChange}
                className="w-full h-full appearance-none border border-gray-05 bg-gray-01 rounded-lg pr-4 pl-4 font-roboto text-sm text-gray-11 focus:outline-none focus:ring-1 focus:ring-gray-05"
              >
                <option value="">Todas as predições</option>
                <option value="Diabetic">Diabético</option>
                <option value="Non-Diabetic">Não diabético</option>
                <option value="Predict-Diabetic">Predição</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-11">
                <CaretDown size={16} />
              </div>
            </div>
            <div className="relative w-52">
              <select
                name="sortOrder"
                value={filters.sortOrder}
                onChange={handleChange}
                className="w-full h-full appearance-none border border-gray-05 bg-gray-01 rounded-lg pr-4 pl-4 font-roboto text-sm text-gray-11 focus:outline-none focus:ring-1 focus:ring-gray-05"
              >
                <option value="DESC">Mais recentes</option>
                <option value="ASC">Mais antigos</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-11">
                <CaretDown size={16} />
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto pt-3 pr-8 pl-8">
          <table className="min-w-full text-sm text-gray-11 font-roboto">
            <thead>
              <tr className="bg-gray-02 text-left">
                <th className="py-3 font-normal">Nome</th>
                <th className="py-3 font-normal">Data de cadastro</th>
                <th className="py-3 font-normal">Idade</th>
                <th className="py-3 font-normal">Nascimento</th>
                <th className="py-3 font-normal">Diagnóstico</th>
                <th className="py-3 font-normal">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-12">
              {patients.map((p) => {
                const imageUrl = p.selfiePhoto
                  ? `http://localhost:3001/${p.selfiePhoto.replace(/\\/g, '/')}`
                  : null;

                return (
                  <tr key={p.id} className="border-gray-06">
                    <td className="py-3 flex items-center gap-2">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={p.name}
                          className="w-10 h-10 object-cover border border-indigo-09 rounded-sm"
                        />
                      ) : (
                        <div className="w-10 h-10 flex items-center justify-center bg-gray-03 border border-indigo-09 rounded-sm text-indigo-11">
                          <User size={28} />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-gray-12 text-sm">{p.name}</span>
                        <span className="text-gray-11 text-xs">
                          #{p.id.slice(0, 8)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      {format(new Date(p.createdAt), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })}
                    </td>
                    <td className="py-3">{calculateAge(p.birthDate)} anos</td>
                    <td className="py-3">
                      {format(new Date(p.birthDate), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })}
                    </td>
                    <td className="py-3">—</td> {/* predição futura */}
                    <td className="py-3">
                      <div className="flex items-center gap-4 pl-2">
                        <button
                          onClick={() => alert('Favoritar')}
                          className="text-indigo-10 hover:text-indigo-11"
                        >
                          <Sparkle size={20} weight="regular" />
                        </button>
                        <button
                          onClick={() => navigate(`/patient/edit/${p.id}`)}
                          className="text-gray-12 hover:text-gray-11"
                        >
                          <PencilSimple size={20} weight="regular" />
                        </button>
                        <button
                          onClick={() => alert('Excluir paciente')}
                          className="text-red-09 hover:text-red-12"
                        >
                          <Trash size={20} weight="regular" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center gap-3 pt-5 pr-8 pl-8 pb-8 text-sm text-gray-11">
          <span>
            {`${(page - 1) * itemsPerPage + 1}–${Math.min(
              page * itemsPerPage,
              totalItems
            )} de ${totalItems}`}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
              className={`text-xl hover:text-gray-12 ${
                page === 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <CaretLeft size={16} />
            </button>

            <button
              onClick={() => page < totalPages && setPage(page + 1)}
              disabled={page === totalPages}
              className={`text-xl hover:text-gray-12 ${
                page === totalPages
                  ? 'opacity-30 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
            >
              <CaretRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default ListPatients;
