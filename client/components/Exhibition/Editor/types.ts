export enum EditorElementName {
    rectangular = 'RECTANGULAR',
    text = 'TEXT',
    image = 'IMAGE',
}
export type EditorElementType = 'RECTANGULAR' | 'TEXT' | 'IMAGE';
export type EditorElementStyle = {
    top: number;
    left: number;
    backgroundColor: string;
    size: { width: number; height: number };
    zIndex: number;
};

export interface EditorElementProp {
    type: EditorElementType;
    style: EditorElementStyle;
}
