import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { AlertProvider, useAlerts } from './context/AlertContext';

export type RiskLevel = 'low' | 'moderate' | 'high';

export interface RiskData {
  id: string;
  location: { lat: number; lng: number };
  riskLevel: RiskLevel;
  probability: number;
  timestamp: Date;
  factors: {
    rainfall: number;
    temperature: number;
    slopeAngle: number;
    soilMoisture: number;
  };
}

export interface Alert {
  id: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
  timestamp: Date;
  location: string;
  riskLevel: RiskLevel;
}

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { alerts } = useAlerts();

  return (
    <div className="app">
      <Header alertCount={alerts.length} />
      <div className="dashboard-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <MainContent 
          activeTab={activeTab} 
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <AlertProvider>
      <AppContent />
    </AlertProvider>
  );
}

export default App;