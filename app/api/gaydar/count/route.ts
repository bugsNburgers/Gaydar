import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch('https://api.counterapi.dev/v1/gaydar3000_bugsnburgers/scans/get', {
      signal: controller.signal,
      cache: 'no-store'
    })
    clearTimeout(timeoutId)

    const headers = {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    }

    if (res.status === 404) {
      return NextResponse.json({ count: 109 }, { headers })
    }

    if (!res.ok) {
      throw new Error(`CounterAPI responded with status ${res.status}`)
    }

    const data = await res.json()
    const apiCount = data.count ?? data.value ?? 0
    return NextResponse.json({ count: 109 + apiCount }, { headers })
  } catch (error) {
    console.error('Error fetching count from CounterAPI:', error)
    // Return the safe default baseline if API is down
    return NextResponse.json({ count: 109 }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      }
    })
  }
}
