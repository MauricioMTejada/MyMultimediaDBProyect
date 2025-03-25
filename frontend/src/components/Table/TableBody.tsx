// src/components/Table/TableBody.tsx
import React from 'react';
import TableCell from './TableCell';
import { Country, CombinedMovieData, Movie } from '../../types/types';

interface Props {
    data: CombinedMovieData[] | Movie[]; // Allow both types
    headers: string[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    isAssociated?: boolean; // Opcional
}

const TableBody: React.FC<Props> = ({ data, headers, countries, onCountryChange, isAssociated }) => {
    console.log('TableBody.tsx - onCheckboxChange:'); // Mover console.log aquí
    return (
        <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
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
                            isAssociated={isAssociated}
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
