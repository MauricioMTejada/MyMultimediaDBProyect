// src/components/Table/TableHeader.tsx
import React from 'react';

interface Props {
    headers: string[];
}

const TableHeader: React.FC<Props> = ({ headers }) => {
    const headersToShow = headers.map(header => {
        if (header === 'País') return 'País y csvCountry';
        if (header === 'titles') return 'Títulos';
        if (header === 'data') return 'Datos';
        if (header === 'otherData') return 'Otros Datos';
        return header;
    });
    return (
        <thead className="bg-gray-50">
            <tr>
                {headersToShow.map((header, index) => (
                    <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;
