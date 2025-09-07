# AI Rockfall Prediction & Alert Dashboard

A comprehensive web-based dashboard for monitoring and predicting rockfall risks in open-pit mines using AI and real-time data analysis.

## Features

### 🎯 Core Features
- **File Upload**: Support for Digital Elevation Models (DEM) and drone images
- **Risk Map Visualization**: Interactive map with color-coded risk zones
- **Real-time Alerts**: Browser notifications and SMS integration via Twilio
- **Analytics Dashboard**: Comprehensive charts and trend analysis
- **Responsive Design**: Mobile-friendly interface

### 🗺️ Risk Assessment
- **Risk Levels**: High (Red), Moderate (Yellow), Low (Green)
- **Environmental Factors**: Rainfall, temperature, slope angle, soil moisture
- **Interactive Map**: Leaflet-based visualization with popup details
- **Heatmap Display**: Visual representation of risk zones

### 📊 Analytics & Monitoring
- **Trend Charts**: Risk level trends over time
- **Factor Analysis**: Environmental factor impact analysis
- **Alert Statistics**: Alert frequency and distribution
- **Zone-based Analysis**: Risk distribution by mining zones

### 🔔 Alert System
- **Browser Notifications**: Real-time popup alerts
- **SMS Integration**: Twilio API for emergency notifications
- **Alert Management**: Filter, sort, and manage alerts
- **Risk Thresholds**: Configurable alert triggers

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Maps**: Leaflet.js with React-Leaflet
- **Charts**: Recharts for data visualization
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API
- **Icons**: Lucide React

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rockfall-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

## Usage

### Dashboard Overview
- View real-time risk statistics
- Monitor alert counts and trends
- Access quick insights and recommendations

### Upload Data
- Drag and drop DEM files (.dem, .tif, .tiff)
- Upload drone images (.jpg, .jpeg, .png)
- Process and analyze uploaded data

### Risk Map
- Interactive map with risk zone markers
- Filter by risk level (High/Moderate/Low)
- Click markers for detailed information
- View environmental factors for each zone

### Alerts Management
- View all active alerts
- Filter by risk level and type
- Send SMS notifications via Twilio
- Manage alert preferences

### Analytics
- Risk trend analysis over time
- Environmental factor impact assessment
- Alert frequency patterns
- Zone-based risk distribution

### Settings
- Configure notification preferences
- Set risk thresholds
- Map display options
- Twilio SMS integration setup

## Configuration

### Twilio SMS Integration
1. Sign up for Twilio account
2. Get Account SID and Auth Token
3. Purchase a phone number
4. Enter credentials in Settings

### Risk Thresholds
- **High Risk**: 80% (default)
- **Moderate Risk**: 50% (default)
- **Low Risk**: 20% (default)

### Map Settings
- Auto-refresh interval: 30 seconds (default)
- Heatmap display: Enabled
- Marker display: Enabled

## File Support

### Supported File Types
- **DEM Files**: .dem, .tif, .tiff
- **Images**: .jpg, .jpeg, .png
- **Maximum Size**: 100MB per file

## API Integration

The dashboard is designed to integrate with ML models for:
- Risk probability calculation
- Environmental factor analysis
- Real-time data processing
- Predictive analytics

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Mobile Support

- Responsive design for tablets and mobile devices
- Touch-friendly interface
- Optimized for landscape and portrait orientations

## Development

### Project Structure
```
src/
├── components/          # React components
│   ├── charts/         # Chart components
│   └── ...
├── context/            # React Context providers
├── App.tsx            # Main application
└── App.css            # Global styles
```

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: This is a demonstration dashboard with mock data. For production use, integrate with real ML models and data sources.