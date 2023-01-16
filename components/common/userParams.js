import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';

export default function useUserParams() {
    // const router = useRouter();
    const router = useRouter();
    const {
        isReady,
        query: {
            utm_campaign,
            utm_source
        }
    } = router;
    console.log('isReady', isReady);
    return { isReady, utm_campaign, utm_source };
}