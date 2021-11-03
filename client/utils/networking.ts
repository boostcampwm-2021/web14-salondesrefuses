import axios from 'axios';

const API_BASE_URL = process.env.API_SERVER_URL;

export const getAllArtworks = (userId: number) => {
    return axios.get(`${API_BASE_URL}/users/${userId}/artworks`);
};
