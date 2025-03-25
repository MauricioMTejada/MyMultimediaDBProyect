// src/components/Table/TableBody.tsx
import React from 'react';
import { Movie, Country } from '../../types/types';
import TableRow from './TableRow';

interface Props {
    data: Movie[];
    headers: string[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    onCheckboxChange: (movieId: number, checked: boolean) => void;
    isAssociated: boolean; // Prop obligatoria
}

const TableBody: React.FC<Props> = ({ data, headers, countries, onCountryChange, onCheckboxChange, isAssociated }) => {
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
                    onCheckboxChange={onCheckboxChange}
                    isAssociated={isAssociated}
                />
            ))}
        </tbody>
    );
};

export default TableBody;
