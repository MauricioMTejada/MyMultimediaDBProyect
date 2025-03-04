// src/components/Table.tsx
import React from 'react';
import { Movie, Country } from '../types/types';

interface Props {
    data: Movie[]; // <-- Usa la interfaz importada
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
}

const Table: React.FC<Props> = ({ data, countries, onCountryChange }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    // Mapeamos las keys del objeto Movie, y modificamos el nombre de 'País' a 'País y csvCountry'
    const headers = Object.keys(data[0]).map(header => header === 'País' ? 'País y csvCountry' : header);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                                    {/* Si la columna es 'País y csvCountry' */}
                                    {header === 'País y csvCountry' ? (
                                        <div className="flex flex-col">
                                            <select
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={row.countryId?.toString() ?? ""}// cambiamos a string
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
                                            <div className="mt-1 text-gray-500">csvCountry: {row.csvCountry}</div>{/* Mostramos el csvCountry */}
                                        </div>
                                    ) : (
                                        // Para las demás columnas, accedemos usando el header
                                        typeof row[Object.keys(data[0])[colIndex]] === 'object' && row[Object.keys(data[0])[colIndex]] !== null
                                            ? JSON.stringify(row[Object.keys(data[0])[colIndex]])
                                            : row[Object.keys(data[0])[colIndex]]?.toString()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
