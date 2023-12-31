import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const [patientName, setPatientName] = useState('');
    const [nhsNumber, setNhsNumber] = useState('');
    const navigate = useNavigate();

    const handleNext = () => {
        // Logic to validate input and decide the next route
        // For example, if patientName is entered:
        if (patientName.trim() || nhsNumber.trim()) {
            navigate('/update-patient'); // Redirect to the Update Patient page
        } else {
            // Show an error or message to enter at least one field
        }
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100vh' 
            }}
        >
            <Typography variant="h4" gutterBottom>UPDATE PATIENT</Typography>
            <TextField
                label="Enter Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <Typography>or</Typography>
            <TextField
                label="Enter NHS Number"
                value={nhsNumber}
                onChange={(e) => setNhsNumber(e.target.value)}
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
