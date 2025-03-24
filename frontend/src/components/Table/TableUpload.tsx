// src/components/Table/TableUpload.tsx
import React from 'react';
import { Movie, Country } from '../../types/types'; // Ajusta la ruta si es necesario

//Creamos una nueva interface para el estado interno, para guardar tanto la pelicula, como el pais del csv
interface MovieWithCSVCountry extends Movie {
    csvCountry: string; // Propiedad para guardar el país del CSV
}

interface Props {
    data: MovieWithCSVCountry[]; // Ahora usa la interface MovieWithCSVCountry
    countries: Country[];
    onCountryChange: (rowIndex: number, newCountryId: number | undefined) => void;
}

const TableUpload: React.FC<Props> = ({ data, countries, onCountryChange }) => {
    if (data.length === 0) {
        return <p>No hay datos para mostrar.</p>;
    }

    // Definimos los headers que queremos mostrar, en el orden que queremos
    const headers = [
        "Título",
        "Año",
        "Género",
        "País y csvCountry",
        "Director",
        "Actores",
        "Sinopsis",
        "Puntuación",
        "Poster"
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((header, colIndex) => (
                                <td key={`${rowIndex}-${colIndex}`} className="px-6 py-4 whitespace-nowrap">
                                    {header === 'País y csvCountry' ? (
                                        <div className="flex flex-col">
                                            <select
                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={row.countryId?.toString() ?? ""}
                                                onChange={(e) => {
                                                    const selectedCountryId = e.target.value === "" ? undefined : parseInt(e.target.value);
                                                    onCountryChange(rowIndex, selectedCountryId);
                                                }}
                                            >
                                                <option value="">Seleccionar país</option>
                                                {countries.map(country => (
                                                    <option key={country.id} value={country.id}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="mt-1 text-gray-500">csvCountry: {row.csvCountry}</div>
                                        </div>
                                    ) : (
                                        // Para las demás columnas, accedemos usando el header
                                        header === "Título" ? row.Título :
                                        header === "Año" ? row.Año :
                                        header === "Género" ? row.Género :
                                        header === "Director" ? row.Director :
                                        header === "Actores" ? row.Actores :
                                        header === "Sinopsis" ? row.Sinopsis :
                                        header === "Puntuación" ? row.Puntuación :
                                        header === "Poster" ? row.Poster :
                                        null
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableUpload;
