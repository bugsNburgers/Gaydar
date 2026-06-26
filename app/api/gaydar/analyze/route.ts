import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest, NextResponse } from 'next/server'
import type { QuizAnswers } from '../../../../lib/gaydar/types'

// In-memory rate limiter — resets on server restart, zero deps, fine for a fun app
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_MS = 15_000 // 15 seconds between requests per IP

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

  const answerSummary = Object.entries(answers)
    .map(([id, { answer }]) => `${id}: "${answer}"`)
    .join('\n')

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })

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

  try {
    const geminiResult = await model.generateContent(prompt)
    const raw = geminiResult.response.text().replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(raw)

    return NextResponse.json({
      title: typeof parsed.title === 'string' ? parsed.title : 'Signal Unclear',
      reasons: Array.isArray(parsed.reasons) && parsed.reasons.length === 3
        ? parsed.reasons
        : ['Reading error. The machine is embarrassed.', 'Try again for full results.', 'This has never happened before.'],
    })
  } catch (error: any) {
    console.error('Gemini API Error:', error)
    // Graceful fallback if Gemini fails or parse error
    return NextResponse.json({
      title: 'System Error (Very Gay Of It)',
      reasons: [
        'The gaydar overheated. Very dramatic of it.',
        'Our rainbow servers appear to be experiencing feelings.',
        "Results are technically inconclusive. But between us, you know the number is accurate.",
      ],
    })
  }
}
