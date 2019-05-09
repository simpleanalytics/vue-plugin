# Simple Analytics Vue plugin

## Install

Just run this command to install Simple Analytics for Vue:

```bash
npm install simple-analytics-vue
```

## Import in app

Import the plugin and add it to `Vue.use`. You can add a `skip` option which will define when requests should be skipped.

```js
import SimpleAnalytics from "simple-analytics-vue";
import Vue from "vue";

Vue.use(SimpleAnalytics, { skip: process.env.NODE_ENV !== 'production' });
```

You can also pass a function or promise to `skip` which will be validated before injecting the Simple Analytics embed code:

```js
import auth from "lib/auth";
Vue.use(SimpleAnalytics, { skip: auth.isAdminPromise });
```
