import React, { useState, useEffect } from "react";
import { Box, Typography, Skeleton, useTheme } from "@mui/material";

import { getAlertsList } from "../../Helper/APICalls";
import Map from "../../components/map/Map";
import Filter from "../../components/filter/Filter";
import { tokens } from "../../theme";

const Dashboard = () => {
  const [isReady, setIsReady] = useState(false);
  const [alertsList, setAlertsList] = useState([]);
  const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      await getAlertsList().then((data) => {
        // console.log(data);
        setAlertsList(data[0]);
        setCenter(data[1]);
        setIsReady(true);
      });
    };

    fetchData();
  }, []);

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
          <Filter />
        </Box>
      </Box>
    </Box>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
};

export default Dashboard;
