// src/components/movies/UserMovieTable.tsx
import React from 'react';

// Interfaz para los datos de UserMovie
interface UserMovie {
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
  // ... otros campos de UserMovie
}

interface UserMovieTableProps {
  userMovies: UserMovie[];
}

const UserMovieTable: React.FC<UserMovieTableProps> = ({ userMovies }) => {
  const headers = ['ID', 'userId', 'movieId', 'Visto', 'Fecha Visto', 'Re-Visto', 'Tipo', 'Nota', 'Recomendación', 'Título Original'];

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="border border-gray-300 px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {userMovies.map((userMovie) => (
          <tr key={userMovie.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">{userMovie.id}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.userId}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.movieId}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.watched}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.watchedDate ? userMovie.watchedDate.toString() : 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.rewatchedDate ? userMovie.rewatchedDate.join(', ') : 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.type}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.note || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.recommendationSource || 'N/A'}</td>
            <td className="border border-gray-300 px-4 py-2">{userMovie.selectOriginalTitle ? 'Si' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserMovieTable;
