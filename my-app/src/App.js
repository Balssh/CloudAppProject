import { React, useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import AlertCard from "./components/AlertCard/AlertCard";

const center = { lat: 45.757533, lng: 21.229066 };

const App = () => {
	function handleSelect(location, thing) {
		console.log(location, thing);
	};
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
					<AlertCard handleSelect={handleSelect}/>
				</Grid>
				<Grid xs={12} md={6}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Map center={center}/>
				</Grid>
			</Grid>
		</>
	);
}

export default App;