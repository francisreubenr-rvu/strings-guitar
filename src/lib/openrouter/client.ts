import OpenAI from 'openai'

export function createOpenRouterClient() {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY!,
    defaultHeaders: {
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
      'X-Title': 'Strings Guitar Learning',
    },
  })
}

export const TUTOR_MODEL = 'google/gemma-3-12b-it:free'
export const CURRICULUM_MODEL = 'mistralai/mistral-7b-instruct:free'
