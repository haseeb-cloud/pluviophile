import React from 'react';
import { TrendingUp, BarChart3, PieChart, Activity } from 'lucide-react';
import RiskTrendChart from './charts/RiskTrendChart';
import FactorAnalysisChart from './charts/FactorAnalysisChart';
import AlertTrendChart from './charts/AlertTrendChart';

const Analytics: React.FC = () => {
  const analyticsCards = [
    {
      title: 'Risk Trend',
      value: '+12%',
      change: 'vs last month',
      icon: TrendingUp,
      color: '#ff4757',
      bgColor: '#ffe0e0'
    },
    {
      title: 'Alert Frequency',
      value: '23',
      change: 'alerts this week',
      icon: Activity,
      color: '#ffa502',
      bgColor: '#fff4e0'
    },
    {
      title: 'Data Points',
      value: '1,247',
      change: 'processed today',
      icon: BarChart3,
      color: '#2196f3',
      bgColor: '#e3f2fd'
    },
    {
      title: 'Accuracy',
      value: '94.2%',
      change: 'prediction accuracy',
      icon: PieChart,
      color: '#2ed573',
      bgColor: '#e8f5e8'
    }
  ];

  return (
    <div>
      <h1 className="section-title">Analytics & Insights</h1>
      
      {/* Analytics Cards */}
      <div className="stats-grid">
        {analyticsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="stat-card" style={{ borderLeftColor: card.color }}>
              <div className="stat-icon" style={{ backgroundColor: card.bgColor, color: card.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{card.value}</div>
                <div className="stat-title">{card.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                  {card.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Charts */}
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Risk Level Trends (7 Days)</h3>
          <RiskTrendChart />
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Environmental Factor Analysis</h3>
          <FactorAnalysisChart />
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="charts-container">
        <div className="chart-card">
          <h3 className="chart-title">Alert Frequency Over Time</h3>
          <AlertTrendChart />
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Risk Distribution by Zone</h3>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1rem', background: '#ffe0e0', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4757' }}>Zone A</div>
                <div style={{ color: '#666' }}>High Risk: 85%</div>
              </div>
              <div style={{ padding: '1rem', background: '#fff4e0', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffa502' }}>Zone B</div>
                <div style={{ color: '#666' }}>Moderate Risk: 65%</div>
              </div>
              <div style={{ padding: '1rem', background: '#e8f5e8', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2ed573' }}>Zone C</div>
                <div style={{ color: '#666' }}>Low Risk: 25%</div>
              </div>
              <div style={{ padding: '1rem', background: '#ffe0e0', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ff4757' }}>Zone D</div>
                <div style={{ color: '#666' }}>High Risk: 92%</div>
              </div>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Risk levels calculated based on slope angle, rainfall, temperature, and soil moisture
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="chart-card" style={{ marginTop: '2rem' }}>
        <h3 className="chart-title">Key Insights & Recommendations</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ 
            padding: '1rem', 
            background: '#fff3cd', 
            border: '1px solid #ffeaa7', 
            borderRadius: '8px',
            borderLeft: '4px solid #ffa502'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>⚠️ High Risk Alert</h4>
            <p style={{ margin: 0, color: '#856404' }}>
              Zone A and Zone D are showing critical risk levels. Immediate monitoring and potential evacuation protocols should be considered.
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            background: '#d1ecf1', 
            border: '1px solid #bee5eb', 
            borderRadius: '8px',
            borderLeft: '4px solid #17a2b8'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#0c5460' }}>📊 Data Quality</h4>
            <p style={{ margin: 0, color: '#0c5460' }}>
              Environmental sensors are providing consistent data. Consider increasing monitoring frequency during peak risk periods.
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            background: '#d4edda', 
            border: '1px solid #c3e6cb', 
            borderRadius: '8px',
            borderLeft: '4px solid #28a745'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#155724' }}>✅ System Performance</h4>
            <p style={{ margin: 0, color: '#155724' }}>
              AI model accuracy is at 94.2%. Alert system is functioning optimally with 100% notification delivery rate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
