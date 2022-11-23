import { React, useState, useRef, useEffect, useCallback } from "react";
import { Paper, Typography, useMediaQuery, Rating, Box } from "@mui/material";
import { LocationOnOutlinedIcon } from "@mui/icons-material";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { GoogleMap } from "@react-google-maps/api";

const center = { lat: 45.757533, lng: 21.229066 };

const Map = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery('(min-width:600px)');
    const mapRef = useRef();

    const onLoad = useCallback((map) => (mapRef.current = map), []);
    return (
        <Box
            sx={{
                position: "relative",
                width: "700px",
                height: "600px",
                zIndex: 1,
                "&hover": { zIndex: 2 },
                margin: [0, 0, 0, 5],
            }}
        >
            <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    border: "2px solid black",
                }}
                onLoad={onLoad}
            >

            </GoogleMap>

        </Box>
    );
}

export default Map;