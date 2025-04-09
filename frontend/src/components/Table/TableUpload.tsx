// src/components/Table/TableUpload.tsx
import React from 'react';
import { Movie, Country } from '../../types/types'; // Ajusta la ruta si es necesario
import styles from './TableUpload.module.css';
import CountryDropdown from '../CountryDropdown/CountryDropdown';

//Creamos una nueva interface para el estado interno, para guardar tanto la pelicula, como el pais del csv
interface MovieWithCSVCountry extends Movie {
    csvCountry: string; // Propiedad para guardar el país del CSV
}

interface Props {
    data: MovieWithCSVCountry[]; // Ahora usa la interface MovieWithCSVCountry
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
}

const TableUpload: React.FC<Props> = ({ data, onCountryChange }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    // Definimos los headers que queremos mostrar, en el orden que queremos
    const headers = [
        "Título",
        "Año",
        "Género",
        "Director",
        "Actores",
        "Sinopsis",
        "Puntuación",
        "Imagen"
    ];

    const renderCellContent = (header: string, row: MovieWithCSVCountry, rowIndex: number) => {
        switch (header) {
            case "Imagen":
                return (
                    <img
                        src={row.image}
                        alt={`Imagen de ${row.title}`}
                        className={styles.verticalTableImage}
                    />
                );
            default:
                return row[header as keyof MovieWithCSVCountry] || null;
        }
    };

    return (
        <div className={styles.verticalTable}>
            {data.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.verticalTableRow}>
                    {/* Renderizamos las celdas de la tabla */}
                    {headers.map((header, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className={styles.verticalTableCell}>
                            <strong>{header}:</strong>
                            {renderCellContent(header, row, rowIndex)}
                        </div>
                    ))}
                    {/* Renderizamos "País y csvCountry" al final de la fila */}
                    <div className={styles.verticalTableCountryBox}>
                        <CountryDropdown
                            onChange={(newCountryId) => onCountryChange(rowIndex, newCountryId)}
                            label={`Seleccionar país para la película ${row.title}`}
                        />
                        <div className={styles.verticalTableCsvCountry}>csvCountry: {row.csvCountry}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TableUpload;
