// src/components/AllMovies.tsx
import React, { useState, useEffect } from 'react';
import Table from './Table/Table';
import { Movie, Country } from '../types/types';
import { API_BASE_URL } from '../utils/apiConfig';

const AllMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [allCountries, setAllCountries] = useState<Country[]>([]);

    const fetchCountries = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/countries`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAllCountries(data);
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
                const response = await fetch(`${API_BASE_URL}/movies`);
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

    const handleCountryChange = (rowIndex: number, countryId: number | undefined) => {
        setMovies(prevMovies => {
            const newMovies = [...prevMovies];
            newMovies[rowIndex].countryId = countryId;
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
            {movies.length > 0 && <Table data={movies} countries={allCountries} onCountryChange={handleCountryChange} isAssociated={true} />}
        </div>
    );
};

export default AllMovies;
