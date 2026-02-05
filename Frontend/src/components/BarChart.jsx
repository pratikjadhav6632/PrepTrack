import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart margin={{ top: 50 }} data={data}>
        <CartesianGrid strokeDasharray='3 3' stroke="#e2e8f0" vertical={false} />
        <XAxis 
            dataKey='date' 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
            dy={10}
        />
        <YAxis 
            allowDecimals={false} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} 
        />
        <Tooltip 
            cursor={{ fill: '#f1f5f9' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            itemStyle={{ color: '#1e293b', fontWeight: 600 }}
        />
        <Bar 
            dataKey='count' 
            fill='#3b82f6' 
            barSize={60} 
            radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
