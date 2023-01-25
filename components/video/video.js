import Script from "next/script";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { cookies } from "../common/store";
import useUserParams from "../common/userParams";


const VideoDiv = styled.div`
    
`;

export default function Video({ }) {
    const { utm_campaign } = useUserParams();
    const additionalVidazooAtt = {
        'data-widget-id': '63553fb99ea3ac1005676c91',
        'data-param1': utm_campaign,
        'data-on-widget-ad-impression': 'vidazooCallback',
    }

    const containerRef = useRef(null)

    function moveScript() {
        containerRef.current.appendChild(this);
    }

    useEffect(() => {
        window.vidazooCallback = (cpm, info) => {
            console.info('[vidazoo]', 'vidazooCallback', { cpm, info });
            const vidazooNetValue = info.netCpm - info.adServingFee;
            const currTotalVideoCpm = cookies.getOno('totalVideoCpm') || 0;
            cookies.setOno('totalVideoCpm', currTotalVideoCpm + vidazooNetValue);
            // if (window.tracking) {
            //     window.tracking.trackCustomPageValue({
            //         page: window.gallery.page,
            //         winningBidCpm: vidazooNetValue,
            //         isVideo: true,
            //     });
            //     window.tracking.trackDebugPageValue(
            //         {
            //             bidder: 'vidazoo_vid',
            //             cpm: vidazooNetValue,
            //         },
            //         {
            //             winningBidCpm: vidazooNetValue,
            //             page: window.gallery.page,
            //         }
            //     );
            // }
        };
    }, []);


    return (
        <VideoDiv ref={containerRef} id='ono-video-player'>
            <Script src={"https://static.vidazoo.com/basev/vwpt.js"} {...additionalVidazooAtt} stagedy={'beforeInteractive'} onLoad={moveScript} />
        </VideoDiv>
    )
}



// export default function Video({ }) {
//     const { utm_campaign } = useUserParams();
//     const additionalVidazooAtt = {
//         'data-widget-id': '63553fb99ea3ac1005676c91',
//         'data-param1': utm_campaign,
//         'data-on-widget-ad-impression': 'vidazooCallback',
//     }
//     const containerRef = useRef(null)

//     useEffect(() => {
//         if (typeof window === 'undefined' || typeof document === 'undefined') return;
//         const script = document.createElement('script');
//         script.src = 'https://static.vidazoo.com/basev/vwpt.js';
//         Object.entries(additionalVidazooAtt).forEach(([key, val]) => val && script.setAttribute(key, val))
//         containerRef.current.appendChild(script)
//         window.vidazooCallback = (cpm, info) => {
//             console.info('[vidazoo]', 'vidazooCallback', { cpm, info });
//             const vidazooNetValue = info.netCpm - info.adServingFee;
//             const currTotalVideoCpm = cookies.getOno('totalVideoCpm') || 0;
//             cookies.setOno('totalVideoCpm', currTotalVideoCpm + vidazooNetValue);
//         };
//     }, []);


//     return (
//         <VideoDiv ref={containerRef} id='ono-video-player' />
//     )
// }






