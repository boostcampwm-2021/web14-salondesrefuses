import React from 'react';
import styled from '@emotion/styled';

import useToastState from '@store/toastState';

const Toast = () => {
    const [toast] = useToastState();
    return <Container show={toast.show}>{toast.content}</Container>;
};

const Container = styled.div<{ show: boolean }>`
    position: fixed;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(30px);
    width: 350px;
    height: 50px;
    bottom: 100px;
    z-index: ${({ show }) => (show ? '999' : '0')};
    opacity: ${({ show }) => (show ? '1' : '0')};
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    border-radius: 35px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;
    font: ${(props) => props.theme.font.textMd};
    font-size: 1rem;
    point-events: none;

    transition: opacity 0.3s ease-in-out;
`;

export default Toast;
