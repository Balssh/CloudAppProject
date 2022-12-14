import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Home from "./scenes/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./scenes/dashboard/Dashboard";
import { AlertProvider } from "./Helper/StoreData";
import Contact from "./scenes/contact/Contact";
import Profile from "./scenes/profile/Profile";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AlertProvider>
          <CssBaseline />
          <Grid2
            container
            wrap="nowrap"
            spacing={2}
            sx={{
              height: "100vh",
              width: "100vw",
              overflow: "auto",
            }}
          >
            <Grid2
              xs="auto"
              sx={{
                position: "sticky",
                height: "100%",
                top: 0,
                left: 0,
                p: 0,
              }}
            >
              <Sidebar />
            </Grid2>

            <Grid2
              sx={{
                ml: "10px",
                flexGrow: 1,
              }}
            >
              <Topbar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <RequireAuth loginPath="/login">
                      <Home />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth loginPath="/login">
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth loginPath="/login">
                      <Profile />
                    </RequireAuth>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </Grid2>
          </Grid2>
        </AlertProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
