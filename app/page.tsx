'use client'

import { useState, useEffect } from 'react'
import { QUESTIONS, MAX_SCORE } from '../lib/gaydar/questions'
import type { Screen, QuizAnswers, GaydarResult } from '../lib/gaydar/types'
import memeImg from '../artworks-yHfbqspd8QRZY5ZM-r0ANfQ-t500x500.jpg'

// ─── Constants ────────────────────────────────────────────────────────────────

const RAINBOW = 'linear-gradient(90deg, #FF006E 0%, #FF4500 20%, #FFBE0B 40%, #06D6A0 60%, #118AB2 80%, #9B5DE5 100%)'

const LOADING_MESSAGES = [
  'Recalibrating gym locker room eye contact sensors…',
  'Analyzing roommate rent-splitting justifications…',
  'Evaluating IKEA showroom bed-testing variables…',
  'Measuring thermodynamic spooning efficiency…',
  'Processing suspicious bench-press spotting angles…',
  'De-escalating cinema armrest pinky interlocks…',
  'Checking truth-or-dare lip contact durations…',
  'Detecting sandalwood perfume tracking velocity…',
  'Reviewing couples\' massage glute-focus data…',
  'Calibrating barber shop mirror eye lock duration…',
  'Consulting the rainbow oracle for ultimate judgment…',
  'Preparing to judge you lovingly but extremely harshly…',
]

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=DM+Sans:wght@400;500;600&display=swap');

  .g3k-root {
    min-height: 100vh;
    background: #08000f;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
    font-family: 'DM Sans', sans-serif;
    color: white;
    overflow: hidden;
    position: relative;
  }

  .g3k-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(100px);
    pointer-events: none;
    z-index: 0;
    animation: g3k-drift 14s ease-in-out infinite;
  }

  .g3k-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
  }

  .g3k-title {
    font-family: 'Fredoka One', cursive;
  }

  .g3k-rainbow-text {
    background: ${RAINBOW};
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: g3k-shift 4s linear infinite;
  }

  .g3k-btn {
    background: ${RAINBOW};
    background-size: 200%;
    animation: g3k-shift 3s linear infinite;
    border: none;
    cursor: pointer;
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.05em;
    padding: 14px 44px;
    border-radius: 999px;
    transition: transform 0.15s, box-shadow 0.15s;
    display: inline-block;
  }

  .g3k-btn:hover {
    transform: scale(1.06);
    box-shadow: 0 0 40px rgba(255,0,110,0.45), 0 0 80px rgba(155,93,229,0.25);
  }

  .g3k-btn:active { transform: scale(0.97); }

  .g3k-option {
    background: rgba(255,255,255,0.04);
    border: 1.5px solid rgba(255,255,255,0.08);
    cursor: pointer;
    color: rgba(255,255,255,0.88);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    text-align: left;
    padding: 13px 16px;
    border-radius: 14px;
    width: 100%;
    line-height: 1.5;
    transition: all 0.18s ease;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .g3k-option:hover {
    background: rgba(155,93,229,0.1);
    border-color: rgba(155,93,229,0.45);
    transform: translateX(5px);
    color: white;
  }

  .g3k-option:active { transform: translateX(2px) scale(0.99); }

  .g3k-option-selected {
    background: rgba(155,93,229,0.18) !important;
    border-color: rgba(155,93,229,0.7) !important;
    color: white !important;
    transform: translateX(5px) !important;
  }

  .g3k-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 16px 18px;
  }

  .g3k-progress {
    height: 6px;
    background: rgba(255,255,255,0.07);
    border-radius: 999px;
    overflow: hidden;
  }

  .g3k-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: ${RAINBOW};
    background-size: 300%;
    animation: g3k-shift 3s linear infinite;
    transition: width 0.45s cubic-bezier(0.4,0,0.2,1);
  }

  .g3k-badge {
    display: inline-block;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 5px 14px;
    font-size: 0.76rem;
    color: rgba(255,255,255,0.55);
  }

  @keyframes g3k-shift {
    0%   { background-position: 0%   50%; }
    100% { background-position: 200% 50%; }
  }

  @keyframes g3k-drift {
    0%, 100% { transform: translate(0,   0)   scale(1);    }
    33%       { transform: translate(40px, -30px) scale(1.08); }
    66%       { transform: translate(-25px, 20px) scale(0.94); }
  }

  @keyframes g3k-radar {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }

  @keyframes g3k-pulse {
    0%   { transform: scale(1);   opacity: 0.8; }
    100% { transform: scale(2.4); opacity: 0;   }
  }

  @keyframes g3k-in {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  @keyframes g3k-float {
    0%, 100% { transform: translateY(0);    }
    50%       { transform: translateY(-12px); }
  }

  .g3k-in-0 { animation: g3k-in 0.5s 0.00s ease both; }
  .g3k-in-1 { animation: g3k-in 0.5s 0.08s ease both; }
  .g3k-in-2 { animation: g3k-in 0.5s 0.16s ease both; }
  .g3k-in-3 { animation: g3k-in 0.5s 0.24s ease both; }
  .g3k-in-4 { animation: g3k-in 0.5s 0.32s ease both; }
  .g3k-in-5 { animation: g3k-in 0.5s 0.40s ease both; }
  .g3k-in-6 { animation: g3k-in 0.5s 0.48s ease both; }
  .g3k-in-7 { animation: g3k-in 0.5s 0.56s ease both; }
  .g3k-float { animation: g3k-float 3.5s ease-in-out infinite; }
`

// ─── Landing ──────────────────────────────────────────────────────────────────

function LandingScreen({ scanCount, onStart }: { scanCount: number; onStart: () => void }) {
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>

      {/* Radar SVG */}
      <div className="g3k-in-0 g3k-float" style={{ position: 'relative', width: 150, height: 150 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px solid rgba(155,93,229,0.35)',
            animation: `g3k-pulse ${1.8 + i * 0.6}s ${i * 0.45}s ease-out infinite`,
          }} />
        ))}
        <svg viewBox="0 0 150 150" style={{ width: '100%', height: '100%' }}>
          <circle cx="75" cy="75" r="70" fill="rgba(155,93,229,0.07)" stroke="rgba(155,93,229,0.25)" strokeWidth="1.5" />
          <circle cx="75" cy="75" r="48" fill="none" stroke="rgba(155,93,229,0.15)" strokeWidth="1" />
          <circle cx="75" cy="75" r="26" fill="none" stroke="rgba(155,93,229,0.15)" strokeWidth="1" />
          <line x1="5" y1="75" x2="145" y2="75" stroke="rgba(155,93,229,0.15)" strokeWidth="1" />
          <line x1="75" y1="5" x2="75" y2="145" stroke="rgba(155,93,229,0.15)" strokeWidth="1" />
          <g style={{ transformOrigin: '75px 75px', animation: 'g3k-radar 2.2s linear infinite' }}>
            <path d="M75,75 L75,5 A70,70 0 0,1 145,75 Z" fill="url(#g3k-sweep)" />
          </g>
          <circle cx="75" cy="75" r="4.5" fill="#9B5DE5" />
          <circle cx="105" cy="48" r="3.5" fill="#FF006E" opacity="0.95" />
          <circle cx="42" cy="88" r="2.5" fill="#06D6A0" opacity="0.9" />
          <circle cx="108" cy="98" r="2" fill="#FFBE0B" opacity="0.9" />
          <defs>
            <linearGradient id="g3k-sweep" x1="75" y1="75" x2="145" y2="5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9B5DE5" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#9B5DE5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Title */}
      <div className="g3k-in-1">
        <h1 className="g3k-title g3k-rainbow-text" style={{ fontSize: '4.2rem', margin: 0, lineHeight: 0.88 }}>
          GAYDAR
        </h1>
        <p className="g3k-title g3k-rainbow-text" style={{ fontSize: '2rem', margin: '6px 0 0', letterSpacing: '0.35em' }}>
          3000
        </p>
      </div>

      {/* Subtitle */}
      <p className="g3k-in-2" style={{
        color: 'rgba(255,255,255,0.45)',
        fontSize: '0.88rem',
        margin: 0,
        maxWidth: 260,
        lineHeight: 1.65,
        fontStyle: 'italic',
      }}>
        the most unhinged quantum gay-radar in the galaxy
      </p>

      {/* Tags */}
      <div className="g3k-in-3" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {['📡 Radar Calibrated', '💅 Slay Checked', '🌈 Extremely Fruity'].map(tag => (
          <span key={tag} className="g3k-badge">{tag}</span>
        ))}
      </div>

      {/* Scan Count */}
      <div className="g3k-in-3" style={{ margin: '4px 0 -8px', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontWeight: 500 }}>
        🌈 <span style={{ color: '#FF006E', fontWeight: 700 }}>{scanCount ? scanCount.toLocaleString() : '...'}</span> Gays scanned till now
      </div>

      {/* CTA */}
      <div className="g3k-in-4">
        <button className="g3k-btn" onClick={onStart}>
          START SCAN ✦
        </button>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.73rem', marginTop: 10 }}>
          10 suspicious scenarios · zero straight answers allowed · ready to serve
        </p>
      </div>
    </div>
  )
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────

function QuizScreen({
  question,
  questionIndex,
  total,
  onAnswer,
}: {
  question: typeof QUESTIONS[0]
  questionIndex: number
  total: number
  onAnswer: (points: number, text: string) => void
}) {
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => { setSelected(null) }, [questionIndex])

  const handleSelect = (points: number, text: string, idx: number) => {
    if (selected !== null) return
    setSelected(idx)
    setTimeout(() => onAnswer(points, text), 360)
  }

  const progress = ((questionIndex + 1) / total) * 100

  return (
    <div key={questionIndex} className="g3k-in-0" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem' }}>
          <span>Question {questionIndex + 1} of {total}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="g3k-progress">
          <div className="g3k-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ textAlign: 'center', padding: '4px 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: 12 }}>{question.emoji}</div>
        <h2 className="g3k-title" style={{ fontSize: '1.35rem', margin: 0, fontWeight: 400, lineHeight: 1.35 }}>
          {question.text}
        </h2>
      </div>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx
          return (
            <button
              key={idx}
              className={`g3k-option${isSelected ? ' g3k-option-selected' : ''} g3k-in-${idx + 1}`}
              onClick={() => handleSelect(opt.points, opt.text, idx)}
            >
              <span style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 700,
                background: isSelected ? RAINBOW : 'rgba(255,255,255,0.08)',
                transition: 'background 0.2s',
              }}>
                {['A', 'B', 'C', 'D'][idx]}
              </span>
              {opt.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

function LoadingScreen({ message }: { message: string }) {
  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
      <div style={{ position: 'relative', width: 130, height: 130 }}>
        <svg viewBox="0 0 130 130" style={{ width: '100%', height: '100%' }}>
          <circle cx="65" cy="65" r="60" fill="rgba(155,93,229,0.07)" stroke="rgba(155,93,229,0.25)" strokeWidth="1.5" />
          <circle cx="65" cy="65" r="40" fill="none" stroke="rgba(155,93,229,0.14)" strokeWidth="1" />
          <circle cx="65" cy="65" r="20" fill="none" stroke="rgba(155,93,229,0.14)" strokeWidth="1" />
          <line x1="5" y1="65" x2="125" y2="65" stroke="rgba(155,93,229,0.14)" strokeWidth="1" />
          <line x1="65" y1="5" x2="65" y2="125" stroke="rgba(155,93,229,0.14)" strokeWidth="1" />
          <g style={{ transformOrigin: '65px 65px', animation: 'g3k-radar 1s linear infinite' }}>
            <path d="M65,65 L65,5 A60,60 0 0,1 125,65 Z" fill="url(#g3k-load)" />
          </g>
          <circle cx="65" cy="65" r="4" fill="#FF006E" />
          <defs>
            <linearGradient id="g3k-load" x1="65" y1="65" x2="125" y2="5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF006E" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FF006E" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div>
        <h2 className="g3k-title g3k-rainbow-text" style={{ fontSize: '2rem', margin: '0 0 10px' }}>
          SCANNING…
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.88rem', margin: 0, minHeight: '1.5em', transition: 'opacity 0.3s' }}>
          {message}
        </p>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius: '50%',
            background: ['#FF006E', '#FF4500', '#FFBE0B', '#06D6A0', '#9B5DE5'][i],
            animation: `g3k-pulse 1.4s ${i * 0.18}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Result ───────────────────────────────────────────────────────────────────

function ResultScreen({
  percentage,
  result,
  scanCount,
  onReset,
}: {
  percentage: number
  result: GaydarResult
  scanCount: number
  onReset: () => void
}) {
  const titleColor = percentage >= 70 ? '#FF006E'
    : percentage >= 50 ? '#FF4500'
      : percentage >= 30 ? '#FFBE0B'
        : '#06D6A0'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Score block */}
      <div className="g3k-in-0" style={{ textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', margin: '0 0 6px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Analysis Complete
        </p>
        <h1 className="g3k-title g3k-rainbow-text" style={{ fontSize: '4.2rem', margin: 0, lineHeight: 1 }}>
          {percentage}% GAY
        </h1>
        <p className="g3k-in-1" style={{ color: '#06D6A0', fontSize: '0.95rem', fontWeight: 700, margin: '12px 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          🎉 Congratulations, you're our {scanCount ? scanCount.toLocaleString() : '...'}th gay!! 🎉
        </p>

        {/* Meme Image */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 20 }}>
          <img
            src={memeImg.src}
            alt="Why are you gay?"
            style={{
              width: '100%',
              maxWidth: '380px',
              borderRadius: '12px',
              border: '1.5px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>

        <div style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${titleColor}55`,
          borderRadius: 999,
          padding: '6px 20px',
          fontSize: '0.88rem',
          fontWeight: 600,
          color: titleColor,
          letterSpacing: '0.02em',
        }}>
          {result.title}
        </div>
      </div>

      {/* Meter */}
      <div className="g3k-in-1 g3k-progress" style={{ margin: '0 4px' }}>
        <div className="g3k-progress-fill" style={{ width: `${percentage}%` }} />
      </div>

      {/* Reasons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <p className="g3k-in-2" style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.72rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          🔬 Scientific Reasoning
        </p>
        {result.reasons.map((reason, i) => (
          <div key={i} className={`g3k-card g3k-in-${i + 3}`}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.05rem', flexShrink: 0, marginTop: 2 }}>
                {['🧬', '📡', '💡'][i]}
              </span>
              <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.65, color: 'rgba(255,255,255,0.8)' }}>
                {reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Reset */}
      <div className="g3k-in-6" style={{ textAlign: 'center', paddingTop: 4 }}>
        <button className="g3k-btn" onClick={onReset}>
          SCAN AGAIN ↺
        </button>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.73rem', marginTop: 10 }}>
          100% fake · 100% fun · made with love 🏳️‍🌈
        </p>
      </div>

      {/* Thank the Developer / GitHub */}
      <div className="g3k-in-7" style={{ textAlign: 'center', marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', margin: 0, fontStyle: 'italic' }}>
          thank the developer & support the radar if you are a true gay
        </p>
        <a
          href="https://github.com/bugsNburgers"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 700,
            background: RAINBOW,
            backgroundSize: '200%',
            animation: 'g3k-shift 3s linear infinite',
            padding: '10px 24px',
            borderRadius: '999px',
            transition: 'transform 0.15s, box-shadow 0.15s',
            boxShadow: '0 0 15px rgba(155, 93, 229, 0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 0, 110, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(155, 93, 229, 0.25)';
          }}
        >
          <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          @bugsNburgers
        </a>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GaydarPage() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [score, setScore] = useState(0)
  const [percentage, setPercentage] = useState(0)
  const [result, setResult] = useState<GaydarResult | null>(null)
  const [msgIdx, setMsgIdx] = useState(0)
  const [displayPct, setDisplayPct] = useState(0)
  const [scanCount, setScanCount] = useState(0)

  // Initialize scan count from localStorage or set a realistic baseline
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gaydar_scan_count_v2')
      if (saved) {
        setScanCount(parseInt(saved, 10))
      } else {
        const baseline = 109
        localStorage.setItem('gaydar_scan_count_v2', String(baseline))
        setScanCount(baseline)
      }
    }
  }, [])

  // Cycle loading messages
  useEffect(() => {
    if (screen !== 'loading') return
    const id = setInterval(() => setMsgIdx(p => (p + 1) % LOADING_MESSAGES.length), 1300)
    return () => clearInterval(id)
  }, [screen])

  // Count-up animation for result percentage
  useEffect(() => {
    if (screen !== 'result') { setDisplayPct(0); return }
    let cur = 0
    const step = Math.max(1, Math.ceil(percentage / 40))
    const id = setInterval(() => {
      cur = Math.min(cur + step, percentage)
      setDisplayPct(cur)
      if (cur >= percentage) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [screen, percentage])

  const handleAnswer = async (points: number, answerText: string) => {
    const q = QUESTIONS[currentQ]
    const newAnswers: QuizAnswers = { ...answers, [q.id]: { answer: answerText, points } }
    const newScore = score + points

    setAnswers(newAnswers)
    setScore(newScore)

    if (currentQ + 1 >= QUESTIONS.length) {
      const pct = Math.round((newScore / MAX_SCORE) * 100)
      setPercentage(pct)
      setScreen('loading')

      try {
        const res = await fetch('/api/gaydar/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ percentage: pct, answers: newAnswers }),
        })
        const data = await res.json()
        setResult(data)
      } catch {
        setResult({
          title: 'Signal Lost (Dramatic)',
          reasons: [
            'The gaydar lost its Wi-Fi connection. Very on-brand.',
            'Our rainbow servers are experiencing feelings right now.',
            "Results inconclusive. But between us, the number says enough.",
          ],
        })
      }
      setScreen('result')
    } else {
      setCurrentQ(p => p + 1)
    }
  }

  const reset = () => {
    setScreen('landing')
    setCurrentQ(0)
    setAnswers({})
    setScore(0)
    setPercentage(0)
    setResult(null)
    setDisplayPct(0)
    setMsgIdx(0)
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="g3k-root">
        {/* Background orbs */}
        <div className="g3k-orb" style={{ width: 550, height: 550, background: '#9B5DE5', opacity: 0.13, top: '-18%', left: '-18%', animationDelay: '0s' }} />
        <div className="g3k-orb" style={{ width: 420, height: 420, background: '#FF006E', opacity: 0.10, bottom: '-12%', right: '-12%', animationDelay: '5s' }} />
        <div className="g3k-orb" style={{ width: 280, height: 280, background: '#06D6A0', opacity: 0.09, top: '45%', right: '8%', animationDelay: '9s' }} />

        <div className="g3k-content">
          {screen === 'landing' && (
            <LandingScreen
              scanCount={scanCount}
              onStart={() => {
                const nextCount = scanCount + 1
                if (typeof window !== 'undefined') {
                  localStorage.setItem('gaydar_scan_count_v2', String(nextCount))
                }
                setScanCount(nextCount)
                setScreen('quiz')
              }}
            />
          )}
          {screen === 'quiz' && (
            <QuizScreen
              question={QUESTIONS[currentQ]}
              questionIndex={currentQ}
              total={QUESTIONS.length}
              onAnswer={handleAnswer}
            />
          )}
          {screen === 'loading' && <LoadingScreen message={LOADING_MESSAGES[msgIdx]} />}
          {screen === 'result' && result && (
            <ResultScreen percentage={displayPct} result={result} scanCount={scanCount} onReset={reset} />
          )}
        </div>
      </div>
    </>
  )
}
