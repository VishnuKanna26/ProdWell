import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const RadialGauge = ({ value, max = 100, label }) => {
  const data = [{ value, fill: '#8884d8' }];
  
  return (
    <div className="text-center">
      <ResponsiveContainer width="100%" height={200}>
        <RadialBarChart 
          innerRadius="80%" 
          outerRadius="100%" 
          data={data}
          startAngle={180} 
          endAngle={-180}
        >
          <RadialBar minAngle={15} background clockWise dataKey="value" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-2xl font-bold"
          >
            {value}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
      <h3 className="text-lg font-semibold">{label}</h3>
    </div>
  );
};

export default RadialGauge;