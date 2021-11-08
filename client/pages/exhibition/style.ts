import styled from '@emotion/styled';
import { Button, SpaceBetween } from '@styles/common';
import { FilterProps } from './index';

export const TopContainer = styled.div`
    display: flex;
    width: 1180px;
    margin: 45px 0;
`;
export const FilterWrapper = styled.div`
    ${SpaceBetween}

    & > div {
        border-left: 1px solid #a6a6a6;
    }

    & > div:first-of-type {
        border-left: none;
    }
`;
export const Filter = styled.button<FilterProps>`
    height: 30px;
    margin: 0px 30px;
    border: none;
    background: none;

    font: ${(props) => props.theme.font.textEnMd};
    border-bottom: ${(props) =>
        props.select ? `1px solid ${props.theme.color.primary}` : ''};
    color: ${(props) =>
        props.select
            ? props.theme.color.primary
            : props.theme.color.placeholder};
    &:hover {
        color: ${(props) => props.theme.color.primary};
    }
`;
export const Buttons = styled.div`
    margin-left: auto;
`;
export const BlackButton = styled(Button)`
    color: black;
    border-bottom: 1px solid black;
    font: ${(props) => props.theme.font.textEnLg};

    &:first-of-type {
        margin-right: 25px;
    }
`;
export const ExhibitionList = styled.div`
    ${SpaceBetween}
    flex-wrap: wrap;

    width: 1180px;

    & > div {
        margin-bottom: 45px;
    }
`;
