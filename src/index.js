/* globals document */
export const saEventKey = Symbol('saEvent');

function parseOptions(options) {
  const metrics = options.ignoreMetrics
    ? Object.entries(options.ignoreMetrics)
        .filter(([_, value]) => value)
        .map(([key]) => `${key}`)
        .join(",")
    : undefined;

  return {
    "data-auto-collect": options.autoCollect,
    "data-collect-dnt": options.collectDnt,
    "data-hostname": options.hostname,
    "data-mode": options.mode,
    "data-ignore-metrics": metrics === "" ? undefined : metrics,
    "data-ignore-pages": options.ignorePages?.join(","),
    "data-allow-params": options.allowParams?.join(","),
    "data-non-unique-params": options.nonUniqueParams?.join(","),
    "data-strict-utm": options.strictUtm,
  };
}

const isPromise = (subject) =>
  subject && subject.then && typeof subject.then == "function";

const warn = (message) => {
  if (console && console.warn)
    console.warn("Simple Analytics: " + message || "Something goes wrong.");
};

const injectScript = (app, domain, options) => {
  if (typeof document === "undefined") return warn("No document defined.");
  if (document.getElementById("sa-script")) return; // Script already loaded
  const el = document.createElement("script");
  el.id = "sa-script";
  el.type = "text/javascript";
  el.async = true;
  el.src = "https://" + domain + "/latest.js";
  const attributes = parseOptions(options);
  for (const key in attributes) {
    const value = attributes[key];
    if (value) el.setAttribute(key, value);
  }
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

export default {
  install(app, { skip = false, domain = "scripts.simpleanalyticscdn.com", ...options }) {
    if (skip === false) return injectScript(app, domain, options);

    // If skip is promise, resolve first. With failure always inject script
    if (isPromise(skip))
      return skip
        .then((value) => {
          if (value !== true) return injectScript(app, domain, options);
          else return warn("Not sending requests because skip is active.");
        })
        .catch(injectScript(app, domain, options));

    // If skip function, execute and inject when not skipping
    if (typeof skip === "function" && skip() !== true)
      return injectScript(app, domain, options);

    // Add event catching function to Vue prototype
    if (skip) handleSkipOrLocalhost(app);

    // Otherwise skip
    return warn("Not sending requests because skip is active.");
  },
};
