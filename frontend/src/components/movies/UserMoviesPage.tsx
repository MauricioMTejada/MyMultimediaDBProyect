// src/components/movies/UserMoviesPage.tsx
import React, { useState, useEffect } from 'react';
import UserMovieTable from './UserMovieTable';
import MovieTable from './MovieTable';
import { API_BASE_URL } from '../../utils/apiConfig';
import { Movie } from '../../types/types';

// Interfaz para los datos de UserMovie
interface UserMovie {
  id: number;
  userId: number;
  movieId: number;
  watched: 'Si' | 'No' | 'Viendo';
  watchedDate: Date | null;
  rewatchedDate: Date[] | null;
  type: 'Película' | 'Serie' | 'Documental';
  note: string | null;
  recommendationSource: string | null;
  selectOriginalTitle: boolean;
  // ... otros campos de UserMovie
}

const UserMoviesPage: React.FC = () => {
  const [userMovies, setUserMovies] = useState<UserMovie[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const userId = 1;

  useEffect(() => {
    const fetchUserMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}/user-movies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: UserMovie[] = await response.json();
        setUserMovies(data);

        const movieIds = data.map((userMovie: UserMovie) => userMovie.movieId);

        const moviesPromises = movieIds.map(async (movieId: number) => {
          const movieResponse = await fetch(`${API_BASE_URL}/movies/${movieId}`);
          if (!movieResponse.ok) {
            throw new Error(`HTTP error! status: ${movieResponse.status}`);
          }
          return movieResponse.json();
        });

        const moviesData: Movie[] = await Promise.all(moviesPromises);
        setMovies(moviesData);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserMovies();
  }, [userId]);

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Datos de UserMovie del Usuario</h2>
      <div className="flex space-x-4">
        <div className="w-1/2">
          {userMovies.length > 0 && <UserMovieTable userMovies={userMovies} />}
        </div>
        <div className="w-1/2">
          {movies.length > 0 && <MovieTable data={movies} />}
        </div>
      </div>
    </div>
  );
};

export default UserMoviesPage;
