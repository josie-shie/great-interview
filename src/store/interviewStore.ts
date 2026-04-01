import { create } from 'zustand'
import type { Question, RecordedAnswer } from '../types'

interface InterviewStore {
  questions: Question[]
  currentIndex: number
  answers: RecordedAnswer[]
  setQuestions: (questions: Question[]) => void
  nextQuestion: () => void
  addAnswer: (answer: RecordedAnswer) => void
  reset: () => void
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  questions: [],
  currentIndex: 0,
  answers: [],
  setQuestions: (questions) => set({ questions }),
  nextQuestion: () => set((state) => ({ currentIndex: state.currentIndex + 1 })),
  addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
  reset: () => set({ currentIndex: 0, answers: [] }),
}))
