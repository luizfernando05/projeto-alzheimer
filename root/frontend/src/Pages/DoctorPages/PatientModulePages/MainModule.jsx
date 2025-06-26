import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import DoctorLayout from '../DoctorLayout';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  HeadCircuit,
  ListNumbers,
  Microscope,
  Pencil,
  Plus,
  Sparkle,
  TrendDown,
  TrendUp,
  Users,
  UsersFour,
} from '@phosphor-icons/react';

const MainModule = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [growth, setGrowth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    const fetchPatientCount = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/patient/summary',
          {
            withCredentials: true,
          }
        );

        setTotalPatients(response.data.total);
        setGrowth(response.data.growth);
      } catch (error) {
        console.error('Erro ao buscar total de pacientes:', error);
      } finally {
        setLoading(false);
      }

      const fetchWeeklyData = async () => {
        try {
          const response = await axios.get(
            'http://localhost:3001/patient/last-7-days',
            {
              withCredentials: true,
            }
          );
          setWeeklyData(response.data);
        } catch (error) {
          console.error('Erro ao buscar dados semanais:', error);
        }
      };

      fetchWeeklyData();
    };

    fetchPatientCount();
  }, []);

  return (
    <DoctorLayout>
      <section className="w-full">
        <div className="bg-gray-01 rounded-xl shadow-sm border border-gray-06">
          <div className="flex gap-6 pt-6 pb-6 pr-8 pl-8 border-b border-gray-06">
            <div className="bg-gray-02 pr-2 pl-2 pt-1 pb-1 border border-gray-06 rounded-sm text-gray-11">
              <UsersFour size={16} />
            </div>
            <h2 className="text-xl font-poppins font-normal text-gray-12">
              Pacientes
            </h2>
          </div>

          <div className="pt-6 pr-8 pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
                <div className="flex gap-6 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
                  <h2 className="text-base font-poppins font-normal text-gray-12">
                    Opções
                  </h2>
                </div>
                <div className="pt-4 pb-5 pr-6 pl-6 flex flex-wrap gap-3">
                  <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03">
                    <Plus size={12} />
                    <span className="text-gray-12">Adicionar paciente</span>
                  </button>
                  <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03">
                    <Pencil size={12} />
                    <span className="text-gray-12">Editar paciente</span>
                  </button>
                  <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03">
                    <ListNumbers size={12} />
                    <span className="text-gray-12">Listar pacientes</span>
                  </button>
                  <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03">
                    <Microscope size={12} />
                    <span className="text-gray-12">
                      Inserir resultados de exames
                    </span>
                  </button>
                  <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03">
                    <Sparkle size={12} />
                    <span className="text-gray-12">Predição</span>
                  </button>
                  <button className="cursor-pointer bg-gray-01 flex gap-2.5 items-center font-roboto text-sm text-gray-11 font-normal rounded-sm border border-gray-06 pt-1 pb-1 pl-2 pr-2 hover:bg-gray-03">
                    <HeadCircuit size={12} />
                    <span className="text-gray-12">
                      Roteiro do Mini-Exame do Estado Mental
                    </span>
                  </button>
                </div>
              </div>

              <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
                <div className="flex gap-6 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
                  <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3">
                    <div className="border border-gray-06 p-1 rounded-sm">
                      <Users size={16} />
                    </div>
                    Total de Pacientes
                  </h2>
                </div>
                <div className="pt-4 pb-5 pr-6 pl-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex gap-4">
                      <h2 className="text-xl font-roboto font-normal text-gray-12">
                        {loading
                          ? '...'
                          : totalPatients.toLocaleString('pt-br')}
                      </h2>
                      {!loading && growth && (
                        <span
                          className={`font-roboto text-xs font-medium border border-gray-06 p-1 rounded-sm ${
                            growth.percentage >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          } flex items-center gap-3`}
                        >
                          {growth.percentage >= 0 ? (
                            <TrendUp size={12} />
                          ) : (
                            <TrendDown size={12} />
                          )}
                          {Math.abs(growth.percentage).toFixed(2)}%
                        </span>
                      )}
                    </div>
                    {!loading && growth && (
                      <p className="font-roboto text-xs text-gray-11 mt-3">
                        O número de entrada de pacientes{' '}
                        {growth.percentage >= 0 ? 'aumentou' : 'diminuiu'} nos
                        últimos 7 dias.
                      </p>
                    )}

                    <p className="text-xs text-gray-10 mt-2">
                      Atualizado em {new Date().toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    {!loading && weeklyData.length > 0 && (
                      <div className="w-full h-28">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={weeklyData}
                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                          >
                            <Line
                              type="monotone"
                              dataKey="count"
                              stroke={
                                growth.percentage >= 0 ? '#30A46C' : '#E5484D'
                              }
                              strokeWidth={2}
                              dot={{ r: 2 }}
                              activeDot={{ r: 4 }}
                            />
                            <text
                              x="50%"
                              y="10"
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="text-xs"
                              fill="##646464"
                            >
                              Entradas nos últimos 7 dias
                            </text>

                            <defs>
                              <linearGradient
                                id="colorCount"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor="#16a34a"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#16a34a"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>

                            <Tooltip
                              contentStyle={{
                                fontSize: '12px',
                                backgroundColor: 'white',
                                borderColor: '#d1d5db',
                              }}
                              labelStyle={{ color: '#4b5563' }}
                              formatter={(value) => [
                                `${value} pacientes`,
                                'Total',
                              ]}
                              labelFormatter={(label) => `Data: ${label}`}
                            />

                            <XAxis
                              dataKey="date"
                              tick={{ fontSize: 10 }}
                              stroke="#d1d5db"
                            />
                            <YAxis hide />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DoctorLayout>
  );
};

export default MainModule;
