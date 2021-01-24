/*!
 * simple-analytics-vue v1.1.3
 * (c) 
 */
'use strict';

/* globals document */
var isPromise = function isPromise(subject) {
  return subject && subject.then && typeof subject.then == "function";
};

var warn = function warn(message) {
  if (console && console.warn) console.warn("Simple Analytics: " + message || "Something goes wrong.");
};

var injectScript = function injectScript(vue, domain) {
  if (typeof document === "undefined") return warn("No document defined.");
  var el = document.createElement("script");
  el.type = "text/javascript";
  el.async = true;
  el.src = "https://" + domain + "/latest.js";
  document.head.appendChild(el); // Add a global 'saEvent' method when the script has been loaded

  el.onload = function () {
    vue.prototype.saEvent = window.sa_event; // handle event tracking on localhost
    // we won't send events, but we need to capture them to prevent errors

    if (window.location.hostname.indexOf(".") == -1 || /^[0-9]+$/.test(window.location.hostname.replace(/\./g, ""))) {
      vue.prototype.saEvent = function (event) {
        warn("".concat(event, " event captured but not sent due to localhost"));
      };
    }
  };
};

var index = {
  install: function install(vue, _ref) {
    var _ref$skip = _ref.skip,
        skip = _ref$skip === void 0 ? false : _ref$skip,
        _ref$domain = _ref.domain,
        domain = _ref$domain === void 0 ? "scripts.simpleanalyticscdn.com" : _ref$domain;
    if (skip === false) return injectScript(vue, domain); // If skip is promise, resolve first. With failure always inject script

    if (isPromise(skip)) return skip.then(function (value) {
      if (value !== true) return injectScript(vue, domain);else return warn("Not sending requests because skip is active.");
    }).catch(injectScript); // If skip function, execute and inject when not skipping

    if (typeof skip === "function" && skip() !== true) return injectScript(vue, domain); // skip must be true, add event to Vue prototype to prevent errors

    vue.prototype.saEvent = function (event) {
      warn("event ".concat(event, " not tracked due to skip===true"));
    }; // Otherwise skip


    return warn("Not sending requests because skip is active.");
  }
};

module.exports = index;
