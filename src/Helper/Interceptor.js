import axios from "axios";

export function jwtInterceptor() {
    axios.interceptors.request.use((request) => {
        const isLoggedIn = localStorage.getItem("_auth");
        const isApiUrl = request.url.startsWith(
            "https://apicloudbees.azurewebsites.net/"
        );
        if (isLoggedIn && isApiUrl) {
            request.headers.Authorization = `Bearer ${isLoggedIn}`;
        }
        return request;
    });

    axios.interceptors.response.use(
        undefined,
        function axiosUnauthorizedInterceptor(err) {
            if (err.response.status === 401) {
                window.location = "/login";
            }
            return Promise.reject(err);
        }
    );
}
