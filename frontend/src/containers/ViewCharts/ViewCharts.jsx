

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ViewCharts = () => {
  const [selectedSnomed, setSelectedSnomed] = useState('');
  const [chartData, setChartData] = useState({});
  const [snomedOptions, setSnomedOptions] = useState([]);

  useEffect(() => {
    fetchSnomedOptions();
  }, []);

  const fetchSnomedOptions = async () => {
    try {
      const response = await axios.get('/desired');
      setSnomedOptions(response.data.map(item => item[0]));
    } catch (error) {
      console.error("Failed to fetch SNOMED options:", error);
    }
  };

  const fetchChartData = async (snomedCode) => {
    try {
      const response = await axios.post('/chart-data', { snomedCode });
      const observations = response.data.observations;
      const desired = response.data.desired;


      const labels = observations.map((_, index) => `Session ${index + 1}`);
      const data = observations.map(value => value !== undefined ? value : NaN);


      setChartData({
        labels,
        datasets: [
          {
            label: 'Observation Values',
            data,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            fill: false,
            cubicInterpolationMode: 'monotone',
            tension: 0.4
          },
          {
            label: 'Desired Value',
            data: Array(labels.length).fill(desired),
            borderColor: 'rgb(255, 99, 132)',
            borderDash: [5, 5],
            fill: false
          }
        ]
      });
    } catch (error) {
      console.error("Failed to fetch chart data:", error);
    }
  };

  useEffect(() => {
    if (selectedSnomed) {
      fetchChartData(selectedSnomed);
    }
  }, [selectedSnomed]);

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
      <FormControl fullWidth>
        <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
        <Select
          labelId="snomed-select-label"
          value={selectedSnomed}
          label="SNOMED Code"
          onChange={(e) => setSelectedSnomed(e.target.value)}
        >
          {snomedOptions.map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedSnomed && chartData.labels && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: `SNOMED ${selectedSnomed} Observation Chart`,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grace: '5%',
              }
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },
            elements: {
              point: {
                radius: (context) => {
                  return context.raw !== NaN ? 5 : 0;
                }
              }
            }
          }}
        />
      )}
    </Box>
  );
};

export default ViewCharts;
