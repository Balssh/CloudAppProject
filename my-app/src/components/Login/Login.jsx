import { React, useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Card, CardContent, CardActions, Button, TextField, Checkbox, FormGroup, FormControlLabel } from "@mui/material";

import { handleLogin } from "../Helper/APICalls";

const Login = () => {

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const signIn = useSignIn();
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

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

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
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
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Remember me"
                        onChange={handleRememberMeChange}
                    />
                </FormGroup>
                <Button onClick={() => handleLogin(email, password, rememberMe, navigate, signIn)}
                    sx={{
                        backgroundColor: "#3d405b",
                    }}
                >
                    Submit
                </Button>
                <Button
                    sx={{
                        backgroundColor: "#3d405b",
                    }}
                    onClick={() => navigate("/register")}
                >
                    Register
                </Button>
            </CardActions>
        </Card >
    );
}

export default Login;