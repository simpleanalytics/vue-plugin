/*!
 * simple-analytics-vue v1.1.0
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

var injectScript = function injectScript(domain) {
  if (!document) return warn('No document defined.');
  var el = document.createElement('script'); // Uses hello.js for default domain, otherwise uses app.js

  var file = domain === 'cdn.simpleanalytics.io' ? 'hello' : 'app';
  el.type = 'text/javascript';
  el.async = true;
  el.src = 'https://' + domain + '/' + file + '.js';
  document.head.appendChild(el);
};

var index = {
  install: function install(vue, _ref) {
    var _ref$skip = _ref.skip,
        skip = _ref$skip === void 0 ? false : _ref$skip,
        _ref$domain = _ref.domain,
        domain = _ref$domain === void 0 ? 'cdn.simpleanalytics.io' : _ref$domain;
    if (skip === false) return injectScript(domain); // If skip is promise, resolve first. With failure always inject script

    if (isPromise(skip)) return skip.then(function (value) {
      if (value !== true) return injectScript(domain);else return warn('Not sending requests because skip is active.');
    }).catch(injectScript); // If skip function, execute and inject when not skipping

    if (typeof skip === 'function' && skip() !== true) return injectScript(domain); // Otherwise skip

    return warn('Not sending requests because skip is active.');
  }
};

module.exports = index;
