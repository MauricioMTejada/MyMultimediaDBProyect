// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de que esté importado

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter> {/* BrowserRouter solo aquí */}
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
