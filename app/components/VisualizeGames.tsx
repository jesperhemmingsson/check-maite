import { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";
import TimeControlCheckboxes from "./TimeControlCheckboxes";

interface VisualizeGamesProps {
  openAIKey: string;
  setOpenAIKey: React.Dispatch<React.SetStateAction<string>>;
}

export default function VisualizeGames({ openAIKey, setOpenAIKey }: VisualizeGamesProps) {
  const { games, filteredGames, setFilteredGames } = useGameContext();
  const [selectedTypes, setSelectedTypes] = useState({
    bullet: true,
    blitz: true,
    rapid: true,
  });

  type TimeControl = "bullet" | "blitz" | "rapid";

  const handleCheckboxChange = (type: TimeControl) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  useEffect(() => {
    const filteredGames = games?.filter(
      (game: { time_class: keyof typeof selectedTypes }) =>
        selectedTypes[game.time_class]
    );
    setFilteredGames(filteredGames);
  }, [games, selectedTypes, setFilteredGames]);

  return (
    <div className="container">
      <h3>Time controls</h3>
      <p>Select the time control(s) you want to analyze</p>
      <TimeControlCheckboxes
        selectedTypes={selectedTypes}
        onCheckboxChange={handleCheckboxChange}
      />
      {filteredGames && filteredGames.length > 0 ? (
        <p>Found {filteredGames.length} games</p>
      ) : (
        <p>No games found</p>
      )}
      <h3>OpenAI key</h3>
      <input
        type="password"
        placeholder="Enter OpenAI Key"
        value={openAIKey}
        onChange={(e) => setOpenAIKey(e.target.value)}
      />
    </div>
  );
}