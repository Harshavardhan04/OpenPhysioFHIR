import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Autocomplete,
    Container
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';  
import { useNavigate } from 'react-router-dom'; 


function PastDataPage() {
    const [snomedData, setSnomedData] = useState({});
    const [notes, setNotes] = useState([]);
    const [startConsultation, setStartConsultation] = useState('');
    const [endConsultation, setEndConsultation] = useState('');
    const [selectedSNOMED, setSelectedSNOMED] = useState([]);
    const [SNOMEDOptions, setSNOMEDOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (startConsultation && endConsultation) {
            axios.post('/past-data', {
                start: parseInt(startConsultation),
                end: parseInt(endConsultation)
            })
                .then(response => {
                    const [data, consultationNotes] = response.data;
                    setSnomedData(data);
                    setNotes(consultationNotes);

                    setSNOMEDOptions(Object.keys(data));
                })
                .catch(error => {
                    console.error('Error fetching consultations:', error);
                });
        }
    }, [startConsultation, endConsultation]);

    function downloadConsultationData(arrayIndex) {
        const consultationNumber = parseInt(startConsultation) + arrayIndex;
    
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Consultation Number,SNOMED Code,Value\n";
    
        Object.keys(snomedData).forEach((snomedCode) => {
            const value = snomedData[snomedCode][arrayIndex];
            if (value) {
                csvContent += `${consultationNumber},${snomedCode},${value}\n`;
            }
        });
    
        csvContent += `\nNotes\n"${notes[arrayIndex]}"`;
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `consultation_${consultationNumber}_data.csv`);
        document.body.appendChild(link);
        link.click();
    }
    
    
    
    

    return (
        <Container>
            <Button style={{ marginTop: '20px' }}
                startIcon={<ArrowBackIcon />}
                variant="contained"
                color="primary"
                onClick={() => navigate('/update-patient')}
                sx={{ marginBottom: 2 }}
            >
                Back to Dashboard
            </Button>

           
                <Box sx={{ my: 4 }}>
  <Typography variant="h4" gutterBottom component="div">
      Consultation Data
  </Typography>

  <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
      <TextField
          label="Start Consultation Number"
          value={startConsultation}
          onChange={(e) => {
              const newValue = Math.max(0, parseInt(e.target.value, 10) || 0);
              setStartConsultation(newValue.toString());
          }}
          variant="outlined"
          type="number"
          fullWidth
          inputProps={{ min: "0" }} 
          error={parseInt(startConsultation, 10) > parseInt(endConsultation, 10)}
          helperText={parseInt(startConsultation, 10) > parseInt(endConsultation, 10) ? "Start number should be less than or equal to end number" : ""}
      />
      <TextField
          label="End Consultation Number"
          value={endConsultation}
          onChange={(e) => {
              const newValue = Math.max(0, parseInt(e.target.value, 10) || 0);
              setEndConsultation(newValue.toString());
          }}
          variant="outlined"
          type="number"
          fullWidth
          inputProps={{ min: "0" }} 
          error={parseInt(endConsultation, 10) < parseInt(startConsultation, 10)}
          helperText={parseInt(endConsultation, 10) < parseInt(startConsultation, 10) ? "End number should be greater than or equal to start number" : ""}
      />
  </Box>



                <Autocomplete
                    multiple
                    options={SNOMEDOptions}
                    onChange={(event, newValue) => setSelectedSNOMED(newValue)}
                    renderInput={(params) => <TextField {...params} label="SNOMED Codes" />}
                    value={selectedSNOMED}
                    sx={{ marginBottom: 2, width: '100%' }}
                />

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Consultation Number</TableCell>
                                <TableCell>SNOMED Code</TableCell>
                                <TableCell>Value</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedSNOMED.map(snomed =>
                                snomedData[snomed]?.map((value, index) =>
                                    value && (
                                        <TableRow key={`${snomed}-${index}`}>
                                            <TableCell>{parseInt(startConsultation) + index}</TableCell>
                                            <TableCell>{snomed}</TableCell>
                                            <TableCell>{value}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => downloadConsultationData(index)}
                                                >
                                                    Download Full Data
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default PastDataPage;

