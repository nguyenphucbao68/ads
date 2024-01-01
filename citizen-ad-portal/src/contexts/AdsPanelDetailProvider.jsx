import React, { createContext, useContext, useState } from 'react';

export const AdsPanelDetailContext = createContext({});

export const AdsPanelDetailProvider = ({ children }) => {
  const [adsPanelDetail, setAdsPanelDetail] = useState(null);

  const onShowPanelDetail = (adsPanelItem) => {
    setAdsPanelDetail({
      ...adsPanelItem,
    });
  };

  const onClosePanelDetail = () => {
    setAdsPanelDetail(null);
  };

  return (
    <AdsPanelDetailContext.Provider
      value={{
        adsPanelDetail,
        onShowPanelDetail,
        onClosePanelDetail,
      }}
    >
      {children}
    </AdsPanelDetailContext.Provider>
  );
};

export const useAdsPanelDetail = () => {
  const ctx = useContext(AdsPanelDetailContext);
  return ctx;
};
