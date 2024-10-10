import { useState } from "react";
import { useGameContext } from "../context/GameContext";

export default function FetchGames({ onFetchGames }: { onFetchGames: () => void }) {
  const { fetchGames } = useGameContext();
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleFetchGames = () => {
    fetchGames(username, year, month);
    onFetchGames();
  };

  return (
    <div className="fetch-games-container">
      <p>Enter your chess.com username, the year and month of the games you want to analyze below:</p>
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
        Load games 
      </button>
    </div>
  );
}