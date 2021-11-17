import { atom, useRecoilState } from 'recoil';

interface IToastState {
    show: boolean;
    success: true;
    content: string;
}

const toastState = atom<IToastState>({
    key: '@toast',
    default: {
        show: false,
        success: true,
        content: '',
    },
});

const useToastState = () => useRecoilState(toastState);
export default useToastState;
