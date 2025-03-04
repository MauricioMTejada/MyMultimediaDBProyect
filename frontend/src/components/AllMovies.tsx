// src/components/AllMovies.tsx
import React, { useState, useEffect } from 'react';
import Table from './Table';
import { Movie, Country } from '../types/types'; // Asegúrate de que esta interfaz exista y esté bien definida
import { API_BASE_URL } from '../utils/apiConfig'; // Importar la constante

const AllMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [allCountries, setAllCountries] = useState<Country[]>([]); // Agrega el estado para los paises.

    const fetchCountries = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/countries`); // Utilizar API_BASE_URL, y eliminar /api
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllCountries(data); // guarda los paises en el estado.
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred while fetching countries.');
        }
    };

    useEffect(() => {
        fetchCountries()
    },[])

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/movies`); // Utilizar API_BASE_URL, y eliminar /api
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setMovies(data);
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    //funcion que actualiza el estado de la pelicula.
    const handleCountryChange = (rowIndex: number, countryId: number | undefined) => { //cambia el tipo de dato del parametro
        setMovies(prevMovies => {
            const newMovies = [...prevMovies];
            newMovies[rowIndex].countryId = countryId; // ya puede ser undefined
            return newMovies;
        });
    };

    if (isLoading) {
        return <p>Cargando películas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-full">
            {/* Si existe data de peliculas, renderiza la tabla. */}
            {movies.length > 0 && <Table data={movies} countries={allCountries} onCountryChange={handleCountryChange} />}
        </div>
    );
};

export default AllMovies;
