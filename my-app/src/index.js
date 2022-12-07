import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import App from './App';
// import { jwtInterceptor } from './components/Helper/Interceptor';

// jwtInterceptor();

const container = document.getElementById("root")
createRoot(container).render(
    <App/>
    // <React.StrictMode>

    // <AuthProvider
    //     authType={"localstorage"}
    //     authName={"_auth"}
    //     cookieDomain={window.location.hostname}
    //     cookieSecure={false}
    // >
    //     <BrowserRouter>
    //         <App />
    //     </BrowserRouter>
    // </AuthProvider>
    // </React.StrictMode>
)