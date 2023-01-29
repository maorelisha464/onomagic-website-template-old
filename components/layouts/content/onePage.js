import { useEffect, useState, useRef } from "react"
import Ad from "../../ads/ad"
import advertising from "../../ads/advertising"
import { throttle } from '../../common/utils'


const scrollThrottled = throttle((setOpenToPage, data) => {
    console.log('throttle')
    const distanceFromTop = window.pageYOffset;
    const vpHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;
    const disToBottom = docHeight - vpHeight - distanceFromTop;
    if (disToBottom < 1200) {
        setOpenToPage(prev => { return Math.min(prev + 2, data.items_count) });
    }
    // console.log('Distance: ', disToBottom);
}, 200)



// var findLastInViewPort = function (elem) {
//     var bounding = elem.getBoundingClientRect();
//     // console.log('bounding', elem, bounding.top)
//     const notShown = bounding.top - window.innerHeight >= 0
//     return notShown;
// };

// const scrollThrottledLastItemInView = throttle(() => {
//     const ads = Array.from(document.querySelectorAll('[id*="ono-section"]'));
//     const index = ads.findIndex(findLastInViewPort);
//     console.log(index);
// }, 500)

export default function OnePage({ data }) {
    const [openToPage, setOpenToPage] = useState(10);
    const [firstRun, setFirstRun] = useState(true);
    const eventListeners = useRef([]);
    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        const func = () => { console.log('scroll'); scrollThrottled(setOpenToPage, data) }
        window.addEventListener('scroll', func);
        eventListeners.current = [...eventListeners.current, { eventName: 'scroll', func, target: window }]
    }, []);

    useEffect(() => {
        return () => {
            console.log('eventListeners', eventListeners.current);
            eventListeners.current.forEach(lis => {
                console.log(lis);
                lis['target']?.removeEventListener(lis.eventName, lis.func);
            })
        }
    }, [])

    useEffect(() => {
        if (firstRun) {
            setFirstRun(false);
            return;
        }
        console.log(openToPage)
        advertising.runAuction();
    }, [openToPage]);

    return (
        <>
            {/* TITLE */}
            <div style={{ fontSize: '60px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: data.title }} />
            {/* TITLE */}
            {
                data.content.map((item, index) => (
                    index < openToPage &&
                    (<div id={`ono-section-${index}`} key={index}>
                        <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: item }} />
                        <Ad adId='maor' width='728' height='90' ></Ad>
                    </div>)
                ))
            }
        </>
    )
}