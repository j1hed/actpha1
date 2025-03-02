import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  console.log('Dashboard component rendering', { temperature, humidity, alerts }); // Debug log

    const [temperature, setTemperature] = useState(22);
    const [humidity, setHumidity] = useState(45);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showHistorical, setShowHistorical] = useState(false);

    // Sample data for trends reflecting pharmacy lab conditions
    const initialData = Array.from({ length: 24 }, (_, index) => {
        const hour = new Date();
        hour.setHours(hour.getHours() - index);
        return {
            name: hour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: Math.floor(Math.random() * 6) + 20, // Random temperature between 20°C and 25°C
            humidity: Math.floor(Math.random() * 31) + 30, // Random humidity between 30% and 60%
        };
    });

    const [chartData, setChartData] = useState(initialData.reverse());
    const [isDraggingTemp, setIsDraggingTemp] = useState(false);
    const [isDraggingHumidity, setIsDraggingHumidity] = useState(false);
    const [draggedPointIndexTemp, setDraggedPointIndexTemp] = useState(null);
    const [draggedPointIndexHumidity, setDraggedPointIndexHumidity] = useState(null);

    const chartRefTemp = useRef(null);
    const chartRefHumidity = useRef(null);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleShowHistorical = () => {
        setShowHistorical(true);
    };

    const handleShowDailyData = () => {
        setShowHistorical(false); // Set to false to show daily data
    };

    const handleMouseMoveTemp = (e) => {
        if (isDraggingTemp && draggedPointIndexTemp !== null && chartRefTemp.current) {
            const chartHeight = chartRefTemp.current.clientHeight;
            const { clientY } = e;
            const newTemp = Math.max(20, Math.min(25, Math.floor((chartHeight - clientY) / chartHeight * 5) + 20));

            setChartData((prevData) => {
                const updatedData = [...prevData];
                updatedData[draggedPointIndexTemp] = {
                    ...updatedData[draggedPointIndexTemp],
                    temp: newTemp,
                };
                return updatedData;
            });
        }
    };

    const handleMouseMoveHumidity = (e) => {
        if (isDraggingHumidity && draggedPointIndexHumidity !== null && chartRefHumidity.current) {
            const chartHeight = chartRefHumidity.current.clientHeight;
            const { clientY } = e;
            const newHumidity = Math.max(30, Math.min(60, Math.floor((clientY) / chartHeight * 30) + 30));

            setChartData((prevData) => {
                const updatedData = [...prevData];
                updatedData[draggedPointIndexHumidity] = {
                    ...updatedData[draggedPointIndexHumidity],
                    humidity: newHumidity,
                };
                return updatedData;
            });
        }
    };

    const handleMouseDownTemp = (index) => {
        setIsDraggingTemp(true);
        setDraggedPointIndexTemp(index);
    };

    const handleMouseDownHumidity = (index) => {
        setIsDraggingHumidity(true);
        setDraggedPointIndexHumidity(index);
    };

    const handleMouseUp = () => {
        setIsDraggingTemp(false);
        setIsDraggingHumidity(false);
        setDraggedPointIndexTemp(null);
        setDraggedPointIndexHumidity(null);
    };

    // Alert logic
    useEffect(() => {
        if (temperature > 30) {
            setAlerts((prev) => [...prev, { message: 'High temperature alert!', type: 'warning' }]);
        }
        if (humidity > 70) {
            setAlerts((prev) => [...prev, { message: 'High humidity alert!', type: 'warning' }]);
        }
    }, [temperature, humidity]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="metrics-grid">
                {/* Temperature Card */}
                <div className="metric-card">
                    <h2 className="metric-title">Temperature</h2>
                    <p className="metric-value">{temperature}°C</p>
                    <p className="metric-status">Updated now</p>
                    <p className="metric-status text-green-500">Normal</p>
                </div>

                {/* Humidity Card */}
                <div className="metric-card">
                    <h2 className="metric-title">Humidity</h2>
                    <p className="metric-value">{humidity}%</p>
                    <p className="metric-status">Updated now</p>
                    <p className="metric-status text-green-500">Optimal</p>
                </div>

                {/* Alerts Card */}
                <div className="metric-card alert-card">
                    <h2 className="metric-title">Alerts</h2>
                    <p className="metric-value">{alerts.length}</p>
                    <p className="metric-status">Active</p>
                    <p className="metric-status text-red-500">Action needed</p>
                </div>
            </div>

            <div className="charts-container">
                {/* Temperature Trends */}
                <div className="chart-card" onClick={handleShowDailyData}>
                    <h2 className="chart-title">Temperature Trends</h2>
                    <div className="chart-wrapper" ref={chartRefTemp}>
                        <LineChart
                            width={500}
                            height={400}
                            data={chartData}
                            onMouseMove={handleMouseMoveTemp}
                            onMouseDown={(e) => {
                                const index = chartData.findIndex(point => point.name === e.activeLabel);
                                handleMouseDownTemp(index);
                            }}
                            onMouseUp={handleMouseUp}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="name" stroke="#8884d8" />
                            <YAxis stroke="#8884d8" />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #8884d8' }} />
                            <Legend />
                            <Line type="monotone" dataKey="temp" stroke="url(#tempGradient)" strokeWidth={3} />
                            <defs>
                                <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#ff7e5f', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#feb47b', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </div>
                </div>

                {/* Humidity Trends */}
                <div className="chart-card" onClick={handleShowDailyData}>
                    <h2 className="chart-title">Humidity Trends</h2>
                    <div className="chart-wrapper" ref={chartRefHumidity}>
                        <LineChart
                            width={500}
                            height={400}
                            data={chartData}
                            onMouseMove={handleMouseMoveHumidity}
                            onMouseDown={(e) => {
                                const index = chartData.findIndex(point => point.name === e.activeLabel);
                                handleMouseDownHumidity(index);
                            }}
                            onMouseUp={handleMouseUp}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                            <XAxis dataKey="name" stroke="#82ca9d" />
                            <YAxis stroke="#82ca9d" />
                            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #82ca9d' }} />
                            <Legend />
                            <Line type="monotone" dataKey="humidity" stroke="url(#humidityGradient)" strokeWidth={3} />
                            <defs>
                                <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style={{ stopColor: '#00c6ff', stopOpacity: 1 }} />
                                    <stop offset="100%" style={{ stopColor: '#0072ff', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                        </LineChart>
                    </div>
                </div>
            </div>

            {/* Notification Alerts */}
            <div className="notification-container">
                {alerts.map((alert, index) => (
                    <div key={index} className={`notification-alert ${alert.type}`}>
                        {alert.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
