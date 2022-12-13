import {
  Box,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { tokens } from "../../theme";

const Contact = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      details: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Box
      alignContent={"center"}
      justifyContent={"center"}
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Stack
        spacing={2}
        sx={{
          width: "50%",
          maxWidth: "500px",
          height: "50%",
          // maxHeight: "500px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h4">Contact</Typography>
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
            id={"firstName"}
            name={"firstName"}
            label={"First Name"}
            type={"text"}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <DescriptionOutlinedIcon edge="end" />
            //     </InputAdornment>
            //   ),
            // }}
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
              },
            }}
            variant="outlined"
            margin="normal"
            fullWidth
            id={"lastName"}
            name={"lastName"}
            label={"Last Name"}
            type={"text"}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <DescriptionOutlinedIcon edge="end" />
            //     </InputAdornment>
            //   ),
            // }}
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
              },
            }}
            variant="outlined"
            margin="normal"
            fullWidth
            id={"email"}
            name={"email"}
            label={"Email"}
            type={"text"}
            value={formik.values.email}
            onChange={formik.handleChange}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <DescriptionOutlinedIcon edge="end" />
            //     </InputAdornment>
            //   ),
            // }}
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
              },
            }}
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            maxRows={10}
            fullWidth
            id={"details"}
            name={"details"}
            label={"Details"}
            type={"text"}
            value={formik.values.details}
            onChange={formik.handleChange}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <DescriptionOutlinedIcon edge="end" />
            //     </InputAdornment>
            //   ),
            // }}
          />
          <Button
            sx={{
              color: colors.primary[400],
              backgroundColor: theme.palette.secondary.main,
              fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
              margin: "8px auto",
              "&:hover": {
                backgroundColor: theme.palette.secondary.hoverButton,
              },
            }}
            variant="contained"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Contact;
