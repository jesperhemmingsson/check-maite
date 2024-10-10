import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { NextResponse } from 'next/server';

const ChessReview = z.object({
  strengths: z.array(z.string()),
  weaknessess: z.array(z.string()),
  struggling_openings: z.array(z.string()),
  games_study: z.array(z.string()),
  books: z.array(z.string()),
  key_areas: z.array(z.string()),
})

export const maxDuration=60;

export async function POST(request: Request) {
  const { prompt, openAIKey } = await request.json();

  if (!openAIKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey: openAIKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [{ role: "user", content: prompt }],
      response_format: zodResponseFormat(ChessReview, "chess_review")
    });

    const review = response.choices[0].message.content;

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: `Failed to fetch review: ${error}` }, { status: 500 });
  }
}