import { Artwork } from 'interfaces';

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
    backgroundColor: string;
    width: number | string;
    height: number | string;
    zIndex: number;
};

export interface EditorElementProp {
    type: EditorElementType;
    style: EditorElementStyle;
    image?: Artwork;
    innerText?: string;
}
