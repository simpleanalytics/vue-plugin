<a href="https://simpleanalytics.com/?ref=github.com/simpleanalytics/vue-plugin">
  <img src="https://assets.simpleanalytics.com/images/logos/logo-github-readme.png" alt="Simple Analytics logo" align="right" height="62" />
</a>

# Vue plugin

[Simple Analytics](https://www.simpleanalytics.com/) is a clean, simple, and privacy-first analytics tool. Actionable data in a beautiful dashboard. It does not use cookies and you can bypass ad-blockers. Make sure to signup to get the most value out of this plugin.

## Install

We support Vue 3 and Vue 2.

### Vue 3

Just run this command to install Simple Analytics for Vue 3:

```bash
npm install simple-analytics-vue@3.0.1 --save
```

### Vue 2

If you are using Vue 2, use version 2.x of this package. It will not get any updates. Install it with `npm install simple-analytics-vue@2.x --save`.

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

### Events

To send an event, inject the `saEvent` method into your Vue 3 setup script like so:

```vue
// ~/src/components/Comment.vue

<script setup>
import { inject } from "vue";

const saEvent = inject("saEvent");

// e.g.: send event when liking a comment
const likeComment = (comment) => {
  saEvent(`comment_like_${comment.id}`);
};
</script>
```

[Read more about the Vue `inject` method here.](https://vuejs.org/guide/components/provide-inject.html#inject)

> **Note: Simple Analytics does not run on localhost.**  
> You can still fire events, but they will be captured and logged in the console for debugging purposes.

## Nuxt

Create a Nuxt client-side plugin like so:

```js
// ~/plugins/simple-analytics.client.js

import SimpleAnalytics from "simple-analytics-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SimpleAnalytics, {
    skip: process.env.NODE_ENV !== "production",
  });
});
```

_If you need any additional configuration options (as the ones mentioned above), you just need to apply to your plugin._
