import { google } from 'googleapis'

const analytics = google.analytics('v3')

export async function handler(req: any, res: any) {
    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                // 你的 Google Analytics API 凭据
            },
            scopes: ['https://www.googleapis.com/auth/analytics.readonly']
        })

        const { startDates } = req.body

        const [daily, weekly, monthly, total] = await Promise.all([
            getAnalyticsData(auth, startDates[0]),
            getAnalyticsData(auth, startDates[1]),
            getAnalyticsData(auth, startDates[2]),
            getTotalVisits(auth)
        ])

        return {
            daily,
            weekly,
            monthly,
            total
        }
    } catch (error) {
        console.error('Analytics API Error:', error)
        throw new Error('Failed to fetch analytics data')
    }
}

async function getAnalyticsData(auth: any, startDate: string) {
    const result = await analytics.data.ga.get({
        auth,
        ids: 'ga:' + process.env.GA_VIEW_ID,
        'start-date': startDate,
        'end-date': 'today',
        metrics: 'ga:users'
    })

    return parseInt(result.data.totalsForAllResults['ga:users']) || 0
}

async function getTotalVisits(auth: any) {
    const result = await analytics.data.ga.get({
        auth,
        ids: 'ga:' + process.env.GA_VIEW_ID,
        'start-date': '2005-01-01',
        'end-date': 'today',
        metrics: 'ga:users'
    })

    return parseInt(result.data.totalsForAllResults['ga:users']) || 0
}