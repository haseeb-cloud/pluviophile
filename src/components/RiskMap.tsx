import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RiskData } from '../App';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const RiskMap: React.FC = () => {
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [selectedRisk, setSelectedRisk] = useState<RiskLevel | 'all'>('all');

  // Generate mock risk data
  useEffect(() => {
    const mockData: RiskData[] = [
      {
        id: '1',
        location: { lat: 37.7749, lng: -122.4194 },
        riskLevel: 'high',
        probability: 0.85,
        timestamp: new Date(),
        factors: { rainfall: 2.5, temperature: 25, slopeAngle: 45, soilMoisture: 80 }
      },
      {
        id: '2',
        location: { lat: 37.7849, lng: -122.4094 },
        riskLevel: 'moderate',
        probability: 0.65,
        timestamp: new Date(),
        factors: { rainfall: 1.2, temperature: 22, slopeAngle: 30, soilMoisture: 60 }
      },
      {
        id: '3',
        location: { lat: 37.7649, lng: -122.4294 },
        riskLevel: 'low',
        probability: 0.25,
        timestamp: new Date(),
        factors: { rainfall: 0.5, temperature: 20, slopeAngle: 15, soilMoisture: 40 }
      },
      {
        id: '4',
        location: { lat: 37.7549, lng: -122.4394 },
        riskLevel: 'high',
        probability: 0.92,
        timestamp: new Date(),
        factors: { rainfall: 3.1, temperature: 28, slopeAngle: 50, soilMoisture: 85 }
      },
      {
        id: '5',
        location: { lat: 37.7949, lng: -122.3994 },
        riskLevel: 'moderate',
        probability: 0.55,
        timestamp: new Date(),
        factors: { rainfall: 0.8, temperature: 18, slopeAngle: 25, soilMoisture: 50 }
      }
    ];
    setRiskData(mockData);
  }, []);

  const getRiskColor = (riskLevel: RiskLevel) => {
    switch (riskLevel) {
      case 'high': return '#ff4757';
      case 'moderate': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#ddd';
    }
  };

  const getRiskSize = (probability: number) => {
    return Math.max(8, probability * 20);
  };

  const filteredData = selectedRisk === 'all' 
    ? riskData 
    : riskData.filter(data => data.riskLevel === selectedRisk);

  return (
    <div>
      <h1 className="section-title">Risk Map</h1>
      
      {/* Risk Legend */}
      <div className="risk-legend">
        <div className="legend-item">
          <div className="legend-color high"></div>
          <span>High Risk</span>
        </div>
        <div className="legend-item">
          <div className="legend-color moderate"></div>
          <span>Moderate Risk</span>
        </div>
        <div className="legend-item">
          <div className="legend-color low"></div>
          <span>Low Risk</span>
        </div>
      </div>

      {/* Filter Controls */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ fontWeight: '500' }}>Filter by Risk Level:</label>
        <select 
          value={selectedRisk} 
          onChange={(e) => setSelectedRisk(e.target.value as RiskLevel | 'all')}
          style={{ 
            padding: '0.5rem', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            background: 'white'
          }}
        >
          <option value="all">All Risk Levels</option>
          <option value="high">High Risk</option>
          <option value="moderate">Moderate Risk</option>
          <option value="low">Low Risk</option>
        </select>
      </div>

      {/* Map Container */}
      <div className="map-container">
        <MapContainer
          center={[37.7749, -122.4194]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {filteredData.map((data) => (
            <CircleMarker
              key={data.id}
              center={[data.location.lat, data.location.lng]}
              radius={getRiskSize(data.probability)}
              fillColor={getRiskColor(data.riskLevel)}
              color="#fff"
              weight={2}
              opacity={0.8}
              fillOpacity={0.6}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                    Risk Zone {data.id}
                  </h3>
                  <p style={{ margin: '0.25rem 0', fontWeight: '500' }}>
                    Risk Level: <span style={{ 
                      color: getRiskColor(data.riskLevel),
                      textTransform: 'uppercase'
                    }}>
                      {data.riskLevel}
                    </span>
                  </p>
                  <p style={{ margin: '0.25rem 0' }}>
                    Probability: {(data.probability * 100).toFixed(1)}%
                  </p>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                    <p style={{ margin: '0.1rem 0' }}>Rainfall: {data.factors.rainfall}mm</p>
                    <p style={{ margin: '0.1rem 0' }}>Temperature: {data.factors.temperature}°C</p>
                    <p style={{ margin: '0.1rem 0' }}>Slope Angle: {data.factors.slopeAngle}°</p>
                    <p style={{ margin: '0.1rem 0' }}>Soil Moisture: {data.factors.soilMoisture}%</p>
                  </div>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: '#666' }}>
                    Last Updated: {data.timestamp.toLocaleString()}
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Risk Statistics */}
      <div className="charts-container" style={{ marginTop: '2rem' }}>
        <div className="chart-card">
          <h3 className="chart-title">Risk Distribution</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff4757' }}>
                {riskData.filter(d => d.riskLevel === 'high').length}
              </div>
              <div style={{ color: '#666' }}>High Risk</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffa502' }}>
                {riskData.filter(d => d.riskLevel === 'moderate').length}
              </div>
              <div style={{ color: '#666' }}>Moderate Risk</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2ed573' }}>
                {riskData.filter(d => d.riskLevel === 'low').length}
              </div>
              <div style={{ color: '#666' }}>Low Risk</div>
            </div>
          </div>
        </div>
        
        <div className="chart-card">
          <h3 className="chart-title">Average Risk Factors</h3>
          <div style={{ padding: '1rem 0' }}>
            {riskData.length > 0 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Rainfall:</span>
                  <span>{(riskData.reduce((sum, d) => sum + d.factors.rainfall, 0) / riskData.length).toFixed(1)}mm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Temperature:</span>
                  <span>{(riskData.reduce((sum, d) => sum + d.factors.temperature, 0) / riskData.length).toFixed(1)}°C</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Slope Angle:</span>
                  <span>{(riskData.reduce((sum, d) => sum + d.factors.slopeAngle, 0) / riskData.length).toFixed(1)}°</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Soil Moisture:</span>
                  <span>{(riskData.reduce((sum, d) => sum + d.factors.soilMoisture, 0) / riskData.length).toFixed(1)}%</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskMap;
