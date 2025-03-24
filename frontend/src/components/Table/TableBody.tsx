// src/components/Table/TableBody.tsx
import React from 'react';
import { Movie, Country } from '../../types/types';
import TableRow from './TableRow';

interface Props {
    data: Movie[];
    headers: string[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    onCheckboxChange: (movieId: number, checked: boolean) => void; // Nueva prop
    // associatedMovies: number[]; // Eliminar esta línea
}

const TableBody: React.FC<Props> = ({ data, headers, countries, onCountryChange, onCheckboxChange }) => { // Eliminar associatedMovies
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    row={row}
                    rowIndex={rowIndex}
                    headers={headers}
                    countries={countries}
                    onCountryChange={onCountryChange}
                    onCheckboxChange={onCheckboxChange} // Pasar la prop
                    isAssociated={row.isAssociated} // Pasar la prop
                />
            ))}
        </tbody>
    );
};

export default TableBody;
