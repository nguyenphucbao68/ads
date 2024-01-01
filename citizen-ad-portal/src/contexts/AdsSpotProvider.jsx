import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

const AdsSpotContext = React.createContext([]);

export const AdsSpotProvider = ({ children }) => {
  const [adsSpotList, setAdsSpotList] = useState([]);

  useEffect(() => {
    const adsSpotUri = process.env.REACT_APP_ADS_USER_URI;
    axios({
      method: 'get',
      url: adsSpotUri,
      responseType: 'json',
    }).then(({ data }) => {
      setAdsSpotList(data);
    });
  }, []);

  return (
    <AdsSpotContext.Provider value={{ adsSpotList, setAdsSpotList }}>
      {children}
    </AdsSpotContext.Provider>
  );
};

export const useAdsSpot = () => {
  return useContext(AdsSpotContext);
};
