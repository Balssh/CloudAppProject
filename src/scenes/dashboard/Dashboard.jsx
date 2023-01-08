import {
    Box,
    MenuItem,
    Select,
    Skeleton,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";

import { useEffect } from "react";
import BarChart from "../../components/charts/Barchart";
import LineChart from "../../components/charts/Linechart";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { getAlertStats, getUsersStats } from "../../Helper/APICalls";
import { AlertsContext } from "../../Helper/StoreData";
import { tokens } from "../../theme";

const AdminArea = ({ alertStats, alertsStatsLines, usersStatsLines, selectedDelete, handleSelectDelete, alertsList }) => {
    return (
        <>
            <Typography variant="h3" sx={{ mt: 2 }}>
                Admin Area
            </Typography>
            <Box
                sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: "#EEEEEE",
                    marginY: "20px",
                    borderRadius: "20px",
                }}
            >
                <BarChart data={[alertStats[0]]} />
            </Box>
            <Box
                sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: "#EEEEEE",
                    marginY: "20px",
                    borderRadius: "20px",
                }}
            >
                <LineChart data={alertsStatsLines} />
            </Box>
            <Box
                sx={{
                    height: "300px",
                    width: "100%",
                    backgroundColor: "#EEEEEE",
                    marginY: "20px",
                    borderRadius: "20px",
                }}
            >
                <LineChart data={usersStatsLines} />
            </Box>
            <Select
                labelId="selectDelete"
                id="selectDelete"
                value={selectedDelete}
                label="Select to delete"
                onChange={handleSelectDelete}
            >
                {
                    alertsList.map((alert) => (
                        <MenuItem value={alert.id}>{alert.id}</MenuItem>
                    ))
                }
            </Select>
        </>
    );
};

const Dashboard = () => {
    const [isReady, setIsReady] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let alertsStatsLines = [
        { id: "Open alerts", data: [] },
        { id: "Closed alerts", data: [] },
    ];
    let usersStatsLines = [{ id: "Users", data: [] }];
    const {
        alertTypes,
        setAlertTypes,
        alertsList,
        setAlertsList,
        center,
        setCenter,
    } = useContext(AlertsContext);
    const [alertStats, setAlertStats] = useState([]);
    const [usersStats, setUsersStats] = useState([]);
    const [selectedDelete, setSelectedDelete] = useState();
    const role = localStorage.getItem("role");
    const handleSelectDelete = (event) => {
        setSelectedDelete(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            await getAlertStats().then((res) => {
                setAlertStats(res.reverse());
            });
            await getUsersStats().then((res) => {
                setUsersStats(res.reverse());
            });
        };
        fetchData().then(() => {
            setIsReady(true);
        });
    }, []);

    if (isReady) {
        alertStats.map((alert) => {
            alertsStatsLines[0].data.push({
                x: alert.date,
                y: alert.openedAlerts,
            });
            alertsStatsLines[1].data.push({
                x: alert.date,
                y: alert.closedAlerts,
            });
        });
        usersStats.map((user) => {
            usersStatsLines[0].data.push({
                x: user.date,
                y: user.numberOfUsers,
            });
        });
    }
    return isReady ? (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                paddingY: "20px",
                paddingX: "20px",
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
                    <Filter
                        setAlertsList={setAlertsList}
                        setCenter={setCenter}
                    />
                </Box>
            </Box>
            {role === "Admin" &&
                (
                    <AdminArea
                        alertStats={alertStats}
                        alertsStatsLines={alertsStatsLines}
                        usersStatsLines={usersStatsLines}
                        alertsList={alertsList}
                        selectedDelete={selectedDelete}
                        handleSelectDelete={handleSelectDelete}
                    />
                )
            }
        </Box>
    ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
    );
};

export default Dashboard;
