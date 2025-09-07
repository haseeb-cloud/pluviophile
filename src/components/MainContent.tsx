import React from 'react';
import Dashboard from './Dashboard';
import UploadSection from './UploadSection';
import RiskMap from './RiskMap';
import AlertsSection from './AlertsSection';
import Analytics from './Analytics';
import Settings from './Settings';

interface MainContentProps {
  activeTab: string;
  uploadedFiles: File[];
  setUploadedFiles: (files: File[]) => void;
}

const MainContent: React.FC<MainContentProps> = ({ activeTab, uploadedFiles, setUploadedFiles }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadSection uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />;
      case 'risk-map':
        return <RiskMap />;
      case 'alerts':
        return <AlertsSection />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <main className="main-content">
      {renderContent()}
    </main>
  );
};

export default MainContent;
