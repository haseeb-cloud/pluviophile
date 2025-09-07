import React from 'react';
import { Bell, Settings } from 'lucide-react';

interface HeaderProps {
  alertCount?: number;
}

const Header: React.FC<HeaderProps> = ({ alertCount = 0 }) => {
  return (
    <header className="header">
      <h1>AI Rockfall Prediction & Alert System</h1>
      <div className="header-actions">
        <div className="alert-badge">
          {alertCount}
        </div>
        <Bell size={20} />
        <Settings size={20} />
      </div>
    </header>
  );
};

export default Header;
