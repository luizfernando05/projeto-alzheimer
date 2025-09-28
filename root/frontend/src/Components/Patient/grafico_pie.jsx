import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#E5484D', '#3E63DD', '#30A46C'];

const data = [
  { name: 'Positivo', value: 400 },
  { name: 'Negativo', value: 300 },
  { name: 'Em análise', value: 300 },
];

export default function Example() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={70}
          outerRadius={90}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
