import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

export async function GET() {
  const modelsToTest = [
    'gemini-3.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-flash-latest'
  ]

  const results: any[] = []
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

  for (const modelName of modelsToTest) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName })
      const startTime = Date.now()
      const res = await Promise.race([
        model.generateContent('Hello! Respond with "Hi" in JSON format: {"response": "Hi"}'),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout (6s)')), 6000))
      ]) as any
      const duration = Date.now() - startTime
      results.push({
        model: modelName,
        status: 'SUCCESS',
        durationMs: duration,
        text: res.response.text().trim()
      })
    } catch (err: any) {
      results.push({
        model: modelName,
        status: 'ERROR',
        message: err.message || String(err),
        statusText: err.statusText || 'unknown',
        errorDetails: err.errorDetails || null
      })
    }
  }

  return NextResponse.json({ results })
}
