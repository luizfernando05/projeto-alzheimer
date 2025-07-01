import React, { useEffect, useState } from 'react';
import DoctorLayout from './DoctorLayout';
import { ArrowLeft } from '@phosphor-icons/react';
import axios from 'axios';
import InputField from '../../Components/Form/InputField';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/doctor/get/data`, {
        withCredentials: true,
      })
      .then((res) => {
        setDoctor(res.data);
        setForm(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = () => [setForm(doctor)];

  const handleSubmit = (e) => {
    e.preventeDefault();
    console.log('Enviar para api');
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <DoctorLayout>
      <section className="w-full">
        <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
          <div className="flex gap-6 pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
            <button className="flex items-center gap-2 text-xs text-gray-11 hover:text-gray-12 shadow-xs rounded-sm border border-gray-06 bg-gray-02 hover:bg-gray-03">
              <div className="pr-2 pl-2 pt-1 pb-1 border-r border-gray-06">
                <ArrowLeft size={16} />
              </div>
              <span className="pr-2 pl-2 pt-1 pb-1">Voltar</span>
            </button>

            <h2 className="text-xl font-poppins font-normal text-gray-12">
              Meu Perfil
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="pt-6 pr-8 pl-8">
            <div className="flex items-stretch gap-x-6 flex-wrap md:flex-nowrap mb-4">
              <img
                src={`${apiUrl}/${doctor.selfiePhoto?.replace(/\\/g, '/')}`}
                alt="Foto do médico"
                className="h-19 w-auto aspect-square border border-indigo-09 object-cover rounded"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                <InputField
                  label="Nome completo"
                  name="name"
                  type="text"
                  value={form.name}
                />
                <InputField
                  label="Usuário"
                  name="user"
                  type="text"
                  value={form.username}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 mb-4">
              <InputField label="CRM" name="crm" type="text" value={form.crm} />
              <InputField
                label="Telefone"
                name="celphone"
                type="text"
                value={form.celphone}
              />
              <InputField
                label="Senha"
                placeholder="Atualize a sua senha"
                name="password"
                type="text"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mb-4">
              <button
                type="submit"
                className="bg-gray-02 text-gray-12 font-roboto text-sm px-4 py-2 rounded hover:bg-gray-03 border border-gray-06"
              >
                Salvar Alterações
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="text-red-500 border border-red-400 font-roboto text-sm px-4 py-2 rounded hover:bg-red-100"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default DoctorProfile;
