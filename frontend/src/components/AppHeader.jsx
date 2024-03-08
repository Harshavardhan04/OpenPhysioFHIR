// import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";
// import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import SettingsIcon from '@mui/icons-material/Settings';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useProSidebar } from "react-pro-sidebar";
// import teamLogo from '../../src/assets/teamlogo.png';
// import teamLogo2 from '../../src/assets/teamlogo2.png';
// import { useNavigate } from "react-router-dom";


// function AppHeader() {

//     const navigate = useNavigate();
//     const handleLogout = () => {
//         // Add any pre-logout logic here (e.g., clearing local storage, tokens, etc.)

//         // Navigate to the home page
//         navigate('/');
//     };

//     const { collapseSidebar, toggleSidebar, broken } = useProSidebar();
//     return (<AppBar position="sticky" sx={styles.appBar}>
//         <Toolbar>
//             <Box
//                 component='img'
//                 sx={styles.appLogo}
//                 src={teamLogo} 
//                 onClick={() => navigate('/')}/>
            
//             <Box sx={{ flexGrow: 1 }} />
//             <IconButton title='Logout' color='secondary' onClick={handleLogout}>
//                 <LogoutIcon />
//             </IconButton>
//         </Toolbar>
//     </AppBar>
//     );
// }

// /**@type {import("@mui/material").SxProps}*/
// const styles = {
//     appBar: {
//         bgcolor: 'primary.dark'
//     },
//     appLogo: {
//         borderRadius: 2,
//         width: 80,
//         ml: 2,
//         cursor: 'pointer'
//     }
// }

// export default AppHeader;


import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          OpenPhysio FHIR
        </Typography>
        
        <IconButton title='Logout' color='inherit' onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

const styles = {
  appBar: {
    bgcolor: 'primary.dark',
  }
};

export default AppHeader;
