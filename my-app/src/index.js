import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import App from './App';

const container = document.getElementById("root")
createRoot(container).render(
    <React.StrictMode>
        <AuthProvider
            authType={"cookie"}
            authName={"_auth"}
            cookieDomain={window.location.hostname}
            cookieSecure={false}
        >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>

    </React.StrictMode>
)