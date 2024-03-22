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
