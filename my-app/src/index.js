import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { ProSidebarProvider } from "react-pro-sidebar";
import App from "./App";
// import { jwtInterceptor } from './components/Helper/Interceptor';

// jwtInterceptor();

const container = document.getElementById("root");
createRoot(container).render(
  <AuthProvider
    authType={"localstorage"}
    authName={"_auth"}
    cookieDomain={window.location.hostname}
    cookieSecure={false}
  >
    <BrowserRouter>
      <ProSidebarProvider>
        <App />
      </ProSidebarProvider>
    </BrowserRouter>
  </AuthProvider>
);
