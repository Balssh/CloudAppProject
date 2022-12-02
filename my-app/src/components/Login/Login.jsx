import { React, useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Card, CardContent, CardActions, Button, TextField } from "@mui/material";

const Login = () => {

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    const handleSubmit = async () => {
        console.log(email, password);
        await axios.post("https://cloudbeesapi.azurewebsites.net/auth/login",
            { "email": email, "password": password }
        ).then((res) => {
            console.log(res.data.token);
            signIn({
                token: res.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { email: email },
            });
            navigate("/");
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailEnter = (event) => {
        if (event.keyCode === 13) {
            // console.log("email changed: ", event.target.value);
            setEmail(event.target.value);
        }
    };

    const handlePasswordEnter = (event) => {
        if (event.keyCode === 13) {
            // console.log("password changed: ", event.target.value);
            setPassword(event.target.value);
        }
    };

    useEffect(() => {
        console.log(email, password)
    }, [email, password]);

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <Card
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "30%",
                minWidth: "300px",
                padding: "10px",
                textAlign: "center",
            }}
        >
            <CardContent>
                <Typography variant="h6" component="div">
                    Login
                </Typography>
                <Stack spacing={1}>
                    <TextField id="outlined-basic" label="Email" variant="outlined"
                        onChange={handleEmailChange}
                        onKeyUp={handleEmailEnter}
                        defaultValue="badeanarcis@gmail.com" />
                    <TextField id="outlined-basic" label="Password" variant="outlined"
                        onChange={handlePasswordChange}
                        onKeyUp={handlePasswordEnter}
                        defaultValue="narcisAdmin123" />
                </Stack>
            </CardContent>
            <CardActions>
                <Button onClick={handleSubmit}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
            </CardActions>
        </Card >
    );
}

export default Login;