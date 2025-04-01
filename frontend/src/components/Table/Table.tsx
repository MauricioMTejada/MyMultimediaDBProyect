// src/components/Table/Table.tsx
import React from 'react';
import { Country, CombinedMovieData, Movie } from '../../types/types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { useAppSelector } from '../../hooks';
import { useLocation } from 'react-router-dom';

interface Props {
    data: (CombinedMovieData | Movie)[]; // Acepta ambos tipos de datos
}

// Función para obtener los encabezados de la tabla
const getHeaders = (pathname: string, isLoggedIn: boolean): string[] => {
    if (pathname === '/') {
        const headers = ['id', 'arte', 'títulos', 'datos', 'otros datos'];
        if (isLoggedIn) headers.push('asociar');
        return headers;
    }

    if (pathname === '/movies') {
        return ['datos de usuario', 'arte', 'títulos', 'datos', 'otros datos'];
    }

    return []; // Retorna un array vacío si no coincide con ninguna ruta
};

const Table: React.FC<Props> = ({ data }) => {

    // Imprimir las propss para depuración
    // console.log('Table.tsx - Props:', { data });

    // Verificar si hay datos para mostrar
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    // Verificar si el usuario está logueado
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    // Verificar la dirección
    const location = useLocation();

    // Obtener los encabezados de la tabla según la ruta actual
    const headers = getHeaders(location.pathname, isLoggedIn);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <TableHeader headers={headers} />
                <TableBody
                    data={data}
                    headers={headers}
                />
            </table>
        </div>
    );
};

export default Table;
