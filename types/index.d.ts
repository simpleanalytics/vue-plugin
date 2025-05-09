import type { App, Plugin } from 'vue'

declare global {
  interface Window {
    sa_event?: (event: string) => void;
  }
}

export interface SimpleAnalyticsOptions {
  skip?: boolean | (() => boolean) | Promise<boolean>;
  domain?: string;
}

type SimpleAnalyticsPlugin = Plugin & {
  install(app: App, options?: SimpleAnalyticsOptions): void;
}

declare const SimpleAnalytics: SimpleAnalyticsPlugin;

export default SimpleAnalytics;

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $saEvent?: (event: string) => void;
  }
}