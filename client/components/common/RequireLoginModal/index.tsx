import React, { useEffect } from 'react';

import { BlackButton } from '@styles/common';
import { Container, Modal } from './style';

const RequireLoginModal = ({ close }: { close: () => void }) => {
    useEffect(() => {
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = 'auto';
        };
    }, []);

    return (
        <Container onClick={close}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <div>로그인 후 이용해주세요.</div>
                <BlackButton onClick={close}>확인</BlackButton>
            </Modal>
        </Container>
    );
};

export default RequireLoginModal;
