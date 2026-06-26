import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const key = process.env.GEMINI_API_KEY
    if (!key) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' })
    }
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
    if (!res.ok) {
      return NextResponse.json({ error: `API responded with ${res.status}`, text: await res.text() })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) })
  }
}
