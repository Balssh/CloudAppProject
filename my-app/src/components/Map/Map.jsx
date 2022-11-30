import { React, useState, useRef, useEffect, useCallback } from "react";
import { Box } from "@mui/material";
import { GoogleMap, Marker } from "@react-google-maps/api";

const Map = ({center}) => {
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
                maxWidth: "90%",
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
                <Marker position={center} />
            </GoogleMap>

        </Box>
    );
}

export default Map;