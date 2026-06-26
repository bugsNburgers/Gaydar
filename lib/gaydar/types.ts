export type Screen = 'landing' | 'quiz' | 'loading' | 'result'

export interface Option {
  text: string
  points: number
}

export interface Question {
  id: string
  emoji: string
  text: string
  options: Option[]
}

export interface QuizAnswers {
  [questionId: string]: {
    answer: string
    points: number
  }
}

export interface GaydarResult {
  title: string
  reasons: string[]
}
