

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

        axios.post('/search-profile', {
            patientID: patientID
        })
            .then(response => {
                console.log(response.data);
                navigate(`/update-patient`);
            })
            .catch(error => {

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
