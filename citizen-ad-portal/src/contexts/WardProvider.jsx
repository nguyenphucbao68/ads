import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const WardContext = createContext([]);

export const WardProvider = ({ children }) => {
  const [wardData, setWardData] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:4000/v1/citizen/wards',
      responseType,
    }).then(({ data }) => {
      setWardData(data);
    });
  }, []);

  return (
    <WardContext.Provider value={wardData}>{children}</WardContext.Provider>
  );
};

export const useWardData = () => {
  return useContext(WardContext);
};
