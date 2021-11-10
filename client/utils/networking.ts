import axios from 'axios';
import { Artwork, Auction, PostArtworkResponse } from 'interfaces';
import { AuctionCardProps, ExhibitionCardProps } from '@const/card-type';

const API_SERVER_URL = process.env.API_SERVER_URL;

export const onResponseSuccess = (statusCode: number) => {
    if (200 <= statusCode && statusCode < 400) return true;
    return false;
};

export const getAllArtworks = () => {
    return axios.get<Artwork[]>(`${API_SERVER_URL}/users/artworks`, {
        withCredentials: true,
    });
};

export const postArtwork = (data: FormData) => {
    return axios.post<PostArtworkResponse>(`${API_SERVER_URL}/artworks`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
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
export const getRandomExhibitions = () => {
    return axios.get(`${API_SERVER_URL}/exhibitions/random`);
};

export const getExhibitions = (filter: string, page: number) => {
    return axios.get(`${API_SERVER_URL}/exhibitions/${filter}?page=${page}`);
};

export const getRandomAuctions = () => {
    return axios.get(`${API_SERVER_URL}/auctions/random?status=onSale`);
};

export const getAuctions = (filter: string, page: number) => {
    return axios.get<AuctionCardProps[]>(
        `${API_SERVER_URL}/auctions/${filter}?page=${page}`,
    );
};

export const getAuction = (auctionId: number) => {
    return axios.get<Auction>(`${API_SERVER_URL}/auctions/${auctionId}`);
};
