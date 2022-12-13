import {
  Button,
  TextField,
  useTheme,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import { useFormik } from "formik";
import { useState, useEffect, useContext } from "react";
import { tokens } from "../../theme";

import { getAlertTypes, addAlert } from "../../Helper/APICalls";
import AutocompleteMUI from "../autocomplete/AutocompleteMUI";
import { StoreAlertTypes } from "../../Helper/Store";

const AlertForm = ({ setCenter }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formik = useFormik({
    initialValues: {
      location: "",
      coordinates: { lat: 0, lng: 0 },
      alertType: "",
      description: "",
    },
    onSubmit: (values) => {
      addAlert(
        values.location,
        values.alertType,
        values.coordinates,
        values.description
      );
      setCenter(values.coordinates);
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { alertTypes } = useContext(StoreAlertTypes);

  const handleLocationChange = (location) => {
    formik.setFieldValue("location", location.description);
    // console.log(location);
    geocodeByAddress(location.description)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        formik.setFieldValue("coordinates", latLng);
        setCenter(latLng);
        // console.log(latLng);
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <Stack
      spacing={2}
      sx={{
        width: "auto",
        height: "auto",
      }}
    >
      <Typography variant="h4">Add an alert</Typography>
      <form onSubmit={formik.handleSubmit}>
        <AutocompleteMUI handleLocation={handleLocationChange} />
        <TextField
          sx={{
            // TODO: Use theme colors
            "& label.Mui-focused": {
              color: theme.palette.outlines.selected,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.outlines.selected,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.outlines.default,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.outlines.hover,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.outlines.selected,
              },
            },
          }}
          select
          variant="outlined"
          margin="normal"
          fullWidth
          id={"alertType"}
          name={"alertType"}
          label={"Alert Type"}
          type={"text"}
          value={formik.values.alertType}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CrisisAlertOutlinedIcon edge="end" sx={{ mr: 2 }} />
              </InputAdornment>
            ),
          }}
        >
          {alertTypes.map((alertType) => {
            return (
              <MenuItem key={alertType.id} value={alertType.id}>
                {alertType.type}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          sx={{
            // TODO: Use theme colors
            "& label.Mui-focused": {
              color: theme.palette.outlines.selected,
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: theme.palette.outlines.selected,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: theme.palette.outlines.default,
              },
              "&:hover fieldset": {
                borderColor: theme.palette.outlines.hover,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.outlines.selected,
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
            color: colors.primary[400],
            backgroundColor: theme.palette.secondary.main,
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            margin: "auto",
            "&:hover": {
              backgroundColor: theme.palette.secondary.hoverButton,
            },
            mt: 2,
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
