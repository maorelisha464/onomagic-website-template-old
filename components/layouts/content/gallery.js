import { useCallback, useEffect, useRef, useState } from 'react'
import Ad from '../../ads/ad';
import advertising from '../../ads/advertising';
import { Button, Grid } from '@mantine/core';
import Video from '../../video/video';
import { changeUrl } from '../../common/utils';


export default function Gallery({ data, pageNumber, setProgress }) {
    pageNumber = Number.isNaN(+pageNumber) ? 0 : +pageNumber;
    const [currItem, setCurrItem] = useState(data.content[pageNumber])
    const [currIndex, setCurrIndex] = useState(pageNumber);
    const firstRun = useRef(true);

    const onPaginationClick = useCallback((next) => {
        const updateIndex = next ? currIndex + 1 : currIndex - 1;
        setCurrIndex(updateIndex);
        setCurrItem(data.content[updateIndex]);
        setProgress(Math.floor((updateIndex + 1 / data.content.length) * 100));
        changeUrl(updateIndex);
        window && window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [setCurrIndex, setCurrItem, setProgress, currIndex])

    useEffect(() => {
        if (firstRun.current) {
            firstRun.current = false;
            return;
        }
        advertising.runAuction();
    }, [currItem]);

    useEffect(() => {
        return advertising.resetAds
    }, []);

    return (
        <>
            {/* TITLE */}
            {currIndex === 0 ? <div style={{ fontSize: '60px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: data.title }} /> : null}
            {/* TITLE */}
            {/* <Video></Video> */}
            <Ad adId='maor' width='728' height='90' key={`aboveContent-${currIndex}`}></Ad>
            <div style={{ fontSize: '25px' }} dangerouslySetInnerHTML={{ __html: currItem }} />
            <Ad adId='maor' width='728' height='90' key={`belowContent-${currIndex}`}></Ad>
            {
                data.content.length > 1 ? (
                    <Grid>
                        <Grid.Col span={4}>
                            <Button disabled={currIndex < 1} onClick={() => onPaginationClick(false)} fullWidth size="xl" variant="gradient" gradient={{ from: '#f45b42', to: 'cyan' }}>Prev</Button>
                        </Grid.Col>
                        <Grid.Col span={8}>
                            <Button disabled={currIndex >= data.items_count - 1} onClick={() => onPaginationClick(true)} fullWidth size="xl" variant="gradient" gradient={{ from: 'cyan', to: 'indigo' }}>Next</Button>
                        </Grid.Col>
                    </Grid>
                ) :
                    null
            }
        </>

    )
}