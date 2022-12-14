import React, { useState, useContext } from "react";
import { Box, Skeleton, useTheme } from "@mui/material";

import Map from "../../components/map/Map";
import Filter from "../../components/filter/Filter";
import { tokens } from "../../theme";
import { AlertsContext } from "../../Helper/StoreData";

const Dashboard = () => {
  const [isReady, setIsReady] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { alertTypes, setAlertTypes, alertsList, setAlertsList, center, setCenter } =
    useContext(AlertsContext);

  return isReady ? (
    <Box
      sx={{
        width: "100%",
        height: "auto",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "auto",
          height: "500px",
          zIndex: 1,
          "&hover": { zIndex: 2 },
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Map center={center} alertsList={alertsList} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            p: 2,
            // display: "flex",
            minWidth: "200px",
            maxWidth: "700px",
            border: 1,
            borderWidth: "2px",
            borderColor: `${colors.grey[500]}`,
            borderRadius: "10px",
            display: "flex",
            mt: 2,
          }}
        >
          <Filter setAlertsList={setAlertsList} setCenter={setCenter}/>
        </Box>
      </Box>
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
};

export default Dashboard;
