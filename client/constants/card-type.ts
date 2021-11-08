export interface ExhibitionCardProps {
    title: string;
    description?: string;
    artist: string;
    imgSrc: string;
    category: string;
    theme: string;
    artCount: number;
    isSale: boolean;
    id: number;
}
export interface AuctionCardProps {
    title: string;
    description?: string;
    artist: string;
    imgSrc: string;
    price?: number;
    id: number;
}
export const CardSize = {
    md: 300,
    lg: 360,
};
