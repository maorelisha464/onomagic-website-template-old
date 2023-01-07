import { useState } from 'react'
import Ad from '../../ads/ad';
import { Button } from '@mantine/core';
import styled from 'styled-components';

const NextButtom = styled.div`
width:100%;
margin: 30px auto;
`

export default function Gallery({ data, pageNumber }) {
    const [currItem, setCurrItem] = useState(data.content[pageNumber])
    const [currIndex, setCurrIndex] = useState(Number(pageNumber));
    const onNextClick = () => {
        window && window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setCurrIndex(currIndex + 1);
        setCurrItem(data.content[currIndex + 1]);

    }
    const nextButton = (
        <NextButtom>
            <Button onClick={onNextClick} fullWidth size="xl" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>Next</Button>
        </NextButtom>
    )

    return (
        <>
            {/* TITLE */}
            {currIndex === 0 ? <div style={{ fontSize: '60px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: data.title }} /> : null}
            {/* TITLE */}
            <Ad adId='maor2' sizes={{ width: '728', height: '90' }}></Ad>
            <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: currItem }} />
            {
                currIndex < data.items_count - 1 ? nextButton : null
            }
            <Ad adId='maor' sizes={{ width: '728', height: '90' }}></Ad>
            <div>Item: {currIndex}</div>
        </>

    )
}