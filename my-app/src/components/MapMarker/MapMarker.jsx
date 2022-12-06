import { React, useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { CardContent, CardActions, Typography } from "@mui/material";


const MapMarker = ({ ind, markerData }) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const [marker, setMarker] = useState({});

    const onMarkerClick = (event) => {
        if (showInfoWindow) {
            setShowInfoWindow(false);
        }
        else {
            setShowInfoWindow(true);
        }

    }

    const onInfoWindowClose = () => {
        setShowInfoWindow(false);
    }

    const onLoad = (marker) => {
        setMarker(marker);
    }

    return (
        <MarkerF
            id={ind}
            onLoad={onLoad}
            position={{ lat: markerData.latitude, lng: markerData.longitude }}
            onClick={onMarkerClick}
            clickable={true}
        >
            {showInfoWindow && (
                <InfoWindowF
                    position={{ lat: markerData.latitude, lng: markerData.longitude }}
                    onCloseClick={onInfoWindowClose}
                >
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {markerData.id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {markerData.location}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            Added by: {markerData.user}
                            <br />
                            Type: {markerData.type}
                        </Typography>
                        <Typography variant="body2">
                            {markerData.description}
                        </Typography>
                    </CardContent>
                </InfoWindowF>

            )}
        </MarkerF>
    )
}

export default MapMarker;