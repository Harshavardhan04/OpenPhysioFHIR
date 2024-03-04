
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm, useFieldArray } from "react-hook-form";
// import { useTheme } from "@mui/material/styles";
// import {
//   Box, Typography, Button, IconButton, Grid, TextField, Paper, Dialog,
//   DialogActions, DialogTitle, DialogContent, DialogContentText, Collapse, TableContainer, Table, TableHead, TableRow, TableCell, TableBody
// } from "@mui/material";
// import SaveIcon from '@mui/icons-material/Save';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Desired from '../Desired/Desired'; // Make sure Desired is correctly imported
// import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [showDesired, setShowDesired] = useState(false); // State to control visibility of Desired
//   const [sessionValues, setSessionValues] = useState([]);
//   const [consultationNote, setConsultationNote] = useState('');
//   const { register, control, handleSubmit, setValue } = useForm({
//     defaultValues: {
//       notes: '',
//       sessionValues: [{ snowmedName: '', loincName: '', value: '' }]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "sessionValues"
//   });

//   const [patientProfile, setPatientProfile] = useState({
//     name: '',
//     dob: '',
//     patientID: ''
//   });

//   useEffect(() => {
//     axios.get("http://localhost:5000/profile")
//       .then(({ data }) => {
//         const patientName = data.name[0].text;
//         const dob = data.birthDate;
//         const patientID = data.id;

//         setPatientProfile({
//           name: patientName,
//           dob: dob,
//           patientID: patientID
//         });

//         setValue('notes', data.notes);
//         setValue('sessionValues', data.measurements);
//       })
//       .catch((error) => {
//         console.error("Error fetching patient profile:", error);
//       });

//       axios.get('/last-consultation')
//       .then(({ data }) => {
//         if (data.error) {
//           console.error("Error fetching consultation data:", data.error);
//           return;
//         }

//         // Assuming data returns as { latest_observations: {...}, latest_note: '...' }
//         const latestObservations = data.latest_observations;
//         const latestNote = data.latest_note;
//         console.log(latestNote)

//         // Transforming latest observations to match the sessionValues structure
//         const measurementsArray = Object.entries(latestObservations).map(([snowmedName, value]) => ({
//           snowmedName,
//           loincName: '', // Assuming no direct LOINC mapping provided
//           value,
//         }));

//         setSessionValues(measurementsArray);
//         setConsultationNote(latestNote);
//       })
//       .catch((error) => {
//         console.error("Error fetching consultation data:", error);
//       });
//   }, [setValue]);

//   const onSubmit = (formData) => {
//     const sessionData = {
//       notes: formData.notes,
//       measurements: formData.sessionValues.map(value => ({
//         snowmedName: value.snowmedName,
//         loincName: value.loincName,
//         value: value.value,
//       }))
//     };

//     axios.post('/profile', sessionData)
//       .then(response => {
//         console.log("Session saved", response.data);
//         setShowSuccessDialog(true);
//       })
//       .catch(error => {
//         console.error("Error saving session:", error);
//       });
//   };

//   const toggleDesired = () => setShowDesired(!showDesired);

//   const SuccessDialog = () => (
//     <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
//       <DialogTitle>Session Saved Successfully</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           The session data has been saved successfully.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => navigate('/past-data')}>View Past Data</Button>
//         <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <Box sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       margin: theme.spacing(4),
//       padding: theme.spacing(3),
//       backgroundColor: '#fff',
//       borderRadius: theme.shape.borderRadius,
//       boxShadow: theme.shadows[2]
//     }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
//           <Typography variant="h4" gutterBottom>Patient Details</Typography>
//           <Typography variant="body1"><strong>Name:</strong> {patientProfile.name}</Typography>
//           <Typography variant="body1"><strong>DOB:</strong> {patientProfile.dob}</Typography>
//           <Typography variant="body1"><strong>Patient ID:</strong> {patientProfile.patientID}</Typography>
//         </Paper>

//         {/* <h2>Latest Consultation Note</h2>
//       <p>{consultationNote}</p>

//       <h2>Latest Observations</h2>
//       {sessionValues.map((item, index) => (
//         <div key={index}>
//           <p><strong>SNOMED:</strong> {item.snowmedName}</p>
//           <p><strong>Value:</strong> {item.value}</p>
//         </div>
//       ))} */}

// <Box sx={{ my: 4, maxWidth: '80%', marginLeft: 0 }}>
//   <Typography variant="h4" gutterBottom>
//     Latest Consultation Details
//   </Typography>

//   <TableContainer component={Paper}>
//     <Table sx={{ minWidth: 650 }} align="left">
//       <TableBody>
//         <TableRow>
//           <TableCell><strong>Consultation Note:</strong></TableCell>
//           <TableCell>{consultationNote}</TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell><strong>SNOMED</strong></TableCell>
//           <TableCell><strong>Value</strong></TableCell>
//         </TableRow>
//         {sessionValues.map((item, index) => (
//           <TableRow key={index}>
//             <TableCell>{item.snowmedName}</TableCell>
//             <TableCell>{item.value}</TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   </TableContainer>
// </Box>


//  <Typography variant="h4" gutterBottom>
//     Today's Consultation
//   </Typography>

//         <TextField
//           label="Problem Description"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           multiline
//           rows={4}
//           {...register("notes")}
//         />

//         <Typography sx={{ mt: 4, mb: 2 }}>Session Values:</Typography>
//         <Grid container spacing={2}>
//           {fields.map((item, index) => (
//             <Grid item xs={12} key={item.id}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <TextField
//                   label={`SNOMED Name ${index + 1}`}
//                   variant="outlined"
//                   sx={{ mr: 1, flex: 1 }}
//                   {...register(`sessionValues.${index}.snowmedName`)}
//                 />
//                 <TextField
//                   label={`LOINC Name ${index + 1}`}
//                   variant="outlined"
//                   sx={{ mr: 1, flex: 1 }}
//                   {...register(`sessionValues.${index}.loincName`)}
//                 />
//                 <TextField
//                   label={`Value ${index + 1}`}
//                   variant="outlined"
//                   sx={{ mr: 1, flex: 1 }}
//                   {...register(`sessionValues.${index}.value`)}
//                 />
//                 <IconButton aria-label="delete" onClick={() => remove(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Grid>
//           ))}
//           <IconButton color="primary" aria-label="add field" onClick={() => append({ snowmedName: '', loincName: '', value: '' })}>
//             <AddCircleOutlineIcon />
//           </IconButton>
//         </Grid>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing(2), mt: 4 }}>
//           <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
//         </Box>
//       </form>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => navigate('/view-charts')}
//         sx={{ mt: 2 }} // Adjust styling as needed
//       >
//         View Charts
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={toggleDesired}
//         sx={{ mt: 2 }}
//       >
//         {showDesired ? 'Hide Desired SNOMED Values' : 'Manage Desired SNOMED Values'}
//       </Button>

//       <Collapse in={showDesired}>
//         <Desired />
//       </Collapse>
//       <SuccessDialog />
//     </Box>
//   ); 
// }

// export default Dashboard;




//v2 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm, useFieldArray } from "react-hook-form";
// import { useTheme } from "@mui/material/styles";
// import {
//   Box, Typography, Button, IconButton, Grid, TextField, Paper, Dialog,
//   DialogActions, DialogTitle, DialogContent, DialogContentText, Collapse, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Switch, FormControlLabel
// } from "@mui/material";
// import SaveIcon from '@mui/icons-material/Save';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Desired from '../Desired/Desired'; // Make sure Desired is correctly imported
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const navigate = useNavigate();
//   const theme = useTheme();
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
//   const [showDesired, setShowDesired] = useState(false);
//   const [showGraphicalView, setShowGraphicalView] = useState(false);
//   const [sessionValues, setSessionValues] = useState([]);
//   const [consultationNote, setConsultationNote] = useState('');
//   const { register, control, handleSubmit, setValue } = useForm({
//     defaultValues: {
//       notes: '',
//       sessionValues: [{ snowmedName: '', loincName: '', value: '' }]
//     }
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "sessionValues"
//   });

//   const [patientProfile, setPatientProfile] = useState({
//     name: '',
//     dob: '',
//     patientID: ''
//   });



//   useEffect(() => {
//     axios.get("http://localhost:5000/profile")
//       .then(({ data }) => {
//         const patientName = data.name[0].text;
//         const dob = data.birthDate;
//         const patientID = data.id;

//         setPatientProfile({
//           name: patientName,
//           dob: dob,
//           patientID: patientID
//         });

//         setValue('notes', data.notes);
//         setValue('sessionValues', data.measurements);
//       })
//       .catch((error) => {
//         console.error("Error fetching patient profile:", error);
//       });

//     axios.get('/last-consultation')
//       .then(({ data }) => {
//         if (data.error) {
//           console.error("Error fetching consultation data:", data.error);
//           return;
//         }

//         const latestObservations = data.latest_observations;
//         const latestNote = data.latest_note;

//         const measurementsArray = Object.entries(latestObservations).map(([snowmedName, value]) => ({
//           snowmedName,
//           loincName: '',
//           value,
//         }));

//         setSessionValues(measurementsArray);
//         setConsultationNote(latestNote);
//       })
//       .catch((error) => {
//         console.error("Error fetching consultation data:", error);
//       });
//   }, [setValue]);

//   const onSubmit = (formData) => {
//     const sessionData = {
//       notes: formData.notes,
//       measurements: formData.sessionValues.map(value => ({
//         snowmedName: value.snowmedName,
//         loincName: value.loincName,
//         value: value.value,
//       }))
//     };

//     axios.post('/profile', sessionData)
//       .then(response => {
//         console.log("Session saved", response.data);
//         setShowSuccessDialog(true);
//       })
//       .catch(error => {
//         console.error("Error saving session:", error);
//       });
//   };

//   const toggleDesired = () => setShowDesired(!showDesired);
//   const handleGraphicalViewChange = (event) => {
//     setShowGraphicalView(event.target.checked);
//   };
//   const [isSessionActive, setIsSessionActive] = useState(false);

//   // Define the handler for changing the state
//   const handleToggle = (event) => {
//     setIsSessionActive(event.target.checked);
//   };

//   const SuccessDialog = () => (
//     <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
//       <DialogTitle>Session Saved Successfully</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           The session data has been saved successfully.
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => navigate('/past-data')}>View Past Data</Button>
//         <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );

//   return (
//     <Box sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       margin: theme.spacing(4),
//       padding: theme.spacing(3),
//       backgroundColor: '#fff',
//       borderRadius: theme.shape.borderRadius,
//       boxShadow: theme.shadows[2]
//     }}>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
//           <Typography variant="h4" gutterBottom>Patient Details</Typography>
//           <Typography variant="body1"><strong>Name:</strong> {patientProfile.name}</Typography>
//           <Typography variant="body1"><strong>DOB:</strong> {patientProfile.dob}</Typography>
//           <Typography variant="body1"><strong>Patient ID:</strong> {patientProfile.patientID}</Typography>
//         </Paper>
  
//         {/* Inserting the toggle switch at the desired location */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//           <Typography variant="h4">Manage Session</Typography>
//           <Switch
//             checked={isSessionActive}
//             onChange={handleToggle}
//             name="sessionToggle"
//             inputProps={{ 'aria-label': 'secondary checkbox' }}
//           />
//         </Box>
  
//         <Box sx={{ my: 4, maxWidth: '80%', marginLeft: 0 }}>
//           <Typography variant="h4" gutterBottom>
//             Latest Consultation Details
//           </Typography>
  
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 650 }} align="left">
//               <TableBody>
//                 <TableRow>
//                   <TableCell><strong>Consultation Note:</strong></TableCell>
//                   <TableCell>{consultationNote}</TableCell>
//                 </TableRow>
//                 <TableRow>
//                   <TableCell><strong>SNOMED</strong></TableCell>
//                   <TableCell><strong>Value</strong></TableCell>
//                 </TableRow>
//                 {sessionValues.map((item, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{item.snowmedName}</TableCell>
//                     <TableCell>{item.value}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
  
//         <Typography variant="h4" gutterBottom>
//           Today's Consultation
//         </Typography>
  
//         <TextField
//           label="Problem Description"
//           variant="outlined"
//           margin="normal"
//           fullWidth
//           multiline
//           rows={4}
//           {...register("notes")}
//         />
  
//         <Typography sx={{ mt: 4, mb: 2 }}>Session Values:</Typography>
//         <Grid container spacing={2}>
//           {fields.map((item, index) => (
//             <Grid item xs={12} key={item.id}>
//               <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                 <TextField
//                   label={`SNOMED Name ${index + 1}`}
//                   variant="outlined"
//                   sx={{ mr: 1, flex: 1 }}
//                   {...register(`sessionValues.${index}.snowmedName`)}
//                 />
//                 <TextField
//                   label={`LOINC Name ${index + 1}`}
//                   variant="outlined"
//                   sx={{ mr: 1, flex: 1 }}
//                   {...register(`sessionValues.${index}.loincName`)}
//                 />
//                 <TextField
//                   label={`Value ${index + 1}`}
//                   variant="outlined"
//                   sx={{ mr: 1, flex: 1 }}
//                   {...register(`sessionValues.${index}.value`)}
//                 />
//                 <IconButton aria-label="delete" onClick={() => remove(index)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Grid>
//           ))}
//           <IconButton color="primary" aria-label="add field" onClick={() => append({ snowmedName: '', loincName: '', value: '' })}>
//             <AddCircleOutlineIcon />
//           </IconButton>
//         </Grid>
  
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing(2), mt: 4 }}>
//           <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
//         </Box>
//       </form>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => navigate('/view-charts')}
//         sx={{ mt: 2 }}
//       >
//         View Charts
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={toggleDesired}
//         sx={{ mt: 2 }}
//       >
//         {showDesired ? 'Hide Desired SNOMED Values' : 'Manage Desired SNOMED Values'}
//       </Button>
  
//       <Collapse in={showDesired}>
//         <Desired />
//       </Collapse>
//       <SuccessDialog />
//     </Box>
//   );
  
  
// }

// export default Dashboard;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const UserConsultationComponent = () => {
//   const [view, setView] = useState('tabular'); // 'tabular' or 'graphical'
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
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
//       const observations = response.data.observations;
//       const desired = response.data.desired;

//       const labels = observations.map((_, index) => `Session ${index + 1}`);
//       const data = observations.map(value => value !== undefined ? value : NaN);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Observation Values',
//             data,
//             borderColor: 'rgb(54, 162, 235)',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             fill: false,
//             tension: 0.4
//           },
//           {
//             label: 'Desired Value',
//             data: Array(labels.length).fill(desired),
//             borderColor: 'rgb(255, 99, 132)',
//             borderDash: [5, 5],
//             fill: false
//           }
//         ]
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   const handleViewChange = (event, nextView) => {
//     if (nextView !== null) {
//       setView(nextView);
//     }
//   };

//   return (
//     <Box sx={{ width: '100%', mt: 4 }}>
//       <ToggleButtonGroup
//         color="primary"
//         value={view}
//         exclusive
//         onChange={handleViewChange}
//       >
//         <ToggleButton value="tabular">Tabular View</ToggleButton>
//         <ToggleButton value="graphical">Graphical View</ToggleButton>
//       </ToggleButtonGroup>
      
//       {view === 'tabular' && (
//         <>
//           <Typography variant="h4" gutterBottom>User's Latest Consultation Details</Typography>
//           {/* Display user's latest consultation details here */}
//           <Button variant="contained" onClick={() => {/* Navigate to past data page */}}>
//             Show More Data
//           </Button>
//         </>
//       )}

//       {view === 'graphical' && (
//         <>
//           <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//           <FormControl fullWidth>
//             <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//             <Select
//               labelId="snomed-select-label"
//               value={selectedSnomed}
//               label="SNOMED Code"
//               onChange={(e) => setSelectedSnomed(e.target.value)}
//             >
//               {snomedOptions.map((option) => (
//                 <MenuItem key={option} value={option}>{option}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           {selectedSnomed && chartData.labels && (
//             <Line
//               data={chartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   title: {
//                     display: true,
//                     text: `SNOMED ${selectedSnomed} Observation Chart`,
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     grace: '5%',
//                   }
//                 },
//                 interaction: {
//                   mode: 'index',
//                   intersect: false,
//                 },
//                 elements: {
//                   point: {
//                     radius: (context) => {
//                       return context.raw !== NaN ? 5 : 0;
//                     }
//                   }
//                 }
//               }}
//             />
//           )}
//         </>
//       )}
//     </Box>
//   );
// };

// export default UserConsultationComponent;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem, Container, Grid } from '@mui/material';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const [view, setView] = useState('tabular');
//   const [lastConsultation, setLastConsultation] = useState(null);
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);
//   const navigate = useNavigate();

//   // Fetch last consultation details
//   useEffect(() => {
//     const fetchLastConsultation = async () => {
//       try {
//         const response = await axios.get('/last-consultation');
//         setLastConsultation(response.data);
//       } catch (error) {
//         console.error("Failed to fetch last consultation:", error);
//       }
//     };

//     fetchLastConsultation();
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
//       const observations = response.data.observations;
//       const desired = response.data.desired;

//       const labels = observations.map((_, index) => `Session ${index + 1}`);
//       const data = observations.map(value => value !== undefined ? value : NaN);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Observation Values',
//             data,
//             borderColor: 'rgb(54, 162, 235)',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             fill: false,
//             cubicInterpolationMode: 'monotone',
//             tension: 0.4
//           },
//           {
//             label: 'Desired Value',
//             data: Array(labels.length).fill(desired),
//             borderColor: 'rgb(255, 99, 132)',
//             borderDash: [5, 5],
//             fill: false
//           }
//         ]
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   return (
//     <Container>
//       <Box sx={{ mb: 4, mt: 2 }}>
//         <Button variant="contained" onClick={() => setView('tabular')}>Tabular View</Button>
//         <Button variant="contained" onClick={() => setView('graphical')}>Graphical View</Button>
//       </Box>

//       {view === 'tabular' && (
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <Typography variant="h5">Last Consultation Details</Typography>
//             {lastConsultation ? (
//               <Typography>{`Detail: ${lastConsultation.detail}`}</Typography>
//             ) : (
//               <Typography>No data available</Typography>
//             )}
//             <Button variant="contained" onClick={() => navigate('/past-data')}>Show More Data</Button>
//           </Grid>
//         </Grid>
//       )}

//       {view === 'graphical' && (
//         <Box sx={{ width: '100%', mt: 4 }}>
//           <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//           <FormControl fullWidth>
//             <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//             <Select
//               labelId="snomed-select-label"
//               value={selectedSnomed}
//               label="SNOMED Code"
//               onChange={(e) => setSelectedSnomed(e.target.value)}
//             >
//               {snomedOptions.map((option) => (
//                 <MenuItem key={option} value={option}>{option}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           {selectedSnomed && chartData.labels && (
//             <Line
//               data={chartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   title: {
//                     display: true,
//                     text: `SNOMED ${selectedSnomed} Observation Chart`,
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     grace: '5%',
//                   }
//                 },
//                 interaction: {
//                   mode: 'index',
//                   intersect: false,
//                 },
//                 elements: {
//                   point: {
//                     radius: (context) => {
//                       return context.raw !== NaN ? 5 : 0;
//                     }
//                   }
//                 }
//               }}
//             />
//           )}
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';
// import {
//   Box,
//   Typography,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Container,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper
// } from '@mui/material';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const [view, setView] = useState('tabular');
//   const [sessionValues, setSessionValues] = useState([]);
//   const [consultationNote, setConsultationNote] = useState('');
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLastConsultation = async () => {
//       try {
//         const { data } = await axios.get('/last-consultation');
//         if (data.error) {
//           console.error("Error fetching consultation data:", data.error);
//           return;
//         }

//         const latestObservations = data.latest_observations;
//         const latestNote = data.latest_note;

//         const measurementsArray = Object.entries(latestObservations).map(([snowmedName, value]) => ({
//           snowmedName,
//           loincName: '',
//           value,
//         }));

//         setSessionValues(measurementsArray);
//         setConsultationNote(latestNote);
//       } catch (error) {
//         console.error("Failed to fetch last consultation:", error);
//       }
//     };

//     fetchLastConsultation();
//     fetchSnomedOptions();
//   }, []);

  // const fetchSnomedOptions = async () => {
  //   try {
  //     const response = await axios.get('/desired');
  //     setSnomedOptions(response.data.map(item => item[0]));
  //   } catch (error) {
  //     console.error("Failed to fetch SNOMED options:", error);
  //   }
  // };

//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode });
//       const observations = response.data.observations;
//       const desired = response.data.desired;

//       const labels = observations.map((_, index) => `Session ${index + 1}`);
//       const data = observations.map(value => value !== undefined ? value : NaN);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Observation Values',
//             data,
//             borderColor: 'rgb(54, 162, 235)',
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             fill: false,
//             cubicInterpolationMode: 'monotone',
//             tension: 0.4
//           },
//           {
//             label: 'Desired Value',
//             data: Array(labels.length).fill(desired),
//             borderColor: 'rgb(255, 99, 132)',
//             borderDash: [5, 5],
//             fill: false
//           }
//         ]
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   return (
//     <Container>
//       <Box sx={{ mb: 4, mt: 2 }}>
//         <Button variant="contained" onClick={() => setView('tabular')}>Tabular View</Button>
//         <Button variant="contained" onClick={() => setView('graphical')}>Graphical View</Button>
//       </Box>

//       {view === 'tabular' && (
//         <>
//           <Box sx={{ my: 4, maxWidth: '80%', marginLeft: 0 }}>
//             <Typography variant="h4" gutterBottom>
//               Latest Consultation Details
//             </Typography>

//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} align="left">
//                 <TableBody>
//                   <TableRow>
//                     <TableCell><strong>Consultation Note:</strong></TableCell>
//                     <TableCell>{consultationNote}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell><strong>SNOMED</strong></TableCell>
//                     <TableCell><strong>Value</strong></TableCell>
//                   </TableRow>
//                   {sessionValues.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{item.snowmedName}</TableCell>
//                       <TableCell>{item.value}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Box>
//           <Button variant="contained" onClick={() => navigate('/past-data')}>Show More Data</Button>
//         </>
//       )}

//       {view === 'graphical' && (
//         <Box sx={{ width: '100%', mt: 4 }}>
//           <Typography variant="h4" gutterBottom>Select SNOMED Code</Typography>
//           <FormControl fullWidth>
//             <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//             <Select
//               labelId="snomed-select-label"
//               value={selectedSnomed}
//               label="SNOMED Code"
//               onChange={(e) => setSelectedSnomed(e.target.value)}
//             >
//               {snomedOptions.map((option) => (
//                 <MenuItem key={option} value={option}>{option}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           {selectedSnomed && chartData.labels && (
//             <Line
//               data={chartData}
//               options={{
//                 responsive: true,
//                 plugins: {
//                   legend: {
//                     position: 'top',
//                   },
//                   title: {
//                     display: true,
//                     text: `SNOMED ${selectedSnomed} Observation Chart`,
//                   },
//                 },
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     grace: '5%',
//                   }
//                 },
//                 interaction: {
//                   mode: 'index',
//                   intersect: false,
//                 },
//                 elements: {
//                   point: {
//                     radius: (context) => {
//                       const index = context.dataIndex;
//                       const value = context.dataset.data[index];
//                       return value !== undefined && !isNaN(value) ? 5 : 0;
//                     }
//                   }
//                 }
//               }}
//             />
//           )}
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;

// Import necessary components and hooks from React and Material-UI

// //working component
 
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Paper,
//   useTheme,
// } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register the chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const theme = useTheme();
//   const [view, setView] = useState('tabular');
//   const [sessionValues, setSessionValues] = useState([]);
//   const [consultationNote, setConsultationNote] = useState('');
//   const [selectedSnomed, setSelectedSnomed] = useState('');
//   const [chartData, setChartData] = useState({});
//   const [snomedOptions, setSnomedOptions] = useState([]);
//   const navigate = useNavigate();

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchLastConsultation = async () => {
//       try {
//         const { data } = await axios.get('/last-consultation');
//         if (data.error) {
//           console.error("Error fetching consultation data:", data.error);
//           return;
//         }

//         const latestObservations = data.latest_observations;
//         const latestNote = data.latest_note;

//         const measurementsArray = Object.entries(latestObservations).map(([snowmedName, value]) => ({
//           snowmedName,
//           loincName: '',
//           value,
//         }));

//         setSessionValues(measurementsArray);
//         setConsultationNote(latestNote);
//       } catch (error) {
//         console.error("Failed to fetch last consultation:", error);
//       }
//     };

//     fetchLastConsultation();
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

//   // Fetch chart data based on selected SNOMED code
//   const fetchChartData = async (snomedCode) => {
//     try {
//       const response = await axios.post('/chart-data', { snomedCode });
//       const observations = response.data.observations;
//       const desired = response.data.desired;

//       const labels = observations.map((_, index) => `Session ${index + 1}`);
//       const data = observations.map(value => value !== undefined ? value : NaN);

//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Observation Values',
//             data,
//             borderColor: theme.palette.primary.main,
//             backgroundColor: theme.palette.primary.light,
//             fill: false,
//             cubicInterpolationMode: 'monotone',
//             tension: 0.4
//           },
//           {
//             label: 'Desired Value',
//             data: Array(labels.length).fill(desired),
//             borderColor: theme.palette.secondary.main,
//             borderDash: [5, 5],
//             fill: false
//           }
//         ]
//       });
//     } catch (error) {
//       console.error("Failed to fetch chart data:", error);
//     }
//   };

//   // Update chart when SNOMED code selection changes
//   useEffect(() => {
//     if (selectedSnomed) {
//       fetchChartData(selectedSnomed);
//     }
//   }, [selectedSnomed]);

//   return (
//     <Container>
//       <Box sx={{ mb: 4, mt: 2 }}>
//         <Button variant="contained" color="primary" onClick={() => setView('tabular')}>Tabular View</Button>
//         <Button variant="contained" color="secondary" onClick={() => setView('graphical')}>Graphical View</Button>
//       </Box>

//       {view === 'tabular' && (
//         <Card elevation={4}>
//           <CardContent>
//             <Typography variant="h4" gutterBottom component="div">
//               Latest Consultation Details
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                 <TableBody>
//                   <TableRow>
//                     <TableCell component="th" scope="row"><strong>Consultation Note:</strong></TableCell>
//                     <TableCell>{consultationNote}</TableCell>
//                   </TableRow>
//                   {sessionValues.map((item, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">{item.snowmedName}</TableCell>
//                       <TableCell>{item.value}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box sx={{ mt: 2 }}>
//               <Button variant="contained" color="primary" onClick={() => navigate('/past-data')}>Show More Data</Button>
//             </Box>
//           </CardContent>
//         </Card>
//       )}

//       {view === 'graphical' && (
//         <Card elevation={4}>
//           <CardContent>
//             <Typography variant="h4" gutterBottom component="div">
//               Observation Chart
//             </Typography>
//             <FormControl fullWidth margin="normal">
//               <InputLabel id="snomed-select-label">SNOMED Code</InputLabel>
//               <Select
//                 labelId="snomed-select-label"
//                 value={selectedSnomed}
//                 label="SNOMED Code"
//                 onChange={(e) => setSelectedSnomed(e.target.value)}
//               >
//                 {snomedOptions.map((option) => (
//                   <MenuItem key={option} value={option}>{option}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             {selectedSnomed && chartData.labels && (
//               <Line
//                 data={chartData}
//                 options={{
//                   responsive: true,
//                   plugins: {
//                     legend: {
//                       position: 'top',
//                     },
//                     title: {
//                       display: true,
//                       text: `SNOMED ${selectedSnomed} Observation Chart`,
//                     },
//                   },
//                   scales: {
//                     y: {
//                       beginAtZero: true,
//                       grace: '5%',
//                     }
//                   },
//                   interaction: {
//                     mode: 'index',
//                     intersect: false,
//                   },
//                   elements: {
//                     point: {
//                       radius: (context) => {
//                         const index = context.dataIndex;
//                         const value = context.dataset.data[index];
//                         return value !== undefined && !isNaN(value) ? 5 : 0;
//                       }
//                     }
//                   }
//                 }}
//               />
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
// import { useTheme } from "@mui/material/styles";
import {
  Box, Typography, Button, IconButton, Grid, TextField, Paper, Dialog,
  DialogActions, DialogTitle, DialogContent, DialogContentText, Collapse, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Switch, FormControlLabel
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import Desired from '../Desired/Desired'; // Make sure Desired is correctly imported
import { useNavigate } from 'react-router-dom';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState('tabular');
  const theme = useTheme();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDesired, setShowDesired] = useState(false);
  const [showGraphicalView, setShowGraphicalView] = useState(false);
  const [sessionValues, setSessionValues] = useState([]);
  const [selectedSnomed, setSelectedSnomed] = useState('');
  const [consultationNote, setConsultationNote] = useState('');
  const [chartData, setChartData] = useState({});
  const [snomedOptions, setSnomedOptions] = useState([]);
  const [snomedCodesAndValues, setSnomedCodesAndValues] = useState([]); 
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      notes: '',
      sessionValues: [{ snowmedName: '', loincName: '', value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessionValues"
  });

  const [patientProfile, setPatientProfile] = useState({
    name: '',
    dob: '',
    patientID: ''
  });



  useEffect(() => {
    const fetchPatientProfile = () => {
      axios.get("http://localhost:5000/profile")
        .then(({ data }) => {
          const patientName = data.name[0].text;
          const dob = data.birthDate;
          const patientID = data.id;

          setPatientProfile({
            name: patientName,
            dob: dob,
            patientID: patientID
          });

          // Ensure notes and measurements are set correctly if they exist in the response
          if (data.notes) {
            setValue('notes', data.notes);
          }
          if (data.measurements) {
            setValue('sessionValues', data.measurements.map(measurement => ({
              snowmedName: measurement.snowmedName || '',
              loincName: measurement.loincName || '',
              value: measurement.value || '',
            })));
          }
        })
        .catch((error) => {
          console.error("Error fetching patient profile:", error);
        });
    };

    const fetchLastConsultation = async () => {
      try {
        const { data } = await axios.get('/last-consultation');
        if (data.error) {
          console.error("Error fetching consultation data:", data.error);
          return;
        }

        const latestObservations = data.latest_observations;
        const latestNote = data.latest_note;

        const measurementsArray = Object.entries(latestObservations).map(([snowmedName, value]) => ({
          snowmedName,
          loincName: '',
          value,
        }));

        setSessionValues(measurementsArray);
        setConsultationNote(latestNote);
      } catch (error) {
        console.error("Failed to fetch last consultation:", error);
      }
    };

    // Call the functions to fetch data
    fetchPatientProfile();
    fetchLastConsultation();
    fetchSnomedOptions();  // This needs to be defined or imported
  }, [setValue, setPatientProfile, setSessionValues, setConsultationNote]); // Add all dependencies here


  // const fetchSnomedOptions = async () => {
  //   try {
  //     const response = await axios.get('/desired');
  //     setSnomedOptions(response.data.map(item => item[0]));
  //   } catch (error) {
  //     console.error("Failed to fetch SNOMED options:", error);
  //   }
  // };

  //   // Fetch chart data based on selected SNOMED code
  //   const fetchChartData = async (snomedCode) => {
  //       try {
  //         const response = await axios.post('/chart-data', { snomedCode });
  //         const observations = response.data.observations;
  //         const desired = response.data.desired;

  //         const labels = observations.map((_, index) => `Session ${index + 1}`);
  //         const data = observations.map(value => value !== undefined ? value : NaN);

  //         setChartData({
  //           labels,
  //           datasets: [
  //             {
  //               label: 'Observation Values',
  //               data,
  //               borderColor: 'rgb(54, 162, 235)',
  //               backgroundColor: 'rgba(54, 162, 235, 0.5)',
  //               fill: false,
  //               cubicInterpolationMode: 'monotone',
  //               tension: 0.4
  //             },
  //             {
  //               label: 'Desired Value',
  //               data: Array(labels.length).fill(desired),
  //               borderColor: 'rgb(255, 99, 132)',
  //               borderDash: [5, 5],
  //               fill: false
  //             }
  //           ]
  //         });
  //       } catch (error) {
  //         console.error("Failed to fetch chart data:", error);
  //       }
  //     };

  //     // Update chart when SNOMED code selection changes
  //     useEffect(() => {
  //       if (selectedSnomed) {
  //         fetchChartData(selectedSnomed);
  //       }
  //     }, [selectedSnomed]);

  const fetchSnomedOptions = async () => {
    try {
      const response = await axios.get('/desired');
      const snomedOptions = response.data.map(item => item[0]);
      setSnomedOptions(snomedOptions);
      setSnomedCodesAndValues(response.data);

      // Automatically select the first SNOMED code and fetch its chart data
      if (snomedOptions.length > 0) {
        const firstSnomed = snomedOptions[0];
        setSelectedSnomed(firstSnomed);
      }
    } catch (error) {
      console.error("Failed to fetch SNOMED options:", error);
    }
  };

  // Fetch chart data based on selected SNOMED code
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

  // Update chart when SNOMED code selection changes
  useEffect(() => {
    if (selectedSnomed) {
      fetchChartData(selectedSnomed);
    }
  }, [selectedSnomed]);

  const onSubmit = (formData) => {
    const sessionData = {
      notes: formData.notes,
      measurements: formData.sessionValues.map(value => ({
        snowmedName: value.snowmedName,
        loincName: value.loincName,
        value: value.value,
      }))
    };

    axios.post('/profile', sessionData)
      .then(response => {
        console.log("Session saved", response.data);
        setShowSuccessDialog(true);
      })
      .catch(error => {
        console.error("Error saving session:", error);
      });
  };

  const toggleDesired = () => setShowDesired(!showDesired);



  const SuccessDialog = () => (
    <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
      <DialogTitle>Session Saved Successfully</DialogTitle>
      <DialogContent>
        <DialogContentText>
          The session data has been saved successfully.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate('/past-data')}>View Past Data</Button>
        <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(4),
      padding: theme.spacing(3),
      backgroundColor: '#fff',
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[2]
    }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h4" gutterBottom>Patient Details</Typography>
          <Typography variant="body1"><strong>Name:</strong> {patientProfile.name}</Typography>
          <Typography variant="body1"><strong>DOB:</strong> {patientProfile.dob}</Typography>
          <Typography variant="body1"><strong>Patient ID:</strong> {patientProfile.patientID}</Typography>
        </Paper>

        <Box sx={{ mb: 4, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => setView('tabular')}>Tabular View</Button>
          <Button variant="contained" color="secondary" onClick={() => setView('graphical')}>Graphical View</Button>
        </Box>

        {view === 'tabular' && (
          // <Card elevation={4}>
          //   <CardContent>
          //     <Typography variant="h4" gutterBottom component="div">
          //       Latest Consultation Details
          //     </Typography>
          //     <TableContainer component={Paper}>
          //       <Table sx={{ minWidth: 650 }} aria-label="simple table">
          //         <TableBody>
          //           <TableRow>
          //             <TableCell component="th" scope="row"><strong>Consultation Note:</strong></TableCell>
          //             <TableCell>{consultationNote}</TableCell>
          //           </TableRow>
          //           {sessionValues.map((item, index) => (
          //             <TableRow key={index}>
          //               <TableCell component="th" scope="row">{item.snowmedName}</TableCell>
          //               <TableCell>{item.value}</TableCell>
          //             </TableRow>
          //           ))}
          //         </TableBody>
          //       </Table>
          //     </TableContainer>
          //     <Box sx={{ mt: 2 }}>
          //       <Button variant="contained" color="primary" onClick={() => navigate('/past-data')}>Show More Past Data</Button>
          //     </Box>
          //   </CardContent>
          // </Card>
          <Card elevation={4}>
  <CardContent>
  <a href="https://www.csp.org.uk/system/files/csp_snomed_ct_subsets_20160414_v1.pdf" class="snomed-glossary-button" target="_blank">SNOMED Index Glossary</a>
    <Typography variant="h4" gutterBottom component="div">
      Latest Consultation Details
    </Typography>
    <Box sx={{ my: 2 }}>
    <Typography variant="h6" component="div">
      <strong>Consultation Note:</strong>
    </Typography>
    <Typography variant="body1" sx={{ marginBottom: 2 }}>
      {consultationNote}
    </Typography>
  </Box>
    <TableContainer component={Paper}>
      {/* <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>SNOMED Code</strong></TableCell>
            <TableCell><strong>Observed Value</strong></TableCell>
            <TableCell><strong>Desired Value</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" colSpan={3}><strong>Consultation Note:</strong></TableCell>
            <TableCell colSpan={2}>{consultationNote}</TableCell>
          </TableRow>
          {sessionValues.map((item, index) => {
            console.log(item.snowmedName, snomedOptions)
            const desiredValue = snomedOptions.find(option => option[0] === item.snowmedName)?.[1] || 'N/A';
            return (
              <TableRow key={index}>
                <TableCell>{item.snowmedName}</TableCell>
                <TableCell>{item.value}</TableCell>
                <TableCell>{desiredValue}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell><strong>SNOMED Code</strong></TableCell>
        <TableCell><strong>Desired Value</strong></TableCell>
        <TableCell><strong>Observed Value</strong></TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {sessionValues.map((item, index) => {
        const snomedOption = snomedCodesAndValues.find(option => option[0] === item.snowmedName);
        const desiredValue = snomedOption ? snomedOption[1] : 'N/A';
        return (
          <TableRow key={index}>
            <TableCell>{item.snowmedName}</TableCell>
            <TableCell>{desiredValue}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
    </TableContainer>
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" color="primary" onClick={() => navigate('/past-data')}>Show More Past Data</Button>
    </Box>
  </CardContent>
</Card>

        )}

        {view === 'graphical' && (
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h4" gutterBottom component="div">
                Observation Chart
              </Typography>
              <FormControl fullWidth margin="normal">
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
        )}
        <Card elevation={4} style={{ marginTop: '20px' }} >
          <CardContent>
            <Typography variant="h4" gutterBottom >
              Today's Consultation
            </Typography>

            <TextField
              label="Problem Description"
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
              {...register("notes")}
            />

            <Typography sx={{ mt: 4, mb: 2 }}>Session Values:</Typography>
            <Grid container spacing={2}>
              {fields.map((item, index) => (
                <Grid item xs={12} key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      label={`SNOMED Name ${index + 1}`}
                      variant="outlined"
                      sx={{ mr: 1, flex: 1 }}
                      {...register(`sessionValues.${index}.snowmedName`)}
                    />
                    <TextField
                      label={`LOINC Name ${index + 1}`}
                      variant="outlined"
                      sx={{ mr: 1, flex: 1 }}
                      {...register(`sessionValues.${index}.loincName`)}
                    />
                    <TextField
                      label={`Value ${index + 1}`}
                      variant="outlined"
                      sx={{ mr: 1, flex: 1 }}
                      {...register(`sessionValues.${index}.value`)}
                    />
                    <IconButton aria-label="delete" onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
              <IconButton color="primary" aria-label="add field" onClick={() => append({ snowmedName: '', loincName: '', value: '' })}>
                <AddCircleOutlineIcon />
              </IconButton>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing(2), mt: 4 }}>
              <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
            </Box>
          </CardContent>
        </Card>
      </form>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/view-charts')}
        sx={{ mt: 2 }}
      >
        View Charts
      </Button> */}
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleDesired}
        sx={{ mt: 2 }}
      >
        {showDesired ? 'Hide Desired SNOMED Values' : 'Manage Desired SNOMED Values'}
      </Button>

      <Collapse in={showDesired}>
        <Desired />
      </Collapse>
      <SuccessDialog />
    </Box>
  );


}

export default Dashboard;
