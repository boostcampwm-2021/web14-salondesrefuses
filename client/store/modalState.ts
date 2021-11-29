import { atom, useRecoilState } from 'recoil';

const modalStore = atom({
    key: '@modal',
    default: {
        show: false,
        content: '',
        onConfirm: () => {},
    },
});

const useModalState = () => useRecoilState(modalStore);
export default useModalState;
