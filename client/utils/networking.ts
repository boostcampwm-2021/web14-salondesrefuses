import axios from 'axios';

const API_BASE_URL = process.env.API_SERVER_URL;

export const getAllArtworks = (userId: number) => {
    return axios.get(`${API_BASE_URL}/users/${userId}/artworks`);
};

export const signIn = (code: string, strategy: string) => {
    return axios.post(`http://localhost:3001/api/auth/signIn`, JSON.stringify({ code, strategy }), {
        headers: { 'Content-Type': 'Application/JSON' },
        withCredentials: true
    });
};
