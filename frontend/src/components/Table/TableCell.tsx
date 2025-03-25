// src/components/Table/TableCell.tsx
import React, { useEffect } from 'react';
import { Country, CombinedMovieData, Movie } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleMovieAssociation, setAssociation } from '../../redux/slices/movieAssociationSlice';
import { truncateText } from '../../utils/utils';
import { API_BASE_URL } from '../../utils/apiConfig';

interface Props {
    header: string;
    row: CombinedMovieData | Movie; // Acepta ambos tipos de datos
    rowIndex: number;
    colIndex: number;
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    isAssociated?: boolean; // Opcional
}

const TableCell: React.FC<Props> = ({ header, row, rowIndex, colIndex, countries, onCountryChange, isAssociated }) => {
    const dispatch = useAppDispatch();
    const userId = 1; // Reemplazar por el userId real
    const isChecked = useAppSelector((state) => state.movieAssociation.associations[row.id] || false);

    useEffect(() => {
        console.log(`TableCell.tsx - useEffect - Checking association for movieId: ${row.id}`); // Agregar console.log
        const checkAssociation = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/users/1/movies/${row.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                dispatch(setAssociation({ movieId: row.id, checked: data.isAssociated }));
            } catch (error) {
                console.error('Error checking association:', error);
            }
        };
        if (isAssociated && !('userMovieId' in row)) {
            checkAssociation();
        }
    }, [dispatch, isAssociated, row.id]);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        console.log(`TableCell.tsx - onChange - row.id: ${row.id}, checked: ${checked}`);
        dispatch(toggleMovieAssociation({ userId, movieId: row.id, checked }));
    };

    let cellValue: any;
    let cellContent: any;

    if (header === 'image') {
        cellValue = row.image;
        cellContent = cellValue ? (
            <a href={cellValue} target="_blank" rel="noopener noreferrer">
                <img src={cellValue} alt="Movie Poster" className="max-h-[150px] max-w-[150px] h-auto w-auto" />
            </a>
        ) : (
            "No Image"
        );
    } else if (header === 'titles') {
        cellContent = (
            <div className="flex flex-col">
                <div><b>Original:</b> {row.originalTitle ? truncateText(row.originalTitle) : "N/A"}</div>
                <div><b>Alternativo:</b> {row.title ? truncateText(row.title) : "N/A"}</div>
                <div><b>Otros títulos:</b> {row.otherTitles && row.otherTitles.length > 0 ? row.otherTitles.map((otherTitle: string, index: number) => <span key={index}>{truncateText(otherTitle.trim())}{index < row.otherTitles.length - 1 ? ', ' : ''}</span>) : "N/A"}</div>
            </div>
        );
    } else if (header === 'data') {
        cellContent = (
            <div className="flex flex-col">
                <div><b>Año:</b> {row.year ? truncateText(row.year.toString()) : "N/A"}</div>
                <div><b>Director:</b> {row.director ? truncateText(row.director).split(',').map((director: string, index: number) => <span key={index}>{truncateText(director.trim())}{index < truncateText(row.director).split(',').length - 1 ? ', ' : ''}</span>) : "N/A"}</div>
                <div><b>Elenco:</b> {row.cast ? truncateText(row.cast).split(',').map((actor: string, index: number) => <span key={index}>{truncateText(actor.trim())}{index < truncateText(row.cast).split(',').length - 1 ? ', ' : ''}</span>) : "N/A"}</div>
                <div><b>Compañías:</b> {row.companies ? truncateText(row.companies).split(',').map((company: string, index: number) => <span key={index}>{truncateText(company.trim())}{index < truncateText(row.companies).split(',').length - 1 ? ', ' : ''}</span>) : "N/A"}</div>
            </div>
        );
    } else if (header === 'otherData') {
        cellContent = (
            <div className="flex flex-col">
                <div><b>Género:</b> {row.genres ? truncateText(row.genres).split(',').map((genre: string, index: number) => <span key={index}>{truncateText(genre.trim())}{index < truncateText(row.genres).split(',').length - 1 ? ', ' : ''}</span>) : "N/A"}</div>
                <div><b>Sinopsis:</b> {row.synopsis ? truncateText(row.synopsis) : "N/A"}</div>
            </div>
        );
    } else if (header === 'País y csvCountry') {
        cellContent = (
            <div className="flex flex-col">
                <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    value={row.countryId?.toString() ?? ""}
                    onChange={(e) => {
                        const selectedCountryId = e.target.value === "" ? undefined : parseInt(e.target.value);
                        onCountryChange(rowIndex, selectedCountryId);
                    }}
                >
                    <option value="">Seleccionar país</option>
                    {countries.map(country => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <div className="mt-1 text-gray-500">csvCountry: {row.csvCountry}</div>
            </div>
        );
    } else if (header === 'Datos de usuario' && 'userMovieId' in row) {
        const rewatchedDates = row.rewatchedDate; // Variable auxiliar
        cellContent = (
            <div className="flex flex-col">
                <div><b>Visto:</b> {row.watched ? row.watched : "N/A"}</div>
                <div><b>Fecha Visto:</b> {row.watchedDate ? row.watchedDate.toLocaleDateString() : "N/A"}</div>
                <div><b>Fecha Vuelta a ver:</b> {rewatchedDates && Array.isArray(rewatchedDates) && rewatchedDates.length > 0 ? rewatchedDates.map((date: Date, index: number) => <span key={index}>{date.toLocaleDateString()}{index < rewatchedDates.length - 1 ? ', ' : ''}</span>) : "N/A"}</div>
                <div><b>Tipo:</b> {row.type ? row.type : "N/A"}</div>
                <div><b>Nota:</b> {row.note ? row.note : "N/A"}</div>
                <div><b>Origen de Recomendación:</b> {row.recommendationSource ? row.recommendationSource : "N/A"}</div>
            </div>
        );
    } else if (header === 'Asociar' && isAssociated) {
        cellContent = (
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
        );
    } else {
        cellValue = row[header as keyof (CombinedMovieData | Movie)];
        cellContent = cellValue !== undefined && cellValue !== null ? cellValue : "N/A";
    }

    return (
        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
            {cellContent}
        </td>
    );
};

export default TableCell;
