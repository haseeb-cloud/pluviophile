import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EnvironmentalChart: React.FC = () => {
  const data = [
    { time: '00:00', rainfall: 0.2, temperature: 18, soilMoisture: 45 },
    { time: '04:00', rainfall: 0.5, temperature: 16, soilMoisture: 52 },
    { time: '08:00', rainfall: 1.2, temperature: 20, soilMoisture: 68 },
    { time: '12:00', rainfall: 0.8, temperature: 25, soilMoisture: 72 },
    { time: '16:00', rainfall: 0.3, temperature: 28, soilMoisture: 58 },
    { time: '20:00', rainfall: 0.1, temperature: 22, soilMoisture: 48 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="rainfall" 
          stroke="#2196f3" 
          strokeWidth={2}
          name="Rainfall (mm)"
        />
        <Line 
          type="monotone" 
          dataKey="temperature" 
          stroke="#ff4757" 
          strokeWidth={2}
          name="Temperature (°C)"
        />
        <Line 
          type="monotone" 
          dataKey="soilMoisture" 
          stroke="#2ed573" 
          strokeWidth={2}
          name="Soil Moisture (%)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default EnvironmentalChart;
