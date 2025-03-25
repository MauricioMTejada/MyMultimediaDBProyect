// src/components/Table/TableCell.tsx
import React, { useState, useEffect } from 'react';
import { Movie, Country } from '../../types/types';
import { truncateText } from '../../utils/utils';

interface Props {
    header: string;
    row: Movie;
    rowIndex: number;
    colIndex: number;
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    onCheckboxChange: (movieId: number, checked: boolean) => void;
    isAssociated: boolean; // Prop obligatoria
}

const TableCell: React.FC<Props> = ({ header, row, rowIndex, colIndex, countries, onCountryChange, onCheckboxChange, isAssociated }) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        const checkAssociation = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/1/movies/${row.id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setIsChecked(data.isAssociated);
            } catch (error) {
                console.error('Error checking association:', error);
            }
        };
        if (isAssociated) {
            checkAssociation();
        }
    }, [isAssociated, row.id]);

    const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onCheckboxChange(row.id, checked);
    };

    console.log("Datos en TableCell:", { header, row }); // Imprimir los datos por consola

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
        console.log("Original Title:", row.originalTitle);
        console.log("Alternative Title:", row.title);
        console.log("Other Titles:", row.otherTitles);
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
    } else if (header === 'Asociar') {
        cellContent = (
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
        );
    } else {
        cellValue = row[header as keyof Movie];
        cellContent = cellValue !== undefined && cellValue !== null ? cellValue : "N/A";
    }

    return (
        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
            {cellContent}
        </td>
    );
};

export default TableCell;
