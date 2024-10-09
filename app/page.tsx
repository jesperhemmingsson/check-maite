"use client";

import { GameProvider } from "./context/GameContext";
import FetchGamesButton from "./components/FetchGamesButton";
import VisualizeGames from "./components/VisualizeGames";
import ReviewComponent from "./components/ReviewComponent";

export default function Home() {
  return (
    <div className="home-container">
      <GameProvider>
        <div className="sidebar">
          <FetchGamesButton />
        </div>
        <div className="main-content">
          <VisualizeGames />
          <ReviewComponent />
        </div>
      </GameProvider>
    </div>
  );
}