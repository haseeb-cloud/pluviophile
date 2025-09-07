import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RiskTrendChart: React.FC = () => {
  const data = [
    { day: 'Mon', high: 12, moderate: 8, low: 15 },
    { day: 'Tue', high: 15, moderate: 10, low: 12 },
    { day: 'Wed', high: 18, moderate: 12, low: 8 },
    { day: 'Thu', high: 14, moderate: 15, low: 10 },
    { day: 'Fri', high: 20, moderate: 8, low: 5 },
    { day: 'Sat', high: 22, moderate: 6, low: 3 },
    { day: 'Sun', high: 16, moderate: 9, low: 8 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="high" 
          stroke="#ff4757" 
          strokeWidth={3}
          name="High Risk"
        />
        <Line 
          type="monotone" 
          dataKey="moderate" 
          stroke="#ffa502" 
          strokeWidth={2}
          name="Moderate Risk"
        />
        <Line 
          type="monotone" 
          dataKey="low" 
          stroke="#2ed573" 
          strokeWidth={2}
          name="Low Risk"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RiskTrendChart;
