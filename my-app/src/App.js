import { React, useEffect } from "react";
import { CssBaseline, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import { useJsApiLoader } from "@react-google-maps/api";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

const App = () => {

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
        googleMapsApiKey: "AIzaSyAF--9XqeP0nbm5ZRnFeupvaOu4Ik1PR14"
    });

	useEffect(() => {
		console.log(isLoaded);
	  }, [isLoaded]);

	return (
		<>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{ width: "100%" }}>
				<Grid xs={12} md={4}>
					<List />
				</Grid>

				<Grid item xs={12} md={8}>
					{ isLoaded && <Map /> }
				</Grid>
			</Grid>
		</>
	);
}

export default App;