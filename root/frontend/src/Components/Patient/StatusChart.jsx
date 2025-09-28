import { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Sector, Cell } from 'recharts';
import { Brain } from '@phosphor-icons/react';
import axios from 'axios';

const COLORS = ['#3E63DD', '#E5484D'];

const renderActiveShape = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Total ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function StatusChart() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://localhost:3001/patient/predictions/summary',
          {
            withCredentials: true,
          }
        );

        const formattedData = res.data.map((item) => ({
          name: item.name === 'negative' ? 'Negativo' : 'Positivo',
          value: item.value,
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-02 rounded-lg border border-gray-06 overflow-hidden">
      <div className="flex gap-6 pt-5 pb-5 pr-6 pl-6 border-b border-gray-06">
        <h2 className="text-base font-poppins font-normal text-gray-12 flex items-center gap-3">
          <div className="border border-gray-06 p-1 rounded-sm">
            <Brain size={16} />
          </div>
          Distribuição de Diagnósticos
        </h2>
      </div>

      <div className="pt-4 pb-5 pr-6 pl-6">
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <p className="text-gray-11">Carregando...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2">
                  {chartData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm text-gray-11">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ width: '100%', height: 400 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <p className="text-xs text-gray-10 mt-4">
              Atualizado em {new Date().toLocaleDateString('pt-BR')}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
