// src/App.tsx
import RandomCountries from './components/RandomCountries';
import UploadMovies from './components/UploadMovies';
import AllMovies from './components/AllMovies';

function App() {
  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-3xl font-bold underline text-blue-500">
        Hello Tailwind CSS!
      </h1>
      <RandomCountries />
      <UploadMovies/> {/* Agrega el componente aqui */}
      <AllMovies/>{/* Agrega el componente aqui */}
    </div>
  );
}

export default App;
