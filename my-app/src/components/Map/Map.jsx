import { React, useState, useRef, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

const Map = ({ center, alertsList }) => {
    // const [map, setMap] = useState(null)
    const mapRef = useRef();
    const [alerts, setAlerts] = useState(alertsList);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
    })

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        setAlerts(alertsList);
        alerts.map((alert) => {
            const location = new window.google.maps.LatLng(
                alert.lat,
                alert.lng
            );
            bounds.extend(location);
        });
        map.fitBounds(bounds);
        mapRef.current = map
    }, []);
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
                    maxZoom: 18,
                    minZoom: 10,
                }}
                onLoad={onLoad}
            >
                {alerts.map((alert, ind) => {
                    // console.log(alert, ind);
                    return <MarkerF key={ind} position={alert} />;
                })}
                <MarkerF position={center}
                    icon={{
                        // path: google.maps.SymbolPath.CIRCLE,
                        url: ("https://www.svgrepo.com/show/429985/christmas-santa-claus.svg"),
                        fillColor: '#EB00FF',
                        scale: 7,
                    }}
                />
            </GoogleMap>
        </Box>
    ) : <></>;
}

export default Map;