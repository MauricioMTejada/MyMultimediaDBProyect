// frontend/src/pages/Home/HomePage.tsx
import React from 'react';
import { UploadMoviesPage } from '../UploadMoviesPage';
import AllMovies from './AllMovies';

const HomePage: React.FC = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold">Home</h2>
        <AllMovies />
    </div>
);

export default HomePage;
