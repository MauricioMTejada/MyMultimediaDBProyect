import React, { useState, useEffect } from 'react';
import { MovieWithUserMovie, Movie } from '../../../types/types';
import styles from './ArteCell.module.css';

interface ArteCellProps {
    row: MovieWithUserMovie | Movie;
}

export const ArteCell: React.FC<ArteCellProps> = ({ row }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const image = row.image; // URL de la imagen
    const fallbackImage = 'https://via.placeholder.com/150'; // Imagen de respaldo

    useEffect(() => {
        const img = new Image();
        img.src = image;

        img.onload = () => {
            // console.log(`Imagen cargada correctamente: ${image}`);
            setImageLoaded(true);
        };

        img.onerror = () => {
            console.error(`Error al cargar la imagen: ${image}`);
            setImageError(true);
        };
    }, [image]);

    if (imageError) {
        return (
            <a href={fallbackImage} target="_blank" rel="noopener noreferrer">
                <img
                    src={fallbackImage}
                    alt="Imagen de respaldo"
                    className={styles.image}
                />
            </a>
        );
    }

    if (!imageLoaded) {
        return <span>Cargando imagen...</span>;
    }

    return (
        <a href={image} target="_blank" rel="noopener noreferrer">
            <img
                src={image}
                alt="Movie Poster"
                className={styles.image}
            />
        </a>
    );
};