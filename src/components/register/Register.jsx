import { useIsAuthenticated } from "react-auth-kit";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";

import { handleRegister } from "../../Helper/APICalls";

const FormItem = ({ id, name, label, formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log("showPassword: ", showPassword);
  };

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
      type={name !== "password" || showPassword ? "text" : "password"}
      value={formik.values[name]}
      onChange={formik.handleChange}
      InputProps={{
        endAdornment:
          name === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
    />
  );
};

const Register = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const formik = useFormik({
    initialValues: {
      firstName: "Narcis",
      lastName: "Badea",
      email: "badeanarcis@gmail.com",
      password: "narcisAdmin123",
      showPassword: false,
    },
    onSubmit: (values) => {
      handleRegister(
        values.firstName,
        values.lastName,
        values.email,
        values.password,
        navigate
      );
      // alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        minWidth: "300px",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <FormItem
          id="firstName"
          name="firstName"
          label="First Name"
          formik={formik}
        />
        <FormItem
          id="lastName"
          name="lastName"
          label="Last Name"
          formik={formik}
        />
        <FormItem id="email" name="email" label="Email" formik={formik} />
        <FormItem
          id="password"
          name="password"
          label="Password"
          formik={formik}
        />
        <Button
          sx={{
            backgroundColor: colors.primary[400],
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            mb: 1,
          }}
          variant="contained"
          fullWidth
          component={Link}
          to="/login"
        >
          Login
        </Button>
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

export default Register;
