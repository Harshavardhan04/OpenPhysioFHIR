import { Avatar, Box, Typography, ListItemIcon } from "@mui/material";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import DashbordOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { useTheme } from "@emotion/react";
import { Link, useLocation } from "react-router-dom";

function SideNav() {
    const theme = useTheme();
    const location = useLocation();
    
    const isNotLandingPage = location.pathname !== '/';

    const linkStyle = {
        textDecoration: 'none', 
        color: 'inherit', 
        display: 'flex',
        alignItems: 'center',
    };

    if (isNotLandingPage) {
        return (
            <Sidebar style={{
                height: '100%',
                top: 'auto'
            }}
                breakPoint="md"
                backgroundColor={theme.palette.neutral.light}
            >
                <Menu>
                    <MenuItem active={location.pathname === '/update-patient'} icon={<DashbordOutlinedIcon />}>
                        <Link to="/update-patient" style={linkStyle}>
                            <Typography variant="body2">Dashboard</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem active={location.pathname === '/pastData'} icon={<SourceOutlinedIcon />}>
                        <Link to="/pastData" style={linkStyle}>
                            <Typography variant="body2">Past Data</Typography>
                        </Link>
                    </MenuItem>
                    <MenuItem active={location.pathname === '/viewCharts'} icon={<AnalyticsOutlinedIcon />}>
                        <Link to="/viewCharts" style={linkStyle}>
                            <Typography variant="body2">View Charts</Typography>
                        </Link>
                    </MenuItem>
                </Menu>
            </Sidebar>
        );
    } else {
        return null;
    }
}

export default SideNav;
