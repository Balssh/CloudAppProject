import axios from "axios";

async function getAlertsList(setCenter, alertsList) {
  await axios
    .get("https://cloudbeesapi.azurewebsites.net/Alert", {})
    .then((res) => {
      res.data.forEach((element) => {
        // console.log(element);
        alertsList.push(element);
      });
      if (alertsList.length > 0) {
        let lat = 0;
        let lng = 0;
        alertsList.forEach((element) => {
          lat += element.latitude;
          lng += element.longitude;
        });
        let cntLat = lat / alertsList.length;
        let cntLng = lng / alertsList.length;
        // console.log(cntLat, cntLng);
        setCenter({ lat: cntLat, lng: cntLng });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAlertTypes() {
  return await axios
    .get("https://cloudbeesapi.azurewebsites.net/AlertType")
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Error getting alert types");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function addAlert(location, alert, coordinates, description) {
  console.log(location, alert, coordinates, description);

  await axios
    .post("https://cloudbeesapi.azurewebsites.net/Alert", {
      typeId: alert,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
      location: location,
      description: description,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function handleLogin(email, password, rememberMe, navigate, signIn) {
  console.log(email, password);
  await axios
    .post("https://cloudbeesapi.azurewebsites.net/auth/login", {
      email: email,
      password: password,
      rememberMe: rememberMe,
    })
    .then((res) => {
      console.log(res.data.token, res.data.expiresIn);
      signIn({
        token: res.data.token,
        expiresIn: res.data.expiresIn,
        tokenType: "Bearer",
        authState: { email: email },
      });
      navigate("/");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
}

async function handleRegister(firstName, lastName, email, password, navigate) {
  console.log(email, password);
  await axios
    .post("https://cloudbeesapi.azurewebsites.net/auth/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res);
      navigate("/login");
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
}

export { getAlertsList, getAlertTypes, addAlert, handleLogin, handleRegister };
