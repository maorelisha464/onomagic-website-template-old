import { useEffect } from "react";
import { withGPTQueue, withPrebidQueue } from './adsQueue'

export function useAdSlot({ mapping, sizes, id, dfpPath }) {
    useEffect(() => {
        withGPTQueue(() => {
            // const adMapping = googletag.sizeMapping();
            // Object.keys(mapping).forEach((breakpoint) => {
            //     adMapping.addSize([Number(breakpoint), 0], [mapping[breakpoint]]);
            // });
            // const builtMapping = adMapping.build();
            googletag
                .defineSlot(
                    dfpPath,
                    sizes,
                    id
                )
                // .defineSizeMapping(builtMapping)
                .addService(googletag.pubads());
            googletag.enableServices();
            googletag.display(id);
        })
    }, []);
}


