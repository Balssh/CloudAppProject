import {
  Button,
  TextField,
  useTheme,
  InputAdornment,
  MenuItem,
  Stack,
} from "@mui/material";
import CrisisAlertOutlinedIcon from "@mui/icons-material/CrisisAlertOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { useFormik } from "formik";
import { useContext } from "react";

import { tokens } from "../../theme";
import { StoreAlertTypes } from "../../Helper/Store";

const Filter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formik = useFormik({
    initialValues: {
      user: "",
      alertType: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { alertTypes } = useContext(StoreAlertTypes);

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        backgroundColor: colors.primary.background,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
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
              minWidth: "200px",
            },
            mr:2,
          }}
          variant="outlined"
          margin="normal"
          id={"user"}
          name={"user"}
          label={"User"}
          type={"text"}
          value={formik.values.user}
          onChange={formik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PersonOutlinedIcon edge="end" />
              </InputAdornment>
            ),
          }}
        />
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
              minWidth: "250px",
            },
          }}
          select
          variant="outlined"
          margin="normal"
          id={"alertType"}
          name={"alertType"}
          label={"Alert"}
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

        <Button
          sx={{
            color: colors.primary[400],
            backgroundColor: theme.palette.secondary.main,
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            mt: 3,
            ml: 2,
            "&:hover": {
              backgroundColor: theme.palette.secondary.hoverButton,
            },
          }}
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default Filter;
