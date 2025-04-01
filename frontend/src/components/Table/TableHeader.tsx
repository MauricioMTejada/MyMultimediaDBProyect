// src/components/Table/TableHeader.tsx
import React from 'react';

interface Props {
    headers: string[];
}

const TableHeader: React.FC<Props> = ({ headers }) => {

    // console.log('TableHeader.tsx - headers:', headers); // Imprimir las cabeceras para depuración

    return (
        <thead className="bg-gray-50">
            <tr>
                {headers.map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
