export function throttle(cb, delay = 1000) {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        } else {
            cb(...waitingArgs)
            waitingArgs = null;
            setTimeout(timeoutFunc, delay);
        }
    }

    return (...args) => {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        cb(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, delay);
    }
}


export const changeUrl = (page) => {
    if (typeof window === 'undefined') return;
    let pathname = location.pathname;
    const pathArray = pathname.split('/').filter(Boolean);
    const curPage = pathArray.slice(-1);
    if (+curPage > 0) pathArray.pop();
    pathname = '/' + pathArray.join('/');
    page = Number(page);
    window.history.pushState(
        '',
        '',
        page !== 0 ? `${pathname}/${page}/${page > 2 ? "" : location.search}` : `${pathname}/${location.search}`
    );
}