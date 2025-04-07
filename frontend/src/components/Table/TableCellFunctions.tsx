// src/components/Table/TableCellFunctions.tsx
import React, { useState } from 'react';
import { CombinedMovieData, Movie } from '../../types/types';
import { truncateText } from '../../utils/utils';


// Función para renderizar la celda de "arte"
export const renderArteCell = (row: CombinedMovieData | Movie) => {
    const image = row.image; // Acceder a la propiedad image dentro de row
    return image ? (
        <a href={image} target="_blank" rel="noopener noreferrer">
            <img src={image} alt="Movie Poster" className="max-h-[150px] max-w-[150px] h-auto w-auto" />
        </a>
    ) : (
        "No Image"
    );
};

// Función para renderizar la celda de "títulos"
export const renderTitulosCell = (row: CombinedMovieData | Movie) => (
    <div className="flex flex-col">
        <div><b>Original:</b> {row.originalTitle ? truncateText(row.originalTitle) : "N/A"}</div>
        <div><b>Alternativo:</b> {row.title ? truncateText(row.title) : "N/A"}</div>
        <div><b>Otros títulos:</b> {row.otherTitles && row.otherTitles.length > 0
            ? row.otherTitles.map((otherTitle, index) => (
                <span key={index}>{truncateText(otherTitle.trim())}{index < row.otherTitles.length - 1 ? ', ' : ''}</span>
            ))
            : "N/A"}
        </div>
    </div>
);

// Función para renderizar la celda de "datos"
export const renderDatosCell = (row: CombinedMovieData | Movie) => (
    <div className="flex flex-col">
        <div><b>Año:</b> {row.year ? truncateText(row.year.toString()) : "N/A"}</div>
        <div><b>Director:</b> {row.director ? truncateText(row.director).split(',').map((director, index) => (
            <span key={index}>{truncateText(director.trim())}{index < truncateText(row.director).split(',').length - 1 ? ', ' : ''}</span>
        )) : "N/A"}</div>
        <div><b>Elenco:</b> {row.cast ? truncateText(row.cast).split(',').map((actor, index) => (
            <span key={index}>{truncateText(actor.trim())}{index < truncateText(row.cast).split(',').length - 1 ? ', ' : ''}</span>
        )) : "N/A"}</div>
        <div><b>Compañías:</b> {row.companies ? truncateText(row.companies).split(',').map((company, index) => (
            <span key={index}>{truncateText(company.trim())}{index < truncateText(row.companies).split(',').length - 1 ? ', ' : ''}</span>
        )) : "N/A"}</div>
    </div>
);

// Función para renderizar la celda de "otros datos"
export const renderOtrosDatosCell = (row: CombinedMovieData | Movie) => (
    <div className="flex flex-col">
        <div><b>Género:</b> {row.genres ? truncateText(row.genres).split(',').map((genre, index) => (
            <span key={index}>{truncateText(genre.trim())}{index < truncateText(row.genres).split(',').length - 1 ? ', ' : ''}</span>
        )) : "N/A"}</div>
        <div><b>Sinopsis:</b> {row.synopsis ? truncateText(row.synopsis) : "N/A"}</div>
    </div>
);

// Función para renderizar la celda de "id"
export const renderIdCell = (row: CombinedMovieData | Movie) => {
    return row.movieId ? row.movieId.toString() : "N/A"; // Devuelve movieId o "N/A" si no está definido
};
