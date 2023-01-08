import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { React, useCallback, useRef } from "react";
import MapMarker from "../mapMarker/MapMarker";
import { MapStyle } from "./mapStyle";

const Map = ({ center, alertsList }) => {
    const mapRef = useRef();
    // console.log(alertsList);
    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        alertsList.map((alert, ind) => {
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
                styles: MapStyle(),
            }}
            onLoad={onLoad}
        >
            {alertsList.map((alert, ind) => {
                return <MapMarker key={ind} markerData={alert} />;
            })}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default Map;
