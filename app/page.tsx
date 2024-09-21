"use client";

import { GameProvider } from "./context/GameContext";
import FetchGamesButton from "./components/FetchGamesButton";
import VisualizeGames from "./components/VisualizeGames";

export default function Home() {
  return (
    <div>
      <GameProvider>
        <FetchGamesButton />
        <VisualizeGames />
      </GameProvider>
    </div>
  );
}
