// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Autocomplete
// } from '@mui/material';

// function PastDataPage() {
//     const [snomedData, setSnomedData] = useState({});
//     const [notes, setNotes] = useState([]);
//     const [startConsultation, setStartConsultation] = useState('');
//     const [endConsultation, setEndConsultation] = useState('');
//     const [selectedSNOMED, setSelectedSNOMED] = useState([]);
//     const [SNOMEDOptions, setSNOMEDOptions] = useState([]);

//     useEffect(() => {
//         if (startConsultation && endConsultation) {
//             axios.post('/past-data', {
//                 start: parseInt(startConsultation),
//                 end: parseInt(endConsultation)
//             })
//             .then(response => {
//                 const [data, consultationNotes] = response.data;
//                 setSnomedData(data);
//                 setNotes(consultationNotes);

//                 setSNOMEDOptions(Object.keys(data));
//             })
//             .catch(error => {
//                 console.error('Error fetching consultations:', error);
//             });
//         }
//     }, [startConsultation, endConsultation]);

//     const handlePopulateTable = () => {
//         // This function is not needed in the same way anymore because we directly render data from snomedData and selectedSNOMED
//     };

//     // const downloadNotes = (consultationIndex) => {
//     //     const note = notes[consultationIndex];
//     //     const csvContent = `data:text/csv;charset=utf-8,Notes\n"${note}"`;
//     //     const encodedUri = encodeURI(csvContent);
//     //     const link = document.createElement("a");
//     //     link.setAttribute("href", encodedUri);
//     //     link.setAttribute("download", `consultation_${consultationIndex + 1}_notes.csv`);
//     //     document.body.appendChild(link);
//     //     link.click();
//     // };

//     function downloadConsultationData(consultationIndex) {
//         // Construct the CSV content
//         let csvContent = "data:text/csv;charset=utf-8,";
//         csvContent += "Consultation Number,SNOMED Code,Value\n";

//         // Add SNOMED codes and their values for the specific consultation
//         Object.keys(snomedData).forEach((snomedCode) => {
//             const value = snomedData[snomedCode][consultationIndex];
//             if (value) { // Check if there's a value for this consultation
//                 csvContent += `${consultationIndex + 1},${snomedCode},${value}\n`;
//             }
//         });

//         // Add notes for the consultation
//         csvContent += `\nNotes\n"${notes[consultationIndex]}"`;

//         // Encode the CSV content
//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", `consultation_${consultationIndex + 1}_data.csv`);
//         document.body.appendChild(link); // Required for Firefox
//         link.click(); // Trigger the download
//     }


//     return (
//         <Box sx={{ p: 2 }}>
//             <Typography variant="h6" gutterBottom>Consultation Data</Typography>

//             <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
//                 <TextField
//                     label="Start Consultation Number"
//                     value={startConsultation}
//                     onChange={(e) => setStartConsultation(e.target.value)}
//                     variant="outlined"
//                     type="number"
//                 />
//                 <TextField
//                     label="End Consultation Number"
//                     value={endConsultation}
//                     onChange={(e) => setEndConsultation(e.target.value)}
//                     variant="outlined"
//                     type="number"
//                 />
//             </Box>

//             <Autocomplete
//                 multiple
//                 options={SNOMEDOptions}
//                 onChange={(event, newValue) => setSelectedSNOMED(newValue)}
//                 renderInput={(params) => <TextField {...params} label="SNOMED Codes" />}
//                 value={selectedSNOMED}
//                 sx={{ marginBottom: 2 }}
//             />


//             <TableContainer component={Paper}>
//     <Table>
//         <TableHead>
//             <TableRow>
//                 <TableCell>Consultation Number</TableCell>
//                 <TableCell>SNOMED Code</TableCell>
//                 <TableCell>Value</TableCell>
//                 <TableCell>Actions</TableCell>
//             </TableRow>
//         </TableHead>
//         <TableBody>
//             {selectedSNOMED.map(snomed => 
//                 snomedData[snomed]?.map((value, index) => 
//                     value && (
//                         <TableRow key={`${snomed}-${index}`}>
//                             <TableCell>{index + 1}</TableCell>
//                             <TableCell>{snomed}</TableCell>
//                             <TableCell>{value}</TableCell>
//                             <TableCell>
//                                 <Button onClick={() => downloadConsultationData(index)}>Download Full Data</Button>
//                             </TableCell>
//                         </TableRow>
//                     )
//                 )
//             )}
//         </TableBody>
//     </Table>
// </TableContainer>

//         </Box>
//     );
// }

// export default PastDataPage;

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

import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // Importing back icon for the button
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation


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
        // Adjust the consultation number to account for the starting point.
        // If startConsultation is 3 and arrayIndex is 0 (the first item in the filtered list), 
        // the consultation number should be 3, not 0 or 4.
        const consultationNumber = parseInt(startConsultation) + arrayIndex;
    
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Consultation Number,SNOMED Code,Value\n";
    
        Object.keys(snomedData).forEach((snomedCode) => {
            // No adjustment needed here as the value is directly accessed by arrayIndex.
            const value = snomedData[snomedCode][arrayIndex];
            if (value) {
                csvContent += `${consultationNumber},${snomedCode},${value}\n`;
            }
        });
    
        // Fetch and format the corresponding note for this specific consultation.
        csvContent += `\nNotes\n"${notes[arrayIndex]}"`;
    
        // Generate and trigger the download link.
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
                <Typography variant="h4" gutterBottom component="div" >
                    Consultation Data
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                    <TextField
                        label="Start Consultation Number"
                        value={startConsultation}
                        onChange={(e) => setStartConsultation(e.target.value)}
                        variant="outlined"
                        type="number"
                        fullWidth
                    />
                    <TextField
                        label="End Consultation Number"
                        value={endConsultation}
                        onChange={(e) => setEndConsultation(e.target.value)}
                        variant="outlined"
                        type="number"
                        fullWidth
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
                                            {/* Adjust the consultation number to reflect the user input */}
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

