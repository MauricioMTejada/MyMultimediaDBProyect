import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { fetchCountries } from '../../redux/slices/countriesSlice';
import { useAppDispatch } from '../../redux/hooks';
import styles from './CountryDropdown.module.css';

interface CountryDropdownProps {
    onChange?: (newCountryId: number | undefined) => void;
    label?: string;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onChange, label }) => {
    const dispatch = useAppDispatch();
    const { data: countries, status } = useSelector((state: RootState) => state.countries);
    // console.log("Countries:", countries); // Verifica que los países se carguen correctamente

    const [selectedCountryId, setSelectedCountryId] = useState<number | undefined>(undefined);

    // Lista de países destacados
    const featuredCountries = [
		"Estados Unidos de América",
		"Japón",
		"Reino de España",
		"República Italiana",
		"Reino Unido de Gran Bretaña e Irlanda del Norte",
	];

    // Cargar los países si el estado está en 'idle'
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        }
    }, [status, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCountryId = e.target.value === "" ? undefined : parseInt(e.target.value);
        setSelectedCountryId(newCountryId);
        if (onChange) {
            onChange(newCountryId);
        }
    };

    if (status === 'loading') {
        return <p>Cargando países...</p>;
    }

    if (status === 'failed') {
        return <p>Error al cargar los países.</p>;
    }

    // Separar los países destacados y los demás
    const sortedFeaturedCountries = countries.filter(country =>
        featuredCountries.includes(country.name)
    );
    const otherCountries = countries.filter(country =>
        !featuredCountries.includes(country.name)
    );

    return (
        <div className={styles.dropdownContainer}>
            {label && <label className={styles.dropdownLabel}>{label}</label>}
            <select
                className={styles.dropdownSelect}
                value={selectedCountryId?.toString() ?? ""}
                onChange={handleChange}
                aria-label={label || "Seleccionar país"}
            >
                <option value="">Seleccionar país</option>
                {/* Renderizar países destacados */}
                {sortedFeaturedCountries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
                {/* Línea separadora */}
                <option disabled>──────────</option>
                {/* Renderizar los demás países */}
                {otherCountries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CountryDropdown;