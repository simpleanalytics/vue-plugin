import type { App, Plugin, InjectionKey } from 'vue'

declare global {
  interface Window {
    sa_event?: (event: string) => void;
  }
}

export interface SimpleAnalyticsOptions {
  skip?: boolean | (() => boolean) | Promise<boolean>;
  domain?: string;
  autoCollect?: boolean;
  collectDnt?: boolean;
  hostname?: string;
  mode?: "dash";
  ignoreMetrics?: {
    referrer?: boolean;
    utm?: boolean;
    country?: boolean;
    session?: boolean;
    timeonpage?: boolean;
    scrolled?: boolean;
    useragent?: boolean;
    screensize?: boolean;
    viewportsize?: boolean;
    language?: boolean;
  };
  ignorePages?: string[];
  allowParams?: string[];
  nonUniqueParams?: string[];
  strictUtm?: boolean;
}

export declare const saEventKey: InjectionKey<(event: string) => void>;

type SimpleAnalyticsPlugin = Plugin & {
  install(app: App, options?: SimpleAnalyticsOptions): void;
}

declare const SimpleAnalytics: SimpleAnalyticsPlugin;
export default SimpleAnalytics;

declare module '@vue/runtime-core' {
  interface InjectionKeys {
    saEvent: (event: string) => void;
  }
}