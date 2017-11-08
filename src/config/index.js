
// 当前浏览器
const ua = window.navigator.userAgent.toLocaleLowerCase();
const hostname = window.location.hostname;
const isIos = /iphone|ipod|ipad/.test(ua);
const isIpad = /ipad/.test(ua);
const isWx = /micromessenger/.test(ua);
const isAndroid = /android/.test(ua);
const isApp = /appName/.test(ua);
const isTest = /testUrl/.test(hostname);

export {
  isIos,
  isIpad,
  isWx,
  isAndroid,
  isApp,
  isTest,
};
