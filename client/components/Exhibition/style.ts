import styled from '@emotion/styled';
import { Button, SpaceBetween } from '@styles/common';
import { FilterProps } from '../../pages/exhibition/index';

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
export const Input = styled.input`
    width: 100%;
    padding: 4px 12px;
    border: none;
    border-bottom: 1px solid #a6a6a6;

    font: ${(props) => props.theme.font.textBase};
    color: ${(props) => props.theme.color.blackLight};

    &:focus {
        border-bottom: 2px solid ${(props) => props.theme.color.primary};
        color: ${(props) => props.theme.color.black};
    }

    &:focus-visible {
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.color.placeholder};
    }

    &[type='date'] {
        width: 150px;
        padding-right: 4px;

        &::-webkit-calendar-picker-indicator {
            margin: 0;
        }
    }
`;
export const TextArea = styled.textarea`
    width: 100%;
    height: 150px;
    padding: 4px 12px;
    border: 1px solid #a6a6a6;

    font: ${(props) => props.theme.font.textBase};
    color: ${(props) => props.theme.color.blackLight};

    resize: none;

    &:focus {
        border: 2px solid ${(props) => props.theme.color.primary};
        color: ${(props) => props.theme.color.black};
    }

    &:focus-visible {
        outline: none;
    }

    &::placeholder {
        color: ${(props) => props.theme.color.placeholder};
    }
`;
export const Label = styled.label`
    font: ${(props) => props.theme.font.textBase};
`;

export const Description = styled.p`
    font: ${(props) => props.theme.font.textEnSm};
    color: ${(props) => props.theme.color.gray1};
`;

export const ThumbnailBox = styled.span`
    width: 120px;
    height: 120px;

    border: 1px solid #a6a6a6;
`;

export const NextButton = styled(BlackButton)`
    position: absolute;
    top: -90px;
    right: 0;

    margin-right: 0 !important;

    font: ${(props) => props.theme.font.textBase};
`;
