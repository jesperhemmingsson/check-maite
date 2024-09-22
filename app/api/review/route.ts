import OpenAI from 'openai';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
import { NextResponse } from 'next/server';

const ChessReview = z.object({
  strengths: z.array(z.string()),
  weaknessess: z.array(z.string()),
  struggling_openings: z.array(z.string()),
  games_study: z.array(z.string()),
  key_areas: z.array(z.string()),
})

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [{ role: "user", content: prompt }],
      response_format: zodResponseFormat(ChessReview, "chess_review")
    });

    const review = response.choices[0].message.content;
    console.log(review)

    return NextResponse.json({ review }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: `Failed to fetch review: ${error}` }, { status: 500 });
  }
//   const review = `
//   {
//   "strengths": [
//     "Effective use of tactical opportunities to create threats against the opponent's king, leading to checkmates.",
//     "Good understanding of piece activity, especially in the second game where you capitalized on the opponent's poor pawn structure.",
//     "Solid opening play that transitioned into favorable middlegame positions."
//   ],
//   "weaknessess": [
//     "In the first game, allowed Black to exchange pieces without immediate compensation, leading to a somewhat unclear position; focusing on retaining piece activity could improve outcomes.",
//     "In the second game, you sometimes left your king too exposed during the opening. Avoid unnecessary king movement early on.",
//     "Overreliance on tactical shots rather than improving position and development, particularly in early moves. For example, you could develop your pieces more harmoniously instead of making pawn moves that create weaknesses.",
//     "Falling into time trouble can lead to hasty decisions. Ensure you're keeping track of the time and playing at a controlled pace.",
//     "Neglecting to anticipate threats, such as in the second game where you allowed a quick checkmate setup due to misplaced pieces."
//   ],
//   "struggling_openings": [
//     "Saragossa Opening (1.c3), struggled against early pawn thrusts that disrupted your development and control of the center.",
//     "The Zukertort Variation opened lines for enemy rook activity, leading to tactical threats that weren't effectively countered."
//   ],
//   "games_study": [
//     "Kasparov vs. Kramnik, World Championship 2000 - Focus on strategic piece placement and how to create unbalance in the position.",
//     "Fischer vs. Spassky, World Championship 1972 - Study the central control and how to capitalize on development advantage."
//   ],
//   "key_areas": [
//     "Improve opening repertoire and understand the opening principles better to avoid early vulnerabilities.",
//     "Enhance tactical calculation to avoid overlooking threats from your opponents.",
//     "Work on time management during games to prevent falling into time pressure.",
//     "Develop a more cohesive strategy in the middlegame rather than focusing solely on tactics."
//   ]
// }
//   `
//   await new Promise(resolve => setTimeout(resolve, 3000));
//   return NextResponse.json({ review }, { status: 200 })
}