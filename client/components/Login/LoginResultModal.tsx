import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@styles/common';

interface ModalProps {
    message: string;
    close: React.Dispatch<{
        type: string;
    }>;
}

const LoginResultModal = ({ message, close }: ModalProps) => {
    const onClickCloseOrOuterModal = () => {
        close({ type: '' });
    };
    return (
        <Container onClick={onClickCloseOrOuterModal}>
            <Modal>
                <span>{message}</span>
                <ModalButton onClick={onClickCloseOrOuterModal}>
                    확인
                </ModalButton>
            </Modal>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0, 3);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    width: 400px;
    height: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: -2px 3px 5px 5px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);

    & > span {
        font: ${(props) => props.theme.font.textMd};
    }
`;

const ModalButton = styled(Button)`
    color: black;
    border-color: black;
`;

export default LoginResultModal;
