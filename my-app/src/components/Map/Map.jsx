import { React, useState, useRef, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const Map = ({ center, alertsList }) => {
    const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
    })
    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        console.log(alertsList.length, alertsList);
        map.fitBounds(bounds);
        setMap(map)
    }, [])
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
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
                options={{
                    maxZoom: 16,
                    minZoom: 10,
                }}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {/* <MarkerF position={center} /> */}

                {alertsList.map((alert, index) => (
                    <MarkerF key={index} position={alert} />))}
            </GoogleMap>
        </Box>
    ) : <></>;
}

export default Map;