import React, { createContext, useContext, useState } from 'react';

export const AdsPanelDetailContext = createContext({});

export const AdsPanelDetailProvider = ({ children }) => {
  const [showAdsPanelDetail, setShowAdsPanelDetail] = useState(false);

  const onShowPanelDetail = () => {
    setShowAdsPanelDetail(true);
  };

  const onClosePanelDetail = () => {
    setShowAdsPanelDetail(false);
  };

  return (
    <AdsPanelDetailContext.Provider
      value={{
        showAdsPanelDetail,
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
