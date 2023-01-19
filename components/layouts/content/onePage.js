import { useEffect } from "react"
import Ad from "../../ads/ad"
import { useAdContext } from '../../../context/advertisingContext'
import useAdvertising from '../../ads/advertising'


export default function OnePage({ data }) {
    const { adsDict } = useAdContext();
    const { auction } = useAdvertising()
    useEffect(() => {
        const asyncFunc = async () => {
            await auction();
        }
        asyncFunc();
    }, [])
    return (
        <>
            {/* TITLE */}
            <div style={{ fontSize: '60px', fontWeight: 'bold' }} dangerouslySetInnerHTML={{ __html: data.title }} />
            {/* TITLE */}
            {
                data.content.map((item, index) => (
                    <div key={index}>
                        <div style={{ fontSize: '20px' }} dangerouslySetInnerHTML={{ __html: item }} />
                        <Ad adId='maor' width='728' height='90' section={`feed-section-${index}`}></Ad>
                    </div>
                ))
            }
        </>
    )
}