import useToastState from '@store/toastState';

interface Message {
    onSuccess: string;
    onFailed: string;
}

const useToast = (msg: Message) => {
    const [toast, setToast] = useToastState();

    const showToast = (state: string) => {
        setToast({ show: true, content: state === 'succeess' ? msg.onSuccess : msg.onFailed });
        setTimeout(() => {
            setToast({ ...toast, show: false });
        }, 3000);
    };

    return showToast;
};

export default useToast;
