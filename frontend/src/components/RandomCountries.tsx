// frontend/src/components/RandomCountries.tsx
import React, { useState, useEffect } from 'react';
import './RandomCountries.css';
import { API_BASE_URL } from '../utils/apiConfig'; // Importar la constante

interface Country {
    id: number;
    name: string;
    flag: string;
}

const RandomCountries: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/countries/random`); // Usar la constante
                if (!response.ok) {
                    //manejo del error 404
                    if (response.status === 404) {
                        setError('No hay paises en la base de datos.');
                    } else {
                        throw new Error('Error al obtener los países'); //lanzar el error si es otro codigo
                    }
                }
                if (response.ok) {
                    const data: Country[] = await response.json();
                    setCountries(data);
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="grid-container">
            {countries.map(country => (
                <div key={country.id} className="country-container">
                    <h3 className="country-name">{country.name}</h3>
                    <img
                        src={country.flag}
                        alt={`Bandera de ${country.name}`}
                        className="country-flag"
                    />
                </div>
            ))}
        </div>
    );
};

export default RandomCountries;
