const withGPTQueue = async (func) => {
  return new Promise((res, rej) => {
    if (typeof window === "undefined") return;
    window.googletag.cmd.push(() => {
      func();
      res();
    });
  });
};

const withPrebidQueue = async (func) => {
  return new Promise((res, rej) => {
    if (typeof window === "undefined") return;
    window.pbjs.que.push(() => {
      func();
      res();
    });
  });
};

export { withGPTQueue, withPrebidQueue };
