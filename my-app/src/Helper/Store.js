import { createContext, useState } from "react";
import { getAlertTypes } from "./APICalls";

export const StoreAlertTypes = createContext(null);

export default ({ children }) => {
  const [alertTypes, setAlertTypes] = useState([]);

  const fetchData = async () => {
    await getAlertTypes().then((data) => {
      // console.log(data);
      setAlertTypes(data);
    });
  };
  fetchData();

  return (
    <StoreAlertTypes.Provider value={{ alertTypes }}>
      {children}
    </StoreAlertTypes.Provider>
  );
};
