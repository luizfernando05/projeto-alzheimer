import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

// variável para controlar o mês nos ticks
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

const DiagnosesChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lastMonth = null; // reset para ticks
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3001/patient/positive-by-day',
          {
            withCredentials: true, // envia cookies/token
          }
        );
        setData(res.data); // res.data deve ter [{ date, diagnoses }]
      } catch (error) {
        console.error('Erro ao buscar diagnósticos positivos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Carregando gráfico...</p>;
  }

  return (
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
          stroke="#3E63DD"
          strokeWidth={1}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DiagnosesChart;
