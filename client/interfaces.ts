export interface Artwork {
    id: number;
    croppedImage: string;
    originalImage: string;
    exhibitionId: number;
    cid: string;
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

export interface Exhibition {
    id: number;
    title: string;
    collaborator: string;
    theme: string;
    description: string;
    startAt: Date;
    endAt: Date;
    contents: string;
    thumbnail: string;
    categories: string;
}
