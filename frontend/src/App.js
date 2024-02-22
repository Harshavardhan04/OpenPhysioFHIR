import { useState } from 'react'
import axios from "axios";
import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import PastData from './containers/PastData/PastData';
import ViewCharts from './containers/ViewCharts/ViewCharts';
import LandingPage from './containers/LandingPage/LandingPage';
import Desired from './containers/Desired/Desired';
import AppHeader from './components/AppHeader'
import { ProSidebarProvider } from 'react-pro-sidebar';
import theme from './config/theme'
import { Box, CssBaseline, ThemeProvider, Typography } from '@mui/material'
// ... other imports ...

function App() {
  return (
    <ThemeProvider theme={theme}>
    <ProSidebarProvider>
    <Router>
      <AppHeader/>
      <Routes>
        {/* Other routes can go here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/update-patient" element={<Dashboard />} />
        <Route path = "/past-data" element={<PastData />} />
        <Route path = "/view-charts" element={<ViewCharts />} />
        <Route path = "/desired" element={<Desired />} />
        {/* If you want Dashboard to be the home page, use path="/" */}
      </Routes>
    </Router>
    </ProSidebarProvider>
    </ThemeProvider>
  );
}

export default App;


// function App() {

//    // new line start
//   const [profileData, setProfileData] = useState(null)

//   function getData() {
//     axios({
//       method: "GET",
//       url:"/profile",
//     })
//     .then((response) => {
//       const res =response.data
//       setProfileData(({
//         profile_name: res.name,
//         about_me: res.about}))
//     }).catch((error) => {
//       if (error.response) {
//         console.log(error.response)
//         console.log(error.response.status)
//         console.log(error.response.headers)
//         }
//     })}
//     //end of new line 

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>

//         {/* new line start*/}
//         <p>To get your profile details: </p><button onClick={getData}>Click me</button>
//         {profileData && <div>
//               <p>Profile name: {profileData.profile_name}</p>
//               <p>About me: {profileData.about_me}</p>
//             </div>
//         }
//          {/* end of new line */}
//       </header>
//     </div>
//   );
// }

// export default App;