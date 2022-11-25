import { React, useState, useEffect } from "react";

import { Typography, Stack, Card, CardContent, CardActionArea, Button } from "@mui/material";
import Select from 'react-select'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const alertTypes = [
	{ value: "pothole", label: "Pothole" },
	{ value: "traffic jam", label: "Traffic Jam" },
	{ value: "accident", label: "Accident" },
	{ value: "fallen tree", label: "Fallen Tree" },
	{ value: "falling plaster", label: "Falling Plaster" },
	{ value: "other", label: "Other" }
];

const AlertCard = ({setLocation, setAlert}) => {

	// console.log(value.label);
	return (
		<Card
			sx={{
				width: "100%",
				minWidth: "300px",
				padding: "10px",
			}}
		>
			<CardContent>
				<Typography variant="h6" component="div">
					Insert details about the alert
				</Typography>
				<Stack spacing={1}
				>
					<GooglePlacesAutocomplete
						// apiKey="AIzaSyAF--9XqeP0nbm5ZRnFeupvaOu4Ik1PR14"
						selectProps={{
							menuPlacement: "auto",
							menuPosition: "fixed",
							onChange: setLocation,
						}}

						fetchDetails={true}
					/>
					<Select options={alertTypes}
						menuPlacement="auto"
						menuPosition="fixed"
						onChange={setAlert}
					/>
				</Stack>
			</CardContent>
			<CardActionArea>
				<Button variant="contained">Submit</Button>
			</CardActionArea>
		</Card>
	);
}

export default AlertCard;