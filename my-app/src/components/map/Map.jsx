import { React, useState, useRef, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import MapMarker from "../mapMarker/MapMarker";

const Map = ({ center, alertsList }) => {
  const mapRef = useRef();
  const [alerts, setAlerts] = useState(alertsList);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    setAlerts(alertsList);
    alerts.map((alert, ind) => {
      const location = new window.google.maps.LatLng(
        alert.latitude,
        alert.longitude
      );
      bounds.extend(location);
    });
    map.fitBounds(bounds);
    mapRef.current = map;
  }, []);

  return true ? (
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
        options={{
          maxZoom: 18,
          minZoom: 0,
          disableDefaultUI: true,
        }}
        onLoad={onLoad}
      >
        {alerts.map((alert, ind) => {
          return <MapMarker key={ind} markerData={alert} />;
        })}

        <MarkerF
          position={center}
          icon={{
            // path: google.maps.SymbolPath.CIRCLE,
            url: "https://www.svgrepo.com/show/429985/christmas-santa-claus.svg",
            fillColor: "#EB00FF",
            scale: 7,
          }}
        />
      </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
