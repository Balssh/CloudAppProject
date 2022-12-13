import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  Stack,
} from "@mui/material";
import { tokens } from "../../theme";
import { useState } from "react";

import Map from "../../components/map/Map";
import { borderRadius } from "@mui/system";
import AlertForm from "../../components/alertForm/AlertForm";

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Stack
        spacing={4}
        sx={{
          width: "auto",
          height: "auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            height: "300px",
            zIndex: 1,
            "&hover": { zIndex: 2 },
            borderCollapse: "separate",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <Map center={center} alertsList={[]} />
        </Box>

        <Box
          alignContent={"center"}
          justifyContent={"center"}
          sx={{
            display: "flex",
            width: "auto",
            height: "auto",
          }}
        >
          <Box
            alignContent={"center"}
            justifyContent={"center"}
            sx={{
              padding: 2,
              display: "flex",
              width: "50%",
              minWidth: "200px",
              maxWidth: "400px",
              border: 1,
              borderWidth: "2px",
              borderColor: `${colors.grey[500]}`,
              borderRadius: "10px",
            }}
          >
            <AlertForm setCenter={setCenter} />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
