// src/components/Table/TableBody.tsx
import React from 'react';
import TableCell from './TableCell';
import { CombinedMovieData, Movie } from '../../types/types';

interface Props {
    data: (CombinedMovieData | Movie)[]; // Allow both types
    headers: string[];
}

const TableBody: React.FC<Props> = ({ data, headers }) => {
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
                        />
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
