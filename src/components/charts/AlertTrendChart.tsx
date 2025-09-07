import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AlertTrendChart: React.FC = () => {
  const data = [
    { hour: '00:00', alerts: 2 },
    { hour: '04:00', alerts: 1 },
    { hour: '08:00', alerts: 5 },
    { hour: '12:00', alerts: 8 },
    { hour: '16:00', alerts: 12 },
    { hour: '20:00', alerts: 6 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="alerts" 
          stroke="#ff4757" 
          fill="#ff4757"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AlertTrendChart;
