import { Artwork } from 'interfaces';
import { atom, useRecoilState } from 'recoil';

const editorImageState = atom<Artwork[]>({
    key: '@editor/images',
    default: [],
});

const useEditorImageState = () => useRecoilState(editorImageState);

export default useEditorImageState;
