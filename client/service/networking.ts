import axios from 'axios';
import { Artwork, Auction, Exhibition, PostArtworkResponse, Session } from 'interfaces';
import { AuctionCardProps } from '@const/card-type';

const API_SERVER_URL = process.env.API_SERVER_URL;

export const onResponseSuccess = (statusCode: number) => {
    if (200 <= statusCode && statusCode < 400) return true;
    return false;
};

export const signOut = (userId: string) => {
    return axios.post(`${API_SERVER_URL}/auth/signOut`, {
        userId,
    });
};

export const getUser = () => {
    return axios.get<Session>(`${API_SERVER_URL}/users`, { withCredentials: true });
};

export const getAllArtworks = () => {
    return axios.get<Artwork[]>(`${API_SERVER_URL}/users/artworks`, {
        withCredentials: true,
    });
};

export const getAllBoughtArtworks = (tokens: number[]) => {
    return axios
        .get(`${API_SERVER_URL}/users/artworks/bid?nftTokens=${JSON.stringify(tokens)}`, {
            withCredentials: true,
        })
        .then((res) => res.data);
};

export const getSingleArtwork = (id: number) => {
    return axios.get<Artwork>(`${API_SERVER_URL}/artworks/${id}`, {
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
    return axios.post(`${API_SERVER_URL}/auth/signIn`, JSON.stringify({ code, strategy }), {
        headers: { 'Content-Type': 'Application/JSON' },
        withCredentials: true,
    });
};
export const getRandomExhibitions = () => {
    return axios.get(`${API_SERVER_URL}/exhibitions/random`);
};

export const getExhibitions = (filter: string, page: number) => {
    return axios.get(`${API_SERVER_URL}/exhibitions/${filter}?page=${page}`);
};

export const holdExhibition = (data: FormData) => {
    return axios.post<PostArtworkResponse>(`${API_SERVER_URL}/exhibitions/post`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
export const editExhibition = (data: FormData) => {
    return axios.patch(`${API_SERVER_URL}/exhibitions/update`, data, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

export const getRandomAuctions = () => {
    return axios.get(`${API_SERVER_URL}/auctions/random?status=onSale`);
};

export const getAuctions = (filter: string, page: number) => {
    return axios.get<AuctionCardProps[]>(`${API_SERVER_URL}/auctions/${filter}?page=${page}`);
};

export const getAuction = (auctionId: number) => {
    return axios.get<Auction>(`${API_SERVER_URL}/auctions/${auctionId}`);
};

export const getExhibition = (exhibitionId: string) => {
    return axios.get<Exhibition>(`${API_SERVER_URL}/exhibitions/${exhibitionId}`);
};

export const updateUserData = (data: FormData) => {
    return axios.put(`${API_SERVER_URL}/users`, data, {
        headers: { 'Content-Type': 'multipart-formdata' },
        withCredentials: true,
    });
};

export const getUserArtwork = () => {
    return axios
        .get(`${API_SERVER_URL}/users/artworks`, {
            withCredentials: true,
        })
        .then((res) => res.data);
};

export const getUserArtworkInterest = () => {
    return axios
        .get(`${API_SERVER_URL}/users/artworks/interest`, {
            withCredentials: true,
        })
        .then((res) => res.data);
};

export const getUserArtworkTrades = (filter: string) => {
    return axios
        .get(`${API_SERVER_URL}/users/artworks/${filter === '입찰' ? 'bid' : 'transaction'}`, {
            withCredentials: true,
        })
        .then((res) => res.data);
};

export const getUserExhibitions = () => {
    return axios
        .get(`${API_SERVER_URL}/users/exhibitions`, {
            withCredentials: true,
        })
        .then((res) => res.data);
};

export const setNFTToken = (artworkId: number, nftToken?: string) => {
    return axios.patch(
        `${API_SERVER_URL}/artworks/${artworkId}/nft`,
        { nftToken },
        {
            withCredentials: true,
        },
    );
};
export const getExhibitionIds = () => {
    return axios.get<number[]>(`${API_SERVER_URL}/exhibitions`).then((res) => res.data);
};
