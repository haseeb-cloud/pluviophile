import React from 'react';
import { useAlerts } from '../context/AlertContext';
import { AlertTriangle, MapPin, TrendingUp, Activity } from 'lucide-react';
import RiskChart from './charts/RiskChart';
import EnvironmentalChart from './charts/EnvironmentalChart';

const Dashboard: React.FC = () => {
  const { alerts } = useAlerts();
  
  const highRiskAlerts = alerts.filter(alert => alert.riskLevel === 'high').length;
  const moderateRiskAlerts = alerts.filter(alert => alert.riskLevel === 'moderate').length;
  const totalAlerts = alerts.length;

  const stats = [
    {
      title: 'High Risk Zones',
      value: highRiskAlerts,
      icon: AlertTriangle,
      color: '#ff4757',
      bgColor: '#ffe0e0'
    },
    {
      title: 'Moderate Risk Zones',
      value: moderateRiskAlerts,
      icon: MapPin,
      color: '#ffa502',
      bgColor: '#fff4e0'
    },
    {
      title: 'Total Alerts',
      value: totalAlerts,
      icon: Activity,
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    {
      title: 'Risk Trend',
      value: '+12%',
      icon: TrendingUp,
      color: '#2ed573',
      bgColor: '#e8f5e8'
    }
  ];

  return (
    <div>
      <h1 className="section-title">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
              <div className="stat-icon" style={{ backgroundColor: stat.bgColor, color: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Risk Level Distribution</h3>
          <RiskChart />
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Environmental Factors</h3>
          <EnvironmentalChart />
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="chart-card" style={{ marginTop: '2rem' }}>
        <h3 className="chart-title">Recent Alerts</h3>
        <div className="recent-alerts">
          {alerts.slice(0, 5).map(alert => (
            <div key={alert.id} className={`alert-item ${alert.type}`}>
              <AlertTriangle className="alert-icon" />
              <div className="alert-content">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-timestamp">
                  {alert.timestamp.toLocaleString()} • {alert.location}
                </div>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="no-alerts">
              <Activity size={48} style={{ color: '#ddd', marginBottom: '1rem' }} />
              <p>No recent alerts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
