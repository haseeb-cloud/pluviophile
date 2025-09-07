import React, { createContext, useContext, useState, useCallback } from 'react';
import { Alert } from '../App';

interface AlertContextType {
  alerts: Alert[];
  addAlert: (alert: Omit<Alert, 'id' | 'timestamp'>) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
  showNotification: (message: string, type: 'warning' | 'danger' | 'info') => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: string }>>([]);

  const addAlert = useCallback((alertData: Omit<Alert, 'id' | 'timestamp'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setAlerts(prev => [newAlert, ...prev]);
    
    // Show browser notification if permission is granted
    if (Notification.permission === 'granted') {
      new Notification('Rockfall Alert', {
        body: alertData.message,
        icon: '/favicon.ico',
      });
    }
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const clearAlerts = useCallback(() => {
    setAlerts([]);
  }, []);

  const showNotification = useCallback((message: string, type: 'warning' | 'danger' | 'info') => {
    const notificationId = Date.now().toString();
    const notification = { id: notificationId, message, type };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    }, 5000);
  }, []);

  // Request notification permission on mount
  React.useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts, showNotification }}>
      {children}
      {/* Notification Display */}
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          <div className="notification-title">
            {notification.type === 'danger' ? 'High Risk Alert' : 
             notification.type === 'warning' ? 'Moderate Risk' : 'Info'}
          </div>
          <div className="notification-message">{notification.message}</div>
        </div>
      ))}
    </AlertContext.Provider>
  );
};
