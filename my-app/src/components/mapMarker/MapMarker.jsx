import { React, useState } from "react";
import { MarkerF, InfoWindowF } from "@react-google-maps/api";
import { CardContent, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

const MapMarker = ({ ind, markerData }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const onMarkerClick = (event) => {
    if (showInfoWindow) {
      setShowInfoWindow(false);
    } else {
      setShowInfoWindow(true);
    }
  };

  const onInfoWindowClose = () => {
    setShowInfoWindow(false);
  };

  return (
    <MarkerF
      id={ind}
      position={{ lat: markerData.latitude, lng: markerData.longitude }}
      onClick={onMarkerClick}
      clickable={true}
      icon={{
        url: "https://www.svgrepo.com/show/416467/app-interface-location.svg",
        scaledSize: new window.google.maps.Size(45, 45),
      }}
    >
      {showInfoWindow && (
        <InfoWindowF
          position={{ lat: markerData.latitude, lng: markerData.longitude }}
          onCloseClick={onInfoWindowClose}
        >
          <CardContent
            sx={{
              backgroundColor: colors.primary[400],
              height: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
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
            <Typography variant="body2">{markerData.description}</Typography>
          </CardContent>
        </InfoWindowF>
      )}
    </MarkerF>
  );
};

export default MapMarker;
