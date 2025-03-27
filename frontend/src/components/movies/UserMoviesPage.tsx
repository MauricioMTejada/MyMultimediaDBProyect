// src/components/movies/UserMoviesPage.tsx
import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import { API_BASE_URL } from '../../utils/apiConfig';
import { CombinedMovieData, Country } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setInitialWatchedStatus } from '../../redux/slices/userMovieSlice';

const UserMoviesPage: React.FC = () => {
    const [combinedData, setCombinedData] = useState<CombinedMovieData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const userId = useAppSelector((state) => state.auth.userId); // Obtener el userId de Redux
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/users/${userId}/movies`); // Ruta corregida
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: CombinedMovieData[] = await response.json();
                setCombinedData(data);

                // Inicializar el estado de watchedStatus en Redux
                const initialWatchedStatus: { [userMovieId: number]: string } = {};
                data.forEach(userMovie => {
                    initialWatchedStatus[userMovie.userMovieId] = userMovie.watched;
                });
                dispatch(setInitialWatchedStatus(initialWatchedStatus));

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
    }, [userId, dispatch]); // Dependencia userId

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
                    hideIdColumn={true} // Indicamos que se oculte la columna "id"
                />
            )}
        </div>
    );
};

export default UserMoviesPage;
