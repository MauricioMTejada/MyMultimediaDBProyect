// src/components/Table/Table.tsx
import React from 'react';
import { Movie, Country } from '../../types/types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { API_BASE_URL } from '../../utils/apiConfig';

interface Props {
    data: Movie[];
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
}

const Table: React.FC<Props> = ({ data, countries, onCountryChange }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    const headers = Object.keys(data[0]).filter(header => header !== 'image' && header !== 'originalTitle' && header !== 'otherTitles' && header !== 'title' && header !== 'year' && header !== 'director' && header !== 'cast' && header !== 'companies' && header !== 'countryId' && header !== 'genres' && header !== 'synopsis' && header !== 'isAssociated');
    headers.splice(1, 0, 'image');
    headers.splice(2, 0, 'titles');
    headers.splice(3, 0, 'data');
    headers.splice(4, 0, 'otherData');
    headers.push('Asociar');

    const handleCheckboxChange = async (movieId: number, checked: boolean) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/1/movies/${movieId}`, { // Reemplaza 1 por el userId
                method: checked ? 'POST' : 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating association:', error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody data={data} headers={headers} countries={countries} onCountryChange={onCountryChange} onCheckboxChange={handleCheckboxChange} />
            </table>
        </div>
    );
};

export default Table;
