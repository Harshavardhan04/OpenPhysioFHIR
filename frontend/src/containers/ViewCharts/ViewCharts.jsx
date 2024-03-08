import React from 'react';
import { Card, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Line } from 'react-chartjs-2';

function ViewCharts({ selectedSnomed, snomedOptions, chartData, setSelectedSnomed }) {
  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h4" gutterBottom component="div">
          Observation Chart
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 240 }} margin="normal">
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
          <Typography variant="h6" gutterBottom component="div" sx={{ mr: 2 }}>
            {selectedSnomed && `SNOMED Code: ${selectedSnomed}`}
          </Typography>
        </Box>
        {selectedSnomed && chartData.labels && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 4,
              plugins: {
                legend: {
                  position: 'top',
                }
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
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];
                    return value !== undefined && !isNaN(value) ? 5 : 0;
                  }
                }
              }
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default ViewCharts;
