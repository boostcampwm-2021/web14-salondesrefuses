import { Artwork } from 'interfaces';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const selectedImageState = atom<Artwork[]>({
    key: '@editor/selected-images',
    default: [],
});

const editorImageState = atom<Artwork[]>({
    key: '@editor/editor-images',
    default: [],
});

export const useSelectedImageState = () => useRecoilState(selectedImageState);
export const useEditorImageState = () => useRecoilState(editorImageState);
