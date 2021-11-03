import axios from 'axios';

const API_BASE_URL = process.env.API_SERVER_URL;

export const getAllArtworks = (userId: number) => {
    return axios.get(`${API_BASE_URL}/users/${userId}/artworks`);
};

export const signInWithGoogle = (code: string) => {
    return axios.post(`${API_BASE_URL}/auth/google`, JSON.stringify({ code }), {
        headers: { 'Content-Type': 'Application/JSON' },
        withCredentials: true
    });
};

export const signInWithKakao = (code: string) => {
    return axios.post(`${API_BASE_URL}/auth/kakao`, JSON.stringify({ code }), {
        headers: { 'Content-Type': 'Application/JSON' },
        withCredentials: true
    });
};
