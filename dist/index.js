/*!
 * simple-analytics-vue v1.0.1
 * (c) 
 */
'use strict';

/* globals document */
var index = {
  install: function install(vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      skip: false
    },
        skip = _ref.skip;

    if (skip) return console.warn('Simple Analytics: Not sending requests because skip is active.');
    if (!document) return;
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = 'https://cdn.simpleanalytics.io/hello.js';
    document.head.appendChild(el);
  }
};

module.exports = index;
