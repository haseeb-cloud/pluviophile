import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Bell, MapPin, Shield, Database } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      browser: true,
      highRiskOnly: false
    },
    riskThresholds: {
      high: 0.8,
      moderate: 0.5,
      low: 0.2
    },
    mapSettings: {
      autoRefresh: true,
      refreshInterval: 30,
      showHeatmap: true,
      showMarkers: true
    },
    twilio: {
      accountSid: '',
      authToken: '',
      phoneNumber: '',
      enabled: false
    }
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  return (
    <div>
      <h1 className="section-title">Settings</h1>
      
      {/* Notification Settings */}
      <div className="chart-card" style={{ marginBottom: '2rem' }}>
        <h3 className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={20} />
          Notification Settings
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Email Notifications</label>
            <input
              type="checkbox"
              checked={settings.notifications.email}
              onChange={(e) => handleInputChange('notifications', 'email', e.target.checked)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>SMS Notifications</label>
            <input
              type="checkbox"
              checked={settings.notifications.sms}
              onChange={(e) => handleInputChange('notifications', 'sms', e.target.checked)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Browser Notifications</label>
            <input
              type="checkbox"
              checked={settings.notifications.browser}
              onChange={(e) => handleInputChange('notifications', 'browser', e.target.checked)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>High Risk Alerts Only</label>
            <input
              type="checkbox"
              checked={settings.notifications.highRiskOnly}
              onChange={(e) => handleInputChange('notifications', 'highRiskOnly', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Risk Threshold Settings */}
      <div className="chart-card" style={{ marginBottom: '2rem' }}>
        <h3 className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield size={20} />
          Risk Thresholds
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>High Risk Threshold: {(settings.riskThresholds.high * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0.5"
              max="1"
              step="0.05"
              value={settings.riskThresholds.high}
              onChange={(e) => handleInputChange('riskThresholds', 'high', parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </div>
          
          <div>
            <label>Moderate Risk Threshold: {(settings.riskThresholds.moderate * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0.2"
              max="0.8"
              step="0.05"
              value={settings.riskThresholds.moderate}
              onChange={(e) => handleInputChange('riskThresholds', 'moderate', parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </div>
          
          <div>
            <label>Low Risk Threshold: {(settings.riskThresholds.low * 100).toFixed(0)}%</label>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.05"
              value={settings.riskThresholds.low}
              onChange={(e) => handleInputChange('riskThresholds', 'low', parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </div>
        </div>
      </div>

      {/* Map Settings */}
      <div className="chart-card" style={{ marginBottom: '2rem' }}>
        <h3 className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin size={20} />
          Map Settings
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Auto Refresh</label>
            <input
              type="checkbox"
              checked={settings.mapSettings.autoRefresh}
              onChange={(e) => handleInputChange('mapSettings', 'autoRefresh', e.target.checked)}
            />
          </div>
          
          <div>
            <label>Refresh Interval (seconds): {settings.mapSettings.refreshInterval}</label>
            <input
              type="range"
              min="10"
              max="300"
              step="10"
              value={settings.mapSettings.refreshInterval}
              onChange={(e) => handleInputChange('mapSettings', 'refreshInterval', parseInt(e.target.value))}
              style={{ width: '100%', marginTop: '0.5rem' }}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Show Heatmap</label>
            <input
              type="checkbox"
              checked={settings.mapSettings.showHeatmap}
              onChange={(e) => handleInputChange('mapSettings', 'showHeatmap', e.target.checked)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Show Markers</label>
            <input
              type="checkbox"
              checked={settings.mapSettings.showMarkers}
              onChange={(e) => handleInputChange('mapSettings', 'showMarkers', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Twilio Integration */}
      <div className="chart-card" style={{ marginBottom: '2rem' }}>
        <h3 className="chart-title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={20} />
          Twilio SMS Integration
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label>Enable Twilio SMS</label>
            <input
              type="checkbox"
              checked={settings.twilio.enabled}
              onChange={(e) => handleInputChange('twilio', 'enabled', e.target.checked)}
            />
          </div>
          
          <div>
            <label>Account SID</label>
            <input
              type="text"
              value={settings.twilio.accountSid}
              onChange={(e) => handleInputChange('twilio', 'accountSid', e.target.value)}
              placeholder="Enter Twilio Account SID"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          
          <div>
            <label>Auth Token</label>
            <input
              type="password"
              value={settings.twilio.authToken}
              onChange={(e) => handleInputChange('twilio', 'authToken', e.target.value)}
              placeholder="Enter Twilio Auth Token"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              value={settings.twilio.phoneNumber}
              onChange={(e) => handleInputChange('twilio', 'phoneNumber', e.target.value)}
              placeholder="+1234567890"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSave}
          style={{
            background: '#2196f3',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          <Save size={20} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
