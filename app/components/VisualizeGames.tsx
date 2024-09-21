import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

export default function VisualizeGames() {
  const { games } = useContext(GameContext);
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

  const filteredGames = games?.filter((game: { time_class: keyof typeof selectedTypes}) => selectedTypes[game.time_class]);

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedTypes.bullet}
            onChange={() => handleCheckboxChange("bullet")}
          />
          Bullet
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedTypes.blitz}
            onChange={() => handleCheckboxChange("blitz")}
          />
          Blitz
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedTypes.rapid}
            onChange={() => handleCheckboxChange("rapid")}
          />
          Rapid
        </label>
      </div>
      {filteredGames && filteredGames.length > 0 ? (
        <pre>{JSON.stringify(filteredGames, null, 2)}</pre>
      ) : (
        <p>No games found</p>
      )}
    </div>
  );
}