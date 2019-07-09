# Simple Analytics Vue plugin

[Simple Analytics](https://simpleanalytics.com) is a clean, simple, and privacy friendly analytics tool. Actionable data in a beautiful dashboard. It does not use cookies and you can bypass ad blockers. Make sure to signup to get most value out of this plugin.

## Install

Just run this command to install Simple Analytics for Vue:

```bash
npm install simple-analytics-vue
```

## Import in app

Import the plugin and add it to `Vue.use`. You can add a `skip` option which will define when page views should be skipped. This can be useful if you want to skip page views from yourself when developing your app.

```js
import SimpleAnalytics from "simple-analytics-vue";
import Vue from "vue";

Vue.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== "production" });
```

You can also pass a function or promise to `skip` which will be validated before injecting the Simple Analytics embed code:

```js
import auth from "lib/auth";
Vue.use(SimpleAnalytics, { skip: auth.isAdminPromise });
```

You can also optionally specify a custom domain to bypass ad blockers. Read more about this in [our documentation](https://docs.simpleanalytics.com/bypass-ad-blockers).

```js
Vue.use(SimpleAnalytics, { domain: "api.example.com" });
```
