import { useEffect, useState } from 'react';
import axios from 'axios';
import { Brain, CaretDown, Check } from '@phosphor-icons/react';
import * as Select from '@radix-ui/react-select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

let lastMonth = null;

const renderMonthTick = (props) => {
  const { x, y, payload } = props;
  const date = new Date(payload.value);
  const monthLabel = date.toLocaleString('default', { month: 'short' });

  if (monthLabel !== lastMonth) {
    lastMonth = monthLabel;
    return (
      <text x={x} y={y + 15} textAnchor="middle" fontWeight="bold">
        {monthLabel}
      </text>
    );
  }

  return null;
};

const PERIOD_OPTIONS = [
  { label: '1 mês', value: 1 },
  { label: '3 meses', value: 3 },
  { label: '6 meses', value: 6 },
  { label: '1 ano', value: 12 },
];

const DiagnosesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const [fullData, setFullData] = useState([]);

  const generateDateRange = (months) => {
    const dates = [];
    const end = new Date();
    const start = new Date();
    start.setMonth(end.getMonth() - months);

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      dates.push({
        date: d.toISOString().split('T')[0],
        diagnoses: 0,
      });
    }
    return dates;
  };

  const filterDataByPeriod = (data, months) => {
    const dateRange = generateDateRange(months);
    const dataMap = new Map(data.map((item) => [item.date, item.diagnoses]));

    const filteredData = dateRange.map((item) => ({
      date: item.date,
      diagnoses: dataMap.get(item.date) || 0,
    }));

    setData(filteredData);
  };

  useEffect(() => {
    lastMonth = null;
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3001/patient/positive-by-day',
          {
            withCredentials: true,
          }
        );
        setFullData(res.data);
        filterDataByPeriod(res.data, selectedPeriod);
      } catch (error) {
        console.error('Erro ao buscar diagnósticos positivos:', error);
        filterDataByPeriod([], selectedPeriod);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePeriodChange = (value) => {
    const months = parseInt(value);
    setSelectedPeriod(months);
    filterDataByPeriod(fullData, months);
  };

  if (loading) {
    return <p>Carregando gráfico...</p>;
  }

  return (
    <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
      <div className="flex justify-between items-center pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
        <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3">
          <div className="border border-gray-06 p-1 rounded-sm">
            <Brain size={16} />
          </div>
          Diagnósticos por Período
        </h2>

        <Select.Root
          value={String(selectedPeriod)}
          onValueChange={handlePeriodChange}
        >
          <Select.Trigger
            className="inline-flex items-center justify-between rounded-md px-3 py-2 text-sm gap-2 border border-gray-06 bg-gray-02 text-gray-12 hover:bg-gray-03 focus:outline-none focus:ring-2 focus:ring-blue-09 focus:border-transparent data-[placeholder]:text-gray-09"
            aria-label="Período"
          >
            <Select.Value />
            <Select.Icon>
              <CaretDown size={14} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="overflow-hidden bg-gray-02 rounded-md shadow-md border border-gray-06"
              position="popper"
              sideOffset={5}
            >
              <Select.Viewport>
                {PERIOD_OPTIONS.map((option) => (
                  <Select.Item
                    key={option.value}
                    value={String(option.value)}
                    className="text-sm text-gray-12 relative flex items-center py-2 px-8 hover:bg-gray-04 focus:bg-gray-04 focus:outline-none select-none data-[highlighted]:bg-gray-04 data-[highlighted]:outline-none"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                      <Check size={14} />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="pt-4 pb-5 pr-6 pl-6">
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-gray-11">Carregando gráfico...</p>
          </div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={renderMonthTick} interval={0} />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="diagnoses"
                  fill="#3E63DD"
                  barSize={6}
                  radius={[6, 6, 0, 0]}
                  fillOpacity={0.6}
                  stroke="#5472E4"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="text-xs text-gray-10 mt-4">
              Atualizado em {new Date().toLocaleDateString('pt-BR')}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DiagnosesChart;
