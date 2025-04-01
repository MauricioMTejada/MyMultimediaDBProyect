// src/components/Table/TableCell.tsx
import React, { JSX, useState, useCallback } from 'react';
import { CombinedMovieData, Movie } from '../../types/types';
import { truncateText } from '../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserIdFromLocalStorage } from '../../services/authService'; // Obtener el userId
import { addAssociateUserMovieService } from '../../services/userMovieService'; // Importar la nueva función
import { deleteAssociateUserMovieService } from '../../services/userMovieService'; // Importar la nueva función
import { addAssociateUserMovie, removeAssociateUserMovie } from '../../redux/slices/userMovieSlice'; // Importar las acciones para actualizar el estado de Redux

interface Props {
    header: string;
    row: CombinedMovieData | Movie; // Acepta ambos tipos de datos
    rowIndex: number;
    colIndex: number;
    isChecked?: boolean; // Para la celda de asociación
    loading?: boolean; // Para la celda de "datos de usuario"
    watchedStatus?: string; // Para la celda de "datos de usuario"
    onCheckboxChange?: (rowIndex: number, checked: boolean) => void; // Nueva prop para manejar el cambio del checkbox
}

// Función para renderizar la celda de "arte"
const renderArteCell = (image: string | undefined) => {
    return image ? (
        <a href={image} target="_blank" rel="noopener noreferrer">
            <img src={image} alt="Movie Poster" className="max-h-[150px] max-w-[150px] h-auto w-auto" />
        </a>
    ) : (
        "No Image"
    );
};

// Función para renderizar la celda de "títulos"
const renderTitulosCell = (row: CombinedMovieData | Movie) => (
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
const renderDatosCell = (row: CombinedMovieData | Movie) => (
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
const renderOtrosDatosCell = (row: CombinedMovieData | Movie) => (
    <div className="flex flex-col">
        <div><b>Género:</b> {row.genres ? truncateText(row.genres).split(',').map((genre, index) => (
            <span key={index}>{truncateText(genre.trim())}{index < truncateText(row.genres).split(',').length - 1 ? ', ' : ''}</span>
        )) : "N/A"}</div>
        <div><b>Sinopsis:</b> {row.synopsis ? truncateText(row.synopsis) : "N/A"}</div>
    </div>
);

// Función para renderizar la celda de "datos de usuario"
const renderDatosUsuarioCell = (row: CombinedMovieData, watchedStatus: string | undefined, loading: boolean | undefined) => {
    const rewatchedDates = row.rewatchedDate; // Variable auxiliar
    return (
        <div className="flex flex-col">
            <div><b>Visto:</b></div>
            <select
                value={watchedStatus || 'No'}
                disabled={loading}
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
const renderAsociarCell = (
    isChecked: boolean | undefined,
    onChange: (checked: boolean) => void,
    movieId: number,
    isAssociated: boolean,
    row: CombinedMovieData | Movie
) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector((state) => state.auth.userId); // Obtener el userId del estado de Redux

    const handleCheckboxChange = async (checked: boolean) => {
        try {
            if (!userId) {
                throw new Error('El userId no está disponible. El usuario debe estar autenticado.');
            }

            if (checked) {
                // Asociar película
                const userMovieData: CombinedMovieData = {
                    ...row,
                    movieId,
                    userMovieId: 0, // Valor predeterminado, se actualizará en el backend
                    userId,
                    watched: "No", // Valor predeterminado
                    watchedDate: null,
                    rewatchedDate: null,
                    selectOriginalTitle: false, // Valor predeterminado
                };

                await addAssociateUserMovieService(movieId, userMovieData, (newUserMovie) => {
                    dispatch(addAssociateUserMovie(newUserMovie)); // Actualizar el estado de Redux
                });
            } else {
                // Eliminar asociación
                await deleteAssociateUserMovieService(movieId);
                dispatch(removeAssociateUserMovie(movieId)); // Actualizar el estado de Redux eliminando la película
                console.log(`Asociación eliminada para la película con ID ${movieId}.`);
            }

            onChange(checked); // Actualizar el estado del checkbox
        } catch (error) {
            console.error('Error al asociar/desasociar película:', error);
        }
    };

    return (
        <input
            type="checkbox"
            checked={isAssociated}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
        />
    );
};

const TableCell: React.FC<Props> = React.memo(({ header, row, rowIndex, colIndex, isChecked, loading, watchedStatus, onCheckboxChange }) => {
    const [localChecked, setLocalChecked] = useState(isChecked || false); // Estado local del checkbox

    const handleCheckboxChange = useCallback(
        (checked: boolean) => {
            setLocalChecked(checked); // Actualizar el estado local
            if (onCheckboxChange) {
                onCheckboxChange(rowIndex, checked); // Notificar al padre si es necesario
            }
        },
        [rowIndex, onCheckboxChange]
    );

    // Mapa de funciones para renderizar celdas según el encabezado
    const cellRenderers: Record<string, (row: CombinedMovieData | Movie) => JSX.Element | string> = {
        arte: () => renderArteCell(row.image),
        títulos: () => renderTitulosCell(row),
        datos: () => renderDatosCell(row),
        'otros datos': () => renderOtrosDatosCell(row),
        'datos de usuario': () => renderDatosUsuarioCell(row as CombinedMovieData, watchedStatus, loading),
        asociar: () =>
            renderAsociarCell(localChecked, handleCheckboxChange, row.id, row.isAssociated, row), // Usar estado local
    };

    // Renderizar la celda según el encabezado o manejar el caso predeterminado
    const cellContent = cellRenderers[header]
        ? cellRenderers[header](row)
        : row[header as keyof (CombinedMovieData | Movie)] ?? "N/A";

    return (
        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
            {cellContent}
        </td>
    );
});

export default TableCell;
