export interface Artwork {
    id: number;
    croppedImage: string;
    originalImage: string;
    exhibitionId: number;
    nftToken: string;
    price: string;
    status: string;
    title: string;
    type: string;
}

export interface PostArtworkResponse {
    id: number;
    title: string;
    type: string;
    description: string;
    status: string;
    price?: string;
    nftToken?: string;
    originalImage: string;
    croppedImage: string;
    exhibitionId?: string;
    auction?: Auction;
}

export interface Auction {
    endAt: string;
    id: number;
    startAt: Date;
}
