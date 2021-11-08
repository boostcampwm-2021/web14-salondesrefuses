export interface Artwork {
    id: number;
    imagePath: string;
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
