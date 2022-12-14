import {
  Box,
  Button,
  TextField,
  useTheme,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";

import { tokens } from "../../theme";
import { getUserData } from "../../Helper/APICalls";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await getUserData().then((data) => {
        setProfileData(data);
        console.log(data);
      });
    };

    fetchData();
  }, []);

  return (
    <Box
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
      <Box
        sx={{
          mt: 10,
          minWidth: "400px",
          maxWidth: "700px",
          border: 1,
          borderWidth: "2px",
          borderColor: `${colors.grey[500]}`,
          borderRadius: "10px",
          display: "flex",
          p: 2,
        }}
      >
        <Stack
          spacing={2}
        >
          <Typography variant="h3">Profile</Typography>
          <Divider />
          <Typography variant="h4">First name: {profileData.firstName}</Typography>
          <Typography variant="h4">Last name: {profileData.lastName}</Typography>
          <Typography variant="h4">Email: {profileData.email}</Typography>
          <Typography variant="h4">Points: {profileData.points}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Profile;
