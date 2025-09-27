import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArrowUpRight,
  ArrowDownRight,
  GenderIntersex,
  GenderMale,
  GenderFemale,
} from '@phosphor-icons/react';

const GenderStatsCard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/patient/gender-stats',
          { withCredentials: true }
        );
        setStats(response.data);
      } catch (error) {
        console.error('Erro ao buscar estatísticas de gênero:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
        <div className="flex gap-6 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
          <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3">
            <div className="border border-gray-06 p-1 rounded-sm">
              <GenderIntersex size={16} />
            </div>
            Positivos por gênero
          </h2>
        </div>
        <div className="pt-4 pb-5 pr-6 pl-6">
          <p className="text-sm text-gray-11">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
        <div className="flex gap-6 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
          <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3">
            <div className="border border-gray-06 p-1 rounded-sm">
              <GenderIntersex size={16} />
            </div>
            Positivos por gênero
          </h2>
        </div>
        <div className="pt-4 pb-5 pr-6 pl-6">
          <p className="text-sm text-red-09">Erro ao carregar dados.</p>
        </div>
      </div>
    );
  }

  const renderGrowth = (growth) => {
    const positive = growth > 0;
    const neutral = growth === 0;
    const Icon = positive ? ArrowUpRight : ArrowDownRight;

    return (
      <span
        className={`font-roboto text-xs font-medium border border-gray-06 p-1 rounded-sm ${
          positive ? 'text-green-09' : neutral ? 'text-gray-11' : 'text-red-09'
        } flex items-center gap-1`}
      >
        {!neutral && <Icon size={12} />}
        {neutral ? '0%' : `${positive ? '+' : ''}${growth}%`}
      </span>
    );
  };

  const bothPositive = stats.female?.growth > 0 && stats.male?.growth > 0;
  const bothNegative = stats.female?.growth < 0 && stats.male?.growth < 0;
  const bothNeutral = stats.female?.growth === 0 && stats.male?.growth === 0;

  let footerText = 'O número de positivos ';
  if (bothPositive) {
    footerText += 'aumentou nos últimos 7 dias para homens e mulheres.';
  } else if (bothNegative) {
    footerText += 'diminuiu nos últimos 7 dias para homens e mulheres.';
  } else if (bothNeutral) {
    footerText += 'se manteve estável nos últimos 7 dias.';
  } else {
    footerText += 'teve variações diferentes entre homens e mulheres.';
  }

  return (
    <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
      <div className="flex gap-6 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
        <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3">
          <div className="border border-gray-06 p-1 rounded-sm">
            <GenderIntersex size={16} />
          </div>
          Positivos por gênero
        </h2>
      </div>

      <div className="pt-4 pb-5 pr-6 pl-6">
        <div className="flex flex-col gap-4">
          {/* Feminino */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <h3 className="text-xl font-roboto font-normal text-gray-12">
                {stats.female?.count?.toLocaleString('pt-BR') ?? 0}
              </h3>
              {renderGrowth(stats.female?.growth ?? 0)}
            </div>
            <span className="font-roboto text-sm text-gray-11 flex gap-1 items-center">
              <GenderFemale /> Feminino
            </span>
          </div>

          {/* Masculino */}
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <h3 className="text-xl font-roboto font-normal text-gray-12">
                {stats.male?.count?.toLocaleString('pt-BR') ?? 0}
              </h3>
              {renderGrowth(stats.male?.growth ?? 0)}
            </div>
            <span className="font-roboto text-sm text-gray-11 flex gap-1 items-center">
              <GenderMale /> Masculino
            </span>
          </div>
        </div>

        <p className="font-roboto text-xs text-gray-11 mt-3">{footerText}</p>
        <p className="text-xs text-gray-10 mt-2">
          Atualizado em {new Date().toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
};

export default GenderStatsCard;
