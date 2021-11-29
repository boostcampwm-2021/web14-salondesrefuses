import styled from '@emotion/styled';
import { SpaceBetween, Center } from '@styles/common';

export const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    padding: 0 100px;
    ${SpaceBetween}
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
    font: ${(props) => props.theme.font.textEnBase};
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    z-index: 9000;
`;

export const LeftContainer = styled.div`
    ${Center}
    flex-grow: 1;
    img {
        height: 30px;
        width: auto;
        cursor: pointer;
    }
    a {
        margin: 0 30px;
        color: ${(props) => props.theme.color.primary};
    }
    justify-content: flex-start;
`;
export const RightContainer = styled.div`
    z-index: 20;
    flex-grow: 1;
    ${Center}
    justify-content: flex-end;
`;

export const ImageContainer = styled.div`
    margin: 0 30px;
`;

export const Hr = styled.div`
    height: 40px;
    width: 1px;
    border-right: 1px solid ${(props) => props.theme.color.blackLight};
`;
export const NavButton = styled.div`
    margin: 0 20px;
    img {
        width: 40px;
        height: auto;
        border-radius: 20px;
    }
    cursor: pointer;
`;
