import { React, useState, useEffect } from "react";

import { Typography, Stack, Card, CardContent, CardActions, Button } from "@mui/material";
import Select from 'react-select'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const alertTypes = [
	{ value: "pothole", label: "Pothole" },
	{ value: "traffic jam", label: "Traffic Jam" },
	{ value: "accident", label: "Accident" },
	{ value: "fallen tree", label: "Fallen Tree" },
	{ value: "falling plaster", label: "Falling Plaster" },
	{ value: "other", label: "Other" }
];

const AlertCard = ({ handleSelect }) => {

	const [location, setLocation] = useState({ label: "", value: "" });
	const [coordinates, setCoordinates] = useState({ lat: 45.757533, lng: 21.229066 });
	const [alert, setAlert] = useState(alertTypes[5]);

	useEffect(() => {
		geocodeByAddress(location.label)
			.then(results => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				setCoordinates({ lat, lng })
				console.log('Successfully got latitude and longitude', coordinates.lat, coordinates.lng);
			}
			)
			.catch(error => console.error(error));
		location === "" ? setLocation({ label: "", value: "" }) : setLocation(location);
	}, [location]);

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
							defaultValue: location,

						}}
						placeholder="Location"
						fetchDetails={true}
					/>
					<Select options={alertTypes}
						menuPlacement="auto"
						menuPosition="fixed"
						onChange={setAlert}
						placeholder="Select alert type"
					/>
				</Stack>
			</CardContent>
			<CardActions>
				<Button variant="contained"
					onClick={() => handleSelect(location, alert)}
				>
					Submit
				</Button>
			</CardActions>
		</Card>
	);
}

export default AlertCard;