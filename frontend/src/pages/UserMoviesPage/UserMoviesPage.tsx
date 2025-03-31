// src/pages/UserMoviesPage/UserMoviesPage.tsx
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import { CombinedMovieData, Country } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setInitialWatchedStatus } from '../../redux/slices/userMovieSlice';
import { fetchUserMovies, fetchCountries } from '../../services/userMovieService';

const UserMoviesPage: React.FC = () => {
    const [combinedData, setCombinedData] = useState<CombinedMovieData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [countries, setCountries] = useState<Country[]>([]);
    const token = useAppSelector((state) => state.auth.token); // Obtener el token de Redux
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (token) { // Comprobar si hay token
                    const data: CombinedMovieData[] = await fetchUserMovies(token); // Pasar el token a fetchUserMovies
                    setCombinedData(data);

                    // Inicializar el estado de watchedStatus en Redux
                    const initialWatchedStatus: { [userMovieId: number]: string } = {};
                    data.forEach(userMovie => {
                        initialWatchedStatus[userMovie.userMovieId] = userMovie.watched;
                    });
                    dispatch(setInitialWatchedStatus(initialWatchedStatus));
                } else {
                    setCombinedData([]); // Si no hay token, no hay datos
                }

                // Fetch de los paises
                const countriesData: Country[] = await fetchCountries();
                setCountries(countriesData);

            } catch (err: any) {
                setError(err.message || 'An unknown error occurred.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token, dispatch]); // Dependencia token

    const handleCountryChange = (rowIndex: number, newCountryId: number | undefined) => {
        // console.log(`Cambiando el país de la fila ${rowIndex} a ${newCountryId}`);
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
