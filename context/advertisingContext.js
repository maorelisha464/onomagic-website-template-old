import { createContext, useContext, useState } from 'react';
// import 

export const AdvertisingContext = createContext();

export function AdvertisingWrapper({ children }) {
    const [adsDict, setAdsDictState] = useState({
        allSlots: [],
        newSlots: [],
        allBids: []
    })

    const setAdsDict = (args) => {
        //add logic to save it in storage
        setAdsDictState(args);
    }

    return (
        <AdvertisingContext.Provider value={{ adsDict, setAdsDict }}>
            {children}
        </AdvertisingContext.Provider>
    );
}

export function useAdContext() {
    return useContext(AdvertisingContext);
}