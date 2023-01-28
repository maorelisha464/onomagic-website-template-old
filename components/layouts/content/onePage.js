import { useEffect, useState } from "react"
import Ad from "../../ads/ad"
import advertising from "../../ads/advertising"
import { throttle } from '../../common/utils'


const scrollThrottled = throttle((setOpenToPage, data) => {
    const distanceFromTop = window.pageYOffset;
    const vpHeight = window.innerHeight;
    const docHeight = document.body.offsetHeight;
    const disToBottom = docHeight - vpHeight - distanceFromTop;
    if (disToBottom < 500) {
        setOpenToPage(prev => { return Math.min(prev + 2, data.items_count) });
    }
    console.log('Distance: ', disToBottom);
}, 200)



var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

const scrollThrottledLastItemInView = throttle(() => {
    const ads = document.querySelectorAll('[id*="ono-section"]');
    // ads.forEach(ad => console.log(isInViewport(ad)))
}, 200)

export default function OnePage({ data }) {
    const [openToPage, setOpenToPage] = useState(10);
    const [firstRun, setFirstRun] = useState(true);
    useEffect(() => {
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        window.addEventListener('scroll', () => scrollThrottled(setOpenToPage, data));
        window.addEventListener('scroll', () => scrollThrottledLastItemInView());
    }, []);

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