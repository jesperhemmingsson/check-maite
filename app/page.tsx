"use client";

import { useState } from "react";
import { GameProvider } from "./context/GameContext";
import FetchGames from "./components/FetchGames";
import VisualizeGames from "./components/VisualizeGames";
import ReviewComponent from "./components/ReviewComponent";

export default function Home() {
  const [view, setView] = useState<"form" | "games" | "review">("form");
  const [openAIKey, setOpenAIKey] = useState<string>("");
  const [reviewKey, setReviewKey] = useState<number>(0);

  const handleFetchGames = () => setView("games");
  const handleGenerateReview = () => {
    setReviewKey(prevKey => prevKey + 1);
    setView("review");
  };

  return (
    <div className="home-container">
      <h1 onClick={() => setView("form")}>check-m[ai]te</h1>
      <GameProvider>
        {view === "form" && <FetchGames onFetchGames={handleFetchGames} />}
        {view === "games" && (
          <>
            <VisualizeGames openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
            <button onClick={handleGenerateReview}>Generate Review</button>
          </>
        )}
        {view === "review" && <ReviewComponent key={reviewKey} openAIKey={openAIKey} />}
      </GameProvider>
    </div>
  );
}