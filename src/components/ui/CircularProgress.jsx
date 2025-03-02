import React from 'react';

const CircularProgress = ({ value, size = 100, color = '#10b981' }) => {
    const radius = (size - 10) / 2; // Adjust for stroke width
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
        <svg width={size} height={size}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="#e2e8f0" // Background circle color
                strokeWidth="10"
                fill="transparent"
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill={color}
                fontSize="1.5rem"
                fontWeight="bold"
            >
                {value}%
            </text>
        </svg>
    );
};

export default CircularProgress; 