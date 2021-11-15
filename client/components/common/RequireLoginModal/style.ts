import styled from '@emotion/styled';
import { Center, SpaceAround } from '@styles/common';

export const Container = styled.div`
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
export const Modal = styled.div`
    width: 400px;
    height: 250px;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    box-shadow: 3px 5px 5px rgba(0, 0, 0, 0.1);
    ${SpaceAround};
    flex-direction: column;
    font: ${(props) => props.theme.font.textMd};
`;
