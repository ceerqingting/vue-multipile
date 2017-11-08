
/**
 * fastClick
 *
 * 解决Safari浏览器点击延迟
 */
const FastClick = require('fastclick');

FastClick.attach(window.document.body);

/**
 *
 * fix IOS手机有时需要点击两次才能生效，参考链接
 * https://github.com/ftlabs/fastclick/issues/506
 *
 * 针对有问题的标签添加click-me样式
 */
window.document.addEventListener('touchend', (e) => {
  if (e.target.classList.contains('click-me')) {
    e.target.blur();
  }
});

