import { React, useState, useEffect } from "react";
import { CssBaseline, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import axios from "axios";

import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import AlertCard from "../AlertCard/AlertCard";
import Map from "../Map/Map";


async function alerts(setCenter, alertsList) {
    await axios.get("https://cloudbeesapi.azurewebsites.net/Alert", {
    }).then((res) => {
        res.data.forEach(element => {
            // console.log(element);
            alertsList.push({ lat: element.latitude, lng: element.longitude });
        });
        if (alertsList.length > 0) {
            let lat = 0;
            let lng = 0;
            alertsList.forEach(element => {
                lat += element.lat;
                lng += element.lng;
            })
            let cntLat = lat / alertsList.length;
            let cntLng = lng / alertsList.length;
            // console.log(cntLat, cntLng);
            setCenter({ lat: cntLat, lng: cntLng });
        }
    }).catch((err) => {
        console.log(err);
    });
}

const DashboardUser = () => {
    const [isReady, setIsReady] = useState(false);
    const [alertsList, setAlertsList] = useState([]);
    const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });

    useEffect(() => {
        const fetchData = async () => {
            setAlertsList([]);
            await alerts(setCenter, alertsList);
        }
        fetchData()
            .then(() => {
                // console.log(alertsList)
                setAlertsList(alertsList);
                setIsReady(true);
            })
            .catch(console.error);
    }, []);
    return isReady ? (
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
                    <Map center={center} alertsList={alertsList} />
                </Grid>
            </Grid>
        </>
    ) : <></>;
}

export default DashboardUser;