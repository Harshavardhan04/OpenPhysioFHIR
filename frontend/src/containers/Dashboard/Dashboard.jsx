import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import {
  Box, Typography, Button, IconButton, Grid, TextField, Paper, Dialog,
  DialogActions, DialogTitle, DialogContent, DialogContentText, Collapse, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Switch, FormControlLabel
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import Desired from '../Desired/Desired';
import { useNavigate } from 'react-router-dom';
import PastDataPage from '../PastData/PastData';
import ViewCharts from '../ViewCharts/ViewCharts';
import {
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
  const [sessionValues, setSessionValues] = useState([]);
  const [selectedSnomed, setSelectedSnomed] = useState('');
  const [consultationNote, setConsultationNote] = useState('');
  const[consultationDate, setConsultationDate] = useState('');
  const [chartData, setChartData] = useState({});
  const [dates,setDates] = useState([]);
  const [snomedOptions, setSnomedOptions] = useState([]);
  const [snomedCodesAndValues, setSnomedCodesAndValues] = useState([]);
  const [showNewConsultation, setShowNewConsultation] = useState(false);
  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
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


  const handleNewConsultationClick = () => {
    setShowNewConsultation(true);
    setTimeout(() => {
      document.getElementById('newConsultationSection').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };


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
        const date = data.date;

        const measurementsArray = Object.entries(latestObservations).map(([snowmedName, value]) => ({
          snowmedName,
          loincName: '',
          value,
        }));

        setSessionValues(measurementsArray);
        setConsultationNote(latestNote);
        setConsultationDate(date);
      } catch (error) {
        console.error("Failed to fetch last consultation:", error);
      }
    };


    fetchPatientProfile();
    fetchLastConsultation();
    fetchSnomedOptions();  
  }, [setValue, setPatientProfile, setSessionValues, setConsultationNote]); 



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
      const dates = response.data.dates;

      const labels = observations.map((_, index) => `Session ${index + 1}`);
      const data = observations.map(value => value !== undefined ? value : NaN);
      setDates(dates);
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
    }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Patient Details
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mb: { xs: 1, sm: 0 } }}><strong>Name:</strong> {patientProfile.name}</Typography>
            <Typography variant="body1" sx={{ mb: { xs: 1, sm: 0 } }}><strong>DOB:</strong> {patientProfile.dob}</Typography>
            <Typography variant="body1" sx={{ mb: { xs: 1, sm: 0 } }}><strong>Patient ID:</strong> {patientProfile.patientID}</Typography>
          </Box>
        </Paper>


        <Box sx={{ mb: 4, mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: view === 'tabular' ? '#404a86' : '#5c6bc0',
              '&:hover': { bgcolor: 'primary.dark' },
              color: 'white',
              width: { xs: '100%', sm: 'auto' }, 
            }}
            onClick={() => setView('tabular')}
          >
<Typography variant="button" display="block" sx={{ fontSize: { xs: '0.50rem', sm: '1rem' } }}>Latest Consultation Data</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: view === 'allData' ? '#404a86' : '#5c6bc0',
              '&:hover': { bgcolor: 'primary.dark' },
              color: 'white',
              width: { xs: '100%', sm: 'auto' }, 
            }}
            onClick={() => setView('allData')}
          >
<Typography variant="button" display="block" sx={{ fontSize: { xs: '0.50rem', sm: '1rem' } }}>Show All Data</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: view === 'graphical' ? '#404a86' : '#5c6bc0',
              '&:hover': { bgcolor: 'primary.dark' },
              color: 'white',
              width: { xs: '100%', sm: 'auto' }, 
            }}
            onClick={() => setView('graphical')}
          >
            <Typography variant="button" display="block" sx={{ fontSize: { xs: '0.50rem', sm: '1rem' } }}>Graphical View</Typography>
          </Button>

          <Button
            variant="contained"
            sx={{
              bgcolor: view === 'manageDesired' ? '#404a86' : '#5c6bc0',
              '&:hover': { bgcolor: 'primary.dark' },
              color: 'white',
              width: { xs: '100%', sm: 'auto' }, 
            }}
            onClick={() => setView('manageDesired')}
          >
            <Typography variant="button" display="block" sx={{ fontSize: { xs: '0.50rem', sm: '1rem' } }}>Manage Desired SNOMED Values</Typography>
          </Button>


          <Button
            variant="contained"
            sx={{
              marginLeft: 'auto',
              bgcolor: 'primary.dark',
              '&:hover': {
                bgcolor: 'primary.darker',
              },
              color: 'white',
              fontSize: '1rem',
              padding: '10px 20px',
            }}
            onClick={handleNewConsultationClick}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="button" display="block" sx={{ fontSize: { xs: '0.50rem', sm: '1rem' } }}>New Consultation</Typography>
            </Box>
          </Button>
        </Box>





        {view === 'tabular' && (
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h4" gutterBottom component="div">
                Latest Consultation Details
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                  <Typography variant="h6" component="div">
                    <strong>Consultation Note:</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {consultationNote} 

                  </Typography>
                  <Typography variant="h6" component="div">
                    <strong>Consultation Date:</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    {consultationDate} 

                  </Typography>
                </Box>
                <a href="https://www.csp.org.uk/system/files/csp_snomed_ct_subsets_20160414_v1.pdf" class="snomed-glossary-button" target="_blank">SNOMED Index Glossary</a>
              </Box>

              <strong><u>Observations recorded</u></strong>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
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
            </CardContent>
          </Card>
        )}
        {view === 'graphical' && (
          <ViewCharts
            selectedSnomed={selectedSnomed}
            snomedOptions={snomedOptions}
            chartData={chartData}
            setSelectedSnomed={setSelectedSnomed} 
            dates = {dates}
          />
        )}

        {view === 'allData' && (
          <Card elevation={4} style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Past Data
              </Typography>
              <PastDataPage />
            </CardContent>
          </Card>
        )}

        {view === 'manageDesired' && <Desired snomedCodesAndValues={snomedCodesAndValues} />}

        {showNewConsultation && (
          <Card elevation={4} id="newConsultationSection" style={{ marginTop: '20px' }}>
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
                {...register("notes", {
                  required: 'Problem description is required',
                })}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />

              <Typography sx={{ mt: 4, mb: 2 }}>Session Values:</Typography>
              <Grid container spacing={2}>

                {fields.map((item, index) => (
                  <Grid item xs={12} key={item.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        label={`SNOMED ${index + 1} CT Code `}
                        variant="outlined"
                        sx={{ mr: 1, flex: 1 }}
                        {...register(`sessionValues.${index}.snowmedName`, {
                          required: 'SNOMED CT Code is required',
                          pattern: {
                            value: /^[0-9]+$/,
                            message: 'Invalid SNOMED CT code',
                          },
                        })}
                        error={errors.sessionValues?.[index]?.snowmedName ? true : false}
                        helperText={errors.sessionValues?.[index]?.snowmedName?.message || ''}
                      />
                      <TextField
                        label={`LOINC ${index + 1} Name `}
                        variant="outlined"
                        sx={{ mr: 1, flex: 1 }}
                        {...register(`sessionValues.${index}.loincName`, {
                          required: 'LOINC Name is required',
                        })}
                        error={errors.sessionValues?.[index]?.loincName ? true : false}
                        helperText={errors.sessionValues?.[index]?.loincName?.message || ''}
                      />



                      <TextField
                        label={`Value ${index + 1}`}
                        type="text"
                        variant="outlined"
                        sx={{ mr: 1, flex: 1 }}
                        {...register(`sessionValues.${index}.value`, {
                          required: 'Value is required',
                          pattern: {
                            value: /^\d*\.?\d+$/,
                            message: 'Invalid value',
                          },
                          setValueAs: v => v === "" ? "" : String(v),
                          onInput: (e) => {
                            e.target.value = e.target.value.replace(/^-/, '');
                          },
                        })}
                        error={!!errors.sessionValues?.[index]?.value}
                        helperText={errors.sessionValues?.[index]?.value?.message}
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
        )}
        <SuccessDialog />


      </form>


    </Box>
  );


}

export default Dashboard;
