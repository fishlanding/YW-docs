// .vitepress/theme/utils/googleanalytics/index.ts
import { type Plugin } from 'vitepress'
import { App } from 'vue'
import { injectAnalyticsScript } from './inject'

declare global {
    interface Window {
        dataLayer: any[]
        gtag: (...args: any[]) => void
    }
}

export interface AnalyticsOptions {
    measurementId: string
}

export function VitePressAnalytics(options: AnalyticsOptions): Plugin {
    return {
        name: 'vitepress-analytics',
        enhanceApp(ctx: { app: App; router: any }) {
            if (process.env.NODE_ENV === 'production') {
                injectAnalyticsScript(options.measurementId)
            }
        }
    } as Plugin
}