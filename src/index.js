/* globals document */

export default {
  install() {
    if (!document) return;
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = 'https://cdn.simpleanalytics.io/hello.js';
    document.head.appendChild(el);
  }
}
