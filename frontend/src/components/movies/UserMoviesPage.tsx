// src/components/movies/UserMoviesPage.tsx
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import { API_BASE_URL } from '../../utils/apiConfig';
import { Movie, CombinedMovieData, UserMovie, Country } from '../../types/types';

const UserMoviesPage: React.FC = () => {
  const [combinedData, setCombinedData] = useState<CombinedMovieData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const userId = 1;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const userMoviesResponse = await fetch(`${API_BASE_URL}/users/${userId}/user-movies`);
        if (!userMoviesResponse.ok) {
          throw new Error(`HTTP error! status: ${userMoviesResponse.status}`);
        }
        const userMoviesData: UserMovie[] = await userMoviesResponse.json();

        const moviesPromises = userMoviesData.map(async (userMovie) => {
          const movieResponse = await fetch(`${API_BASE_URL}/movies/${userMovie.movieId}`);
          if (!movieResponse.ok) {
            throw new Error(`HTTP error! status: ${movieResponse.status}`);
          }
          const movieData: Movie = await movieResponse.json();
          return {
            ...movieData,
            userMovieId: userMovie.id,
            userId: userMovie.userId,
            watched: userMovie.watched,
            watchedDate: userMovie.watchedDate,
            rewatchedDate: userMovie.rewatchedDate,
            type: userMovie.type,
            note: userMovie.note,
            recommendationSource: userMovie.recommendationSource,
            selectOriginalTitle: userMovie.selectOriginalTitle,
          } as CombinedMovieData;
        });

        const combinedMoviesData: CombinedMovieData[] = await Promise.all(moviesPromises);
        setCombinedData(combinedMoviesData);

        // Fetch de los paises
        const countriesResponse = await fetch(`${API_BASE_URL}/countries`);
        if (!countriesResponse.ok) {
          throw new Error(`HTTP error! status: ${countriesResponse.status}`);
        }
        const countriesData: Country[] = await countriesResponse.json();
        setCountries(countriesData);

      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleCountryChange = (rowIndex: number, newCountryId: number | undefined) => {
    console.log(`Cambiando el país de la fila ${rowIndex} a ${newCountryId}`);
  };

  if (isLoading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Datos Combinados de Películas y UserMovie</h2>
      {combinedData.length > 0 && (
        <Table
          data={combinedData}
          countries={countries}
          onCountryChange={handleCountryChange}
        />
      )}
    </div>
  );
};

export default UserMoviesPage;
