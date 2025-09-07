import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FactorAnalysisChart: React.FC = () => {
  const data = [
    { factor: 'Slope Angle', impact: 85, threshold: 45 },
    { factor: 'Rainfall', impact: 72, threshold: 60 },
    { factor: 'Soil Moisture', impact: 68, threshold: 70 },
    { factor: 'Temperature', impact: 45, threshold: 30 },
    { factor: 'Wind Speed', impact: 38, threshold: 25 },
    { factor: 'Vegetation', impact: 25, threshold: 15 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="factor" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar 
          dataKey="impact" 
          fill="#ff4757" 
          name="Current Impact (%)"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="threshold" 
          fill="#2196f3" 
          name="Risk Threshold (%)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default FactorAnalysisChart;
