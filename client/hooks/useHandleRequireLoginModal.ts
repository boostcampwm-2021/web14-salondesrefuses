import { useEffect, useState } from 'react';

const useHandleRequireLoginModal = () => {
    const [requireLoginModal, setRequireLoginModal] = useState(false);

    const onClickPostArtworkWithoutLogin = () => {
        setRequireLoginModal(true);
    };

    const closeModal = () => {
        setRequireLoginModal(false);
    };

    return {
        requireLoginModal,
        onClickPostArtworkWithoutLogin,
        closeModal,
    };
};

export default useHandleRequireLoginModal;
