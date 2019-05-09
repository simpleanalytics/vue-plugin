/*!
 * simple-analytics-vue v1.0.1
 * (c) 
 */
'use strict';

/* globals document */
var index = {
  install: function install() {
    if (!document) return;
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.async = true;
    el.src = 'https://cdn.simpleanalytics.io/hello.js';
    document.head.appendChild(el);
  }
};

module.exports = index;
