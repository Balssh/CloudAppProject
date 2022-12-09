import { React, useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Stack,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import Select from "react-select";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import { getAlertTypes, addAlert } from "../Helper/APICalls";

const AlertCard = ({ setCenter }) => {
  const [location, setLocation] = useState({ label: "", value: "" });
  const [coordinates, setCoordinates] = useState({
    lat: 45.757533,
    lng: 21.229066,
  });
  const [alert, setAlert] = useState();
  const [description, setDescription] = useState("");
  const [alertTypes, setAlertTypes] = useState([]);

  const handleLocationChange = (location) => {
    setLocation(location);
    geocodeByAddress(location.label)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setCoordinates(latLng);
        setCenter(latLng);
      })
      .catch((error) => console.error("Error", error));
  };


  useEffect(() => {
    const fetchData = async () => {
      setAlertTypes([]);
      await getAlertTypes(alertTypes);
    };
    fetchData()
      .then(() => {
        // console.log(alertsList)
        setAlertTypes(alertTypes);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (location.label !== "") {
      geocodeByAddress(location.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          setCoordinates({ lat, lng });
        })
        .catch((error) => console.error(error));
    }
  }, [location]);

  return (
    <Card
      sx={{
        width: "100%",
        margin: "auto",
        // minWidth: "200px",
        padding: "10px",
        backgroundColor: "#f2cc8f",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          Insert details about the alert
        </Typography>
        <Stack spacing={1}>
          <GooglePlacesAutocomplete
            // apiKey="AIzaSyAF--9XqeP0nbm5ZRnFeupvaOu4Ik1PR14"
            selectProps={{
              menuPlacement: "auto",
              menuPosition: "fixed",
              onChange: handleLocationChange,
            }}
            placeholder="Location"
            fetchDetails={true}
          />
          <Select
            options={alertTypes}
            menuPlacement="auto"
            menuPosition="fixed"
            onChange={setAlert}
            placeholder="Select alert type"
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              backgroundColor: "white",
              zIndex: 0,
            }}
          />
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            backgroundColor: "#3d405b",
          }}
          variant="contained"
          onClick={() =>
            addAlert(location, alert, coordinates, description, setCenter)
          }
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AlertCard;
