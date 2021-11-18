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
    width: 300px;
    height: 50px;
    bottom: 100px;
    z-index: 999;
    opacity: ${(props) => (props.show ? '1' : '0')};
    display: flex;
    justify-content: center;
    gap: 20px;
    align-items: center;
    border-radius: 35px;
    backdrop-filter: 3px 5px 5px rgba(0, 0, 0, 0.1);
    font: ${(props) => props.theme.font.textMd};
    font-size: 1rem;

    transition: opacity 0.3s ease-in-out;
`;

export default Toast;
