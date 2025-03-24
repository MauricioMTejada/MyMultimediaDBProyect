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
}

const TableRow: React.FC<Props> = ({ row, rowIndex, headers, countries, onCountryChange }) => {
    return (
        <tr key={rowIndex}>
            {headers.map((header, colIndex) => (
                <TableCell
                    key={`${rowIndex}-${colIndex}`} // Correct key generation
                    header={header}
                    row={row}
                    rowIndex={rowIndex}
                    colIndex={colIndex} // Pass the colIndex
                    countries={countries}
                    onCountryChange={onCountryChange}
                />
            ))}
        </tr>
    );
};

export default TableRow;
