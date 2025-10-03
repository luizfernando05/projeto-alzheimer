import React, { useState, useEffect } from 'react';
import PatientLayout from './PatientLayout';
import { Robot, Calendar, TrendUp, Heart, Brain } from '@phosphor-icons/react';
import MMSEChart from '../../Components/Charts/MMSEChart';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const mmseData = [
    { date: '2024-06-15', mmse: 30, label: 'Jun' },
    { date: '2024-07-20', mmse: 29, label: 'Jul' },
    { date: '2024-08-25', mmse: 28, label: 'Ago' },
    { date: '2024-09-15', mmse: 26, label: 'Set' },
    { date: '2024-10-01', mmse: 28, label: 'Out' },
  ];

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`${apiUrl}/patient/get/data`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setPatientData(data);
        } else {
          setError('Erro ao carregar dados do paciente');
        }
      } catch (err) {
        setError('Erro de conexão com o servidor');
        console.error('Erro ao buscar dados do paciente:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [apiUrl]);

  if (loading) {
    return (
      <PatientLayout>
        <div className="p-6 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </PatientLayout>
    );
  }

  if (error) {
    return (
      <PatientLayout>
        <div className="p-6">
          <div className="bg-red-02 border border-red-06 text-red-11 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-poppins text-2xl font-semibold text-gray-12 mb-1">
              Olá, {patientData?.name || 'Paciente'} 👋
            </h1>
            <p className="font-roboto text-gray-11">
              Aqui está um resumo do seu estado de saúde
            </p>
          </div>
          <div className="flex items-center gap-2 font-roboto text-sm text-gray-11">
            <Calendar size={16} />
            <span>Última atualização: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-01 rounded-xl border border-gray-06 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-02 rounded-lg">
                <Brain size={24} className="text-red-09" />
              </div>
              <span className="font-poppins text-2xl font-bold text-red-09">
                90%
              </span>
            </div>
            <h3 className="font-poppins font-semibold text-gray-12 mb-1">
              Score de Confiança
            </h3>
            <p className="font-roboto text-sm text-gray-10">
              Resultado: Positivo
            </p>
          </div>

          <div className="bg-gray-01 rounded-xl border border-gray-06 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-02 rounded-lg">
                <Heart size={24} className="text-green-09" />
              </div>
              <span className="font-roboto text-sm font-medium text-green-09">
                Ativo
              </span>
            </div>
            <h3 className="font-poppins font-semibold text-gray-12 mb-1">
              Acompanhamento
            </h3>
            <p className="font-roboto text-sm text-gray-10">Cuidados diários</p>
          </div>
        </div>

        <MMSEChart data={mmseData} />

        <div className="bg-gray-01 rounded-xl border border-gray-06 shadow-xs">
          <div className="p-6 border-b border-gray-06">
            <div className="flex items-center justify-between">
              <h2 className="font-poppins text-lg font-semibold text-gray-12">
                Resultado da Avaliação
              </h2>
              <div className="flex items-center gap-2">
                <TrendUp size={16} className="text-gray-09" />
                <span className="font-roboto text-sm text-gray-09">
                  Análise completa
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6 p-4 bg-red-02 rounded-lg border border-red-06">
              <div>
                <p className="font-roboto text-sm font-medium text-red-11">
                  Resultado da predição
                </p>
                <p className="font-poppins text-lg font-semibold text-red-10">
                  Positivo para Alzheimer
                </p>
              </div>
              <div className="text-right">
                <p className="font-roboto text-sm font-medium text-red-11">
                  Score de confiança
                </p>
                <p className="font-poppins text-2xl font-bold text-red-10">
                  90%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-02 rounded-lg">
                  <Robot size={20} className="text-indigo-09" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-gray-12">
                    Recomendações Personalizadas
                  </h3>
                  <p className="font-roboto text-sm text-gray-10">
                    Gerado por Inteligência Artificial
                  </p>
                </div>
              </div>

              <div className="bg-gray-02 rounded-lg p-6 border border-gray-06">
                <div className="prose prose-sm max-w-none text-gray-11 leading-relaxed">
                  <p className="font-roboto mb-4">
                    Com base nas informações analisadas, nosso sistema
                    identificou um padrão compatível com um possível quadro de
                    Alzheimer. Diante disso, é fundamental adotar algumas
                    medidas que podem contribuir para a manutenção da qualidade
                    de vida, preservação das funções cognitivas e bem-estar
                    geral.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                      <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                        🥗 Alimentação
                      </h4>
                      <p className="font-roboto text-sm text-gray-10">
                        Dieta rica em frutas, vegetais, grãos integrais, peixes
                        e azeite de oliva para benefícios à saúde cerebral.
                      </p>
                    </div>

                    <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                      <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                        🏃‍♀️ Atividade Física
                      </h4>
                      <p className="font-roboto text-sm text-gray-10">
                        Exercícios moderados como caminhadas, hidroginástica e
                        yoga para melhorar a circulação sanguínea.
                      </p>
                    </div>

                    <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                      <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                        🧠 Estimulação Cognitiva
                      </h4>
                      <p className="font-roboto text-sm text-gray-10">
                        Atividades que desafiem a mente como leitura, jogos e
                        aprendizado de novas habilidades.
                      </p>
                    </div>

                    <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                      <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                        👥 Suporte Social
                      </h4>
                      <p className="font-roboto text-sm text-gray-10">
                        Mantenha conexões sociais ativas e busque apoio de
                        familiares e profissionais de saúde.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
