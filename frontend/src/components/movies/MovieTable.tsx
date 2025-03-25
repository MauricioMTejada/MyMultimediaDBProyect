// src/components/movies/MovieTable.tsx
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import { API_BASE_URL } from '../../utils/apiConfig';
import { Movie, Country } from '../../types/types';
import { useAppDispatch } from '../../redux/hooks';
import { fetchInitialAssociations } from '../../redux/slices/movieAssociationSlice';

const MovieTable: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const userId = 1; // ID del usuario (debería obtenerse dinámicamente)
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const moviesResponse = await fetch(`${API_BASE_URL}/movies`);
                if (!moviesResponse.ok) {
                    throw new Error(`HTTP error! status: ${moviesResponse.status}`);
                }
                const moviesData: Movie[] = await moviesResponse.json();
                setMovies(moviesData);

                // Fetch de los paises
                const countriesResponse = await fetch(`${API_BASE_URL}/countries`);
                if (!countriesResponse.ok) {
                    throw new Error(`HTTP error! status: ${countriesResponse.status}`);
                }
                const countriesData: Country[] = await countriesResponse.json();
                setCountries(countriesData);
                dispatch(fetchInitialAssociations(userId));
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dispatch, userId]);

    const handleCountryChange = (_rowIndex: number, _newCountryId: number | undefined) => {
        // Aquí puedes usar rowIndex y newCountryId si los necesitas
    };

    if (isLoading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Tabla de Películas</h2>
            {movies.length > 0 && (
                <Table
                    data={movies}
                    countries={countries}
                    onCountryChange={handleCountryChange}
                    isAssociated={true}
                />
            )}
        </div>
    );
};

export default MovieTable;
