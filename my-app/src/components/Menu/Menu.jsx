import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Menu = () => {
    const signOut = useSignOut();
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut();
        navigate("/login");
    };
    const handleDashboard = () => {
        navigate("/dashboard");
    };
    const handleHome = () => {
        navigate("/");
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
            }}
            PaperProps={{
                sx: {
                    backgroundColor: "#f2cc8f",
                }
            }}

        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleHome}
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleDashboard}
                        >
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={handleLogout}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer >
    );
}

export default Menu;