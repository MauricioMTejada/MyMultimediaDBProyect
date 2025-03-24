// src/components/Table/TableCell.tsx
import React, { useState, useEffect } from 'react';
import { Movie, Country } from '../../types/types';
import { truncateText } from '../../utils/utils';
// import { API_BASE_URL } from '../../utils/apiConfig';

interface Props {
    header: string;
    row: Movie;
    rowIndex: number;
    colIndex: number;
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    onCheckboxChange: (movieId: number, checked: boolean) => void; // Nueva prop
    isAssociated: boolean; // Nueva prop
}

const TableCell: React.FC<Props> = ({ header, row, rowIndex, colIndex, countries, onCountryChange, onCheckboxChange, isAssociated }) => {
    const [isChecked, setIsChecked] = useState<boolean>(isAssociated);

    useEffect(() => {
        setIsChecked(isAssociated);
    }, [isAssociated]);

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onCheckboxChange(row.id, checked);
    };

    let cellValue: any;
    if (header === 'image') {
        cellValue = row.image;
    } else if (header === 'titles') {
        cellValue = (
            <div className="flex flex-col">
                <div><b>Original:</b> {row.originalTitle ? truncateText(row.originalTitle) : "N/A"}</div>
                <div><b>Alternativo:</b> {row.title ? truncateText(row.title) : "N/A"}</div>
                <div><b>Otros títulos:</b> {row.otherTitles && row.otherTitles.length > 0 ? truncateText(row.otherTitles.join(', ')) : "N/A"}</div>
            </div>
        );
    } else if (header === 'data') {
        cellValue = (
            <div className="flex flex-col">
                <div><b>Año:</b> {row.year ? truncateText(row.year.toString()) : "N/A"}</div>
                <div><b>Director:</b> {row.director ? truncateText(row.director) : "N/A"}</div>
                <div><b>Elenco:</b> {row.cast ? truncateText(row.cast) : "N/A"}</div>
                <div><b>Compañías:</b> {row.companies ? truncateText(row.companies) : "N/A"}</div>
            </div>
        );
    } else if (header === 'otherData') {
        cellValue = (
            <div className="flex flex-col">
                <div><b>Género:</b> {row.genres ? truncateText(row.genres) : "N/A"}</div>
                <div><b>Sinopsis:</b> {row.synopsis ? truncateText(row.synopsis) : "N/A"}</div>
            </div>
        );
    } else {
        cellValue = row[header as keyof Movie];
    }
    let displayValue: string;

    if (header === 'País y csvCountry') {
        return (
            <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
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
            </td>
        );
    } else if (header === 'image') {
        return (
            <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                {cellValue ? (
                    <a href={cellValue} target="_blank" rel="noopener noreferrer">
                        <img src={cellValue} alt="Movie Poster" className="max-h-[150px] max-w-[150px] h-auto w-auto" />
                    </a>
                ) : (
                    "No Image"
                )}
            </td>
        );
    } else if (header === 'titles' || header === 'data' || header === 'otherData') {
        return (
            <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-normal">
                {cellValue}
            </td>
        );
    } else if (header === 'Asociar') {
        return (
            <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </td>
        );
    } else {
        if (typeof cellValue === 'object' && cellValue !== null) {
            displayValue = JSON.stringify(cellValue);
        } else {
            displayValue = cellValue?.toString() || "";
        }
        displayValue = truncateText(displayValue); // Usamos la función importada

        return (
            <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                {displayValue}
            </td>
        );
    }
};

export default TableCell;
