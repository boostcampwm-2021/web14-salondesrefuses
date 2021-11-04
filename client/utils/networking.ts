import axios from 'axios';
import { Artwork } from 'interfaces';

const API_SERVER_URL = process.env.API_SERVER_URL;

export const getAllArtworks = (userId: number) => {
    return axios.get<Artwork[]>(`${API_SERVER_URL}/users/${userId}/artworks`, {
        withCredentials: true,
    });
};

export const postArtwork = (data: FormData) => {
    return axios.post(`${API_SERVER_URL}/artworks`, {
        withCredentials: true,
        data: data,
    });
};

export const signIn = (code: string, strategy: string) => {
    return axios.post(
        `${API_SERVER_URL}/auth/signIn`,
        JSON.stringify({ code, strategy }),
        {
            headers: { 'Content-Type': 'Application/JSON' },
            withCredentials: true,
        },
    );
};
