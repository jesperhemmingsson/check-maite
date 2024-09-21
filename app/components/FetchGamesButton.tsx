import { useContext, useState } from "react";
import { GameContext } from "../context/GameContext";

export default function FetchGamesButton() {
  const { fetchGames } = useContext(GameContext);
  const [username, setUsername] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");

  const handleFetchGames = () => {
    fetchGames(username, year, month);
  };

  return (
    <div>
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
      <button
        onClick={handleFetchGames}
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
      >
        Fetch Data
      </button>
    </div>
  );
}