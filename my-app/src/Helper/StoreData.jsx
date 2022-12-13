import { createContext, useState, useEffect } from "react";
import { getAlertTypes, getAlertsList } from "./APICalls";

const AlertsContext = createContext(null);

const AlertProvider = ({ children }) => {
  const [alertTypes, setAlertTypes] = useState([]);
  const [alertsList, setAlertsList] = useState([]);
  const [center, setCenter] = useState({ lat: 45.757533, lng: 21.229066 });

  useEffect(() => {
    const fetchData = async () => {
      await getAlertTypes().then((data) => {
        // console.log(data);
        setAlertTypes(data);
      });
      await getAlertsList().then((data) => {
        console.log(data);
        setAlertsList(data[0]);
        setCenter(data[1]);
      });
    };
    fetchData();
  }, []);

  return (
    <AlertsContext.Provider value={{ alertTypes, setAlertTypes, alertsList, setAlertsList, center, setCenter}}>
      {children}
    </AlertsContext.Provider>
  );
};

export { AlertsContext, AlertProvider };
