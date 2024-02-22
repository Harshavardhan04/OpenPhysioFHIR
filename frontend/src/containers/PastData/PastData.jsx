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
  Autocomplete
} from '@mui/material';

function PastDataPage() {
    const [snomedData, setSnomedData] = useState({});
    const [notes, setNotes] = useState([]);
    const [startConsultation, setStartConsultation] = useState('');
    const [endConsultation, setEndConsultation] = useState('');
    const [selectedSNOMED, setSelectedSNOMED] = useState([]);
    const [SNOMEDOptions, setSNOMEDOptions] = useState([]);

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

    const handlePopulateTable = () => {
        // This function is not needed in the same way anymore because we directly render data from snomedData and selectedSNOMED
    };

    // const downloadNotes = (consultationIndex) => {
    //     const note = notes[consultationIndex];
    //     const csvContent = `data:text/csv;charset=utf-8,Notes\n"${note}"`;
    //     const encodedUri = encodeURI(csvContent);
    //     const link = document.createElement("a");
    //     link.setAttribute("href", encodedUri);
    //     link.setAttribute("download", `consultation_${consultationIndex + 1}_notes.csv`);
    //     document.body.appendChild(link);
    //     link.click();
    // };

    function downloadConsultationData(consultationIndex) {
        // Construct the CSV content
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Consultation Number,SNOMED Code,Value\n";
    
        // Add SNOMED codes and their values for the specific consultation
        Object.keys(snomedData).forEach((snomedCode) => {
            const value = snomedData[snomedCode][consultationIndex];
            if (value) { // Check if there's a value for this consultation
                csvContent += `${consultationIndex + 1},${snomedCode},${value}\n`;
            }
        });
    
        // Add notes for the consultation
        csvContent += `\nNotes\n"${notes[consultationIndex]}"`;
    
        // Encode the CSV content
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `consultation_${consultationIndex + 1}_data.csv`);
        document.body.appendChild(link); // Required for Firefox
        link.click(); // Trigger the download
    }
    

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Consultation Data</Typography>
            
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Start Consultation Number"
                    value={startConsultation}
                    onChange={(e) => setStartConsultation(e.target.value)}
                    variant="outlined"
                    type="number"
                />
                <TextField
                    label="End Consultation Number"
                    value={endConsultation}
                    onChange={(e) => setEndConsultation(e.target.value)}
                    variant="outlined"
                    type="number"
                />
            </Box>

            <Autocomplete
                multiple
                options={SNOMEDOptions}
                onChange={(event, newValue) => setSelectedSNOMED(newValue)}
                renderInput={(params) => <TextField {...params} label="SNOMED Codes" />}
                value={selectedSNOMED}
                sx={{ marginBottom: 2 }}
            />

            {/* <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Consultation Number</TableCell>
                            <TableCell>SNOMED Code</TableCell>
                            <TableCell>Value</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {selectedSNOMED.map(snomed => 
                            snomedData[snomed].map((value, index) => (
                                <TableRow key={`${snomed}-${index}`}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{snomed}</TableCell>
                                    <TableCell>{value}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => downloadNotes(index)}>Download Notes</Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                
            </TableContainer> */}
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
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{snomed}</TableCell>
                            <TableCell>{value}</TableCell>
                            <TableCell>
                                <Button onClick={() => downloadConsultationData(index)}>Download Full Data</Button>
                            </TableCell>
                        </TableRow>
                    )
                )
            )}
        </TableBody>
    </Table>
</TableContainer>

        </Box>
    );
}

export default PastDataPage;


// import React, { useState } from 'react';
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
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedNote, setSelectedNote] = useState('');

//     const fetchSNOMEDData = () => {
//         axios.post('/past-data', {
//             start: parseInt(startConsultation, 10),
//             end: parseInt(endConsultation, 10)
//         })
//         .then(response => {
//             const [data, consultationNotes] = response.data;
//             setSnomedData(data);
//             setNotes(consultationNotes);

//             const snomedCodes = Object.keys(data);
//             setSNOMEDOptions(snomedCodes);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
//     };

//     // Automatically fetch SNOMED data when the consultation range changes
//     useState(() => {
//         if (startConsultation && endConsultation) {
//             fetchSNOMEDData();
//         }
//     }, [startConsultation, endConsultation]);

//     const downloadNotes = (index) => {
//         const note = notes[index];
//         const csvContent = `data:text/csv;charset=utf-8,Notes\n"${note}"`;
//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", `consultation_${index + 1}_notes.csv`);
//         document.body.appendChild(link);
//         link.click();
//     };

//     const handleOpenDialog = (index) => {
//         setSelectedNote(notes[index]);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

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
//                 getOptionLabel={(option) => option}
//                 onChange={(event, newValue) => {
//                     setSelectedSNOMED(newValue);
//                 }}
//                 renderInput={(params) => <TextField {...params} label="SNOMED Codes" />}
//                 sx={{ marginBottom: 2 }}
//             />

//             <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Consultation Number</TableCell>
//                             <TableCell>SNOMED Code</TableCell>
//                             <TableCell>Value</TableCell>
//                             <TableCell>Download Notes</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {selectedSNOMED.map((code) =>
//                             snomedData[code]?.map((value, index) => (
//                                 <TableRow key={`${code}-${index}`} hover>
//                                     <TableCell>{index + 1}</TableCell>
//                                     <TableCell>{code}</TableCell>
//                                     <TableCell>{value}</TableCell>
//                                     <TableCell>
//                                         <Button onClick={() => downloadNotes(index)}>Download Notes</Button>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Consultation Notes</DialogTitle>
//                 <DialogContent>
//                     <Typography>{selectedNote}</Typography>
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// }

// export default PastDataPage;


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
//     const [consultations, setConsultations] = useState([]);
//     const [startConsultation, setStartConsultation] = useState('');
//     const [endConsultation, setEndConsultation] = useState('');
//     const [selectedSNOMED, setSelectedSNOMED] = useState([]);
//     const [SNOMEDOptions, setSNOMEDOptions] = useState([]);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedConsultationData, setSelectedConsultationData] = useState({});
//     const [filteredConsultations, setFilteredConsultations] = useState([]);

//     useEffect(() => {
//         // Automatically fetch SNOMED values when the consultation range changes and is valid
//         if (startConsultation && endConsultation) {
//             axios.post('/past-data', {
//                 start: parseInt(startConsultation),
//                 end: parseInt(endConsultation)
//             })
//             .then(response => {
//                 const { data } = response;
//                 setConsultations(data[1]); // Assuming the second item in the tuple is the consultations list
                
//                 const snomedValues = new Set();
//                 Object.keys(data[0]).forEach(key => {
//                     snomedValues.add(key); // Assuming the first item in the tuple is the SNOMED values
//                 });
//                 setSNOMEDOptions(Array.from(snomedValues));
//             })
//             .catch(error => {
//                 console.error('Error fetching consultations:', error);
//             });
//         }
//     }, [startConsultation, endConsultation]);

//     const handlePopulateTable = () => {
//         // Filter consultations based on selected SNOMED values
//         const filtered = consultations.filter(consultation =>
//             // Check if measurements exist and is an array before calling .some()
//             Array.isArray(consultation.measurements) && consultation.measurements.some(measurement => selectedSNOMED.includes(measurement.snowmedName))
//         );
//         setFilteredConsultations(filtered);
//     };
    

//     const downloadNotes = (consultationNumber) => {
//         // Assuming the notes are stored in a similar structure to consultations and can be indexed similarly
//         const note = consultations.find(cons => cons.consultationNumber === consultationNumber)?.notes || '';
//         const csvContent = `data:text/csv;charset=utf-8,Notes\n"${note}"`;
//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", `consultation_${consultationNumber}_notes.csv`);
//         document.body.appendChild(link);
//         link.click();
//     };

//     // Function to close the dialog showing consultation details
//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

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

//             <Button variant="contained" onClick={handlePopulateTable} sx={{ marginBottom: 2 }}>
//                 Populate Table
//             </Button>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Consultation Number</TableCell>
//                             <TableCell>SNOMED Name</TableCell>
//                             <TableCell>Value</TableCell>
//                             <TableCell>Download Notes</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredConsultations.map((consultation, index) => (
//                             <TableRow key={index} hover style={{ cursor: 'pointer' }}>
//                                 <TableCell>{consultation.consultationNumber}</TableCell>
//                                 <TableCell>{consultation.snomedName}</TableCell>
//                                 <TableCell>{consultation.value}</TableCell>
//                                 <TableCell>
//                                     <Button onClick={() => downloadNotes(consultation.consultationNumber)}>Download Notes</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Consultation Summary</DialogTitle>
//                 <DialogContent>
//                     {/* Adjusted rendering logic based on actual data structure */}
//                     <Typography>Notes: {selectedConsultationData.notes}</Typography>
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// }

// export default PastDataPage;


// import React, { useState } from 'react';
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
//     const [consultations, setConsultations] = useState([]);
//     const [startConsultation, setStartConsultation] = useState('');
//     const [endConsultation, setEndConsultation] = useState('');
//     const [selectedSNOMED, setSelectedSNOMED] = useState([]);
//     const [SNOMEDOptions, setSNOMEDOptions] = useState([]);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedConsultationData, setSelectedConsultationData] = useState({});

    
//     // Removed the useEffect hook since initial data fetching might not be required or should be adjusted based on new backend logic.

//     const handleConsultationRangeChange = () => {
//         axios.post('/past-data', {
// // You need to adjust this according to how you identify patients in your system.
//             start: parseInt(startConsultation),
//             end: parseInt(endConsultation)
//         })
//         .then(response => {
//             const { data } = response;
            
//             setConsultations(data[1]); // Assuming the second item in the tuple is the consultations list
            
//             const snomedValues = new Set();
//             Object.keys(data[0]).forEach(key => {
//                 snomedValues.add(key); // Assuming the first item in the tuple is the SNOMED values
//             });
//             setSNOMEDOptions(Array.from(snomedValues));
//         })
//         .catch(error => {
//             console.error('Error fetching consultations:', error);
//         });
//     };
//      // Function to download selected consultation data as CSV
//      const downloadCSV = (consultationData) => {
//         const csvContent = "data:text/csv;charset=utf-8," +
//             "Consultation Number,SNOMED Name,Value,Notes\n" +
//             consultationData.measurements.map(meas => `${consultationData.consultationNumber},${meas.snowmedName},${meas.value}`).join("\n") +
//             `\nNotes,${consultationData.notes}`;
//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "consultation_data.csv");
//         document.body.appendChild(link);
//         link.click();
//     };

//     // Function to handle click on a consultation (to view details)
//     const handleConsultationClick = (consultation) => {
//         setSelectedConsultationData(consultation);
//         setOpenDialog(true);
//     };

//     // Function to close the dialog showing consultation details
//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

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
//                 <Button variant="contained" onClick={handleConsultationRangeChange} sx={{ height: '56px' }}>
//                     Fetch Data
//                 </Button>
//             </Box>

//             <Autocomplete
//                 multiple
//                 options={SNOMEDOptions}
//                 onChange={(event, newValue) => setSelectedSNOMED(newValue)}
//                 renderInput={(params) => <TextField {...params} label="SNOMED Codes" />}
//                 value={selectedSNOMED}
//                 sx={{ marginBottom: 2 }}
//             />

//             <Button variant="contained" onClick={() => downloadCSV(selectedConsultationData)} sx={{ marginBottom: 2 }}>
//                 Download Selected Consultation
//             </Button>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Consultation Number</TableCell>
//                             <TableCell>SNOMED Name</TableCell>
//                             <TableCell>Value</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {consultations.map((consultation, index) => (
//                             <TableRow key={index} hover onClick={() => handleConsultationClick(consultation)} style={{ cursor: 'pointer' }}>
//                                 <TableCell>{consultation.consultationNumber}</TableCell>
//                                 {/* Assuming a simplified structure for rendering purposes */}
//                                 <TableCell>{consultation.snomedName}</TableCell>
//                                 <TableCell>{consultation.value}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Consultation Summary</DialogTitle>
//                 <DialogContent>
//                     {/* Adjusted rendering logic based on actual data structure */}
//                     <Typography>Notes: {selectedConsultationData.notes}</Typography>
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// }

// export default PastDataPage;



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
//     const [consultations, setConsultations] = useState([]);
//     const [startConsultation, setStartConsultation] = useState('');
//     const [endConsultation, setEndConsultation] = useState('');
//     const [selectedSNOMED, setSelectedSNOMED] = useState([]);
//     const [SNOMEDOptions, setSNOMEDOptions] = useState([]);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedConsultationData, setSelectedConsultationData] = useState({});

//     useEffect(() => {
//         axios.get('http://localhost:5000/past-data')
//             .then(response => {
//                 setConsultations(response.data[1]);
                
//                 const snomedValues = new Set();
//                 response.data[0].forEach(consultation => {
//                     consultation.measurements.forEach(measurement => {
//                         snomedValues.add(measurement.snowmedName);
//                     });
//                 });
//                 setSNOMEDOptions(Array.from(snomedValues));
//             })
//             .catch(error => {
//                 console.error('Error fetching consultations:', error);
//             });
//     }, []);

//     const downloadCSV = (consultationData) => {
//         const csvContent = "data:text/csv;charset=utf-8," +
//             "Consultation Number,SNOMED Name,Value,Notes\n" +
//             consultationData.measurements.map(meas => `${consultationData.consultationNumber},${meas.snowmedName},${meas.value}`).join("\n") +
//             `\nNotes,${consultationData.notes}`;

//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "consultation_data.csv");
//         document.body.appendChild(link);
//         link.click();
//     };

//     const handleConsultationClick = (consultation) => {
//         setSelectedConsultationData(consultation);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

//     const handleConsultationRangeChange = () => {
//         axios.post('http://localhost:5000/consultations-range', {
//             startConsultation: parseInt(startConsultation),
//             endConsultation: parseInt(endConsultation)
//         })
//         .then(response => {
//             console.log('Consultations fetched:', response.data);
//             setConsultations(response.data);
            
//             const snomedValues = new Set();
//             response.data.forEach(consultation => {
//                 consultation.measurements.forEach(measurement => {
//                     snomedValues.add(measurement.snowmedName);
//                 });
//             });
//             setSNOMEDOptions(Array.from(snomedValues));
//         })
//         .catch(error => {
//             console.error('Error fetching consultations:', error);
//         });
//     };

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
//                 <Button variant="contained" onClick={handleConsultationRangeChange} sx={{ height: '56px' }}>
//                     Fetch Data
//                 </Button>
//             </Box>

//             <Autocomplete
//                 multiple
//                 options={SNOMEDOptions}
//                 onChange={(event, newValue) => setSelectedSNOMED(newValue)}
//                 renderInput={(params) => <TextField {...params} label="SNOMED Values" />}
//                 value={selectedSNOMED}
//                 sx={{ marginBottom: 2 }}
//             />

//             <Button variant="contained" onClick={() => downloadCSV(selectedConsultationData)} sx={{ marginBottom: 2 }}>
//                 Download Selected Consultation
//             </Button>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Consultation Number</TableCell>
//                             <TableCell>SNOMED Name</TableCell>
//                             <TableCell>Value</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {consultations.map((consultation, index) => (
//                             <TableRow key={index} hover onClick={() => handleConsultationClick(consultation)} style={{ cursor: 'pointer' }}>
//                                 <TableCell>{consultation.consultationNumber}</TableCell>
//                                 {consultation.measurements.filter(meas => selectedSNOMED.includes(meas.snowmedName)).map(filteredMeas => (
//                                     <React.Fragment key={filteredMeas.snowmedName}>
//                                         <TableCell>{filteredMeas.snowmedName}</TableCell>
//                                         <TableCell>{filteredMeas.value}</TableCell>
//                                     </React.Fragment>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Consultation Summary</DialogTitle>
//                 <DialogContent>
//                     {selectedConsultationData.measurements && selectedConsultationData.measurements.map((measurement, index) => (
//                         <Typography key={index}>{`${measurement.snowmedName}: ${measurement.value}`}</Typography>
//                     ))}
//                     <Typography>Notes: {selectedConsultationData.notes}</Typography>
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// }

// export default PastDataPage;


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
//     const [consultations, setConsultations] = useState([]);
//     const [startConsultation, setStartConsultation] = useState('');
//     const [endConsultation, setEndConsultation] = useState('');
//     const [selectedSNOMED, setSelectedSNOMED] = useState([]);
//     const [SNOMEDOptions, setSNOMEDOptions] = useState([]);
//     const [openDialog, setOpenDialog] = useState(false);
//     const [selectedConsultationData, setSelectedConsultationData] = useState({});

//     useEffect(() => {
//         axios.get('http://localhost:5000/past-data')
//             .then(response => {
//                 // Assuming response.data returns an array where the first element is improvement data
//                 // and the second is notes, as implied by your backend snippet.
//                 const [improvementData, notesData] = response.data;
//                 setConsultations(notesData); // Assuming notesData contains consultation details
                
//                 const snomedValues = Object.keys(improvementData); // Assuming improvementData is an object with SNOMED codes as keys
//                 setSNOMEDOptions(snomedValues);
//             })
//             .catch(error => {
//                 console.error('Error fetching consultations:', error);
//             });
//     }, []);

//     const handleConsultationRangeChange = () => {
//         // Send a POST request to the backend with the start and end consultation numbers
//         axios.post('http://localhost:5000/consultations-range', {
//             startConsultation: parseInt(startConsultation, 10), // Ensure the values are sent as integers
//             endConsultation: parseInt(endConsultation, 10),
//         })
//         .then(response => {
//             console.log('Filtered consultations fetched:', response.data);
//             // Assuming the response structure matches what you need, directly update the consultations state
//             const filteredConsultations = response.data; // Adjust this if your data structure is different
//             setConsultations(filteredConsultations);
    
//             // Update SNOMEDOptions based on the newly fetched consultations
//             const newSNOMEDValues = new Set();
//             filteredConsultations.forEach(consultation => {
//                 // This assumes each consultation includes a measurements property containing SNOMED codes
//                 consultation.measurements.forEach(measurement => {
//                     if (measurement.snowmedName) { // Check if snowmedName exists to prevent undefined values
//                         newSNOMEDValues.add(measurement.snowmedName);
//                     }
//                 });
//             });
//             setSNOMEDOptions(Array.from(newSNOMEDValues));
//         })
//         .catch(error => {
//             console.error('Error fetching filtered consultations:', error);
//         });
//     };

//     const downloadCSV = (consultationData) => {
//         const csvContent = "data:text/csv;charset=utf-8," +
//             "Consultation Number,SNOMED Name,Value,Notes\n" +
//             consultationData.measurements.map(meas => `${consultationData.consultationNumber},${meas.snowmedName},${meas.value}`).join("\n") +
//             `\nNotes,${consultationData.notes}`;

//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "consultation_data.csv");
//         document.body.appendChild(link);
//         link.click();
//     };

//     const handleConsultationClick = (consultation) => {
//         setSelectedConsultationData(consultation);
//         setOpenDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(false);
//     };

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
//                 <Button variant="contained" onClick={handleConsultationRangeChange} sx={{ height: '56px' }}>
//                     Fetch Data
//                 </Button>
//             </Box>

//             <Autocomplete
//                 multiple
//                 options={SNOMEDOptions}
//                 onChange={(event, newValue) => setSelectedSNOMED(newValue)}
//                 renderInput={(params) => <TextField {...params} label="SNOMED Values" />}
//                 value={selectedSNOMED}
//                 sx={{ marginBottom: 2 }}
//             />

//             <Button variant="contained" onClick={() => downloadCSV(selectedConsultationData)} sx={{ marginBottom: 2 }}>
//                 Download Selected Consultation
//             </Button>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Consultation Number</TableCell>
//                             <TableCell>SNOMED Name</TableCell>
//                             <TableCell>Value</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {consultations.map((consultation, index) => (
//                             <TableRow key={index} hover onClick={() => handleConsultationClick(consultation)} style={{ cursor: 'pointer' }}>
//                                 <TableCell>{consultation.consultationNumber}</TableCell>
//                                 {consultation.measurements.filter(meas => selectedSNOMED.includes(meas.snowmedName)).map(filteredMeas => (
//                                     <React.Fragment key={filteredMeas.snowmedName}>
//                                         <TableCell>{filteredMeas.snowmedName}</TableCell>
//                                         <TableCell>{filteredMeas.value}</TableCell>
//                                     </React.Fragment>
//                                 ))}
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={openDialog} onClose={handleCloseDialog}>
//                 <DialogTitle>Consultation Summary</DialogTitle>
//                 <DialogContent>
//                     {selectedConsultationData.measurements && selectedConsultationData.measurements.map((measurement, index) => (
//                         <Typography key={index}>{`${measurement.snowmedName}: ${measurement.value}`}</Typography>
//                     ))}
//                     <Typography>Notes: {selectedConsultationData.notes}</Typography>
//                 </DialogContent>
//             </Dialog>
//         </Box>
//     );
// }

// export default PastDataPage;
