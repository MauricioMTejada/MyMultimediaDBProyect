// src/pages/UserMoviesPage/UserMoviesPage.tsx
import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import { Country } from '../../types/types';
import { useAppSelector } from '../../redux/hooks';
import { fetchCountries } from '../../services/userMovieService';

const UserMoviesPage: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (isLoggedIn) {
                    // Fetch de los países
                    const countriesData: Country[] = await fetchCountries();
                    setCountries(countriesData);
                }
            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    if (isLoading) {
        return <p>Cargando datos...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Datos Combinados de Películas y UserMovie</h2>
            <Table />
        </div>
    );
};

export default UserMoviesPage;
