import React, { useState, useEffect } from 'react';
import Papa, { ParseResult } from 'papaparse';
import TableUpload from '../../components/Table/TableUpload';
import { Movie } from '../../types/types'; //Importamos la interface de types
import { uploadMovies } from '../../services/uploadMovieService';
import styles from './UploadMoviesPage.module.css'; // Importamos el CSS Module

interface MovieWithCSVCountry extends Movie {
    csvCountry: string; // Propiedad para guardar el país del CSV
    countryId: number | undefined; // Inicializamos como undefined
}

const UploadMoviesPage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<MovieWithCSVCountry[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true); // Estado para manejar el botón

    // useEffect para manejar el estado del botón de submit
    useEffect(() => {
        const allCountriesSelected = data.every((movie) => movie.countryId !== undefined);
        setIsSubmitDisabled(!allCountriesSelected); // Deshabilitar si falta algún país
    }, [data]); // Se ejecuta cada vez que cambia el estado de `data`

    const parseCSV = (csvText: string) => {
        Papa.parse(csvText, {
            header: true,
            complete: (results: ParseResult<Movie>) => {
                if (results.errors.length > 0) {
                    console.error('Error al parsear el CSV:', results.errors[0].message);
                    setMessage(`Error al leer el archivo CSV: ${results.errors[0].message}`);
                    setData([]);
                } else {
                    const newData: MovieWithCSVCountry[] = results.data.map((movie) => ({
                        ...movie,
                        csvCountry: movie.country,
                        countryId: undefined, // Inicializamos countryId como undefined
                    }));
                    setData(newData);
                    console.log("Datos leídos desde el CSV:", newData);
                }
            },
            error: (error: any) => {
                console.error("Error en papaparse:", error.message);
                setMessage(`Error al leer el archivo: ${error.message}`);
            }
        });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            if (!selectedFile.name.endsWith('.csv')) {
                setMessage('Por favor, selecciona un archivo CSV válido.');
                return;
            }
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                const csvText = event.target?.result as string ?? "";
                parseCSV(csvText);
            };
            reader.onerror = (event: ProgressEvent<FileReader>) => {
                console.error("Error al leer el archivo", event.target?.error);
                setMessage(`Error al leer el archivo`);
            };
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

        const dataToSend = data.map(({ csvCountry, ...movie }) => movie);

        try {
            await uploadMovies(dataToSend);
            setMessage('Datos cargados correctamente.');
            setData([]);
            setFile(null);
        } catch (error: any) {
            setMessage(error.message);
        }
    };

    const handleCountryChange = (rowIndex: number, newCountryId: number | undefined) => {
        const newData = [...data];
        newData[rowIndex].countryId = newCountryId;
        setData(newData);
    };

    return (
        <div className={styles.container}>
            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className={styles.fileInput}
            />
            {file && (
                <div className={styles.content}>
                    <TableUpload
                        data={data}
                        onCountryChange={handleCountryChange}
                    />
                    <button
                        onClick={handleSubmit}
                        className={styles.submitButton}
                        disabled={isSubmitDisabled} // Usamos el estado manejado por useEffect
                    >
                        Enviar Datos
                    </button>
                </div>
            )}
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default UploadMoviesPage;