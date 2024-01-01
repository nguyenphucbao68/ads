import { createContext } from "react";

export const AdsPanelContext = createContext({});

export const AdsPanelProvider = ({children}) => {
    return <AdsPanelContext.Provider value={{}}>
        {children}
    </AdsPanelContext.Provider>
}