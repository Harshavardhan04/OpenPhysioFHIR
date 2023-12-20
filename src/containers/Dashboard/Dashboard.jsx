import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { Box, TextField, Typography, Button, IconButton, Grid } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const theme = useTheme();
    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            age: '',
            nhsNumber: '',
            problemDescription: '',
            desiredValues: [{ name: '', value: '' }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "desiredValues"
    });

    const onSubmit = (data) => console.log(data);

    const navigate = useNavigate();

    const handleExit = () => {
        navigate('/'); 
    };


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: theme.spacing(4),
                padding: theme.spacing(3),
                backgroundColor: '#fff',
                borderRadius: theme.shape.borderRadius,
                boxShadow: theme.shadows[2]
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing(2) }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    UPDATE PATIENT
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ marginRight: theme.spacing(1) }}>Add Field and Value</Typography>
                    <IconButton color="primary" aria-label="add field" onClick={() => fields.length < 10 && append({ name: '', value: '' })}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Box>
                <Button variant="contained" endIcon={<ExitToAppIcon />} onClick={handleExit}>
                    Exit
                </Button>

            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        defaultValue=""
                        variant="outlined"
                        margin="normal"
                        {...register("name", { required: true })}
                        error={errors.name}
                        helperText={errors.name ? "Name is required" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Age"
                        type="number"
                        defaultValue=""
                        variant="outlined"
                        margin="normal"
                        {...register("age", { required: true })}
                        error={errors.age}
                        helperText={errors.age ? "Age is required" : ""}
                    />
                    <TextField
                        fullWidth
                        label="NHS Number"
                        defaultValue=""
                        variant="outlined"
                        margin="normal"
                        {...register("nhsNumber", { required: true })}
                        error={errors.nhsNumber}
                        helperText={errors.nhsNumber ? "NHS Number is required" : ""}
                    />
                    <TextField
                        fullWidth
                        label="Problem Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        {...register("problemDescription", { required: true })}
                        error={errors.problemDescription}
                        helperText={errors.problemDescription ? "Problem Description is required" : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {fields.map((item, index) => (
                        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing(2) }}>
                            <TextField
                                label={`Desired Value ${index + 1} Name`}
                                variant="outlined"
                                sx={{ mr: 1, flex: 1 }}
                                {...register(`desiredValues.${index}.name`)}
                            />
                            <TextField
                                label={`Desired Value ${index + 1} Value`}
                                variant="outlined"
                                sx={{ mr: 1, flex: 1 }}
                                {...register(`desiredValues.${index}.value`)}
                            />
                            <IconButton aria-label="delete" onClick={() => remove(index)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: theme.spacing(2), marginTop: theme.spacing(2) }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit" onClick={handleSubmit(onSubmit)}>
                    Save
                </Button>


            </Box>
        </Box>
    );
}

export default Dashboard;
