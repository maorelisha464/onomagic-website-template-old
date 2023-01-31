import { useEffect, useState, useCallback, useRef } from "react";
import Ad from "../../ads/ad";
import advertising from "../../ads/advertising";
import { useInView } from 'react-intersection-observer';
import { changeUrl } from '../../common/utils';


export default function OnePage({ data }) {
    const [openToPage, setOpenToPage] = useState(5);
    const [firstInView, setFirstInView] = useState(0);
    const [pagesInView, setPagesInView] = useState({});
    const firstRunFirstInView = useRef(true);
    const firstRunOpenToPage = useRef(true);
    const firstRunPagesInView = useRef(true);
    const { ref: endOfContentRef, inView: openMore } = useInView({
        rootMargin: '500px'
    });

    const onItemInViewChange = useCallback((inView, key) => {
        setPagesInView(prev => {
            const sectionObj = prev[key] || { inView: false, tracked: false }
            sectionObj.inView = inView;
            return { ...prev, [key]: sectionObj };
        });
    }, [setPagesInView]);

    useEffect(() => {
        if (firstRunFirstInView.current) {
            firstRunFirstInView.current = false
            return;
        }
        console.log('firstInView', firstInView);
        changeUrl(firstInView);
        const val = pagesInView[firstInView];
        if (val && !val.tracked) {
            //track pageView
            console.log('TrackPageView: ', firstInView);
            const sectionObj = pagesInView[firstInView];
            sectionObj.tracked = true;
            setPagesInView({ ...pagesInView, [firstInView]: sectionObj })
        }
    }, [firstInView])

    useEffect(() => {
        if (firstRunPagesInView.current) {
            firstRunPagesInView.current = false
            return;
        }
        const firstPageInView = Object.entries(pagesInView).find(([key, val]) => val.inView);
        const [page, val] = (firstPageInView || []);
        if (page && page !== firstInView) {
            setFirstInView(page);
        }
    }, [pagesInView]);

    useEffect(() => {
        if (openMore) {
            setOpenToPage(prev => { return Math.min(prev + 2, data.items_count) });
        }
    }, [openMore]);

    useEffect(() => {
        if (firstRunOpenToPage.current) {
            firstRunOpenToPage.current = false
            return;
        }
        advertising.runAuction();
    }, [openToPage]);

    useEffect(() => {
        return advertising.resetAds
    }, []);

    return (
        <>
            {/* TITLE */}
            <div style={{ fontSize: '60px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: data.title }} />
            {/* TITLE */}
            {
                data.content.map((item, index) => (
                    index < openToPage &&
                    (
                        <ItemSection key={index} index={index} item={item} onInViewChange={onItemInViewChange}></ItemSection>
                    )
                ))
            }
            <div ref={endOfContentRef}></div>
        </>
    )
}


const ItemSection = ({ item, index, onInViewChange }) => {
    const { ref, inView } = useInView({
        /* Optional options */
        threshold: 0,
    });

    const didMount = useRef(false);

    useEffect(() => {
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        onInViewChange(inView, index);

    }, [inView])

    return (
        <>
            <div ref={ref}>
                <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: item }} />
                <Ad adId='maor' width='728' height='110' ></Ad>
            </div>
        </>
    )
}
