export interface Question {
  id: number
  text: string
}

export interface RecordedAnswer {
  questionId: number
  videoBlob: Blob
  durationSeconds: number
}
