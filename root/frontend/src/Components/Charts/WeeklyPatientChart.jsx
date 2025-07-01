import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const WeeklyPatientChart = ({ data, color }) => {
  return (
    <div className="w-full h-28">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <Line
            type="monotone"
            dataKey="count"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
          <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.8} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              fontSize: '12px',
              backgroundColor: 'white',
              borderColor: '#d1d5db',
            }}
            labelStyle={{ color: '#4b5563' }}
            formatter={(value) => [`${value} pacientes`, 'Total']}
            labelFormatter={(label) => `Data: ${label}`}
          />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#d1d5db" />
          <YAxis hide />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyPatientChart;
