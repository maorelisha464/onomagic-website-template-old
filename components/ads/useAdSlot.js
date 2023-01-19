import { useEffect, useState } from "react";
import { withGPTQueue, withPrebidQueue } from './adsQueue'



export function useAdSlot({ sizes, id, dfpPath, bids }) {
    const [slot, setSlot] = useState(null);
    useEffect(() => {
        const adSlot = async () => {
            await withPrebidQueue(() => {
                const pbjs = window.pbjs;
                pbjs.addAdUnits([{
                    code: id,
                    mediaTypes: {
                        banner: {
                            sizes
                        }
                    },
                    bids
                }]);
            })
            await withGPTQueue(() => {
                const googletag = window.googletag;
                const slot = googletag
                    .defineSlot(
                        dfpPath,
                        sizes,
                        id
                    )
                    .addService(googletag.pubads());
                googletag.enableServices();
                googletag.display(id);
                setSlot(slot);
            })
        }
        adSlot();
    }, []);
    return { slot }
}


