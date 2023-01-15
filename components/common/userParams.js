import { useRouter } from 'next/router'

export default function userParams() {
    const router = useRouter();
    const utm_source = router.query.utm_source;
    const utm_campaign = router.query.utm_campaign;
    return {
        utm_source,
        utm_campaign
    }
}