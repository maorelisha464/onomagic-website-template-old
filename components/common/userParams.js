import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

const globalParams = {
    sessionId: uuidv4(),

}

export default function useUserParams() {
    const router = useRouter();
    const {
        isReady,
        query: {
            utm_campaign,
            utm_source
        }
    } = router;

    return {
        isReady,
        utm_campaign,
        utm_source,
        ...globalParams
    };
}