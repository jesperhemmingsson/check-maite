"use client";

import { useState } from "react";
import { GameProvider } from "./context/GameContext";
import FetchGames from "./components/FetchGames";
import VisualizeGames from "./components/VisualizeGames";
import ReviewComponent from "./components/ReviewComponent";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const [view, setView] = useState<"form" | "games" | "review" | "loading">("form");
  const [openAIKey, setOpenAIKey] = useState<string>(""); // State for OpenAI key

  const handleFetchGames = () => {
    setView("games");
  };

  const handleGenerateReview = async () => {
    setView("review");
  };

  return (
    <div className="home-container">
      <h1>chess-maite</h1>
      <GameProvider>
        {view === "form" && <FetchGames onFetchGames={handleFetchGames} />}
        {view === "games" && (
          <>
            <VisualizeGames openAIKey={openAIKey} setOpenAIKey={setOpenAIKey} />
            <button onClick={handleGenerateReview}>Generate Review</button>
            {view === "loading" && <LoadingSpinner />} 
          </>
        )} 
        {view === "loading" && <LoadingSpinner />}
        {view === "review" && (
          <>
            <ReviewComponent openAIKey={openAIKey} />
          </>
        )}
      </GameProvider>
    </div>
  );
}