import { Box, Menu, Typography } from "@mui/material";
import { MenuItem, Sidebar } from "react-pro-sidebar";
import DashbordOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import SourceOutlinedIcon from '@mui/icons-material/SourceOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

function SideNav(){
    return (<Sidebar>
        <Menu >
            <MenuItem active icon = {<DashbordOutlinedIcon/>}>
                <Typography variant = "body2">
                    Dashboard
                </Typography>
            </MenuItem>
            <MenuItem active icon = {<SourceOutlinedIcon/>}>
                <Typography variant = "body2">
                    Content
                </Typography>
            </MenuItem>
            <MenuItem active icon = {<AnalyticsOutlinedIcon/>}>
                <Typography variant = "body2">
                    Analytics
                </Typography>
            </MenuItem>
            <MenuItem active icon = {<StyleOutlinedIcon/>}>
                <Typography variant = "body2">
                    Customiszation
                </Typography>
            </MenuItem>
        </Menu>
    </Sidebar>);
}
export default SideNav;