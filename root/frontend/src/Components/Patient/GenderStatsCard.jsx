import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ArrowUpRight,
  ArrowDownRight,
  GenderIntersex,
  GenderFemale,
  GenderMale,
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
      <div className="p-4 rounded-2xl bg-gray-01">
        <p className="text-sm text-gray-06">Carregando...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 rounded-2xl bg-gray-01">
        <p className="text-sm text-red-500">Erro ao carregar dados.</p>
      </div>
    );
  }

  const renderGrowth = (growth) => {
    const positive = growth > 0;
    const neutral = growth === 0;
    const Icon = positive ? ArrowUpRight : ArrowDownRight;

    return (
      <span
        className={`flex items-center text-xs font-medium ${
          positive
            ? 'text-green-600'
            : neutral
            ? 'text-gray-500'
            : 'text-red-600'
        }`}
      >
        {!neutral && <Icon size={14} className="mr-1" />}
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
    <div className="pt-5 pb-5 pr-6 pl-6 rounded-lg bg-gray-01 border border-gray-06">
      <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3 mb-2">
        <div className="border border-gray-06 p-1 rounded-sm">
          <GenderIntersex size={16} />
        </div>
        Positivos por gênero
      </h2>

      <div className="flex flex-col gap-2 text-base font-roboto font-light">
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <GenderFemale /> Feminino:
            <span className="ml-1">
              {stats.female?.count?.toLocaleString() ?? 0}
            </span>
          </span>
          {renderGrowth(stats.female?.growth ?? 0)}
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <GenderMale /> Masculino:
            <span className="ml-1">
              {stats.male?.count?.toLocaleString() ?? 0}
            </span>
          </span>
          {renderGrowth(stats.male?.growth ?? 0)}
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-11">{footerText}</p>
    </div>
  );
};

export default GenderStatsCard;
