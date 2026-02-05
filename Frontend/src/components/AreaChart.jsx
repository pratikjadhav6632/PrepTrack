import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <AreaChart margin={{ top: 50 }} data={data}>
         <defs>
            <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
             itemStyle={{ color: '#1e293b', fontWeight: 600 }}
        />
        <Area 
            type='monotone' 
            dataKey='count' 
            stroke='#4f46e5' 
            fillOpacity={1} 
            fill='url(#colorCount)' 
            strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
