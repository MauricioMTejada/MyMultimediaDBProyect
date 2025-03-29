// frontend/src/pages/Home/HomePage.tsx
import React from 'react';
import UploadMovies from '../../components/UploadMovies';
import AllMovies from '../../components/AllMovies';

const HomePage: React.FC = () => (
    <div className="p-4">
        <h2 className="text-2xl font-bold">Home</h2>
        <UploadMovies />
        <AllMovies />
    </div>
);

export default HomePage;
