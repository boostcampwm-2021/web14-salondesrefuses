import { Artwork, FontFamily } from 'interfaces';

export enum EditorElementName {
    rectangular = 'RECTANGULAR',
    text = 'TEXT',
    image = 'IMAGE',
}
export type EditorElementType = 'RECTANGULAR' | 'TEXT' | 'IMAGE';
export type EditorElementStyle = {
    top: number;
    left: number;
    transform?: string;
    color?: string;
    backgroundColor?: string;
    width: number | string;
    height: number | string;
    zIndex: number;
    position: 'absolute' | 'flex';
    fontFamily?: FontFamily;
    textAlign?: 'LEFT' | 'CENTER' | 'RIGHT';
    fontSize?: number;
};

export interface EditorElementProp {
    id: number;
    tagName: EditorElementType;
    style: EditorElementStyle;
    image?: Artwork;
    innerHTML?: string;
    imageSrc?: string;
    artworkId?: string;
}
