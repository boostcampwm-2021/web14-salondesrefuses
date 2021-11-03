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
    border-bottom: 1px solid ${(props) => props.theme.color.gray1};
    font: ${(props) => props.theme.font.textEnBase};
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);
`;

export const LeftContainer = styled.div`
    ${Center}
    flex-grow: 1;
    img {
        height: 30px;
        width: auto;
        cursor: pointer;
    }
    p {
        margin: 0 30px;
        color: ${(props) => props.theme.color.primary};
    }
`;
export const RightContainer = styled.div`
    z-index: 20;
    flex-grow: 1;
    ${Center}
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
    }
    cursor: pointer;
`;
export const SearchBarContainer = styled.div`
    flex-grow: 2;
    input {
        ${Center}
        border: 1px solid ${(props) => props.theme.color.gray1};
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        padding: 10px 20px;
        font: ${(props) => props.theme.font.textEnSm};
    }
`;
