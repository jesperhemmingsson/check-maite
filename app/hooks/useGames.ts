import { useState } from 'react';

export const useGames = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = async (username: string, year: string, month: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      const data = await response.json();
      setGames(data.games);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { games, loading, error, fetchGames };
};