import { useState } from 'react'
import Ad from '../../ads/ad';
import { Button, Grid } from '@mantine/core';

export default function Gallery({ data, pageNumber, setProgress }) {
    const [currItem, setCurrItem] = useState(data.content[pageNumber])
    const [currIndex, setCurrIndex] = useState(Number(pageNumber));
    const onPaginationClick = (next) => {
        window && window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        const updateIndex = next ? currIndex + 1 : currIndex - 1;
        setCurrIndex(updateIndex);
        setCurrItem(data.content[updateIndex]);
        setProgress(Math.floor((updateIndex / data.content.length) * 100))

    }

    return (
        <>
            {/* TITLE */}
            {currIndex === 0 ? <div style={{ fontSize: '60px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: data.title }} /> : null}
            {/* TITLE */}
            <Ad adId='maor2' width='728' height='90' section='aboveContent'></Ad>
            <div style={{ fontSize: '25px' }} dangerouslySetInnerHTML={{ __html: currItem }} />
            <Ad adId='maor' width='728' height='90' section='belowContent' ></Ad>
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
            <div>Item: {currIndex}</div>
        </>

    )
}