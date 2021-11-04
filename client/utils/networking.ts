import axios from 'axios';

const API_SERVER_URL = process.env.API_SERVER_URL;

export const getAllArtworks = (userId: number) => {
    return axios.get(`${API_SERVER_URL}/users/${userId}/artworks`);
};

export const signIn = (code: string, strategy: string) => {
    return axios.post(`${API_SERVER_URL}/auth/signIn`, JSON.stringify({ code, strategy }), {
        headers: { 'Content-Type': 'Application/JSON' },
        withCredentials: true
    });
};
