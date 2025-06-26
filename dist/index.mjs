/* globals document */
const saEventKey = Symbol('saEvent');

const isPromise = (subject) =>
  subject && subject.then && typeof subject.then == "function";

const warn = (message) => {
  if (console && console.warn)
    console.warn("Simple Analytics: " + message || "Something goes wrong.");
};

const injectScript = (app, domain) => {
  if (typeof document === "undefined") return warn("No document defined.");
  if (document.getElementById("sa-script")) return; // Script already loaded
  const el = document.createElement("script");
  el.id = "sa-script";
  el.type = "text/javascript";
  el.async = true;
  el.src = "https://" + domain + "/latest.js";
  document.head.appendChild(el);

  // Add a global 'saEvent' method when the script has been loaded
  el.onload = () => {
    // Handle event tracking on localhost, we won't send events,
    // but we need to capture them to prevent errors
    if (
      window.location.hostname.indexOf(".") == -1 ||
      /^[0-9]+$/.test(window.location.hostname.replace(/\./g, ""))
    ) {
      handleSkipOrLocalhost(app);
    } else {
      app.provide("saEvent", window.sa_event);
    }
  };
};

const handleSkipOrLocalhost = (app) => {
  // when skip===true or script is running on localhost
  // we need a function that logs events that would have been sent
  app.provide("saEvent", function(event) {
    warn(`${event} event captured but not sent due to skip or localhost`);
  });
};

var index = {
  install(app, { skip = false, domain = "scripts.simpleanalyticscdn.com" }) {
    if (skip === false) return injectScript(app, domain);

    // If skip is promise, resolve first. With failure always inject script
    if (isPromise(skip))
      return skip
        .then((value) => {
          if (value !== true) return injectScript(app, domain);
          else return warn("Not sending requests because skip is active.");
        })
        .catch(injectScript);

    // If skip function, execute and inject when not skipping
    if (typeof skip === "function" && skip() !== true)
      return injectScript(app, domain);

    // Add event catching function to Vue prototype
    if (skip) handleSkipOrLocalhost(app);

    // Otherwise skip
    return warn("Not sending requests because skip is active.");
  },
};

export { index as default, saEventKey };
