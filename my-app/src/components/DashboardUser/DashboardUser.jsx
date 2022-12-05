import { React, useState, useEffect } from "react";
import { CssBaseline, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import axios from "axios";

import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import AlertCard from "../AlertCard/AlertCard";
import Map from "../Map/Map";
import { getAlertsList } from "../Helper/APICalls";

const DashboardUser = () => {
    const [isReady, setIsReady] = useState(false);
    const [alertsList, setAlertsList] = useState([]);
    const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });

    useEffect(() => {
        const fetchData = async () => {
            setAlertsList([]);
            await getAlertsList(setCenter, alertsList);
        }
        fetchData()
            .then(() => {
                // console.log(alertsList)
                setAlertsList(alertsList);
                setIsReady(true);
            })
            .catch(console.error);
    }, []);
    return (
        <>
            <CssBaseline />
            <Header />
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
                </Grid>
                <Grid xs={12} md={6}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {isReady && <Map center={center} alertsList={alertsList} />}
                </Grid>
            </Grid>
        </>
    );
}

export default DashboardUser;