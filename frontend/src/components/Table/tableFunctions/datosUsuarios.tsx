// Función para renderizar la celda de "datos de usuario"
import styles from './datosUsuarios.module.css';
import React, { useState, useEffect } from 'react';
import { submitUserMovieForm } from '../../../services/userMovieService';
import { CombinedMovieData, Movie } from '../../../types/types';

export const renderDatosUsuarioCell = (row: CombinedMovieData | Movie) => {
    const [isNoteEditable, setIsNoteEditable] = useState(false);
    const [isRecommendationEditable, setIsRecommendationEditable] = useState(false);
    const [watchedStatus, setWatchedStatus] = useState(row.watched || "No");
    const [note, setNote] = useState(row.note || "");
    const [recommendationSource, setRecommendationSource] = useState(row.recommendationSource || "");
    const [isFormEdited, setIsFormEdited] = useState(false); // Nuevo estado para rastrear cambios

    useEffect(() => {
        // Verifica si algún campo ha cambiado
        setIsFormEdited(
            watchedStatus !== row.watched ||
            note !== row.note ||
            recommendationSource !== row.recommendationSource
        );
    }, [watchedStatus, note, recommendationSource, row]);

    const handleEditClick = (setEditable: React.Dispatch<React.SetStateAction<boolean>>) => {
        setEditable(true);
    };

    const handleDeleteClick = (setEditable: React.Dispatch<React.SetStateAction<boolean>>) => {
        setEditable(false);
    };

    const handleWatchedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setWatchedStatus(event.target.value);
    };

    const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(event.target.value);
    };

    const handleRecommendationChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRecommendationSource(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!row.id) {
            console.error("El userMovieId no está definido.");
            return;
        }
        try {
            await submitUserMovieForm({
                id: row.id,
                watched: watchedStatus,
                note,
                recommendationSource,
            });
            console.log("Formulario enviado exitosamente.");

            // Sincroniza los valores del formulario con los valores originales
            row.watched = watchedStatus;
            row.note = note;
            row.recommendationSource = recommendationSource;

            // Desactiva los text areas editados
            setIsNoteEditable(false);
            setIsRecommendationEditable(false);

            // Desactiva el botón de guardar
            setIsFormEdited(false);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    const rewatchedDates = row.rewatchedDate;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
                <button
                    type="submit"
                    className={styles.saveButton}
                    disabled={!isFormEdited} // Desactiva el botón si no se ha editado nada
                >
                    <img src="/icons/save.png" alt="Save" className={styles.saveIcon} />
                </button>
            </div>
            <div className={styles.selectRow}>
                <b className={styles.text}>Visto:</b>
                <select
                    value={watchedStatus}
                    onChange={handleWatchedChange}
                    className={styles.select}
                >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                    <option value="Viendo">Viendo</option>
                </select>
            </div>
            <div>
                <b>Fecha Visto:</b> {row.watchedDate ? row.watchedDate.toLocaleDateString() : "N/A"}
            </div>
            <div>
                <b>Fecha Vuelta a ver:</b>{" "}
                {rewatchedDates &&
                Array.isArray(rewatchedDates) &&
                rewatchedDates.length > 0
                    ? rewatchedDates.map((date, index) => (
                        <span key={index}>
                            {date.toLocaleDateString()}
                            {index < rewatchedDates.length - 1 ? ", " : ""}
                        </span>
                    ))
                    : "N/A"}
            </div>
            <div>
                <b>Tipo:</b> {row.type || "N/A"}
            </div>
            <div className={styles.row}>
                <img
                    src="/icons/edit.png"
                    alt="Edit"
                    className={styles.icon}
                    onClick={() => handleEditClick(setIsNoteEditable)}
                />
                <img
                    src="/icons/delete-button.png"
                    alt="Delete"
                    className={styles.icon}
                    onClick={() => handleDeleteClick(setIsNoteEditable)}
                />
                <b className={styles.text}>Nota:</b>
            </div>
            <textarea
                value={note}
                onChange={handleNoteChange}
                disabled={!isNoteEditable}
                className={styles.textarea}
            />
            <div className={styles.row}>
                <img
                    src="/icons/edit.png"
                    alt="Edit"
                    className={styles.icon}
                    onClick={() => handleEditClick(setIsRecommendationEditable)}
                />
                <img
                    src="/icons/delete-button.png"
                    alt="Delete"
                    className={styles.icon}
                    onClick={() => handleDeleteClick(setIsRecommendationEditable)}
                />
                <b className={styles.text}>Origen de Recomendación:</b>
            </div>
            <textarea
                value={recommendationSource}
                onChange={handleRecommendationChange}
                disabled={!isRecommendationEditable}
                className={styles.textarea}
            />
        </form>
    );
};