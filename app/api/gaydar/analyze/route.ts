import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import type { QuizAnswers } from '../../../../lib/gaydar/types'

// In-memory rate limiter — resets on server restart, zero deps, fine for a fun app
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 15_000 // 15 seconds between requests per IP

const FALLBACK_TITLES = {
  low: ['Honorary Ally', 'Chronically Straight', 'Suspected Ally'],
  mid: ['Chaotic Bi Energy', 'Unconfirmed Vibes', 'Fruity Adjacent'],
  high: ['Certified Gay Behavior', 'Galaxy-Brained Gay', 'Omega-Level Rainbow Threat']
}

const FALLBACK_REASONS = [
  'Our algorithmic gaydar sensors were overwhelmed by your theatrical tendencies.',
  'The machine is currently recovering from the sheer drama of your Ikea mattress choices.',
  'Cross-referencing confirms your gym spotting methods violate several safety codes, and probably some straight ones too.',
  'We detected a critical accumulation of sandalwood cologne molecules in our virtual receptors.',
  'Our servers are taking a moment to emotionally process that 3 AM thermodynamic spooning theory.',
  'The database confirms that holding pinky fingers on a cinema armrest is legally binding in 14 states.',
  'Warning: Excessive levels of campery detected. System fuse blown.',
  'The machine is speechless. Literally. (Actually, it was just a server error, but let\'s pretend it was your aura).',
  'Analysis confirms your barber-shop eye contact was 20% too long for a standard haircut.',
  'The data is blurry, but our rainbow oracle is heavily whispering some very specific opinions.',
  'We ran the numbers, and you are officially too iconic for our standard server bandwidth.',
  'Your Spotify playlists and outfit choices caused a minor emotional crisis on our server racks.',
  'The radar detected a high-probability event of you asking if a showroom bed has "good support".'
]

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous'
  const now = Date.now()
  const last = rateLimitMap.get(ip) ?? 0

  if (now - last < RATE_LIMIT_MS) {
    const waitSec = Math.ceil((RATE_LIMIT_MS - (now - last)) / 1000)
    return NextResponse.json(
      {
        title: 'Hold On Babe 💅',
        reasons: [
          `The gaydar needs ${waitSec}s to recalibrate. She works hard.`,
          'Our rainbow servers are catching their breath.',
          'Try again in a moment. The machine demands patience.',
        ],
      },
      { status: 429 }
    )
  }
  rateLimitMap.set(ip, now)

  const body = await req.json() as { percentage: number; answers: QuizAnswers }
  const { percentage, answers } = body

  let scanCount = 109
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const res = await fetch('https://api.counterapi.dev/v1/gaydar3000_bugsnburgers/scans/up', {
      signal: controller.signal,
      cache: 'no-store'
    })
    clearTimeout(timeoutId)

    if (res.ok) {
      const data = await res.json()
      const apiCount = data.count ?? data.value ?? 0
      scanCount = 109 + apiCount
    } else {
      console.warn(`CounterAPI /up responded with status ${res.status}`)
    }
  } catch (error) {
    console.error('Error incrementing CounterAPI:', error)
  }

  const answerSummary = Object.entries(answers)
    .map(([id, { answer }]) => `${id}: "${answer}"`)
    .join('\n')

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      maxOutputTokens: 2048,
      temperature: 0.8,
    }
  })

  const prompt = `You are GAYDAR 3000 — a hilariously confident, campy fake AI machine that gives absurd pseudoscientific analysis for a fun gay quiz.

The person scored ${percentage}% on the gaydar. Their quiz answers:
${answerSummary}

Your job: generate 3 short, funny, unhinged "scientific" reasons explaining this exact score.

Rules for the reasons:
- Reference their specific answers (use the actual answer text they gave)
- Write like a very confident machine that is objectively wrong: "Our algorithms detected...", "Cross-referencing indicates...", "Analysis confirms..."
- Camp it up. Light gay slang is fine (serve, slay, icon, bestie) but don't overdo it
- NOT mean-spirited. This is all in good fun
- Each reason: max 2 sentences
- Be actually funny. The bit is the machine being confidently absurd

Title examples by score range:
- 0-15%: "Chronically Straight", "Statistically Heterosexual", "Honorary Ally"
- 16-30%: "Suspected Ally", "Questioning (The Machine)", "Gay Adjacent"  
- 31-50%: "Chaotic Bi Energy", "Unconfirmed Vibes", "The Data Is Blurry"
- 51-70%: "Gay Icon in Training", "Heavily Implied", "The Evidence Is Mounting"
- 71-85%: "Certified Gay Behavior", "Fully Deployed", "The Machine Is Sure"
- 86-100%: "Galaxy-Brained Gay", "Supreme Gay Energy", "We Didn't Even Need The Test"

Pick the best title for ${percentage}% specifically. Be creative, don't just pick from the list.

Respond ONLY with valid JSON — no markdown, no backticks, no explanation:
{"title":"...","reasons":["...","...","..."]}`

  let rawText = ''
  try {
    const apiCall = model.generateContent(prompt)
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API request timed out (35s)')), 35000)
    )
    const geminiResult = await Promise.race([apiCall, timeoutPromise]) as any
    rawText = geminiResult.response.text()
    
    // Extract JSON block (in case model outputs markdown code blocks or conversational prefixes)
    const firstBrace = rawText.indexOf('{')
    const lastBrace = rawText.lastIndexOf('}')
    const jsonString = (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace)
      ? rawText.substring(firstBrace, lastBrace + 1)
      : rawText

    const parsed = JSON.parse(jsonString)

    return NextResponse.json({
      title: typeof parsed.title === 'string' ? parsed.title : 'Signal Unclear',
      reasons: Array.isArray(parsed.reasons) && parsed.reasons.length === 3
        ? parsed.reasons
        : ['Reading error. The machine is embarrassed.', 'Try again for full results.', 'This has never happened before.'],
      scanCount,
    })
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    
    // Choose title based on percentage
    const titles = percentage < 35 ? FALLBACK_TITLES.low
      : percentage < 75 ? FALLBACK_TITLES.mid
      : FALLBACK_TITLES.high
    const title = titles[Math.floor(Math.random() * titles.length)]

    // Shuffle and pick 3 unique reasons
    const shuffled = [...FALLBACK_REASONS].sort(() => 0.5 - Math.random())
    const reasons = shuffled.slice(0, 3)

    return NextResponse.json({
      title,
      reasons,
      scanCount,
    })
  }
}
