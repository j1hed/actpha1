const express = require('express');
const router = express.Router();

// Sample route to get dashboard data
router.get('', async (req, res) => {
    try {
        // Simulate fetching data (replace with actual data fetching logic)
        const data = {
            chartData: [
                { time: '00:00', temperature: 5, humidity: 45 },
                { time: '04:00', temperature: 4, humidity: 48 },
                { time: '08:00', temperature: 5, humidity: 50 },
                { time: '12:00', temperature: 6, humidity: 47 },
                { time: '16:00', temperature: 4, humidity: 46 },
                { time: '20:00', temperature: 6, humidity: 45 },
            ],
            alerts: [
                { id: 1, type: 'Temperature Alert', message: 'Lab Room 2 temperature above threshold', severity: 'high', time: '2 minutes ago' },
                { id: 2, type: 'Humidity Warning', message: 'Storage Area humidity below optimal range', severity: 'medium', time: '15 minutes ago' },
            ],
        };
        
        // Send JSON response
        res.json(data);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ success: false, error: 'Internal server error', message: error.message });
    }
});

module.exports = router;
