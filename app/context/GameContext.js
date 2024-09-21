import React, { createContext, useState } from "react";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
 const [games, setGames] = useState(null);

  const fetchGames = async (username, year, month) => {
    const response = await fetch(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`);
    const data = await response.json();
    setGames(data.games);
  };

  return (
    <GameContext.Provider value={{ games, fetchGames }}>
      {children}
    </GameContext.Provider>
  );
};