import React from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 240;

const Menu = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { boxSizing: "border-box" },
            }}
            PaperProps={{
                sx: {
                    backgroundColor: "#5887FF",
                }
            }}

        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            alignItems="flex"
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
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