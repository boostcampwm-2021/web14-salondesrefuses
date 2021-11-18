import { atom, selector, useRecoilState } from 'recoil';

interface IToastState {
    show: boolean;
    content: string;
}

const toastState = atom<IToastState>({
    key: '@toast',
    default: {
        show: false,
        content: '',
    },
});

const useToastState = () => useRecoilState(toastState);
export default useToastState;
