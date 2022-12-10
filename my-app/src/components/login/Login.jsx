import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  useTheme,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";

import { handleLogin } from "../../Helper/APICalls";

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

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const formik = useFormik({
    initialValues: {
      email: "badeanarcis@gmail.com",
      password: "narcisAdmin123",
      rememberMe: false,
      showPassword: false,
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      handleLogin(
        values.email,
        values.password,
        values.rememberMe,
        navigate,
        signIn
      );
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
        <FormItem id="email" name="email" label="Email" formik={formik} />
        <FormItem
          id="password"
          name="password"
          label="Password"
          formik={formik}
        />
        <FormControlLabel
          sx={{
            display: "flex",
            ml: "1px",
          }}
          control={
            <Checkbox
              checked={formik.values.rememberMe}
              sx={{
                color: "pink",
                "&.Mui-checked": {
                  color: "red",
                },
              }}
            />
          }
          label="Remember me"
          name="rememberMe"
          onChange={formik.handleChange}
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
          to="/register"
        >
          Register
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

export default Login;
