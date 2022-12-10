import {
  Box,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";

import { getAlertTypes, addAlert } from "../../Helper/APICalls";
import AutocompleteMUI from "../autocomplete/AutocompleteMUI";

const AlertForm = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formik = useFormik({
    initialValues: {
      location: "",
      latitude: 0,
      longitude: 0,
      alertType: "",
      description: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const [alertTypes, setAlertTypes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getAlertTypes().then((data) => {
        console.log(data);
        setAlertTypes(data);
      });
    };

    fetchData();
  }, []);

  const handleLocationChange = (location) => {
    formik.setFieldValue("location", location.description);
    console.log(location);
    geocodeByAddress(location.description)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        formik.setFieldValue("latitude", latLng.lat);
        formik.setFieldValue("longitude", latLng.lng);
        //   setCenter(latLng);
        console.log(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: "300px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <AutocompleteMUI handleLocation={handleLocationChange} />

        <Select
          fullWidth
          name="alertType"
          id="alertType"
          value={formik.values.alertType}
          label="Alert Type"
          onChange={formik.handleChange}
        >
          {alertTypes.map((alertType) => {
            return (
              <MenuItem key={alertType.id} value={alertType.type}>
                {alertType.type}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          sx={{
            // TODO: Use theme colors
            "& label.Mui-focused": {
              color: "green",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "green",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "red",
              },
              "&:hover fieldset": {
                borderColor: "yellow",
              },
              "&.Mui-focused fieldset": {
                borderColor: "green",
              },
            },
          }}
          variant="outlined"
          margin="normal"
          fullWidth
          id={"description"}
          name={"description"}
          label={"Description"}
          type={"text"}
          value={formik.values.description}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <DescriptionOutlinedIcon edge="end" />
              </InputAdornment>
            ),
          }}
        />
        <Button
          sx={{
            backgroundColor: colors.primary[400],
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            margin: "auto",
          }}
          variant="contained"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default AlertForm;
