import {
  Box,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  Select,
  MenuItem,
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

const FormItem = ({ id, name, label, formik }) => {
  return (
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
      id={id}
      name={name}
      label={label}
      type={"text"}
      value={formik.values[name]}
      onChange={formik.handleChange}
      InputProps={{
        endAdornment:
          name === "location" ? (
            <InputAdornment position="end">
              <AddLocationAltOutlinedIcon edge="end" />
            </InputAdornment>
          ) : name === "alertType" ? (
            <InputAdornment position="end">
              <CrisisAlertOutlinedIcon edge="end" />
            </InputAdornment>
          ) : name === "description" ? (
            <InputAdornment position="end">
              <DescriptionOutlinedIcon edge="end" />
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

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
      setAlertTypes([]);
      await getAlertTypes(alertTypes);
    };
    fetchData()
      .then(() => {
        console.log(alertTypes);
        setAlertTypes(alertTypes);
      })
      .catch(console.error);
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
    <Box
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
              <MenuItem key={alertType.label} value={alertType.label}>
                {alertType.label}
              </MenuItem>
            );
          })}
        </Select>
        <FormItem
          id="description"
          name="description"
          label="Description"
          formik={formik}
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
    </Box>
  );
};

export default AlertForm;
