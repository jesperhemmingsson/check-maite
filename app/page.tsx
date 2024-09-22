"use client";

import { GameProvider } from "./context/GameContext";
import FetchGamesButton from "./components/FetchGamesButton";
import VisualizeGames from "./components/VisualizeGames";
import ReviewComponent from "./components/ReviewComponent";

export default function Home() {
  return (
    <div>
      <GameProvider>
        <FetchGamesButton />
        <VisualizeGames />
        <ReviewComponent />
      </GameProvider>
    </div>
  );
}
