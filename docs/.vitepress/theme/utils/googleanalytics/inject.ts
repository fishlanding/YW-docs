export function injectAnalyticsScript(measurementId: string) {
    if (typeof window === 'undefined') return

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []

    function gtag(...args: any[]) {
        window.dataLayer.push(args)
    }

    gtag('js', new Date())
    gtag('config', measurementId)

    window.gtag = gtag
}