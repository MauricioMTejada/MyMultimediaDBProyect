// src/components/Table/TableCell.tsx
import React, { useState, useEffect, JSX } from 'react';
import { CombinedMovieData, Movie } from '../../types/types';
import {
	renderIdCell,
	renderArteCell,
	renderAsociarCell,
	renderDatosCell,
	renderDatosUsuarioCell,
	renderOtrosDatosCell,
	renderTitulosCell,
} from "./TableCellFunctions";

interface Props {
    header: string;
    row: CombinedMovieData | Movie;
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
    const cellRenderers: Record<string, (row: CombinedMovieData | Movie) => JSX.Element | string> = {
        id: () => renderIdCell(row), // Agregar renderizador para la columna "id"
        arte: () => renderArteCell(row),
        títulos: () => renderTitulosCell(row),
        datos: () => renderDatosCell(row),
        'otros datos': () => renderOtrosDatosCell(row),
        'datos de usuario': () => renderDatosUsuarioCell(row),
        asociar: () => renderAsociarCell(row, localChecked, setLocalChecked),
    };

    // Renderizar la celda según el encabezado o manejar el caso predeterminado
    const cellContent = cellRenderers[header]
        ? cellRenderers[header](row)
        : row[header as keyof (CombinedMovieData | Movie)] ?? 'N/A';

    // console.log('TableCell.tsx - Renderiza'); // Imprimir el contenido de la celda para depuración

    return (
        <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
            {cellContent}
        </td>
    );
};

export default TableCell;