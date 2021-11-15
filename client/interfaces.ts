export interface Artwork {
    id: number;
    croppedImage: string;
    originalImage: string;
    exhibitionId: number;
    nftToken: string;
    description?: string;
    price: number;
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

export interface Artist {
    id: number;
    name: string;
    snsId: string;
    description: string;
}

export interface Auction {
    id: number;
    startAt: Date;
    endAt: Date;
    artwork: Artwork;
    artist: Artist;
    auctionHistories: string[],
}
