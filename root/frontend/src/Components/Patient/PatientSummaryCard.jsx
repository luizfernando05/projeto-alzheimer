import { TrendUp, TrendDown, Users } from '@phosphor-icons/react';
import WeeklyPatientChart from '../Charts/WeeklyPatientChart';

const PatientSummaryCard = ({ loading, totalPatients, growth, weeklyData }) => {
  const growthColor = growth?.percentage >= 0 ? '#30A46C' : '#E5484D';

  return (
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
              {loading ? '...' : totalPatients.toLocaleString('pt-BR')}
            </h2>
            {!loading && growth && (
              <span
                className={`font-roboto text-xs font-medium border border-gray-06 p-1 rounded-sm ${
                  growth.percentage >= 0 ? 'text-green-600' : 'text-red-600'
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
              {growth.percentage >= 0 ? 'aumentou' : 'diminuiu'} nos últimos 7
              dias.
            </p>
          )}
          <p className="text-xs text-gray-10 mt-2">
            Atualizado em {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
        {!loading && weeklyData.length > 0 && (
          <WeeklyPatientChart data={weeklyData} color={growthColor} />
        )}
      </div>
    </div>
  );
};

export default PatientSummaryCard;
