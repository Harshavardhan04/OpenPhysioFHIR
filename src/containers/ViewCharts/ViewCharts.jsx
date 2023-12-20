import React, { useRef, useEffect, useState } from 'react';
import { Typography, Box, Grid, IconButton } from "@mui/material";
import Chart from 'chart.js/auto';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function ViewCharts() {
    const [expanded, setExpanded] = useState({
        line: false,
        bar: false,
        doughnut: false,
        radar: false
    });

    const lineChartRef = useRef(null);
    const barChartRef = useRef(null);
    const doughnutChartRef = useRef(null);
    const radarChartRef = useRef(null);
    const chartInstances = useRef([]);

    const toggleChartSize = (chartName) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [chartName]: !prevExpanded[chartName]
        }));
    };

    const chartStyle = (chartName) => ({
        width: expanded[chartName] ? '100%' : '50%',
        height: expanded[chartName] ? '400px' : '200px',
        transition: 'width 0.3s ease, height 0.3s ease'
    });

    const [selectedSession, setSelectedSession] = useState({
        muscleStrength: 'Session 1',
        balanceAssessment: 'Session 1'
    });

    // const handleSessionChange = (chartName, session) => {
    //     setSelectedSession(prevState => ({ ...prevState, [chartName]: session }));
    // };

    // const generateRandomData = (numPoints) => Array.from({ length: numPoints }, () => Math.floor(Math.random() * 100));

    useEffect(() => {
        // Clear previous instances
        chartInstances.current.forEach(chart => chart.destroy());
        chartInstances.current = [];

        // Line Chart for Joint Angles
        chartInstances.current.push(new Chart(lineChartRef.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
                datasets: [{
                    label: 'Joint Angle (degrees)',
                    data: [20, 25, 30, 35, 40],
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Progress in Joint Angle'
                    }
                }
            }
        }));



        // Bar Chart for Steps Walked
        chartInstances.current.push(new Chart(barChartRef.current.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
                datasets: [{
                    label: 'Number of Steps',
                    data: [10, 15, 20, 25, 30],
                    backgroundColor: 'rgb(255, 99, 132)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Improvement in Walking Ability'
                    }
                }
            }
        }));

        // Doughnut Chart for Muscle Strength
        chartInstances.current.push(new Chart(doughnutChartRef.current.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['Weak', 'Moderate', 'Strong'],
                datasets: [{
                    label: 'Muscle Strength',
                    data: [30, 40, 30],
                    backgroundColor: [
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Muscle Strength Assessment'
                    }
                }
            }
        }));

        // Radar Chart for Balance
        chartInstances.current.push(new Chart(radarChartRef.current.getContext('2d'), {
            type: 'radar',
            data: {
                labels: ['Balance', 'Stability', 'Coordination', 'Agility'],
                datasets: [{
                    label: 'Balance Assessment',
                    data: [65, 59, 90, 81],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Balance and Coordination'
                    }
                },
                elements: {
                    line: {
                        borderWidth: 3
                    }
                }
            }
        }));

        return () => chartInstances.current.forEach(chart => chart.destroy());
    }, []);

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Typography variant="h5" gutterBottom>Patient Progress Charts</Typography>
            <Grid container spacing={3} direction="column">
                {/* Line Chart */}
                <Grid item xs={12} sx={chartStyle('line')}>
                    <Typography variant="h6" gutterBottom>Joint Angle Measurement</Typography>
                    <IconButton onClick={() => toggleChartSize('line')}>
                        {expanded.line ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <canvas ref={lineChartRef} />
                </Grid>
                {/* Bar Chart */}
                <Grid item xs={12} sx={chartStyle('bar')}>
                    <Typography variant="h6" gutterBottom>Steps Walked</Typography>
                    <IconButton onClick={() => toggleChartSize('bar')}>
                        {expanded.bar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <canvas ref={barChartRef} />
                </Grid>
                {/* Doughnut Chart */}
                <Grid item xs={12} sx={chartStyle('doughnut')}>
                    <Typography variant="h6" gutterBottom>Muscle Strength</Typography>
                    <IconButton onClick={() => toggleChartSize('doughnut')}>
                        {expanded.doughnut ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <canvas ref={doughnutChartRef} />
                </Grid>
                {/* Radar Chart */}
                <Grid item xs={12} sx={chartStyle('radar')}>
                    <Typography variant="h6" gutterBottom>Balance Assessment</Typography>
                    <IconButton onClick={() => toggleChartSize('radar')}>
                        {expanded.radar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    <canvas ref={radarChartRef} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default ViewCharts;

