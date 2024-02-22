// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

// // const Desired = ({ patientId }) => {
// //     const [desiredValues, setDesiredValues] = useState([]);
// //     const [editState, setEditState] = useState({}); // Tracks the edit state of SNOMED values

// //     useEffect(() => {
// //         fetchDesiredValues();
// //     }, [patientId]);

// //     const fetchDesiredValues = async () => {
// //         try {
// //             const response = await axios.get(`/desired`);
// //             setDesiredValues(response.data.map(item => ({ snomed: item[0], desired: item[1] })));
// //         } catch (error) {
// //             console.error("Failed to fetch desired values", error);
// //         }
// //     };

// //     const handleUpdateDesiredValue = async (snomedCode) => {
// //         const newValue = editState[snomedCode];
// //         try {
// //             await axios.post(`/desired/${snomedCode}`, { desired: newValue });
// //             fetchDesiredValues(); // Refresh the data
// //             setEditState(prev => ({ ...prev, [snomedCode]: '' })); // Reset edit state for this SNOMED code
// //         } catch (error) {
// //             console.error("Failed to update desired value", error);
// //         }
// //     };

// //     const handleChange = (snomedCode, value) => {
// //         setEditState(prev => ({ ...prev, [snomedCode]: value }));
// //     };

// //     return (
// //         <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
// //             <Table>
// //                 <TableHead>
// //                     <TableRow>
// //                         <TableCell>SNOMED Code</TableCell>
// //                         <TableCell>Desired Value</TableCell>
// //                         <TableCell>Action</TableCell>
// //                     </TableRow>
// //                 </TableHead>
// //                 <TableBody>
// //                     {desiredValues.map(({ snomed, desired }) => (
// //                         <TableRow key={snomed}>
// //                             <TableCell>{snomed}</TableCell>
// //                             <TableCell>
// //                                 <TextField
// //                                     defaultValue={desired}
// //                                     onChange={(e) => handleChange(snomed, e.target.value)}
// //                                     size="small"
// //                                 />
// //                             </TableCell>
// //                             <TableCell>
// //                                 <Button
// //                                     variant="contained"
// //                                     color="primary"
// //                                     onClick={() => handleUpdateDesiredValue(snomed)}
// //                                 >
// //                                     Save
// //                                 </Button>
// //                             </TableCell>
// //                         </TableRow>
// //                     ))}
// //                 </TableBody>
// //             </Table>
// //         </Paper>
// //     );
// // };

// // export default Desired;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

// const Desired = ({ patientId }) => {
//     const [desiredValues, setDesiredValues] = useState([]);
//     const [editState, setEditState] = useState({}); // Tracks the edit state of SNOMED values

//     useEffect(() => {
//         // Ensure the patient ID is set in the backend session or context before fetching
//         fetchDesiredValues();
//     }, [patientId]); // patientId prop might not be necessary if patient ID is managed globally or in backend session

//     const fetchDesiredValues = async () => {
//         try {
//             // Directly call `/desired` to get all desired values for the current patient
//             const response = await axios.get(`/desired`);
//             setDesiredValues(response.data.map(item => ({ snomed: item[0], desired: item[1] })));
//         } catch (error) {
//             console.error("Failed to fetch desired values", error);
//         }
//     };

//     const handleUpdateDesiredValue = async (snomedCode) => {
//         const newValue = editState[snomedCode];
//         try {
//             await axios.post(`/desired/${snomedCode}`, { desired: newValue });
//             fetchDesiredValues(); // Refresh the data after update
//             setEditState(prev => ({ ...prev, [snomedCode]: '' })); // Reset edit state for this SNOMED code
//         } catch (error) {
//             console.error("Failed to update desired value", error);
//         }
//     };

//     const handleChange = (snomedCode, value) => {
//         setEditState(prev => ({ ...prev, [snomedCode]: value }));
//     };

//     return (
//         <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>SNOMED Code</TableCell>
//                         <TableCell>Desired Value</TableCell>
//                         <TableCell>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {desiredValues.map(({ snomed, desired }) => (
//                         <TableRow key={snomed}>
//                             <TableCell>{snomed}</TableCell>
//                             <TableCell>
//                                 <TextField
//                                     value={editState[snomed] ?? desired}
//                                     onChange={(e) => handleChange(snomed, e.target.value)}
//                                     size="small"
//                                 />
//                             </TableCell>
//                             <TableCell>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={() => handleUpdateDesiredValue(snomed)}
//                                 >
//                                     Save
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Paper>
//     );
// };

// export default Desired;


// Desired.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

// const Desired = () => {
//     const [desiredValues, setDesiredValues] = useState([]);

//     useEffect(() => {
//         fetchDesiredValues();
//     }, []);

//     const fetchDesiredValues = async () => {
//         try {
//             const response = await axios.get('/desired');
//             setDesiredValues(response.data);
//         } catch (error) {
//             console.error("Failed to fetch desired values", error);
//         }
//     };

//     const handleUpdateDesiredValue = async (snomedCode, newValue) => {
//         try {
//             await axios.post(`/desired/${snomedCode}`, { desired: newValue });
//             fetchDesiredValues(); // Refresh the data
//         } catch (error) {
//             console.error("Failed to update desired value", error);
//         }
//     };

//     return (
//         <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>SNOMED Code</TableCell>
//                         <TableCell>Desired Value</TableCell>
//                         <TableCell>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {desiredValues.map(({ snomed, desired }) => (
//                         <TableRow key={snomed}>
//                             <TableCell>{snomed}</TableCell>
//                             <TableCell>
//                                 <TextField
//                                     defaultValue={desired}
//                                     onBlur={(e) => handleUpdateDesiredValue(snomed, e.target.value)}
//                                     size="small"
//                                 />
//                             </TableCell>
//                             <TableCell>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={() => handleUpdateDesiredValue(snomed, desired)}
//                                 >
//                                     Update
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Paper>
//     );
// };

// export default Desired;


// // Desired.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

// const Desired = () => {
//     const [desiredValues, setDesiredValues] = useState([]);

//     useEffect(() => {
//         fetchDesiredValues();
//     }, []);

//     const fetchDesiredValues = async () => {
//         try {
//             const response = await axios.get('/desired');
//             setDesiredValues(response.data.map(item => ({ snomed: item[0], desired: item[1] })));
//         } catch (error) {
//             console.error("Failed to fetch desired values", error);
//         }
//     };

//     const handleUpdateDesiredValue = async (snomedCode, newValue) => {
//         try {
//             await axios.post('/desired', { snomedCode, desired: newValue });

//         } catch (error) {
//             console.error("Failed to update desired value", error);
//         }
//     };

//     return (
//         <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell>SNOMED Code</TableCell>
//                         <TableCell>Desired Value</TableCell>
//                         <TableCell>Action</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {desiredValues.map(({ snomed, desired }) => (
//                         <TableRow key={snomed}>
//                             <TableCell>{snomed}</TableCell>
//                             <TableCell>
//                                 <TextField
//                                     defaultValue={desired}
//                                     onBlur={(e) => handleUpdateDesiredValue(snomed, e.target.value)}
//                                     size="small"
//                                 />
//                             </TableCell>
//                             <TableCell>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     onClick={(e) => {
//                                         e.preventDefault(); // Prevent default form submission
//                                         handleUpdateDesiredValue(snomed, e.target.value);
//                                     }}
//                                 >
//                                     Update
//                                 </Button>
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </Paper>
//     );
// };

// export default Desired;

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
            // Initialize editStates with the fetched data
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
            fetchDesiredValues(); // Refresh the data
        } catch (error) {
            console.error("Failed to update desired value", error);
        }
    };

    const handleEditChange = (snomedCode, value) => {
        setEditStates(prev => ({ ...prev, [snomedCode]: value }));
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
