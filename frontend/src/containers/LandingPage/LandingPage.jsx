

// import React, { useState } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function LandingPage() {
//     const [patientID, setPatientID] = useState(''); 
//     const navigate = useNavigate();

//     const handleNext = () => {
//         if (!patientID.trim()) {
//             alert("Please enter a patient ID.");
//             return;
//         }

//         navigate(`/update-patient`);
//     };

//     return (
//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '100vh',
//             }}
//         >
//             <Typography variant="h4" gutterBottom>Find Patient Profile</Typography>
//             <TextField
//                 label="Enter Patient ID"
//                 value={patientID}
//                 onChange={(e) => setPatientID(e.target.value)}
//                 variant="outlined"
//                 margin="normal"
//             />
//             <Button
//                 variant="contained"
//                 onClick={handleNext}
//                 sx={{ marginTop: '20px' }}
//             >
//                 Next
//             </Button>
//         </Box>
//     );
// }

// export default LandingPage;


import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
    const [patientID, setPatientID] = useState(''); 
    const navigate = useNavigate();

    const handleNext = () => {
        if (!patientID.trim()) {
            alert("Please enter a patient ID.");
            return;
        }

        // Axios POST request to /search-profile with patientID
        axios.post('/search-profile', {
            patientID: patientID // Assuming the backend expects a field named patientID
        })
        .then(response => {
            // Handle the response from the server
            // Assuming the response includes patient data, navigate to /update-patient with this data
            // You might want to pass the patient data to the next component or store it in a global state
            console.log(response.data); // Logging the response data for debugging
            navigate(`/update-patient`); // Navigate to update patient page
        })
        .catch(error => {
            // Handle any errors here
            console.error("There was an error searching for the patient profile:", error);
            alert("Failed to find patient profile. Please check the patient ID and try again.");
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Typography variant="h4" gutterBottom>Find Patient Profile</Typography>
            <TextField
                label="Enter Patient ID"
                value={patientID}
                onChange={(e) => setPatientID(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <Button
                variant="contained"
                onClick={handleNext}
                sx={{ marginTop: '20px' }}
            >
                Next
            </Button>
        </Box>
    );
}

export default LandingPage;
