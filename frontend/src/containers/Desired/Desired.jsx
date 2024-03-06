
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const Desired = () => {
    const [desiredValues, setDesiredValues] = useState([]);
    const [editStates, setEditStates] = useState({});

    useEffect(() => {
        fetchDesiredValues();
    }, []);

    const fetchDesiredValues = async () => {
        try {
            const response = await axios.get('/desired');
            setDesiredValues(response.data.map(item => ({ snomed: item[0], desired: item[1] })));
            const initialEditStates = response.data.reduce((acc, item) => {
                acc[item[0]] = item[1];
                return acc;
            }, {});
            setEditStates(initialEditStates);
        } catch (error) {
            console.error("Failed to fetch desired values", error);
        }
    };

    const handleUpdateDesiredValue = async (snomedCode) => {
        const newValue = editStates[snomedCode];
        try {
            await axios.post('/desired', { snomedCode, desired: newValue });
            fetchDesiredValues();
        } catch (error) {
            console.error("Failed to update desired value", error);
        }
    };

    const handleEditChange = (snomedCode, value) => {
        const positiveValue = Math.max(0, parseFloat(value) || 0);
        setEditStates(prev => ({ ...prev, [snomedCode]: positiveValue.toString() }));
    };


    return (
        <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>SNOMED Code</TableCell>
                        <TableCell>Desired Value</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {desiredValues.map(({ snomed, desired }) => (
                        <TableRow key={snomed}>
                            <TableCell>{snomed}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    inputProps={{ min: "0" }}
                                    value={editStates[snomed] ?? desired}
                                    onChange={(e) => handleEditChange(snomed, e.target.value)}
                                    size="small"
                                />

                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdateDesiredValue(snomed)}
                                >
                                    Update
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default Desired;
