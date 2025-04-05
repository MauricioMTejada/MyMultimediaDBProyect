// src/components/AllMovies.tsx
import React, { useState, useEffect, useRef } from 'react';
import Table from '../../components/Table/Table';
import { Movie } from '../../types/types';
import { fetchMovies } from '../../services/movieService';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMoviesThunk } from '../../redux/slices/moviesSlice';

const AllMovies: React.FC = () => {
    // const [movies, setMovies] = useState<Movie[]>([]);
    // const [isLoading, setIsLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    // const { movies, isLoading, error } = useAppSelector((state) => state.movies);
    const { movieIdsOfUser } = useAppSelector((state) => state.userMovie); // Obtener los movieIds del usuario
    const dispatch = useAppDispatch();

    // Ref para rastrear el valor anterior de isLoading
    // const prevIsLoading = useRef<boolean>(isLoading);

    // Ref para rastrear si movies.length cambió primero
    const moviesLengthChanged = useRef(false);

    // Estado que se alterera cuando isLoading pase de true a false
    const [isLoadingFromTrueToFalse, setIsLoadingFromTrueToFalse] = useState<boolean>(false);

    // console.log(`Renderizando AllMovies.tsx**************************************************`);

    // const movieIdsOfUser = useAppSelector((state) => state] =

    // console.log('AllMovies.tsx - movieIdsOfUser:', movieIdsOfUser); // Imprimir los movieIds para depuración

    // Solicita los datos de las películas y los países al cargar el componente

    // crear un Thunk para solicitar las películas, y el useEffect dependerá de la finalización del estado de carga de las películas
/*     useEffect(() => {
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
    // }, [movieIdsOfUser]);
    }, []); */

    // useEffect(() => {
    //     dispatch(fetchMoviesThunk());
    //     console.log(`Películas cargadas: ${movies}`);
    //   }, [dispatch]);

    // Detectar cuando isLoading pasa de true a false
    /* useEffect(() => {
        if (prevIsLoading.current && !isLoading) {
        console.log('Películas cargadas exitosamente:', movies);
        setIsLoadingFromTrueToFalse(!isLoadingFromTrueToFalse)
        console.log(`isLoadingFromTrueToFalse: ${isLoadingFromTrueToFalse}`);
        // Aquí puedes realizar cualquier acción adicional
        }
        prevIsLoading.current = isLoading; // Actualizar el valor anterior
        console.log(`isLoading: ${isLoading}`);
        console.log(`prevIsLoading.current: ${prevIsLoading.current}`);
    }, [isLoading]); // Solo depende de isLoading */

    // Detectar cambios en movies.length y movieIdsOfUser en el orden correcto
    /* useEffect(() => {
        if (!moviesLengthChanged.current && movies.length > 0) {
        // Si movies.length cambió primero, marcamos la referencia
        moviesLengthChanged.current = true;
        } else if (moviesLengthChanged.current && movieIdsOfUser.length > 0) {
        // Si movieIdsOfUser cambió después de movies.length, ejecutamos la lógica
        console.log('movies.length cambió primero y luego movieIdsOfUser');
        console.log('Películas:', movies);
        console.log('movieIdsOfUser:', movieIdsOfUser);
        setIsLoadingFromTrueToFalse(!isLoadingFromTrueToFalse);

        // Reiniciar la referencia para esperar el próximo ciclo
        moviesLengthChanged.current = false;
        }
    }, [movies.length, movieIdsOfUser]); */

    // if (isLoading) {
    //     return <p>Cargando películas...</p>;
    // }

    // if (error) {
    //     return <p>Error: {error}</p>;
    // }

    // console.log('AllMovies.tsx - Películas:', movies); // Imprimir las películas para depuración

    // Envía los datos de las películas y los países a la tabla
    useEffect(() => {
        dispatch(fetchMoviesThunk()); // Asegurarse de despachar la acción para cargar las películas
        console.log("AllMovies.tsx - Despachando fetchMoviesThunk");
    }, [dispatch]);

    return (
		<div className="w-full">
			{/* {movies.length > 0 && <Table data={movies} />} */}
			{<Table/>}
		</div>
	);
};

export default AllMovies;
