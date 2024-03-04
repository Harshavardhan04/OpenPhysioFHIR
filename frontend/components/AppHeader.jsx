import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useProSidebar } from "react-pro-sidebar";

function AppHeader() {
    const {collapseSidebar, toggleSidebar, broken} = useProSidebar();
    return (<AppBar position="sticky" sx={styles.appBar}>
        <Toolbar>
            <IconButton onClick={() => broken ? toggleSidebar(): collapseSidebar()} color="secondary">
                <MenuTwoToneIcon />
            </IconButton>
            <Box
                component = 'img'
                sx = {styles.appLogo}
                src = '../../src/assets/teamlogo.png'/>
             <Box sx = {{flexGrow: 1}}/>       
            <IconButton title = 'Notifications' color = 'secondary'>
                <Badge badgeContent = {14} color = "error">
                    <NotificationsIcon/>
                    </Badge>
                </IconButton>
                <IconButton title = 'Settings' color = 'secondary'>
                    <SettingsIcon/>
                </IconButton>
                <IconButton title = 'Logout' color = 'secondary'>
                    <LogoutIcon/>
                </IconButton>
        </Toolbar>
    </AppBar>
    );
}

/**@type {import("@mui/material").SxProps}*/
const styles = {
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo:{
        borderRadius:2,
        width: 80,
        ml: 2,
        cursor: 'pointer'
    }
}

export default AppHeader;