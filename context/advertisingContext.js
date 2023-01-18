import { createContext, useContext, useState } from 'react';

export const AdvertisingContext = createContext();

export function AdvertisingWrapper({ children }) {
    const [adsDict, setAdsDict] = useState({
        allSlots: [],
        newSlots: [],
        allBids: []
    })

    return (
        <AdvertisingContext.Provider value={{ adsDict, setAdsDict }}>
            {children}
        </AdvertisingContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AdvertisingContext);
}