import React from "react";
import { AppBar, Toolbar, Typography} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Header = () => {
    const theme = useTheme();

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: "#102E4A",
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