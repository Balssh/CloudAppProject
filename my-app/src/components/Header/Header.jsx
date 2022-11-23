import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme, styled, alpha } from "@mui/material/styles";

const Header = () => {
    const theme = useTheme();

    const BoxSearch = styled(Box)(({ theme }) => ({
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(1), width: "auto" },
    }));

    const BoxSearchIcon = styled(Box)(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "flex",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }));

    const CustomInputBase = styled(InputBase)(({ theme }) => ({
        color: "inherit",
        "& .MuiInputBase-input": { padding: theme.spacing(1, 1, 1, 0), paddingLeft: `calc(1em + ${theme.spacing(4)})`, transition: theme.transitions.create("width"), width: "100%", [theme.breakpoints.up("md")]: { width: "20ch" } },
    }));

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
                <Box display="flex">
                    <Typography variant="h6"
                        sx={{
                            display: "none",
                            [theme.breakpoints.up("sm")]: {
                                display: "block",
                            },
                        }}>
                        Select a place
                    </Typography>
                    {/* <Autocomplete> */}
                    <BoxSearch >
                        <BoxSearchIcon>
                            <SearchIcon />
                            <CustomInputBase placeholder="Search..." />
                        </BoxSearchIcon>
                    </BoxSearch>
                    {/* </Autocomplete> */}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;