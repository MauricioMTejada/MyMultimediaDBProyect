// src/components/Table/TableRow.tsx
import React from 'react';
import { Movie, Country } from '../../types/types';
import TableCell from './TableCell';

interface Props {
    row: Movie;
    rowIndex: number;
    headers: string[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    onCheckboxChange: (movieId: number, checked: boolean) => void; // Nueva prop
    isAssociated: boolean; // Nueva prop
}

const TableRow: React.FC<Props> = ({ row, rowIndex, headers, countries, onCountryChange, onCheckboxChange, isAssociated }) => {
    return (
        <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
                <TableCell
                    key={`${rowIndex}-${colIndex}`}
                    header={header}
                    row={row}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    countries={countries}
                    onCountryChange={onCountryChange}
                    onCheckboxChange={onCheckboxChange} // Pasar la prop
                    isAssociated={isAssociated} // Pasar la prop
                />
            ))}
        </tr>
    );
};

export default TableRow;
