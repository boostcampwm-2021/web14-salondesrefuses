import useToastState from '@store/toastState';

interface Message {
    onSuccess: string;
    onFailed: string;
}

const useToast = (msg: Message) => {
    const [toast, setToast] = useToastState();

    const showToast = (state: string) => {
        setToast({ show: true, content: state === 'success' ? msg.onSuccess : msg.onFailed });
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, TOAST_DURATION);
    };

    return showToast;
};

const TOAST_DURATION = 3000;

export default useToast;
