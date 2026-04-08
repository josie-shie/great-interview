import Anthropic from "@anthropic-ai/sdk";
import dayjs from "dayjs";
import type { Question } from "../types";

const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface CacheEntry {
  questions: Question[];
  expiresAt: string;
}

function getCache(key: string): Question[] | null {
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const entry: CacheEntry = JSON.parse(raw);
  if (dayjs().isAfter(dayjs(entry.expiresAt))) {
    localStorage.removeItem(key);
    return null;
  }
  return entry.questions;
}

function setCache(key: string, questions: Question[]) {
  const entry: CacheEntry = {
    questions,
    expiresAt: dayjs().add(1, "day").toISOString(),
  };
  localStorage.setItem(key, JSON.stringify(entry));
}

async function fetchQuestions(jobTitle: string, jobLevel: string): Promise<Question[]> {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [
      {
        role: "user",
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
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return JSON.parse(content.text) as Question[];
}

export async function generateQuestions(
  jobTitle: string,
  jobLevel: string,
): Promise<Question[]> {
  const cacheKey = `questions__${jobLevel}__${jobTitle}`;
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const questions = await fetchQuestions(jobTitle, jobLevel);
  setCache(cacheKey, questions);
  return questions;
}
