/* globals document */

const isPromise = (subject) =>
  subject && subject.then && typeof subject.then == "function";

const warn = (message) => {
  if (console && console.warn)
    console.warn("Simple Analytics: " + message || "Something goes wrong.");
};

const injectScript = (vue, domain) => {
  if (typeof document === "undefined") return warn("No document defined.");
  const el = document.createElement("script");
  el.type = "text/javascript";
  el.async = true;
  el.src = "https://" + domain + "/latest.js";
  document.head.appendChild(el);
  
  // Add a global 'saEvent' method when the script has been loaded
  el.onload = () => {
    vue.prototype.saEvent = window.sa_event
  }
};

export default {
  install(vue, { skip = false, domain = "scripts.simpleanalyticscdn.com" }) {
    if (skip === false) return injectScript(vue, domain);

    // If skip is promise, resolve first. With failure always inject script
    if (isPromise(skip))
      return skip
        .then((value) => {
          if (value !== true) return injectScript(vue, domain);
          else return warn("Not sending requests because skip is active.");
        })
        .catch(injectScript);

    // If skip function, execute and inject when not skipping
    if (typeof skip === "function" && skip() !== true)
      return injectScript(vue, domain);

    // Otherwise skip
    return warn("Not sending requests because skip is active.");
  },
};
