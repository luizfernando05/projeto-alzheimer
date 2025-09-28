import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

//aqui deve ser um array com o dia e a quantidade de positivos daquele dia
const data = [
  { date: '2023-03-01', diagnoses: 10000 }, //assim olha
];

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
  lastMonth = null;

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
