import type { App, Plugin, InjectionKey } from 'vue'

declare global {
  interface Window {
    sa_event?: (event: string, metadata?: Record<string, any>) => void;
  }
}

export interface SimpleAnalyticsOptions {
  skip?: boolean | (() => boolean) | Promise<boolean>;
  domain?: string;
}

export declare const saEventKey: InjectionKey<(event: string, metadata?: Record<string, any>) => void>;

type SimpleAnalyticsPlugin = Plugin & {
  install(app: App, options?: SimpleAnalyticsOptions): void;
}

declare const SimpleAnalytics: SimpleAnalyticsPlugin;
export default SimpleAnalytics;

declare module '@vue/runtime-core' {
  interface InjectionKeys {
    saEvent: (event: string, metadata?: Record<string, any>) => void;
  }
}