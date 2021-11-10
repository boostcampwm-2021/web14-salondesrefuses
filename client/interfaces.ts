export interface Artwork {
    id: number;
    croppedImage: string;
    originalImage: string;
    exhibitionId: number;
    nftToken: string;
    description?: string;
    price: string;
    status: string;
    title: string;
    type: string;
    artistId: number;
    ownerId: number;
}

export interface PostArtworkResponse {
    id: number;
    nftToken?: string;
}

export interface Auction {
    endAt: string;
    id: number;
    startAt: Date;
    artwork: Artwork;
}
