import { React, useState } from "react";

import { Typography, Stack, Autocomplete, TextField, Card, CardContent, CardActionArea, Button } from "@mui/material";

import usePlacesAutocomplete, { getGeoCode, getLatLng } from "use-places-autocomplete";

const top100Films = ['The Godfather', 'Pulp Fiction'];
const alertTypes = ["Pothole", "Traffic Jam", "Accident", "Fallen Tree", "Falling Plaster", "Other"];

const AlertCard = () => {
    const [options, setOptions] = useState();
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

    console.log(status, data);
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
                    <Autocomplete
                        freeSolo={true}
                        disablePortal
                        options={top100Films}
                        sx={{
                            width: "100%",
                        }}
                        onSelect={(e) => {}}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                        }}
                        disabled={!ready}
                        renderInput={(params) => <TextField {...params} label="Search place..." />}
                    />
                    <Autocomplete
                        disablePortal
                        options={alertTypes}
                        sx={{
                            width: "100%",
                        }}
                        renderInput={(params) => <TextField {...params} label="Alert type" />}
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