import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme, styled, alpha } from "@mui/material/styles";

const Header = () => {
    const theme = useTheme();

    return (
        <AppBar position="static">
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                <Typography variant="h5"
                    sx={{
                        display: "none",
                        [theme.breakpoints.up("sm")]: {
                            display: "block",
                        },
                    }}>
                    CityDanger
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;