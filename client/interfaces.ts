export interface Session {
    id: number;
    userId: string;
    name: string;
    snsId: any;
    description: string | null;
    avatar: string;
    loginStrategy: string;
}

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
    year: string;
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
    price: string;
    artwork: Artwork;
    artist: Artist;
    auctionHistories: string[];
}

export interface ExhibitionArtwork {
    artist: string;
    auctionId: number;
    croppedImage: string;
    description: string;
    id: number;
    originalImage: string;
    title: string;
    type: string;
}

export interface Exhibition {
    id: number;
    artistId: number;
    title: string;
    collaborator: string;
    theme: string;
    description: string;
    startAt: Date;
    endAt: Date;
    contents: string;
    thumbnail: string;
    categories: string;
    size: string;
    artworks: ExhibitionArtwork[];
}

export type FontFamily = 'Montserrat' | 'Noto Sans KR';

export interface FontStyle {
    align: 'LEFT' | 'CENTER' | 'RIGHT';
    fontSize: number;
    fontFamily: FontFamily;
}
