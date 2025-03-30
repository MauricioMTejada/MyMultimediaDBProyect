//src/types/types.ts
export interface Movie {
    title: string;
    originalTitle: string;
    year: number;
    country: string;
    flag: string;
    director: string;
    cast: string;
    companies: string;
    genres: string;
    synopsis: string;
    image: string;
    countryId?: number;
    csvCountry?: string;
    otherTitles: string[];
    [key: string]: any;
}

export interface Country {
    id: number;
    name: string;
}

export interface CombinedMovieData extends Movie {
    userMovieId: number;
    userId: number;
    watched: 'Si' | 'No' | 'Viendo'; // Ahora es obligatorio
    watchedDate?: Date | null; // Opcional
    rewatchedDate?: Date[] | null; // Opcional
    type?: 'Película' | 'Serie' | 'Documental'; // Opcional
    note?: string | null; // Opcional
    recommendationSource?: string | null; // Opcional
    selectOriginalTitle: boolean;
}

export interface UserMovie {
    id: number;
    userId: number;
    movieId: number;
    watched: 'Si' | 'No' | 'Viendo';
    watchedDate: Date | null;
    rewatchedDate: Date[] | null;
    type: 'Película' | 'Serie' | 'Documental';
    note: string | null;
    recommendationSource: string | null;
    selectOriginalTitle: boolean;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface UserData {
    token: string;
    userId: number;
    // Add other user data properties if needed
    email: string;
}