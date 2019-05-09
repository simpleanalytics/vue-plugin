/* globals document */

export default {
  install(vue, { skip } = { skip: false }) {
    if (skip) return console.warn('Simple Analytics: Not sending requests because skip is active.')
    if (!document) return;
    const el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = 'https://cdn.simpleanalytics.io/hello.js';
    document.head.appendChild(el);
  }
}
