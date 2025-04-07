// src/components/AllMovies.tsx
import React, { useEffect } from 'react';
import Table from '../../components/Table/Table';
import { useAppDispatch } from '../../hooks';
import { fetchMoviesThunk } from '../../redux/slices/moviesSlice';

const AllMovies: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchMoviesThunk());
        // console.log("AllMovies.tsx - Despachando fetchMoviesThunk");
    }, [dispatch]);

    return (
		<div className="w-full">
			{<Table/>}
		</div>
	);
};

export default AllMovies;
