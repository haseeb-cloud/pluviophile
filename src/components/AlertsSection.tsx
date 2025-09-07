import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Bell, Send, Trash2, Filter } from 'lucide-react';
import { useAlerts } from '../context/AlertContext';
import { Alert } from '../App';

const AlertsSection: React.FC = () => {
  const { alerts, removeAlert, clearAlerts, addAlert } = useAlerts();
  const [filter, setFilter] = useState<'all' | 'high' | 'moderate' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'risk'>('newest');

  // Simulate Twilio SMS sending (mock)
  const sendSMSAlert = async (alert: Alert) => {
    try {
      // Mock API call to Twilio
      console.log('Sending SMS via Twilio:', {
        to: '+1234567890', // This would be configurable
        message: `ROCKFALL ALERT: ${alert.message} at ${alert.location}`
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addAlert({
        message: 'SMS alert sent successfully',
        type: 'info',
        location: 'Twilio Integration',
        riskLevel: 'low'
      });
    } catch (error) {
      addAlert({
        message: 'Failed to send SMS alert',
        type: 'warning',
        location: 'Twilio Integration',
        riskLevel: 'low'
      });
    }
  };

  // Generate mock alerts on component mount
  useEffect(() => {
    const mockAlerts: Omit<Alert, 'id' | 'timestamp'>[] = [
      {
        message: 'High risk detected in Zone A - Immediate attention required',
        type: 'danger',
        location: 'Zone A (37.7749, -122.4194)',
        riskLevel: 'high'
      },
      {
        message: 'Moderate risk increase due to heavy rainfall',
        type: 'warning',
        location: 'Zone B (37.7849, -122.4094)',
        riskLevel: 'moderate'
      },
      {
        message: 'Soil moisture levels approaching threshold',
        type: 'info',
        location: 'Zone C (37.7649, -122.4294)',
        riskLevel: 'low'
      },
      {
        message: 'Critical slope angle detected - Evacuation recommended',
        type: 'danger',
        location: 'Zone D (37.7549, -122.4394)',
        riskLevel: 'high'
      }
    ];

    // Add mock alerts with delays to simulate real-time updates
    mockAlerts.forEach((alert, index) => {
      setTimeout(() => {
        addAlert(alert);
      }, index * 2000);
    });
  }, [addAlert]);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.riskLevel === filter;
  });

  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.timestamp.getTime() - a.timestamp.getTime();
      case 'oldest':
        return a.timestamp.getTime() - b.timestamp.getTime();
      case 'risk':
        const riskOrder = { high: 3, moderate: 2, low: 1 };
        return riskOrder[b.riskLevel] - riskOrder[a.riskLevel];
      default:
        return 0;
    }
  });

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="alert-icon" style={{ color: '#ff4757' }} />;
      case 'warning':
        return <AlertTriangle className="alert-icon" style={{ color: '#ffa502' }} />;
      case 'info':
        return <Bell className="alert-icon" style={{ color: '#2196f3' }} />;
      default:
        return <Bell className="alert-icon" />;
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    const colors = {
      high: '#ff4757',
      moderate: '#ffa502',
      low: '#2ed573'
    };
    
    return (
      <span style={{
        backgroundColor: colors[riskLevel as keyof typeof colors],
        color: 'white',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.8rem',
        fontWeight: '500',
        textTransform: 'uppercase'
      }}>
        {riskLevel}
      </span>
    );
  };

  return (
    <div>
      <h1 className="section-title">Alerts & Notifications</h1>
      
      {/* Alert Controls */}
      <div className="chart-card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 className="chart-title" style={{ margin: 0 }}>Alert Management</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={() => {
                if (Notification.permission === 'default') {
                  Notification.requestPermission();
                } else if (Notification.permission === 'granted') {
                  addAlert({
                    message: 'Test notification sent',
                    type: 'info',
                    location: 'Browser',
                    riskLevel: 'low'
                  });
                }
              }}
              style={{
                background: '#2196f3',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Bell size={16} />
              Test Notification
            </button>
            <button
              onClick={clearAlerts}
              style={{
                background: '#ff4757',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Trash2 size={16} />
              Clear All
            </button>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={16} />
            <label>Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="all">All Alerts</option>
              <option value="high">High Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              style={{ padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="risk">Risk Level</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="alerts-container">
        {sortedAlerts.length === 0 ? (
          <div className="chart-card">
            <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
              <Bell size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No alerts found</p>
            </div>
          </div>
        ) : (
          sortedAlerts.map((alert) => (
            <div key={alert.id} className={`alert-item ${alert.type}`}>
              {getAlertIcon(alert.type)}
              <div className="alert-content">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-timestamp">
                  {alert.timestamp.toLocaleString()}
                </div>
                <div className="alert-location">{alert.location}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getRiskBadge(alert.riskLevel)}
                <button
                  onClick={() => sendSMSAlert(alert)}
                  style={{
                    background: '#2ed573',
                    color: 'white',
                    border: 'none',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                  title="Send SMS Alert"
                >
                  <Send size={14} />
                </button>
                <button
                  onClick={() => removeAlert(alert.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff4757',
                    cursor: 'pointer',
                    padding: '0.5rem'
                  }}
                  title="Remove Alert"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Statistics */}
      <div className="charts-container" style={{ marginTop: '2rem' }}>
        <div className="chart-card">
          <h3 className="chart-title">Alert Statistics</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff4757' }}>
                {alerts.filter(a => a.riskLevel === 'high').length}
              </div>
              <div style={{ color: '#666' }}>High Risk Alerts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffa502' }}>
                {alerts.filter(a => a.riskLevel === 'moderate').length}
              </div>
              <div style={{ color: '#666' }}>Moderate Risk Alerts</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196f3' }}>
                {alerts.filter(a => a.riskLevel === 'low').length}
              </div>
              <div style={{ color: '#666' }}>Low Risk Alerts</div>
            </div>
          </div>
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Recent Activity</h3>
          <div style={{ padding: '1rem 0' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              Total Alerts: <strong>{alerts.length}</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              Last 24h: <strong>{alerts.filter(a => 
                new Date().getTime() - a.timestamp.getTime() < 24 * 60 * 60 * 1000
              ).length}</strong>
            </p>
            <p style={{ marginBottom: '0.5rem' }}>
              SMS Sent: <strong>{Math.floor(alerts.length * 0.7)}</strong>
            </p>
            <p>
              Notification Permission: <strong style={{ 
                color: Notification.permission === 'granted' ? '#2ed573' : '#ff4757' 
              }}>
                {Notification.permission}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsSection;
