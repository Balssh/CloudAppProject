import axios from "axios";

async function getAlertsList() {
  return await axios
    .get("https://cloudbeesapi.azurewebsites.net/Alert")
    .then((res) => {
      if (res.status === 200) {
        let lat = 0;
        let lng = 0;
        res.data.forEach((element) => {
          lat += element.latitude;
          lng += element.longitude;
        });
        let cntLat = lat / res.data.length;
        let cntLng = lng / res.data.length;
        return [res.data, { lat: cntLat, lng: cntLng }];
      }
      throw new Error("Error getting alert types");
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

async function filter(user, alert) {
  // console.log(user, alert);
  return await axios
    .post("https://cloudbeesapi.azurewebsites.net/Alert/filtered", {
      name: user,
      alertTypeId: alert,
    })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        let lat = 0;
        let lng = 0;
        res.data.forEach((element) => {
          lat += element.latitude;
          lng += element.longitude;
        });
        let cntLat = lat / res.data.length;
        let cntLng = lng / res.data.length;
        return [res.data, { lat: cntLat, lng: cntLng }];
      }
      throw new Error("Error getting alert types");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getUserData() {
  return await axios
    .get("https://cloudbeesapi.azurewebsites.net/user-profile")
    .then((res) => {
      // console.log(res);
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("Error getting user data");
    })
    .catch((err) => {
      console.log(err);
    });
};

export {
  getAlertsList,
  getAlertTypes,
  addAlert,
  handleLogin,
  handleRegister,
  filter,
  getUserData,
};
