import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = () => {
    const theme = useTheme();

    return (
        <AppBar
            position="fixed"
            sx={{
                width: "100%",
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar
                sx={{
                    backgroundColor: "#e07a5f",
                }}>
                <Typography variant="h5"
                    sx={{
                        display: "none",
                        [theme.breakpoints.up("sm")]: {
                            display: "block",
                        },
                    }}>
                    City Dangers
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;