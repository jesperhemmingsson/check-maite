import { useContext, useState, useEffect } from "react";
import { useGameContext, GameContext } from "../context/GameContext";
import TimeControlCheckboxes from "./TimeControlCheckboxes";

export default function VisualizeGames() {
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
      <TimeControlCheckboxes
        selectedTypes={selectedTypes}
        onCheckboxChange={handleCheckboxChange}
      />
      {filteredGames && filteredGames.length > 0 ? (
        <p>Found {filteredGames.length} games</p>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}