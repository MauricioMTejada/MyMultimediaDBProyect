// src/components/Table/OldTable.tsx
import React from 'react';
import { Movie, Country } from '../../types/types';
import { truncateText } from '../../utils/utils';

interface Props {
    data: Movie[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
}

const OldTable: React.FC<Props> = ({ data, countries, onCountryChange }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    // Modificamos los headers para incluir la columna de imagen, "Títulos", "Datos" y "Otros Datos"
    const headers = Object.keys(data[0]).filter(header => header !== 'image' && header !== 'originalTitle' && header !== 'otherTitles' && header !== 'title' && header !== 'year' && header !== 'director' && header !== 'cast' && header !== 'companies' && header !== 'countryId' && header !== 'genres' && header !== 'synopsis');
    headers.splice(1, 0, 'image'); // Insertamos 'image' en la segunda posición
    headers.splice(2, 0, 'titles'); // Insertamos 'titles' en la tercera posición
    headers.splice(3, 0, 'data'); // Insertamos 'data' en la cuarta posición
    headers.splice(4, 0, 'otherData'); // Insertamos 'otherData' en la quinta posición
    const headersToShow = headers.map(header => {
        if (header === 'País') return 'País y csvCountry';
        if (header === 'titles') return 'Títulos';
        if (header === 'data') return 'Datos';
        if (header === 'otherData') return 'Otros Datos';
        return header;
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headersToShow.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => {
                                let cellValue: any;
                                if (header === 'image') {
                                    cellValue = row.image;
                                } else if (header === 'titles') {
                                    // Construimos el contenido de la columna "Títulos"
                                    cellValue = (
                                        <div className="flex flex-col">
                                            <div><b>Original:</b> {row.originalTitle ? truncateText(row.originalTitle) : "N/A"}</div>
                                            <div><b>Alternativo:</b> {row.title ? truncateText(row.title) : "N/A"}</div>
                                            <div><b>Otros títulos:</b> {row.otherTitles && row.otherTitles.length > 0 ? truncateText(row.otherTitles.join(', ')) : "N/A"}</div>
                                        </div>
                                    );
                                } else if (header === 'data') {
                                    // Construimos el contenido de la columna "Datos"
                                    cellValue = (
                                        <div className="flex flex-col">
                                            <div><b>Año:</b> {row.year ? truncateText(row.year.toString()) : "N/A"}</div>
                                            <div><b>Director:</b> {row.director ? truncateText(row.director) : "N/A"}</div>
                                            <div><b>Elenco:</b> {row.cast ? truncateText(row.cast) : "N/A"}</div>
                                            <div><b>Compañías:</b> {row.companies ? truncateText(row.companies) : "N/A"}</div>
                                        </div>
                                    );
                                } else if (header === 'otherData') {
                                    // Construimos el contenido de la columna "Otros Datos"
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
                                } else if (header === 'titles') {
                                    return (
                                        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-normal">
                                            {cellValue}
                                        </td>
                                    );
                                } else if (header === 'data') {
                                    return (
                                        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-normal">
                                            {cellValue}
                                        </td>
                                    );
                                } else if (header === 'otherData') {
                                    return (
                                        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-normal">
                                            {cellValue}
                                        </td>
                                    );
                                } else {
                                    if (typeof cellValue === 'object' && cellValue !== null) {
                                        displayValue = JSON.stringify(cellValue);
                                    } else {
                                        displayValue = cellValue?.toString() || "";
                                    }
                                    // Truncar el texto si es necesario
                                    displayValue = truncateText(displayValue);

                                    return (
                                        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                                            {displayValue}
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OldTable;
