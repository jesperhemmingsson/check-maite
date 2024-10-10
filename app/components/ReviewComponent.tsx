import { useGameContext } from "../context/GameContext";
import { useState, useEffect, useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface ReviewComponentProps {
  openAIKey: string;
}

const getReview = async (prompt: string, openAIKey: string) => {
  const response = await fetch('/api/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, openAIKey }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch review');
  }

  const data = await response.json();
  return data.review;
};

const generatePrompt = (all_pgn: string[]) => `
  You are going to act as my chess coach. You are going to be presented with all of my latest chess games. I am looking for critical feedback in order to improve my game.

  What are the most important things I should work on to improve?
  -Why am I winning games?
  -Why am I losing games? (Here I want an extensive review with very specific examples and clear ideas for improvement)
  
  -Are there any specific openings I am struggling against?
  
  -What famous chess games should I look at for learning more about these aspects I need to improve in?

  -What chess books should I read?
  
  I want the feedback to be closely linked to the games I played. Please reference the games whenever fitting.
  Give your feedback in a structured json format corresponding to the points above like this:
  
  {
    "strengths": ["...", "..."], # Bullet points reasons why I am winning
    "weaknessess": ["...", "...", "..."], # Bullet points reasons why I am losing. Very extensive list
    "struggling_openings": ["..", "...", "...."], # List of openings I am struggling against and what seems hard about them for me
    "games_study": ["...", "...."], # Famous chess games to study for learning and what they are intended to learn me
    "book": ["..", ".."], # Chess books I should read
    "key_areas": ["...", "..."] # Bullet points on the summarized key areas I should work on to improve
  }
  
  Even if the output is going to be json I still want all answers to be thorough, detailed and extensive. Don't make it shorter just because it is in json.

  ONLY output json. No other text. No markdown. ONLY the json output.
  ---------- GAMES -----------
  ${all_pgn.join("\n")}

  ----------------------------
  Remember to ONLY output the the structured json. No markdown or any text added besides the json.
`;

const ReviewDisplay = ({ review }: { review: string }) => {
  if (review === ""){
    return ""
  }
  const reviewObject = JSON.parse(review);
  return (
    <div>
      {Object.keys(reviewObject).map((key) => (
        <div key={key}>
          <h2>{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.replace(/_/g, ' ').slice(1)}</h2>
          <ul>
            {reviewObject[key].map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default function ReviewComponent({ openAIKey }: ReviewComponentProps) {
  const { filteredGames } = useGameContext();
  const [reviewState, setReviewState] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const hasGeneratedReview = useRef<boolean>(false);

  useEffect(() => {
    const generateReview = async () => {
      if (!filteredGames || filteredGames.length === 0 || hasGeneratedReview.current) {
        setLoading(false);
        return;
      }

      setError(false);
      setLoading(true);
      const all_pgn = filteredGames.map((game) => game.pgn);
      const prompt = generatePrompt(all_pgn);
      try {
        const review = await getReview(prompt, openAIKey);
        setReviewState(review);
        hasGeneratedReview.current = true;
      } catch (error) {
        console.error('Error generating review:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    generateReview();
  }, []); 

  return (
    <div className="container">
      {loading && <LoadingSpinner />}
      {!loading && reviewState && <ReviewDisplay review={reviewState} />}
      {error && 
        <p>⚠️ Error when generating review. Refresh and make sure openai key is valid ⚠️</p>
      }
    </div>
  );
}