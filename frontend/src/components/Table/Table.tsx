// src/components/Table/Table.tsx
import React from 'react';
import { Country, CombinedMovieData, Movie } from '../../types/types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface Props {
    data: CombinedMovieData[] | Movie[]; // Acepta ambos tipos de datos
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
    isAssociated?: boolean; // Opcional
}

const Table: React.FC<Props> = ({ data, countries, onCountryChange, isAssociated }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    let headers: string[] = [];
    const isCombinedData = 'userMovieId' in data[0];

    if (isCombinedData) {
        // Lista de columnas que NO queremos mostrar
        const columnsToExclude = ['userMovieId', 'userId', 'selectOriginalTitle', 'watched', 'watchedDate', 'rewatchedDate', 'type', 'note', 'recommendationSource'];

        // Filtramos las columnas que no queremos mostrar
        headers = Object.keys(data[0]).filter(header => !columnsToExclude.includes(header) && header !== 'image' && header !== 'originalTitle' && header !== 'otherTitles' && header !== 'title' && header !== 'year' && header !== 'director' && header !== 'cast' && header !== 'companies' && header !== 'countryId' && header !== 'genres' && header !== 'synopsis' && header !== 'isAssociated');

        // Insertamos las columnas especiales en el orden deseado
        // Insertamos la nueva columna "Datos de usuario" en la posición 1
        headers.splice(1, 0, 'Datos de usuario');
        headers.splice(2, 0, 'image');
        headers.splice(3, 0, 'titles');
        headers.splice(4, 0, 'data');
        headers.splice(5, 0, 'otherData');
    } else {
        headers = Object.keys(data[0]).filter(header => header !== 'image' && header !== 'originalTitle' && header !== 'otherTitles' && header !== 'title' && header !== 'year' && header !== 'director' && header !== 'cast' && header !== 'companies' && header !== 'countryId' && header !== 'genres' && header !== 'synopsis' && header !== 'isAssociated');
        headers.splice(1, 0, 'image');
        headers.splice(2, 0, 'titles');
        headers.splice(3, 0, 'data');
        headers.splice(4, 0, 'otherData');
        if (isAssociated) headers.push('Asociar');
    }
    console.log('Table.tsx - onCheckboxChange:'); // Mover console.log aquí

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody
                    data={data}
                    headers={headers}
                    countries={countries}
                    onCountryChange={onCountryChange}
                    isAssociated={isAssociated}
                />
            </table>
        </div>
    );
};

export default Table;
