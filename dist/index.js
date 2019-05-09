/*!
 * simple-analytics-vue v1.0.4
 * (c) 
 */
'use strict';

/* globals document */
var isPromise = function isPromise(subject) {
  return subject && subject.then && typeof subject.then == 'function';
};

var warn = function warn(message) {
  if (console && console.warn) console.warn('Simple Analytics: ' + message || 'Something goes wrong.');
};

var injectScript = function injectScript() {
  if (!document) return warn('No document defined.');
  var el = document.createElement('script');
  el.type = 'text/javascript';
  el.async = true;
  el.src = 'https://cdn.simpleanalytics.io/hello.js';
  document.head.appendChild(el);
};

var index = {
  install: function install(vue) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      skip: false
    },
        skip = _ref.skip;

    if (skip === false) return injectScript(); // If skip is promise, resolve first. With failure always inject script

    if (isPromise(skip)) return skip.then(function (value) {
      if (value !== true) return injectScript();else return warn('Not sending requests because skip is active.');
    }).catch(injectScript); // If skip function, execute and inject when not skipping

    if (typeof skip === 'function' && skip() !== true) return injectScript(); // Otherwise skip

    return warn('Not sending requests because skip is active.');
  }
};

module.exports = index;
