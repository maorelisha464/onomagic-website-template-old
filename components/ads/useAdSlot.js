import { useEffect } from "react";

export function useAdSlot({ mapping, sizes, id, dfpPath }) {
    useEffect(() => {
        if (typeof window !== undefined) {
            const { googletag } = window;
            googletag.cmd.push(function () {
                const adMapping = googletag.sizeMapping();
                Object.keys(mapping).forEach((breakpoint) => {
                    adMapping.addSize([Number(breakpoint), 0], [mapping[breakpoint]]);
                });
                const builtMapping = adMapping.build();
                googletag
                    .defineSlot(
                        dfpPath,
                        sizes,
                        id
                    )
                    .defineSizeMapping(builtMapping)
                    .addService(googletag.pubads());
                googletag.enableServices();
            });

            googletag.cmd.push(function () {
                googletag.display(id);
            });
        }
    }, []);
}


