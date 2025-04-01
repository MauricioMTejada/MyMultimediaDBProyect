// src/components/AllMovies.tsx
import React, { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import { Movie } from '../../types/types';
import { fetchMovies } from '../../services/movieService';
import { useAppSelector } from '../../hooks';

const AllMovies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const movieIdsOfUser = useAppSelector((state) => state.userMovie.movieIdsOfUser); // Obtener los movieIds del usuario

    // console.log('AllMovies.tsx - movieIdsOfUser:', movieIdsOfUser); // Imprimir los movieIds para depuración

    // Solicita los datos de las películas y los países al cargar el componente
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [moviesData] = await Promise.all([
                    fetchMovies(),
                ]);

                // Agregar la propiedad isAssociated a cada película
                const moviesWithAssociation = moviesData.map((movie) => {
                    const isAssociated = movieIdsOfUser.includes(movie.id);
                    return {
                        ...movie,
                        isAssociated, // Verificar si el movieId está en movieIdsOfUser
                    };
                });

                setMovies(moviesWithAssociation);
            } catch (err: any) {
                setError(err.response?.data?.message || err.message || 'Ocurrió un error desconocido.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [movieIdsOfUser]);

    if (isLoading) {
        return <p>Cargando películas...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    // console.log('AllMovies.tsx - Películas:', movies); // Imprimir las películas para depuración

    // Envía los datos de las películas y los países a la tabla
    return (
		<div className="w-full">
			{movies.length > 0 && <Table data={movies} />}
		</div>
	);
};

export default AllMovies;
