import React from 'react';
import { CombinedMovieData, Movie } from '../../../types/types';
import { addAssociateUserMovieService, deleteAssociateUserMovieService } from '../../../services/userMovieService';
import { addAssociateUserMovie, removeAssociateUserMovie } from '../../../redux/slices/userMovieSlice';
import { useAppDispatch } from '../../../redux/hooks';
import styles from './asociarCell.module.css';

export const renderAsociarCell = (
    row: CombinedMovieData | Movie,
    localChecked: boolean,
    setLocalChecked: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const dispatch = useAppDispatch();

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        setLocalChecked(isChecked);

        try {
            if (isChecked) {
                const newUserMovie = await addAssociateUserMovieService(row.movieId);
                dispatch(addAssociateUserMovie({ ...row, ...newUserMovie }));
            } else {
                await deleteAssociateUserMovieService(row.movieId);
                dispatch(removeAssociateUserMovie(row.movieId));
            }
        } catch (error) {
            console.error('Error al asociar/desasociar película:', error);
            setLocalChecked(!isChecked);
        }
    };

    return (
        <input
            type="checkbox"
            checked={localChecked}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
        />
    );
};
