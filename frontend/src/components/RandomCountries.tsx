// src/components/RandomCountries.tsx
import React, { useState, useEffect } from 'react';
import './RandomCountries.css'; // Importa el archivo css

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
                const response = await fetch('http://localhost:3000/api/countries/random'); // <-- Especificar la ruta completa
                if (!response.ok) {
                    throw new Error('Error al obtener los países');
                }
                const data: Country[] = await response.json();
                setCountries(data);
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
                        className="country-flag" // <-- Usa una clase CSS tradicional
                    />
                </div>
            ))}
        </div>
    );
};

export default RandomCountries;
