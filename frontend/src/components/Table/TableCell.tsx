// src/components/Table/TableCell.tsx
import React, { useState, useEffect, JSX } from 'react';
import { MovieWithUserMovie, Movie } from '../../types/types';
import {
	renderIdCell,
	renderDatosCell,
	renderOtrosDatosCell,
	renderTitulosCell,
} from "./TableCellFunctions";
import { renderDatosUsuarioCell } from './tableFunctions/datosUsuarios';
import { renderAsociarCell } from './tableFunctions/asociarCell';
import { ArteCell } from './tableFunctions/ArteCell';



interface Props {
    header: string;
    row: MovieWithUserMovie | Movie;
    rowIndex: number;
    colIndex: number;
}

const TableCell: React.FC<Props> = ({ header, row, rowIndex, colIndex }) => {
    const [localChecked, setLocalChecked] = useState(row.isAssociated || false); // Estado local del checkbox

    // Sincronizar localChecked con row.isAssociated cuando cambie
    useEffect(() => {
        setLocalChecked(row.isAssociated || false);
    }, [row.isAssociated]);

    // Mapa de funciones para renderizar celdas según el encabezado
    const cellRenderers: Record<string, (row: MovieWithUserMovie | Movie) => JSX.Element | string> = {
        id: () => renderIdCell(row), // Agregar renderizador para la columna "id"
        // arte: () => renderArteCell(row),
        arte: () => <ArteCell row={row} />,
        títulos: () => renderTitulosCell(row),
        datos: () => renderDatosCell(row),
        'otros datos': () => renderOtrosDatosCell(row),
        'datos de usuario': () => row.hasOwnProperty('userId') ? renderDatosUsuarioCell(row as MovieWithUserMovie) : 'N/A',
        asociar: () => renderAsociarCell(row, localChecked, setLocalChecked),
    };

    // Renderizar la celda según el encabezado o manejar el caso predeterminado
    const cellContent = cellRenderers[header]
        ? cellRenderers[header](row)
        : row[header as keyof (MovieWithUserMovie | Movie)] ?? 'N/A';

    // console.log('TableCell.tsx - Renderiza'); // Imprimir el contenido de la celda para depuración

    return (
        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
            {cellContent}
        </td>
    );
};

export default TableCell;