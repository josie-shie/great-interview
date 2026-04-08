import Anthropic from '@anthropic-ai/sdk'
import type { Question } from '../types'

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export async function generateQuestions(jobTitle: string, jobLevel: string): Promise<Question[]> {
  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are an experienced interviewer. Generate 5 interview questions for a "${jobLevel} ${jobTitle}" position.

Return ONLY a valid JSON array with this exact format, no explanation:
[
  { "id": 1, "text": "question here" },
  { "id": 2, "text": "question here" },
  { "id": 3, "text": "question here" },
  { "id": 4, "text": "question here" },
  { "id": 5, "text": "question here" }
]`,
      },
    ],
  })

  const content = response.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response type')

  return JSON.parse(content.text) as Question[]
}
