import styled from '@emotion/styled';
import { Center } from '@styles/common';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    ${Center}
`;
export const LogoContainer = styled.div`
    ${Center}
    img {
        width: 70px;
        height: auto;
    }
    p {
        margin-left: 10px;
        font: ${(props) => props.theme.font.textEnSm};
        padding: 8px;
        border-bottom: 1px solid ${(props) => props.theme.color.primary};
    }
`;

export const Text = styled.p`
    margin: 70px 0 30px 0;
    text-align: center;
    font: ${(props) => props.theme.font.textBase};
    color: ${(props) => props.theme.color.black};
`;

export const Hr = styled.div`
    margin: auto;
    width: 50%;
    border-bottom: 1px solid ${(props) => props.theme.color.primary};
`;

export const Copyright = styled.p`
    text-align: center;
    margin: 140px auto 40px auto;
    color: ${(props) => props.theme.color.placeholder};
    font: ${(props) => props.theme.font.textEnSm};
`;
