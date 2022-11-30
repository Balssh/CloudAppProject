import { React, useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Map from "./components/Map/Map";
import AlertCard from "./components/AlertCard/AlertCard";



const App = () => {
	const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });

	function handleSelect(location, alert, coordinates) {
		console.log(location, alert, coordinates);
		setCenter(coordinates);
	};

	return (
		<>
			<CssBaseline />
			<Header style={{
				position: "absolute",
				marginss: "auto",
			}}/>
			<Grid container spacing={3} style={{
				width: "100%",
				marginTop: "64px",

			}}
			>
				<Grid xs={12} md={2}
					sx={{
						display: { xs: "none", md: "block" },
					}}
				>
					<Menu />
				</Grid>

				<Grid xs={12} md={4}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<AlertCard handleSelect={handleSelect} />
				</Grid>
				<Grid xs={12} md={6}
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Map center={center} />
				</Grid>
			</Grid>
		</>
	);
}

export default App;