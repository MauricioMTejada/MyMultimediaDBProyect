// src/components/Table/TableCellFunctions.tsx
import React from 'react';
import { CombinedMovieData, Movie } from '../../types/types';
import { truncateText } from '../../utils/utils';
import { addAssociateUserMovieService, deleteAssociateUserMovieService } from '../../services/userMovieService';
import { addAssociateUserMovie, removeAssociateUserMovie } from '../../redux/slices/userMovieSlice';
import { useAppDispatch } from '../../redux/hooks';


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

// Función para renderizar la celda de "datos de usuario"
export const renderDatosUsuarioCell = (row: CombinedMovieData | Movie) => {
    const rewatchedDates = row.rewatchedDate; // Variable auxiliar
    return (
        <div className="flex flex-col">
            <div><b>Visto:</b></div>
            <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
                <option value="Si">Si</option>
                <option value="No">No</option>
                <option value="Viendo">Viendo</option>
            </select>
            <div><b>Fecha Visto:</b> {row.watchedDate ? row.watchedDate.toLocaleDateString() : "N/A"}</div>
            <div><b>Fecha Vuelta a ver:</b> {rewatchedDates && Array.isArray(rewatchedDates) && rewatchedDates.length > 0
                ? rewatchedDates.map((date, index) => (
                    <span key={index}>{date.toLocaleDateString()}{index < rewatchedDates.length - 1 ? ', ' : ''}</span>
                ))
                : "N/A"}
            </div>
            <div><b>Tipo:</b> {row.type || "N/A"}</div>
            <div><b>Nota:</b> {row.note || "N/A"}</div>
            <div><b>Origen de Recomendación:</b> {row.recommendationSource || "N/A"}</div>
        </div>
    );
};

// Función para renderizar la celda de "asociar"
export const renderAsociarCell = (
    row: CombinedMovieData | Movie,
    localChecked: boolean,
    setLocalChecked: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const dispatch = useAppDispatch(); // Obtener el dispatch de Redux

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // event.preventDefault();
        const isChecked = event.target.checked; // Obtener el estado del checkbox
        setLocalChecked(isChecked); // Actualizar el estado local


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
            setLocalChecked(!isChecked); // Revertir el estado local si ocurre un error
        }
    };

    return (
        <input
            type="checkbox"
            checked={localChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        />
    );
};

// Función para renderizar la celda de "id"
export const renderIdCell = (row: CombinedMovieData | Movie) => {
    return row.movieId ? row.movieId.toString() : "N/A"; // Devuelve movieId o "N/A" si no está definido
};
