import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { MovieWithUserMovie } from "../types/types";

const useTableData = (pathname: string): MovieWithUserMovie[] => {
    const movies = useAppSelector((state) => state.movies.movies);
    const userMovies = useAppSelector((state) => state.userMovie.userMovies);
    const [combinedData, setCombinedData] = useState<MovieWithUserMovie[]>([]);

    useEffect(() => {
        const data = movies.map((movie) => {
            const userMovie = userMovies.find((um) => um.movieId === movie.movieId);
            return {
                ...movie,
                ...userMovie,
                id: userMovie?.id || 0,
                movieId: movie.movieId,
                isAssociated: !!userMovie,
            } as MovieWithUserMovie;
        });

        const filteredData = pathname === "/movies"
            ? data.filter((movie) => movie.isAssociated)
            : data;

        setCombinedData(filteredData);
    }, [movies, userMovies, pathname]);

    return combinedData;
};

export default useTableData;
