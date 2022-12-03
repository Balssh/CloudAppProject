import { React, useState, useEffect } from "react";
import axios from "axios";
import { Typography, Stack, Card, CardContent, CardActions, Button } from "@mui/material";
import Select from 'react-select'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
const alertTypes = [];

async function getAlertTypes() {
	await axios.get("https://cloudbeesapi.azurewebsites.net/AlertType")
		.then(
			(res) => {
				res.data.map((data) => {
					alertTypes.push({
						value: data.id,
						label: data.type,
					});
				});
			});
}

const AlertCard = ({ handleSelect }) => {

	const [location, setLocation] = useState({ label: "", value: "" });
	const [coordinates, setCoordinates] = useState({ lat: 45.757533, lng: 21.229066 });
	const [alert, setAlert] = useState(alertTypes[5]);

	useEffect(() => {
		getAlertTypes()
			.then();
		geocodeByAddress(location.label)
			.then(results => getLatLng(results[0]))
			.then(({ lat, lng }) => {
				setCoordinates({ lat, lng })
				// console.log('Successfully got latitude and longitude', coordinates.lat, coordinates.lng);
			}
			)
			.catch(error => console.error(error));
	}, [location]);

	return (
		<Card
			sx={{
				width: "100%",
				minWidth: "300px",
				padding: "10px",
				backgroundColor: "#f2cc8f",
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
				<Button
					sx={{
						backgroundColor: "#3d405b",
					}}
					variant="contained"
					onClick={() => handleSelect(location, alert, coordinates)}
				>
					Submit
				</Button>
			</CardActions>
		</Card>
	);
}

export default AlertCard;