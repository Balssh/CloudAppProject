import { React, useState } from "react";
import axios, { AxiosError } from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Card, CardContent, CardActions, Button, TextField } from "@mui/material";

const Register = () => {

    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();

    let data = JSON.stringify({
        "email": "badeanarcis@gmail.com",
        "password": "narcisAdmin123"
    });

    let config = {
        method: 'post',
        url: 'https://cloudbeesapimanagemant.azure-api.net/auth/login',
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    };

    const handleSubmit = async () => {
        await axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                </Stack>
            </CardContent>
            <CardActions>
                <Button onClick={handleSubmit}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
            </CardActions>
        </Card >
    );
}

export default Register;