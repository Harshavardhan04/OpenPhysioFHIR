// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useForm, useFieldArray } from "react-hook-form";
// import { useTheme } from "@mui/material/styles";
// import { Box, Typography, Button, IconButton, Grid, TextField, Paper, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
// import SaveIcon from '@mui/icons-material/Save';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';

// function Dashboard() {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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


//   // useEffect(() => {

//   //   axios.get("http://localhost:5000/profile")
//   //     .then(({ data }) => {
//   //       console.log(data)
//   //       setPatientProfile({
//   //         name: data.name,
//   //         dob: data.dob,
//   //         patientID: data.patientID
//   //       });

//   //       setValue('notes', data.notes);
//   //       setValue('sessionValues', data.measurements); 
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching patient profile:", error);
//   //     });
//   // }, [setValue]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/profile")
//       .then(({ data }) => {
//         console.log(data);
//         // Assuming the first object in the name array contains the preferred name
//         const patientName = data.name[0].text;
//         const dob = data.birthDate;
//         const patientID = data.id; // Extracting patientID from the data.id field

//         setPatientProfile({
//           name: patientName,
//           dob: dob,
//           patientID: patientID
//         });

//         // Assuming 'notes' and 'measurements' are also part of the data object and need to be handled similarly
//         // If 'notes' and 'measurements' are not part of the data, you might need to adjust accordingly
//         setValue('notes', data.notes); // Adjust this line if notes structure is different
//         setValue('sessionValues', data.measurements); // Adjust this line if measurements structure is different
//       })
//       .catch((error) => {
//         console.error("Error fetching patient profile:", error);
//       });
//   }, [setValue]);


//   const onSubmit = formData => {
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

//   const handleExit = () => navigate('/');

//   const SuccessDialog = () => (
//     <Dialog open={showSuccessDialog} onClose={() => setShowSuccessDialog(false)}>
//       <DialogTitle>Session Saved Successfully</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           What would you like to do next?
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => navigate('/')}>Return to Home</Button>
//         <Button onClick={() => navigate('/past-data')}>View Past Data</Button>
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

//         <Button
//         variant="contained"
//         color="primary"
//         onClick={() => navigate('/desired')}
//       >
//         Manage Desired SNOMED Values
//       </Button>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: theme.spacing(2), mt: 4 }}>
//           <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">Save</Button>
//           <Button variant="outlined" startIcon={<ExitToAppIcon />} onClick={handleExit}>Exit</Button>
//         </Box>
//       </form>
//       <SuccessDialog />
//     </Box>

    
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import {
  Box, Typography, Button, IconButton, Grid, TextField, Paper, Dialog,
  DialogActions, DialogTitle, DialogContent, DialogContentText, Collapse
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import Desired from '../Desired/Desired'; // Make sure Desired is correctly imported
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDesired, setShowDesired] = useState(false); // State to control visibility of Desired
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

        setValue('notes', data.notes);
        setValue('sessionValues', data.measurements);
      })
      .catch((error) => {
        console.error("Error fetching patient profile:", error);
      });
  }, [setValue]);

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
      </form>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/view-charts')}
        sx={{ mt: 2 }} // Adjust styling as needed
      >
        View Charts
      </Button>
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
