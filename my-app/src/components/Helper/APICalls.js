import axios from 'axios';

async function getAlertsList(setCenter, alertsList) {
    await axios.get("https://cloudbeesapi.azurewebsites.net/Alert", {
    }).then((res) => {
        res.data.forEach(element => {
            // console.log(element);
            alertsList.push({ lat: element.latitude, lng: element.longitude });
        });
        if (alertsList.length > 0) {
            let lat = 0;
            let lng = 0;
            alertsList.forEach(element => {
                lat += element.lat;
                lng += element.lng;
            })
            let cntLat = lat / alertsList.length;
            let cntLng = lng / alertsList.length;
            // console.log(cntLat, cntLng);
            setCenter({ lat: cntLat, lng: cntLng });
        }
    }).catch((err) => {
        console.log(err);
    });
}

async function getAlertTypes(alertTypes) {
	await axios.get("https://cloudbeesapi.azurewebsites.net/AlertType")
		.then(
			(res) => {
				res.data.map((data) => {
					alertTypes.push({
						value: data.id,
						label: data.type,
					});
				});
                // setAlertTypes(alertTypes);
			});
}

async function addAlert(location, alert, coordinates, description, setCenter) {
    console.log(location, alert, coordinates, description);
    setCenter(coordinates);

    await axios.post("https://cloudbeesapi.azurewebsites.net/Alert", {
        typeId: alert.value,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        location: location.label,
        description: description,
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

async function handleLogin(email, password, rememberMe, navigate, signIn) {
    console.log(email, password);
    await axios.post("https://cloudbeesapi.azurewebsites.net/auth/login",
        {
            "email": email,
            "password": password,
            "rememberMe": rememberMe
        }
    ).then((res) => {
        console.log(res.data.token, res.data.expiresIn);
        signIn({
            token: res.data.token,
            expiresIn: res.data.expiresIn,
            tokenType: "Bearer",
            authState: { email: email },
        });
        navigate("/");
    }).catch((err) => {
        console.log(err.response.data.message);
    });
}

async function handleRegister(firstName, lastName, email, password, navigate) {
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
}

export { getAlertsList, getAlertTypes, addAlert, handleLogin, handleRegister };