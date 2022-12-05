import { React, useState, useEffect } from "react";
import axios, { AxiosError } from 'axios';
import { useSignIn, useIsAuthenticated } from 'react-auth-kit';
import { useNavigate } from "react-router-dom";
import { Typography, Stack, Card, CardContent, CardActions, Button, TextField } from "@mui/material";

const Register = () => {

    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();

    const handleSubmit = async () => {
        console.log(email, password);
        await axios.post("https://cloudbeesapi.azurewebsites.net/auth/register",
            {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password
            }
        ).then((res) => {
            console.log(res);
            navigate("/login");
        }).catch((err) => {
            console.log(err.response.data.message);
        });
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFirstNameEnter = (event) => {
        if (event.keyCode === 13) {
            setFirstName(event.target.value);
        }
    };

    const handleLastNameEnter = (event) => {
        if (event.keyCode === 13) {
            setLastName(event.target.value);
        }
    };

    const handleEmailEnter = (event) => {
        if (event.keyCode === 13) {
            setEmail(event.target.value);
        }
    };

    const handlePasswordEnter = (event) => {
        if (event.keyCode === 13) {
            setPassword(event.target.value);
        }
    };

    useEffect(() => {
        console.log(firstName, lastName, email, password)
    }, [firstName, lastName, email, password]);

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
                    Register
                </Typography>
                <Stack spacing={1}>
                    <TextField id="outlined-basic" label="First Name" variant="outlined"
                        onChange={handleFirstNameChange}
                        onKeyUp={handleFirstNameEnter}
                        defaultValue="Narcis" />
                    <TextField id="outlined-basic" label="Last Name" variant="outlined"
                        onChange={handleLastNameChange}
                        onKeyUp={handleLastNameEnter}
                        defaultValue="Badea" />
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
                <Button onClick={handleSubmit}>Submit</Button>
                <Button onClick={() => navigate("/login")}>Login</Button>
            </CardActions>
        </Card >
    );
}

export default Register;