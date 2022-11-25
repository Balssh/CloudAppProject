import { React, useEffect } from "react";
import { CssBaseline, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import AlertCard from "./components/AlertCard/AlertCard";

const App = () => {

	return (
		<>
			<CssBaseline />
			<Header />
			<Grid container spacing={3} style={{
				width: "100%",
				margin: "auto", }}
			>
				<Grid xs={12} md={2}>
					<List />
				</Grid>

				<Grid xs={12} md={4}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AlertCard />
				</Grid>
				<Grid xs={12} md={6}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Map />
				</Grid>
			</Grid>
		</>
	);
}

export default App;