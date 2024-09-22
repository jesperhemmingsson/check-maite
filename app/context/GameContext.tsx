import React, { useContext, createContext, useState } from "react";

interface GameProviderProps {
  children: React.ReactNode;
}

type gameContextType = {
  games: any[];
  filteredGames: any[];
  setFilteredGames: React.Dispatch<React.SetStateAction<any[]>>;
  fetchGames: (username: string, year: string, month: string) => void;
};

const gameContextDefaultValues: gameContextType = {
  games: [],
  filteredGames: [],
  setFilteredGames: () => {},
  fetchGames: () => {},
};

export const GameContext = createContext<gameContextType>(gameContextDefaultValues);

export const useGameContext = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }: GameProviderProps) => {
  const [games, setGames] = useState<any[]>([]);
  const [filteredGames, setFilteredGames] = useState<any[]>([]);

  const fetchGames = async (username: string, year: string, month: string) => {
    const response = await fetch(
      `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
    );
    const data = await response.json();
    setGames(data.games);
  };

  return (
    <GameContext.Provider value={{ games, filteredGames, setFilteredGames, fetchGames }}>
      {children}
    </GameContext.Provider>
  );
};