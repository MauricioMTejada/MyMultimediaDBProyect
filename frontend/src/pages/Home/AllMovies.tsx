// src/components/AllMovies.tsx
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import { Movie, Country } from '../../types/types';
import { api } from '../../utils/apiConfig';

const AllMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [allCountries, setAllCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [moviesResponse, countriesResponse] = await Promise.all([
                    api.get<Movie[]>('/movies'),
                    api.get<Country[]>('/countries'),
                ]);

                setMovies(moviesResponse.data);
                setAllCountries(countriesResponse.data);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'Ocurrió un error desconocido.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
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
			{movies.length > 0 && (
				<Table
					data={movies}
					countries={allCountries}
					onCountryChange={handleCountryChange}
					isAssociated={true}
				/>
			)}
		</div>
	);
};

export default AllMovies;
