import {
  Box,
  Button,
  TextField,
  useTheme,
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
        mt: 2,
      }}
    >
      <Box>
        <Stack
          spacing={2}
          sx={{
            minWidth: "200px",
            maxWidth: "500px",
            border: 1,
            borderWidth: "2px",
            borderColor: `${colors.grey[500]}`,
            borderRadius: "10px",
            display: "flex",
            p: 2,
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
              minRows={4}
              fullWidth
              id={"details"}
              name={"details"}
              label={"Details"}
              type={"text"}
              value={formik.values.details}
              onChange={formik.handleChange}
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
    </Box>
  );
};

export default Contact;
