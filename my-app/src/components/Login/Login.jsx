import { React, useState } from "react";
import axios, { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();

    const data = JSON.stringify({
        "email": "badeanarcis@gmail.com",
        "password": "narcisAdmin123"
    });

    const config = {
        method: 'post',
        url: 'https://cloudbeesapimanagemant.azure-api.net/auth/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    const handleSubmit = async () => {
        await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <div>
            <button onClick={handleSubmit}>Login</button>
        </div>
    );

}

export default Login;