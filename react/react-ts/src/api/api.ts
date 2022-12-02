import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});
