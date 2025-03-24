// src/components/UploadMovies.tsx
import React, { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import Table from './Table.tsx';
import { Movie } from '../types/types'; //Importamos la interface de types
import { API_BASE_URL } from '../utils/apiConfig'; // Importamos la constante
import { useAppDispatch, useAppSelector } from '../hooks.ts'; // Importa los hooks personalizados
import { fetchCountries } from '../redux/slices/countriesSlice.ts'; // Importa el thunk

//Creamos una nueva interface para el estado interno, para guardar tanto la pelicula, como el pais del csv
interface MovieWithCSVCountry extends Movie {
    csvCountry: string; // Propiedad para guardar el país del CSV
}

const UploadMovies: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    //Modificamos el estado, para que ahora sea de tipo MovieWithCSVCountry
    const [data, setData] = useState<MovieWithCSVCountry[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    //Usamos los nuevos hooks
    const dispatch = useAppDispatch();
    const { data: countries, status, error } = useAppSelector((state) => state.countries);

    //Disparamos el thunk, si el status está en 'idle'
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        }
    }, [status, dispatch]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);

            const reader = new FileReader();

            reader.onload = (event) => {
                const csvText = event.target?.result as string ?? "";
                Papa.parse(csvText, {
                    header: true,
                    complete: (results: ParseResult<Movie>) => {
                        if (results.errors.length > 0) {
                            console.error('Error al parsear el CSV:', results.errors[0].message);
                            setMessage(`Error al leer el archivo CSV: ${results.errors[0].message}`);
                            setData([])
                        } else {
                            //Mapeamos los datos, para añadir el campo csvCountry
                            const newData: MovieWithCSVCountry[] = results.data.map((movie) => ({
                                ...movie,
                                csvCountry: movie.País, // Guarda el país del CSV en la nueva propiedad
                            }));
                            setData(newData); // Ahora guardamos los datos en la nueva forma
                        }
                    },
                    error: (error: any) => {
                        console.error("Error en papaparse:", error.message)
                        setMessage(`Error al leer el archivo: ${error.message}`);
                    }
                });
            }
            reader.onerror = (event: ProgressEvent<FileReader>) => { // <-- Tipo corregido aquí
                console.error("Error al leer el archivo", event.target?.error); //Ahora se puede utilizar `event.target.error`
                setMessage(`Error al leer el archivo`);
            }
            reader.readAsText(selectedFile);
        } else {
            setFile(null);
            setData([]);
        }
    };

    const handleSubmit = async () => {
        if (data.length === 0) {
            setMessage('No hay datos para enviar.');
            return;
        }

        // Eliminar csvCountry antes de enviar los datos
        const dataToSend = data.map(({ csvCountry, ...movie }) => movie); // <-- Modificación aquí
        console.log("Datos a enviar desde UploadMovies.tsx:", dataToSend); // <-- Nuevo console.log


        try {
        const response = await fetch(`${API_BASE_URL}/movies/upload-json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend), // <-- Enviamos los datos limpios
        });

            if (response.ok) {
                setMessage('Datos cargados correctamente.');
                setData([]);
                setFile(null);
            } else {
                setMessage(`Error al cargar los datos: ${response.statusText}`);
            }
        } catch (error: any) {
            setMessage(`Error de conexión: ${error.message}`);
        }
    };
    // Si hay error, se muestra un mensaje.
    if (error) {
        return <p>{error}</p>;
    }
    // Si esta cargando los paises, muestra un mensaje de carga
    if (status === 'loading') {
        return <p>Cargando países...</p>;
    }
    // Creamos la funcion onCountryChange, para modificar el pais.
    const handleCountryChange = (rowIndex: number, newCountryId: number | undefined) => { // <--  ahora puede ser undefined.
        // Creamos una copia del array de datos
        const newData = [...data];
        // Modificamos el countryId del elemento que corresponda.
        newData[rowIndex].countryId = newCountryId;
        // Actualizamos el estado con los nuevos datos.
        setData(newData);
    };

    return (
        <div className="flex flex-col items-center">
            <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4" />
            {file && (
                <div className="w-full">
                    {/* ahora pasamos los datos en la nueva forma */}
                    {/* AQUI ESTÁ EL CAMBIO */}
                    <Table data={data} countries={countries} onCountryChange={handleCountryChange} />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Enviar Datos
                    </button>
                </div>
            )}
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default UploadMovies;
