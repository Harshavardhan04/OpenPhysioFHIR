// import React, { useRef, useEffect, useState } from 'react';
// import { Typography, Box, Grid, IconButton } from "@mui/material";
// import Chart from 'chart.js/auto';
// import axios from 'axios';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// function ViewCharts() {
//     const [expanded, setExpanded] = useState({
//         line: false,
//         bar: false,
//         doughnut: false,
//         radar: false
//     });

//     const [chartData, setChartData] = useState({});
//     const lineChartRef = useRef(null);
//     const barChartRef = useRef(null);
//     const doughnutChartRef = useRef(null);
//     const radarChartRef = useRef(null);
//     const chartInstances = useRef([]);

//     useEffect(() => {

//         axios.get('http://localhost:5000/chart-data')
//             .then(response => {
//                 setChartData(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching chart data:', error);
//             });
//     }, []);

//     const toggleChartSize = (chartName) => {
//         setExpanded(prevExpanded => ({
//             ...prevExpanded,
//             [chartName]: !prevExpanded[chartName]
//         }));
//     };

//     const chartStyle = (chartName) => ({
//         width: expanded[chartName] ? '100%' : '50%',
//         height: expanded[chartName] ? '400px' : '200px',
//         transition: 'width 0.3s ease, height 0.3s ease'
//     });

//     useEffect(() => {
//         // Clear previous instances
//         chartInstances.current.forEach(chart => chart.destroy());
//         chartInstances.current = [];

//         if (Object.keys(chartData).length) {
//             // Create chart instances using the fetched data
//             chartInstances.current.push(new Chart(lineChartRef.current.getContext('2d'), {
//                 type: 'line',
//                 data: {
//                     labels: chartData.line.labels,
//                     datasets: [{
//                         label: 'Joint Angle (degrees)',
//                         data: chartData.line.data,
//                         fill: false,
//                         borderColor: 'rgb(54, 162, 235)',
//                         tension: 0.1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         title: {
//                             display: true,
//                             text: 'Progress in Joint Angle'
//                         }
//                     }
//                 }
//             }));

//             chartInstances.current.push(new Chart(barChartRef.current.getContext('2d'), {
//                 type: 'bar',
//                 data: {
//                     labels: chartData.bar.labels,
//                     datasets: [{
//                         label: 'Number of Steps',
//                         data: chartData.bar.data,
//                         backgroundColor: 'rgb(255, 99, 132)'
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         title: {
//                             display: true,
//                             text: 'Improvement in Walking Ability'
//                         }
//                     }
//                 }
//             }));

//             chartInstances.current.push(new Chart(doughnutChartRef.current.getContext('2d'), {
//                 type: 'doughnut',
//                 data: {
//                     labels: chartData.doughnut.labels,
//                     datasets: [{
//                         label: 'Muscle Strength',
//                         data: chartData.doughnut.data,
//                         backgroundColor: [
//                             'rgb(255, 205, 86)',
//                             'rgb(75, 192, 192)',
//                             'rgb(255, 99, 132)'
//                         ]
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         title: {
//                             display: true,
//                             text: 'Muscle Strength Assessment'
//                         }
//                     }
//                 }
//             }));

//             chartInstances.current.push(new Chart(radarChartRef.current.getContext('2d'), {
//                 type: 'radar',
//                 data: {
//                     labels: chartData.radar.labels,
//                     datasets: [{
//                         label: 'Balance Assessment',
//                         data: chartData.radar.data,
//                         fill: true,
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         borderColor: 'rgb(54, 162, 235)',
//                         pointBackgroundColor: 'rgb(54, 162, 235)',
//                         pointBorderColor: '#fff',
//                         pointHoverBackgroundColor: '#fff',
//                         pointHoverBorderColor: 'rgb(54, 162, 235)'
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         legend: {
//                             position: 'top',
//                         },
//                         title: {
//                             display: true,
//                             text: 'Balance and Coordination'
//                         }
//                     },
//                     elements: {
//                         line: {
//                             borderWidth: 3
//                         }
//                     }
//                 }
//             }));
//         }

//         return () => chartInstances.current.forEach(chart => chart.destroy());
//     }, [chartData]);

//     return (
//         <Box sx={{ flexGrow: 1, padding: 2 }}>
//             <Typography variant="h5" gutterBottom>Patient Progress Charts</Typography>
//             <Grid container spacing={3} direction="column">
//                 {/* Line Chart */}
//                 <Grid item xs={12} sx={chartStyle('line')}>
//                     <Typography variant="h6" gutterBottom>Joint Angle Measurement</Typography>
//                     <IconButton onClick={() => toggleChartSize('line')}>
//                         {expanded.line ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                     </IconButton>
//                     <canvas ref={lineChartRef} />
//                 </Grid>
//                 {/* Bar Chart */}
//                 <Grid item xs={12} sx={chartStyle('bar')}>
//                     <Typography variant="h6" gutterBottom>Steps Walked</Typography>
//                     <IconButton onClick={() => toggleChartSize('bar')}>
//                         {expanded.bar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                     </IconButton>
//                     <canvas ref={barChartRef} />
//                 </Grid>
//                 {/* Doughnut Chart */}
//                 <Grid item xs={12} sx={chartStyle('doughnut')}>
//                     <Typography variant="h6" gutterBottom>Muscle Strength</Typography>
//                     <IconButton onClick={() => toggleChartSize('doughnut')}>
//                         {expanded.doughnut ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                     </IconButton>
//                     <canvas ref={doughnutChartRef} />
//                 </Grid>
//                 {/* Radar Chart */}
//                 <Grid item xs={12} sx={chartStyle('radar')}>
//                     <Typography variant="h6" gutterBottom>Balance Assessment</Typography>
//                     <IconButton onClick={() => toggleChartSize('radar')}>
//                         {expanded.radar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                     </IconButton>
//                     <canvas ref={radarChartRef} />
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// }

// export default ViewCharts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Box, Typography, Select, MenuItem, FormControl, InputLabel
// } from "@mui/material";

// const ViewCharts = () => {
//     const [selectedSnomed, setSelectedSnomed] = useState('');
//     const [observations, setObservations] = useState([]);
//     const [desiredValue, setDesiredValue] = useState(null);
//     const [snomedOptions, setSnomedOptions] = useState([]); // Assume you have a way to get SNOMED options

//     useEffect(() => {
//         if (selectedSnomed) {
//             fetchObservationsAndDesired(selectedSnomed);
//         }
//     }, [selectedSnomed]);

//     const fetchObservationsAndDesired = async (snomed) => {
//         try {
//             const obsResponse = await axios.get(`/api/observations/${snomed}`);
//             const desiredResponse = await axios.get(`/api/desired/${snomed}`);
//             setObservations(obsResponse.data);
//             setDesiredValue(desiredResponse.data.desired);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const data = {
//         labels: observations.map((_, index) => `Session ${index + 1}`),
//         datasets: [
//             {
//                 label: 'SNOMED Value',
//                 data: observations,
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1
//             },
//             {
//                 label: 'Desired Value',
//                 data: Array(observations.length).fill(desiredValue),
//                 fill: false,
//                 borderColor: 'rgb(255, 99, 132)',
//                 borderDash: [5, 5]
//             }
//         ]
//     };

//     return (
//         <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
//             <Typography variant="h5" sx={{ mb: 2 }}>View SNOMED Charts</Typography>
//             <FormControl fullWidth>
//                 <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//                 <Select
//                     labelId="snomed-select-label"
//                     id="snomed-select"
//                     value={selectedSnomed}
//                     label="SNOMED Code"
//                     onChange={e => setSelectedSnomed(e.target.value)}
//                 >
//                     {snomedOptions.map((option) => (
//                         <MenuItem key={option} value={option}>{option}</MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//             {selectedSnomed && <Line data={data} />}
//         </Box>
//     );
// };

// export default ViewCharts;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   useEffect(() => {
//     fetchSnomedOptions();
//   }, []);

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const fetchSnomedOptions = async () => {
//     // Example: Fetch SNOMED options from your API
//     // You need to implement this part based on how you're fetching the SNOMED codes list
//   };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.get(`/api/your-endpoint-for-observations/${snomedCode}`);
//       const observations = response.data.observations;
//       const desired = response.data.desired;
      
//       setChartData({
//         labels: observations.map((_, index) => `Session ${index + 1}`),
//         datasets: [
//           {
//             label: 'Observation Values',
//             data: observations,
//             borderColor: 'rgb(54, 162, 235)',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//           },
//           {
//             label: 'Desired Value',
//             data: Array(observations.length).fill(desired),
//             borderColor: 'rgb(255, 99, 132)',
//             borderDash: [5, 5],
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map((option) => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {selectedSnomed && <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />}
//     </Box>
//   );
// };

// export default ViewCharts;


//semi works
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   useEffect(() => {
//     // Assuming /desired endpoint returns all SNOMED codes and their desired values
//     axios.get('/desired').then(response => {
//       setSnomedOptions(response.data.map(item => item[0])); // Assuming data is an array of [SNOMED code, desired value] pairs
//     });
//   }, []);

//   useEffect(() => {
//     if (selectedSnomed) {
//       axios.get(`/chart-data/${selectedSnomed}`).then(response => {
//         const { observations, desired } = response.data;
//         setChartData({
//           labels: observations.map((_, index) => `Session ${index + 1}`),
//           datasets: [
//             {
//               label: 'Observation Values',
//               data: observations,
//               borderColor: 'rgb(54, 162, 235)',
//               backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             },
//             {
//               label: 'Desired Value',
//               data: Array(observations.length).fill(desired),
//               borderColor: 'rgb(255, 99, 132)',
//               borderDash: [5, 5],
//             },
//           ],
//         });
//       });
//     }
//   }, [selectedSnomed]);

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map((option) => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {selectedSnomed && <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />}
//     </Box>
//   );
// };

// export default ViewCharts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   useEffect(() => {
//     fetchSnomedOptions();
//   }, []);

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const fetchSnomedOptions = async () => {
//     // Fetch SNOMED options from your API
//     try {
//       const response = await axios.get('/desired'); // Adjust this endpoint as needed
//       setSnomedOptions(response.data.map(item => item[0])); // Assuming the response format matches your structure
//     } catch (error) {
//       console.error("Failed to fetch SNOMED options:", error);
//     }
//   };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.get(`/chart-data/${snomedCode}`);
//       // Check if the response data contains the observations and desired keys
//       if(response.data && response.data.observations && response.data.desired !== undefined) {
//         const observations = response.data.observations;
//         const desired = response.data.desired;
  
//         // Filter out undefined observations and generate labels and data arrays
//         const validObservations = observations.filter(obs => obs !== undefined);
//         const labels = validObservations.map((_, index) => `Session ${index + 1}`);
//         const data = validObservations;
  
//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               label: 'Observation Values',
//               data: data,
//               borderColor: 'rgb(54, 162, 235)',
//               backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             },
//             {
//               label: 'Desired Value',
//               data: Array(validObservations.length).fill(desired),
//               borderColor: 'rgb(255, 99, 132)',
//               borderDash: [5, 5],
//             },
//           ],
//         });
//       } else {
//         // Handle the case where observations or desired are not in the expected format
//         console.error("Unexpected response format:", response.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

// const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode: snomedCode });
//       // Ensure that the observations array is defined and filter out undefined values
//       const observations = response.data.observations ? response.data.observations.filter(obs => obs !== undefined) : [];
//       const desired = response.data.desired;
        
//       // Construct chart data only if observations are present
//     if (observations.length > 0) {
//         setChartData({
//             labels: observations.map((_, index) => `Session ${index + 1}`),
//             datasets: [
//                 {
//                     label: 'Observation Values',
//                     data: observations,
//                     borderColor: 'rgb(54, 162, 235)',
//                     backgroundColor: 'rgba(54, 162, 235, 0.5)',
//                 },
//                 {
//                     label: 'Desired Value',
//                     // Fill the desired value across the length of observations to create a horizontal line
//                     data: Array(observations.length).fill(desired),
//                     borderColor: 'rgb(255, 99, 132)',
//                     borderDash: [5, 5],
//                 },
//             ],
//         });
//     } else {
//         // Handle case where there are no observations (e.g., clear the chart or display a message)
//         setChartData({});
//         console.warn("No observations found for SNOMED code:", snomedCode);
//     }
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//       setChartData({});
//     }
//   };
  
// const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode: snomedCode });
//       // Convert each observation from string to number, filtering out any undefined values
//       const observations = Array.isArray(response.data.observations) 
//         ? response.data.observations
//             .filter(obs => obs !== undefined)
//             .map(obs => parseInt(obs, 10)) // Convert string to integer
//         : [];
//       const desired = parseInt(response.data.desired, 10); // Also convert desired value to integer
      
//       // Check if the conversion results in valid numbers (not NaN)
//       const validObservations = observations.filter(obs => !isNaN(obs));
//       const validDesired = !isNaN(desired) ? desired : undefined;
        
//       // Proceed only if there are valid observations
//       if (validObservations.length > 0 && validDesired !== undefined) {
//         setChartData({
//           labels: validObservations.map((_, index) => `Session ${index + 1}`),
//           datasets: [
//             {
//               label: 'Observation Values',
//               data: validObservations,
//               borderColor: 'rgb(54, 162, 235)',
//               backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             },
//             {
//               label: 'Desired Value',
//               data: Array(validObservations.length).fill(validDesired),
//               borderColor: 'rgb(255, 99, 132)',
//               borderDash: [5, 5],
//             },
//           ],
//         });
//       } else {
//         // Handle the case where no valid observations or desired value are present
//         console.warn("Invalid or missing observations for SNOMED code:", snomedCode);
//         setChartData({});
//       }
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//       setChartData({});
//     }
//   };
  
  
  

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map((option) => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {selectedSnomed && (
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: 'top',
//               },
//               title: {
//                 display: true,
//                 text: `SNOMED ${selectedSnomed} Observation Chart`,
//               },
//             },
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default ViewCharts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// // Registering the necessary components for the chart
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   // Fetch SNOMED options upon component mount
//   useEffect(() => {
//     fetchSnomedOptions();
//   }, []);

//   // Fetch chart data whenever a new SNOMED code is selected
//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const fetchSnomedOptions = async () => {
//     try {
//       const response = await axios.get('/desired'); // Adjust as needed to match your API
//       setSnomedOptions(response.data.map(item => item[0]));
//     } catch (error) {
//       console.error("Failed to fetch SNOMED options:", error);
//     }
//   };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode });
//       const data = response.data;
//       const observations = data.observations.map(Number); // Convert string array to numbers
//       const desired = Number(data.desired);

//       // Preparing data for the chart
//       setChartData({
//         labels: observations.map((_, index) => `Session ${index + 1}`),
//         datasets: [
//           {
//             label: 'Observation Values',
//             data: observations,
//             borderColor: 'rgb(54, 162, 235)',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//           },
//           {
//             label: 'Desired Value',
//             data: Array(observations.length).fill(desired),
//             borderColor: 'rgb(255, 99, 132)',
//             borderDash: [5, 5],
//           },
//         ],
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map(option => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       {selectedSnomed && (
//         <Line
//           data={chartData}
//           options={{
//             responsive: true,
//             plugins: {
//               legend: { position: 'top' },
//               title: {
//                 display: true,
//                 text: `Observations for SNOMED ${selectedSnomed}`,
//               },
//             },
//           }}
//         />
//       )}
//     </Box>
//   );
// };

// export default ViewCharts;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [observations, setObservations] = useState([]);
//   const [desired, setDesired] = useState(0);
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   useEffect(() => {
//     fetchSnomedOptions();
//   }, []);

//   const fetchSnomedOptions = async () => {
//     try {
//       const response = await axios.get('/desired');
//       setSnomedOptions(response.data.map(item => item[0]));
//     } catch (error) {
//       console.error("Failed to fetch SNOMED options:", error);
//     }
//   };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode });
//       setObservations(response.data.observations.map(Number));
//       setDesired(Number(response.data.desired));
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const maxValue = Math.max(...observations, desired);
//   const minValue = Math.min(...observations, desired);
//   const scaleY = (value) => (1 - (value - minValue) / (maxValue - minValue)) * 100;

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map(option => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ border: '1px solid black', mt: 2, height: '300px', position: 'relative' }}>
//         {observations.map((value, index) => (
//           <React.Fragment key={index}>
//             {/* Line segments */}
//             {index < observations.length - 1 && (
//               <line
//                 x1={`${(index / (observations.length - 1)) * 100}%`}
//                 y1={`${scaleY(value)}%`}
//                 x2={`${((index + 1) / (observations.length - 1)) * 100}%`}
//                 y2={`${scaleY(observations[index + 1])}%`}
//                 stroke="blue"
//                 strokeWidth="2"
//                 style={{ position: 'absolute' }}
//               />
//             )}
//             {/* Points */}
//             <circle
//               cx={`${(index / (observations.length - 1)) * 100}%`}
//               cy={`${scaleY(value)}%`}
//               r="5"
//               fill="red"
//               style={{ position: 'absolute' }}
//             />
//           </React.Fragment>
//         ))}
//         {/* Desired line */}
//         <line
//           x1="0%"
//           y1={`${scaleY(desired)}%`}
//           x2="100%"
//           y2={`${scaleY(desired)}%`}
//           stroke="green"
//           strokeWidth="2"
//           strokeDasharray="5,5"
//           style={{ position: 'absolute' }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ViewCharts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [observations, setObservations] = useState([]);
//   const [desired, setDesired] = useState(0);
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   useEffect(() => {
//     fetchSnomedOptions();
//   }, []);

//   const fetchSnomedOptions = async () => {
//     try {
//       const response = await axios.get('/desired');
//       setSnomedOptions(response.data.map(item => item[0]));
//     } catch (error) {
//       console.error("Failed to fetch SNOMED options:", error);
//     }
//   };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode });
//       setObservations(response.data.observations.map(Number));
//       setDesired(Number(response.data.desired));
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const maxValue = Math.max(...observations, desired);
//   const minValue = Math.min(...observations, desired);
//   const scaleY = (value) => (1 - (value - minValue) / (maxValue - minValue)) * 300; // Height of SVG is 300px

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map(option => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ border: '1px solid black', mt: 2, height: '300px', position: 'relative' }}>
//         <svg width="100%" height="100%" viewBox="0 0 100 300">
//           {observations.map((value, index) => (
//             <React.Fragment key={index}>
//               {/* Line segments */}
//               {index < observations.length - 1 && (
//                 <line
//                   x1={`${(index / (observations.length - 1)) * 100}`}
//                   y1={`${scaleY(value)}`}
//                   x2={`${((index + 1) / (observations.length - 1)) * 100}`}
//                   y2={`${scaleY(observations[index + 1])}`}
//                   stroke="blue"
//                   strokeWidth="2"
//                 />
//               )}
//               {/* Points */}
//               <circle
//                 cx={`${(index / (observations.length - 1)) * 100}`}
//                 cy={`${scaleY(value)}`}
//                 r="5"
//                 fill="red"
//               />
//             </React.Fragment>
//           ))}
//           {/* Desired line */}
//           <line
//             x1="0"
//             y1={`${scaleY(desired)}`}
//             x2="100"
//             y2={`${scaleY(desired)}`}
//             stroke="green"
//             strokeWidth="2"
//             strokeDasharray="5,5"
//           />
//         </svg>
//       </Box>
//     </Box>
//   );
// };

// export default ViewCharts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const ViewCharts = () => {
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [observations, setObservations] = useState([]);
//   const [desired, setDesired] = useState(0);
//   const [snomedOptions, setSnomedOptions] = useState([]);

//   useEffect(() => {
//     fetchSnomedOptions();
//   }, []);

//   const fetchSnomedOptions = async () => {
//     try {
//       const response = await axios.get('/desired');
//       setSnomedOptions(response.data.map(item => item[0]));
//     } catch (error) {
//       console.error("Failed to fetch SNOMED options:", error);
//     }
//   };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode });
//       setObservations(response.data.observations.map(Number));
//       setDesired(Number(response.data.desired));
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const maxValue = Math.max(...observations, desired);
//   const minValue = Math.min(...observations, desired);
//   const scaleY = (value) => (1 - (value - minValue) / (maxValue - minValue)) * 300; // Height of SVG is 300px

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <Typography variant="h4" gutterBottom>SNOMED Observation Chart</Typography>
//       <FormControl fullWidth>
//         <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//         <Select
//           labelId="snomed-select-label"
//           value={selectedSnomed}
//           label="SNOMED Code"
//           onChange={(e) => setSelectedSnomed(e.target.value)}
//         >
//           {snomedOptions.map(option => (
//             <MenuItem key={option} value={option}>{option}</MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//       <Box sx={{ border: '1px solid black', mt: 2, height: '300px', position: 'relative' }}>
//         <svg width="100%" height="100%" viewBox="0 0 100 300">
//           {/* Y-axis */}
//           <line x1="10" y1="0" x2="10" y2="300" stroke="black" />
//           {/* X-axis */}
//           <line x1="10" y1="300" x2="100" y2="300" stroke="black" />
//           {/* Data points and lines */}
//           {observations.map((value, index) => (
//             <React.Fragment key={index}>
//               {index < observations.length - 1 && (
//                 <line
//                   x1={`${10 + (index / (observations.length - 1)) * 90}`}
//                   y1={`${scaleY(value)}`}
//                   x2={`${10 + ((index + 1) / (observations.length - 1)) * 90}`}
//                   y2={`${scaleY(observations[index + 1])}`}
//                   stroke="blue"
//                   strokeWidth="2"
//                 />
//               )}
//               <circle
//                 cx={`${10 + (index / (observations.length - 1)) * 90}`}
//                 cy={`${scaleY(value)}`}
//                 r="3"
//                 fill="red"
//               />
//             </React.Fragment>
//           ))}
//           {/* Desired value line */}
//           <line
//             x1="10"
//             y1={`${scaleY(desired)}`}
//             x2="100"
//             y2={`${scaleY(desired)}`}
//             stroke="green"
//             strokeWidth="2"
//             strokeDasharray="5,5"
//           />
//           {/* Y-axis label */}
//           <text x="50" y="15" fill="black">SNOMED Value</text>
//           {/* X-axis label */}
//           <text x="95" y="295" fill="black" textAnchor="end">Session</text>
//         </svg>
//       </Box>
//     </Box>
//   );
// };

// export default ViewCharts;


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
      
      // Prepare the labels and data for the chart
      const labels = observations.map((_, index) => `Session ${index + 1}`);
      const data = observations.map(value => value !== undefined ? value : NaN); // Chart.js skips NaN values

      // Update the chart data state
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
                  // Increase radius for non-NaN values
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
