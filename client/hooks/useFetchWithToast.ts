import { useEffect } from 'react';
import useToastState from '@store/toastState';
import { onResponseSuccess } from 'service/networking';

interface Message {
    onSuccess: string;
    onFailed: string;
}

interface Props {
    f: Function;
    args: any;
    deps: any[];
    msg: Message;
    handler: (d: any) => void;
}

const useFetchWithToast = ({ f, args, deps, msg, handler }: Props) => {
    const [toast, setToast] = useToastState();

    useEffect(() => {
        (async () => {
            const r = await f(args);
            if (onResponseSuccess(r.status)) {
                setToast({ show: true, content: msg.onSuccess });
                handler(r.data);
                setTimeout(() => {
                    setToast({ ...toast, show: false });
                }, 3000);
            } else {
                setToast({ show: true, content: msg.onFailed });
                setTimeout(() => {
                    setToast({ ...toast, show: false });
                }, 3000);
            }
        })();
    }, deps);
};

export default useFetchWithToast;
