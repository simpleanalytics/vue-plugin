/* globals document */

const isPromise = subject => subject && subject.then && typeof subject.then == 'function'

const warn = message => {
  if (console && console.warn) console.warn('Simple Analytics: ' + message || 'Something goes wrong.');
}

const injectScript = () => {
  if (!document) return warn('No document defined.');
  const el = document.createElement('script');
  el.type = 'text/javascript';
  el.async = true;
  el.src = 'https://cdn.simpleanalytics.io/hello.js';
  document.head.appendChild(el);
}

export default {
  install(vue, { skip } = { skip: false }) {
    if (skip === false) return injectScript()

    // If skip is promise, resolve first. With failure always inject script
    if (isPromise(skip)) return skip.then((value) => {
      if (value !== true) return injectScript()
      else return warn('Not sending requests because skip is active.')
    }).catch(injectScript)

    // If skip function, execute and inject when not skipping
    if (typeof skip === 'function' && skip() !== true) return injectScript()

    // Otherwise skip
    return warn('Not sending requests because skip is active.')
  }
}
