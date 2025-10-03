import React, { useState, useEffect } from 'react';
import PatientLayout from './PatientLayout';
import { Robot, Calendar, TrendUp, Heart, Brain } from '@phosphor-icons/react';
import MMSEChart from '../../Components/Charts/MMSEChart';

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState(null);
  const [mmseData, setMmseData] = useState([]);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMMSEData, setHasMMSEData] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await fetch(`${apiUrl}/patient/get/data`, {
          method: 'GET',
          credentials: 'include',
        });

        const mmseResponse = await fetch(`${apiUrl}/data/mmse/data`, {
          method: 'GET',
          credentials: 'include',
        });

        const recommendationsResponse = await fetch(
          `${apiUrl}/patient/recommendations`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (patientResponse.ok) {
          const patientData = await patientResponse.json();
          setPatientData(patientData);
        } else {
          setError('Erro ao carregar dados do paciente');
        }

        if (mmseResponse.ok) {
          const mmseData = await mmseResponse.json();
          if (mmseData && mmseData.length > 0) {
            setMmseData(mmseData);
            setHasMMSEData(true);
          } else {
            setHasMMSEData(false);
          }
        } else {
          setHasMMSEData(false);
        }

        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          setRecommendations(recommendationsData);
        }
      } catch (err) {
        setError('Erro de conexão com o servidor');
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const predictionResult = patientData?.prediction?.result;
  const confidenceScore = patientData?.prediction?.confidence;

  const isPositive =
    predictionResult === 'positive' || predictionResult === 'POSITIVE';
  const isNegative =
    predictionResult === 'negative' || predictionResult === 'NEGATIVE';

  const cardColors = isPositive
    ? {
        bg: 'bg-red-02',
        border: 'border-red-06',
        text: 'text-red-09',
        icon: 'text-red-09',
      }
    : isNegative
    ? {
        bg: 'bg-green-02',
        border: 'border-green-06',
        text: 'text-green-09',
        icon: 'text-green-09',
      }
    : {
        bg: 'bg-red-02',
        border: 'border-red-06',
        text: 'text-red-09',
        icon: 'text-red-09',
      };

  const sectionColors = isPositive
    ? {
        bg: 'bg-red-02',
        border: 'border-red-06',
        text: 'text-red-11',
        title: 'text-red-10',
      }
    : isNegative
    ? {
        bg: 'bg-green-02',
        border: 'border-green-06',
        text: 'text-green-11',
        title: 'text-green-10',
      }
    : {
        bg: 'bg-red-02',
        border: 'border-red-06',
        text: 'text-red-11',
        title: 'text-red-10',
      };

  const resultText = isPositive
    ? 'Positivo para Alzheimer'
    : isNegative
    ? 'Negativo para Alzheimer'
    : 'Resultado não disponível';

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
              <div className={`p-3 ${cardColors.bg} rounded-lg`}>
                <Brain size={24} className={cardColors.icon} />
              </div>
              <span
                className={`font-poppins text-2xl font-bold ${cardColors.text}`}
              >
                {confidenceScore
                  ? `${Math.round(confidenceScore * 100)}%`
                  : '90%'}
              </span>
            </div>
            <h3 className="font-poppins font-semibold text-gray-12 mb-1">
              Score de Confiança
            </h3>
            <p className="font-roboto text-sm text-gray-10">
              Resultado: {resultText}
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

        {hasMMSEData ? (
          <MMSEChart data={mmseData} />
        ) : (
          <div className="bg-gray-01 rounded-xl border border-gray-06 p-6 shadow-xs">
            <div className="text-center py-8">
              <div className="p-4 bg-gray-02 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Brain size={32} className="text-gray-08" />
              </div>
              <h3 className="font-poppins text-lg font-semibold text-gray-12 mb-2">
                Dados do MMSE
              </h3>
              <p className="font-roboto text-gray-10 mb-4">
                Sem dados médicos cadastrados
              </p>
              <p className="font-roboto text-sm text-gray-09">
                Os dados do Mini Exame do Estado Mental aparecerão aqui após
                serem registrados pelo seu médico.
              </p>
            </div>
          </div>
        )}

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
            <div
              className={`flex items-center justify-between mb-6 p-4 ${sectionColors.bg} rounded-lg ${sectionColors.border}`}
            >
              <div>
                <p
                  className={`font-roboto text-sm font-medium ${sectionColors.text}`}
                >
                  Resultado da predição
                </p>
                <p
                  className={`font-poppins text-lg font-semibold ${sectionColors.title}`}
                >
                  {resultText}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-roboto text-sm font-medium ${sectionColors.text}`}
                >
                  Score de confiança
                </p>
                <p
                  className={`font-poppins text-2xl font-bold ${sectionColors.title}`}
                >
                  {confidenceScore
                    ? `${Math.round(confidenceScore * 100)}%`
                    : '90%'}
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
                    {recommendations?.personalizedMessage ||
                      (isPositive
                        ? 'Com base nas informações analisadas, nosso sistema identificou um padrão compatível com um possível quadro de Alzheimer. Diante disso, é fundamental adotar algumas medidas que podem contribuir para a manutenção da qualidade de vida, preservação das funções cognitivas e bem-estar geral.'
                        : isNegative
                        ? 'Com base nas informações analisadas, nosso sistema não identificou padrões compatíveis com Alzheimer. Continue mantendo hábitos saudáveis para preservar sua saúde cognitiva e bem-estar geral.'
                        : 'Aguardando resultado da análise. Mantenha hábitos saudáveis para preservar sua saúde cognitiva.')}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {recommendations?.recommendations?.map((rec, index) => (
                      <div
                        key={index}
                        className="bg-gray-01 p-4 rounded-lg border border-gray-06"
                      >
                        <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                          {rec.icon} {rec.title}
                        </h4>
                        <p className="font-roboto text-sm text-gray-10">
                          {rec.description}
                        </p>
                      </div>
                    )) || (
                      // Fallback para quando não há recomendações da IA
                      <>
                        <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                          <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                            🥗 Alimentação
                          </h4>
                          <p className="font-roboto text-sm text-gray-10">
                            Dieta rica em frutas, vegetais, grãos integrais,
                            peixes e azeite de oliva para benefícios à saúde
                            cerebral.
                          </p>
                        </div>

                        <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                          <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                            🏃‍♀️ Atividade Física
                          </h4>
                          <p className="font-roboto text-sm text-gray-10">
                            Exercícios moderados como caminhadas, hidroginástica
                            e yoga para melhorar a circulação sanguínea.
                          </p>
                        </div>

                        <div className="bg-gray-01 p-4 rounded-lg border border-gray-06">
                          <h4 className="font-poppins font-semibold text-gray-12 mb-2">
                            🧠 Estimulação Cognitiva
                          </h4>
                          <p className="font-roboto text-sm text-gray-10">
                            Atividades que desafiem a mente como leitura, jogos
                            e aprendizado de novas habilidades.
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
                      </>
                    )}
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
