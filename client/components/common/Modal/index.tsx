import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';

import { BlackButton, Center, SpaceAround } from '@styles/common';
import useModalState from '@store/modalState';

const Modal = () => {
    const [modalState, setModalState] = useModalState();
    const modalRef = useRef<HTMLDivElement | null>(null);

    const onClickOuterModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.target === modalRef.current) return;
        setModalState({ ...modalState, show: false });
        modalState.onConfirm();
    };

    useEffect(() => {
        if (modalState.show) {
            document.documentElement.style.overflow = 'hidden';

            return () => {
                document.documentElement.style.overflow = 'auto';
            };
        }
    }, [modalState.show]);

    return (
        <>
            {modalState.show && (
                <Container onClick={onClickOuterModal}>
                    <Body ref={modalRef}>
                        <div>{modalState.content}</div>
                        <BlackButton onClick={modalState.onConfirm}>확인</BlackButton>
                    </Body>
                </Container>
            )}
        </>
    );
};

export const Container = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0px;
    left: 0px;
    ${Center}
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9999;
`;
export const Body = styled.div`
    width: 400px;
    height: 250px;
    border-radius: 12px;
    background-color: rgba(255, 255, 255, 0.35);
    backdrop-filter: blur(10px);
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
    ${SpaceAround};
    flex-direction: column;
    font: ${(props) => props.theme.font.textMd};
`;

export default Modal;
