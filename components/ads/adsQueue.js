const withGPTQueue = (func) => {
    if (typeof window === undefined) return;
    window.googletag.cmd.push(func);
}

const withPrebidQueue = (func) => {
    if (typeof window === undefined) return;
    window.pbjs.que.push(func);
}

export {
    withGPTQueue, withPrebidQueue
}