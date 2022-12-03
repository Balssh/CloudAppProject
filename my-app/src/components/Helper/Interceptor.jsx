import axios from 'axios';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';

export function JWTInterceptor() {
    const auth = useAuthUser()
    axios.interceptors.request.use(request => {
        // const isLoggedIn = localStorage.getItem("token");
        const isLoggedIn = auth().user.token;
        const isApiUrl = request.url.startsWith("https://cloudbeesapi.azurewebsites.net/");
        if (isLoggedIn && isApiUrl) {
            request.headers.Authorization = `Bearer ${isLoggedIn}`;
        }
        if (!isLoggedIn) {
            window.location = '/login';
        }
        return request;
    });

    axios.interceptors.response.use(undefined, function axiosUnauthorizedInterceptor(err) {
        if (err.response.status === 401) {
            window.location = '/login';
        }
        return Promise.reject(err);
    });
}