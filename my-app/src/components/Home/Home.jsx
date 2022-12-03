import { React, useState } from "react";
import { CssBaseline} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import AlertCard from "../AlertCard/AlertCard";
import Map from "../Map/Map";


const Home = () => {
    const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });
    function handleSelect(location, alert, coordinates) {
        console.log(location, alert, coordinates);
        setCenter(coordinates);
    };

    return (
        <>
            <CssBaseline />
            <Header style={{

            }} />
            <Grid container spacing={3} style={{
                width: "100wh",
                height: "100vh",
                marginTop: "25px",
                backgroundColor: "#f4f1de",
            }}
            >
                <Grid xs={12} md={2}
                    sx={{
                        display: { xs: "none", md: "block" },
                    }}
                >
                    <Menu />
                </Grid>

                <Grid xs={12} md={4}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <AlertCard handleSelect={handleSelect} />
                </Grid>
                <Grid xs={12} md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Map center={center} />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;