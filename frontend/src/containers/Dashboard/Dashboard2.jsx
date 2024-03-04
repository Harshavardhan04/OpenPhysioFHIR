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
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h4" gutterBottom component="div">
                Latest Consultation Details
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row"><strong>Consultation Note:</strong></TableCell>
                      <TableCell>{consultationNote}</TableCell>
                    </TableRow>
                    {sessionValues.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">{item.snowmedName}</TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    ))}
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
