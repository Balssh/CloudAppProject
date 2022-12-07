import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Rotue } from "react-router-dom";

import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/contacts";
// import Line from "./scenes/contacts";
import Login from "./scenes/login";
import Register from "./scenes/register";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
		  <Sidebar />
          <main className="content">
            <Topbar/>
			<Routes>
				<Route path="/" element={<Dashboard />}/>
				<Route path="/login" element={<Login />}/>
				<Route path="/register" element={<Register />}/>
				{/* <Route path="/" element={<Dashboard />}/> */}
			</Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
