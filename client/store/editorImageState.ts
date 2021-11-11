import { Artwork } from 'interfaces';
import { atom, useRecoilState } from 'recoil';

const editorImageState = atom<Artwork[]>({
    key: '@editor/images',
    default: [],
});

export default () => useRecoilState(editorImageState);
