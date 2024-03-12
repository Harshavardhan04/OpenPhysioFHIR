import React from 'react';
import { Card, CardContent, Typography, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Line } from 'react-chartjs-2';

function ViewCharts({ selectedSnomed, snomedOptions, chartData, setSelectedSnomed, dates }) {
  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h4" gutterBottom component="div">
          Observation Chart
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' }
          }}
        >
          <FormControl sx={{ minWidth: { xs: '100%', sm: 240 }, mb: { xs: 2, sm: 0 } }} margin="normal">
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
          <Typography 
            variant="h6" 
            gutterBottom 
            component="div" 
            sx={{ 
              mr: { sm: 2 },
              mt: { xs: -2, sm: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            {selectedSnomed && `SNOMED Code: ${selectedSnomed}`}
          </Typography>
        </Box>
        {selectedSnomed && chartData.labels && (
          <Line
            data={{
              ...chartData,
              labels: chartData.labels.map((label, index) => `${label} (${dates[index]})`)
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              aspectRatio: 3,
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
