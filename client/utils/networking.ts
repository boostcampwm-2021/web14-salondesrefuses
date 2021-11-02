import axios from 'axios';

const API_BASE_URL = 'http://49.50.173.188/api';

export const getAllArtworks = (userId: number) => {
    const result = axios.get(`${API_BASE_URL}/users/${userId}/artworks`);
    return result;
};
