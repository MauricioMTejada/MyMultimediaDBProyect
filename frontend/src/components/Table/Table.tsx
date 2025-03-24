// src/components/Table/Table.tsx
import React from 'react';
import { Movie, Country } from '../../types/types';
import TableHeader from './TableHeader';
import TableBody from './TableBody'; // Import TableBody

interface Props {
    data: Movie[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
}

const Table: React.FC<Props> = ({ data, countries, onCountryChange }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    const headers = Object.keys(data[0]).filter(header => header !== 'image' && header !== 'originalTitle' && header !== 'otherTitles' && header !== 'title' && header !== 'year' && header !== 'director' && header !== 'cast' && header !== 'companies' && header !== 'countryId' && header !== 'genres' && header !== 'synopsis');
    headers.splice(1, 0, 'image');
    headers.splice(2, 0, 'titles');
    headers.splice(3, 0, 'data');
    headers.splice(4, 0, 'otherData');

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody data={data} headers={headers} countries={countries} onCountryChange={onCountryChange} /> {/* Use TableBody */}
            </table>
        </div>
    );
};

export default Table;
