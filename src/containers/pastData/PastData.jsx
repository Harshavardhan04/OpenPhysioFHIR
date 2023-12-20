import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Dialog, DialogTitle, DialogContent, Autocomplete, TextField } from '@mui/material';


const mockData = [
    { date: '2023-02-01', steps: 1000, jointAngle: 30, muscleStrength: 50 },
    { date: '2023-01-02', steps: 1100, jointAngle: 32, muscleStrength: 52 },
    { date: '2023-02-03', steps: 1150, jointAngle: 34, muscleStrength: 54 },
    { date: '2023-01-04', steps: 1200, jointAngle: 35, muscleStrength: 55 },
    { date: '2023-01-05', steps: 1250, jointAngle: 36, muscleStrength: 56 },
    { date: '2023-01-06', steps: 1300, jointAngle: 38, muscleStrength: 58 },
    { date: '2023-01-07', steps: 1350, jointAngle: 40, muscleStrength: 60 },
    { date: '2023-02-08', steps: 1400, jointAngle: 42, muscleStrength: 62 },
    { date: '2023-01-09', steps: 1450, jointAngle: 44, muscleStrength: 64 },
    { date: '2023-01-10', steps: 1500, jointAngle: 45, muscleStrength: 66 },
    { date: '2023-02-11', steps: 1550, jointAngle: 46, muscleStrength: 68 },
    { date: '2023-01-12', steps: 1600, jointAngle: 48, muscleStrength: 70 },
    { date: '2023-01-13', steps: 1650, jointAngle: 50, muscleStrength: 72 },
    { date: '2023-02-14', steps: 1700, jointAngle: 52, muscleStrength: 74 },
    { date: '2023-01-15', steps: 1750, jointAngle: 54, muscleStrength: 76 },
    { date: '2023-01-16', steps: 1800, jointAngle: 55, muscleStrength: 78 },
    { date: '2023-02-17', steps: 1850, jointAngle: 56, muscleStrength: 80 },
    { date: '2023-01-18', steps: 1900, jointAngle: 58, muscleStrength: 82 },
    { date: '2023-02-19', steps: 1950, jointAngle: 60, muscleStrength: 84 },
    { date: '2023-01-20', steps: 2000, jointAngle: 62, muscleStrength: 86 },
];


const allFields = ['steps', 'jointAngle', 'muscleStrength'];

function PastDataPage() {
    const [selectedTimeframe, setSelectedTimeframe] = useState('');
    const [selectedFields, setSelectedFields] = useState([]);

    const handleTimeframeChange = (event) => {
        setSelectedTimeframe(event.target.value);
    };

    const handleFieldChange = (event) => {
        setSelectedFields(event.target.value);
    };

    const filteredData = selectedTimeframe && selectedFields.length > 0 
        ? mockData.filter(data => data.date.startsWith(selectedTimeframe)) 
        : [];


    const downloadCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8," 
        + ["Date", ...selectedFields].join(",") + "\n" 
        + filteredData.map(row => [row.date, ...selectedFields.map(field => row[field])].join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "past_data.csv");
        document.body.appendChild(link); 

        link.click(); 
    }

    const downloadSessionData = () => {
        let csvContent = "data:text/csv;charset=utf-8," 
        + Object.keys(selectedSessionData).join(",") + "\n" 
        + Object.values(selectedSessionData).join(",");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "session_data.csv");
        document.body.appendChild(link);

        link.click();
    }

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedSessionData, setSelectedSessionData] = useState({});

    const handleDateClick = (date) => {
        const sessionData = mockData.find(d => d.date === date);
        setSelectedSessionData(sessionData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

return (
    <Box sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Past Data</Typography>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
    {/* Searchable Timeframe Selector */}
    <Autocomplete
        value={selectedTimeframe}
        onChange={(event, newValue) => {
            setSelectedTimeframe(newValue);
        }}
        options={['2023-01', '2023-02']} // Add more options as needed
        renderInput={(params) => <TextField {...params} label="Timeframe" />}
    />
</FormControl>

<FormControl sx={{ m: 1, minWidth: 300 }}>
    {/* Searchable Fields Selector */}
    <Autocomplete
        multiple
        value={selectedFields}
        onChange={(event, newValue) => {
            setSelectedFields(newValue);
        }}
        options={allFields}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Fields" />}
    />
</FormControl>


        <Button variant="contained" onClick={downloadCSV} sx={{ m: 1 }}>
            Download
        </Button>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        {selectedFields.map(field => (
                            <TableCell key={field}>{field}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData.map((row, index) => (
                        <TableRow key={index} hover onClick={() => handleDateClick(row.date)} style={{ cursor: 'pointer' }}>
                            <TableCell>{row.date}</TableCell>
                            {selectedFields.map(field => (
                                <TableCell key={field}>{row[field]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* Dialog for Session Summary */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Session Summary</DialogTitle>
            <DialogContent>
                <Typography>{`Date: ${selectedSessionData.date}`}</Typography>
                {/* Display other details */}
                {allFields.map(field => (
                    <Typography key={field}>{`${field}: ${selectedSessionData[field]}`}</Typography>
                ))}
                <Button onClick={downloadSessionData}>Download This Session</Button>
            </DialogContent>
        </Dialog>
    </Box>
);
                }

export default PastDataPage;

