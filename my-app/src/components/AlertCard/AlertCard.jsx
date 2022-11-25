import { React, useState, useEffect } from "react";

import { Typography, Stack, Autocomplete, TextField, Card, CardContent, CardActionArea, Button } from "@mui/material";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

// const top100Films = ['The Godfather', 'Pulp Fiction'];
const alertTypes = ["Pothole", "Traffic Jam", "Accident", "Fallen Tree", "Falling Plaster", "Other"];

const AlertCard = () => {
    const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({ debounce: 1000 });
    const handleInput = (e) => {
        setValue(e.target.value);
        console.log(e, data.description);
    };
    const handleSelect = ({ description }) => () => {
        console.log({ description });

        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description })
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                console.log('📍 Coordinates: ', { lat, lng });
            })
            .catch(error => {
                console.log('😱 Error: ', error);
            });
    };

    // console.log(status, data);
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
                    {ready && <Autocomplete
                        sx={{
                            width: "100%",
                        }}
                        options={data}
                        freeSolo={true}
                        getOptionLabel={ option => typeof option === 'string' ? option : option.description}
                        filterOptions= {x => x}
                        includeInputInList= {true}
                        filterSelectedOptions= {true}
                        value={data.find(x => x.description === value)}
                        onChange={console.log("PLM")}
                        renderInput={(params) => <TextField {...params} label="Search place..." onChange={handleInput}/>}
                    />}
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