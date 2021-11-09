import { useEffect, useState } from 'react';
import parseCookie from '@utils/parseCookie';

const useHandleRequireLoginModal = () => {
    const [requireLoginModal, setRequireLoginModal] = useState(false);
    let accessToken: string | undefined;

    useEffect(() => {
        accessToken = parseCookie()('accessToken');
    }, []);

    const onClickPostArtworkWithoutLogin = () => {
        setRequireLoginModal(true);
    };

    const closeModal = () => {
        setRequireLoginModal(false);
    };

    return {
        accessToken,
        requireLoginModal,
        onClickPostArtworkWithoutLogin,
        closeModal,
    };
};

export default useHandleRequireLoginModal;
