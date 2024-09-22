import { useState } from "react";
import { useGameContext } from "../context/GameContext";

export default function FetchGamesButton() {
  const { fetchGames } = useGameContext();
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleFetchGames = () => {
    fetchGames(username, year, month);
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
      />
      <button onClick={handleFetchGames}>
        Fetch Data
      </button>
    </div>
  );
}