// frontend/src/utils/apiConfig.ts
import axios from 'axios';

export const api = axios.create({ // Add export here
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});
