import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ListNumbers, User } from '@phosphor-icons/react';

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

const PatientSimplifiedList = () => {
  const [patients, setPatients] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(`${apiUrl}/patient/doctors/list`, {
          withCredentials: true,
        });
        const top10 = response.data.slice(0, 10);
        setPatients(top10);
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
      <div className="pt-5 pb-5 pr-6 pl-6 border-b border-gray-06 flex items-center gap-3">
        <div className="border border-gray-06 p-1 rounded-sm text-gray-12">
          <ListNumbers size={16} />
        </div>
        <h2 className="text-base font-poppins font-normal text-gray-12">
          Lista de pacientes
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4 text-sm text-gray-11 font-roboto font-normal">
          <thead>
            <tr className="text-left">
              <th className="py-3 px-6 font-normal">Nome</th>
              <th className="py-3 px-6 font-normal">Data de cadastro</th>
              <th className="py-3 px-6 font-normal">Idade</th>
              <th className="py-3 px-6 font-normal">Nascimento</th>
              <th className="py-3 px-6 font-normal">Diagnóstico</th>
            </tr>
          </thead>
          <tbody className="text-gray-12 font-roboto">
            {patients.map((patient) => {
              const imageUrl = patient.selfiePhoto
                ? `http://localhost:3001/${patient.selfiePhoto.replace(
                    /\\/g,
                    '/'
                  )}`
                : null;
              return (
                <tr key={patient.id} className="">
                  <td className="py-3 px-6 font-medium flex items-center gap-2">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={patient.name}
                        className="w-10 h-10 object-cover border border-indigo-09 rounded-sm"
                      />
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-03 border border-indigo-09 rounded-sm text-indigo-11">
                        <User size={32} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <span className="text-gray-12 text-sm">
                        {patient.name}
                      </span>
                      <span className="text-gray-11 text-xs">
                        #{patient.id.slice(0, 8)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    {format(parseISO(patient.createdAt), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </td>
                  <td className="py-3 px-6">
                    {calculateAge(patient.birthDate)} anos
                  </td>
                  <td className="py-3 px-6">
                    {format(parseISO(patient.birthDate), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </td>
                  <td className="py-3 px-6">—</td>
                  {''}
                  {/* MUDAR PARA O DIAGNOSTICO */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
        <button
          className="cursor-pointer text-sm font-roboto font-normal text-gray-11 hover:text-gray-10 hover:underline"
          onClick={() => navigate('/patient/list')}
        >
          Ver todos
        </button>
      </div>
    </div>
  );
};

export default PatientSimplifiedList;
