import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { BlackButton, Center, SpaceAround } from '@styles/common';

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

const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    ${Center}
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    z-index: 999;
`;

const Modal = styled.div`
    width: 400px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
    ${SpaceAround};
    flex-direction: column;
    font: ${(props) => props.theme.font.textMd};
`;

export default RequireLoginModal;
