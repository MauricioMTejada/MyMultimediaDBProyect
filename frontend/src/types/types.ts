//src/types/types.ts
export interface Movie {
    Título: string;
    'Título original': string;
    Año: string;
    País: string;
    Bandera: string;
    Dirección: string;
    Reparto: string;
    Compañías: string;
    Género: string;
    Sinopsis: string;
    Imagen: string;
    countryId?: number;
    csvCountry?: string; // <-- agregamos csvCountry a la interfaz movie, como opcional
    [key: string]: any; // <-- Index signature
}

export interface Country {
    id: number;
    name: string;
}
