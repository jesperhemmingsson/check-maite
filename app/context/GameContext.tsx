import React, { createContext, useState, ReactNode, useContext } from "react";
import { useGames } from "../hooks/useGames";

interface Game {
  id: string;
  time_class: 'bullet' | 'blitz' | 'rapid';
  pgn: string;
}

interface GameContextType {
  games: Game[];
  filteredGames: Game[];
  setFilteredGames: React.Dispatch<React.SetStateAction<Game[]>>;
  fetchGames: (username: string, year: string, month: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { games, loading, error, fetchGames } = useGames();
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);

  return (
    <GameContext.Provider 
      value={{ 
        games, 
        filteredGames, 
        setFilteredGames, 
        fetchGames,
        loading,
        error
      }}
    >
      {children}
    </GameContext.Provider>
  );
};