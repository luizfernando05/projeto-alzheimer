import React from 'react';
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react';

const MMSEChart = ({ data = [] }) => {
  const chartData =
    data.length > 0
      ? data
      : [
          { date: '2024-06-15', mmse: 30, label: 'Jun' },
          { date: '2024-07-20', mmse: 29, label: 'Jul' },
          { date: '2024-08-25', mmse: 28, label: 'Ago' },
          { date: '2024-09-15', mmse: 26, label: 'Set' },
          { date: '2024-10-01', mmse: 28, label: 'Out' },
        ];

  const maxValue = 30;
  const minValue = Math.min(...chartData.map((d) => d.mmse));
  const latestScore = chartData[chartData.length - 1]?.mmse || 0;
  const previousScore = chartData[chartData.length - 2]?.mmse || latestScore;
  const trend = latestScore - previousScore;

  const getBarHeight = (value) => {
    return (value / maxValue) * 100;
  };

  const getScoreColor = (score) => {
    if (score >= 27) return 'bg-green-09';
    if (score >= 24) return 'bg-yellow-09';
    if (score >= 21) return 'bg-orange-09';
    return 'bg-red-09';
  };

  const getScoreTextColor = (score) => {
    if (score >= 27) return 'text-green-09';
    if (score >= 24) return 'text-yellow-09';
    if (score >= 21) return 'text-orange-09';
    return 'text-red-09';
  };

  const getTrendIcon = () => {
    if (trend > 0) return <TrendUp size={16} className="text-green-09" />;
    if (trend < 0) return <TrendDown size={16} className="text-red-09" />;
    return <Minus size={16} className="text-gray-09" />;
  };

  const getTrendText = () => {
    if (trend > 0) return `+${trend} pontos`;
    if (trend < 0) return `${trend} pontos`;
    return 'Sem alteração';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-green-09';
    if (trend < 0) return 'text-red-09';
    return 'text-gray-09';
  };

  return (
    <div className="bg-gray-01 rounded-xl border border-gray-06 p-6 shadow-xs">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-poppins text-lg font-semibold text-gray-12">
            Evolução Cognitiva (MMSE)
          </h3>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span
              className={`font-roboto text-sm font-medium ${getTrendColor()}`}
            >
              {getTrendText()}
            </span>
          </div>
        </div>
        <p className="font-roboto text-sm text-gray-10">
          Mini-Exame do Estado Mental ao longo do tempo
        </p>
      </div>

      <div className="mb-6 p-4 bg-gray-02 rounded-lg border border-gray-06">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-roboto text-sm text-gray-11 mb-1">Score Atual</p>
            <p
              className={`font-poppins text-3xl font-bold ${getScoreTextColor(
                latestScore
              )}`}
            >
              {latestScore}/30
            </p>
          </div>
          <div className="text-right">
            <p className="font-roboto text-sm text-gray-11 mb-1">
              Classificação
            </p>
            <p
              className={`font-roboto text-sm font-semibold ${getScoreTextColor(
                latestScore
              )}`}
            >
              {latestScore >= 27
                ? 'Normal'
                : latestScore >= 24
                ? 'Leve'
                : latestScore >= 21
                ? 'Moderado'
                : 'Severo'}
            </p>
          </div>
        </div>
      </div>

      <div className="relative pl-8">
        <div className="flex items-end justify-between h-48 mb-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="relative w-full max-w-12 h-40 bg-gray-03 rounded-t-md overflow-hidden">
                <div
                  className={`absolute bottom-0 w-full rounded-t-md transition-all duration-500 ${getScoreColor(
                    item.mmse
                  )}`}
                  style={{ height: `${getBarHeight(item.mmse)}%` }}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <span
                    className={`font-roboto text-xs font-semibold ${getScoreTextColor(
                      item.mmse
                    )}`}
                  >
                    {item.mmse}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <span className="font-roboto text-xs text-gray-11">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 w-full h-40 pointer-events-none">
          {[30, 27, 24, 21, 18, 15, 12, 9, 6, 3].map((value) => (
            <div
              key={value}
              className="absolute w-full"
              style={{ bottom: `${getBarHeight(value)}%` }}
            >
              <div className="ml-8 border-t border-gray-05 w-full"></div>
              <span className="absolute left-0 -top-2 font-roboto text-xs text-gray-09 bg-gray-01 pr-2">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-06">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-09 rounded"></div>
            <span className="font-roboto text-gray-11">Normal (27-30)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-09 rounded"></div>
            <span className="font-roboto text-gray-11">Leve (24-26)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-09 rounded"></div>
            <span className="font-roboto text-gray-11">Moderado (21-23)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-09 rounded"></div>
            <span className="font-roboto text-gray-11">Severo (&lt;21)</span>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-02 rounded-lg border border-gray-06">
        <p className="font-roboto text-xs text-blue-11">
          <strong>Nota:</strong> O MMSE avalia funções cognitivas básicas.
          Scores mais baixos podem indicar declínio cognitivo.
        </p>
      </div>
    </div>
  );
};

export default MMSEChart;
