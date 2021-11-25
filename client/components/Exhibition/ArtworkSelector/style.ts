import styled from '@emotion/styled';
import { Center } from '@styles/common';

export const Container = styled.div`
    width: 100%;
    height: calc(100% - 54px);
    padding: 20px;

    background: #ededed;
`;
export const Tiles = styled.div`
    column-count: 3;
    width: 100%;

    & > div {
        display: inline-block;
        justify-content: center;
        margin: 0 0 1rem;
        position: relative;
    }

    & img {
        width: 100px;
    }
`;
export const Check = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: calc(100% - 5px);
    background-color: rgba(0, 0, 0, 0.4);
    ${Center};
    font: ${(props) => props.theme.font.textEnBase};
    color: white;
`;
