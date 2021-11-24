import React from 'react';
import styled from '@emotion/styled';

interface IFilter {
    filtering: string[];
    current: string;
    filterHandler: (s: string) => void;
}

const Filter = ({ filtering, current, filterHandler }: IFilter) => {
    const onClickItem = (item: string) => {
        return (e: React.MouseEvent) => {
            filterHandler(item);
        };
    };

    return (
        <Container>
            {filtering.map((item, idx) => {
                return (
                    <Item onClick={onClickItem(item)} active={current === item} key={idx}>
                        {item}
                    </Item>
                );
            })}
        </Container>
    );
};

const Container = styled.div`
    height: 30px;
    display: flex;
    margin-bottom: 40px;

    & > div:nth-of-type(2) {
        border: none;
    }
`;

const Item = styled.div<{ active: boolean }>`
    font: ${(props) => props.theme.font.textMd};
    color: ${(props) => (props.active ? props.theme.color.primary : props.theme.color.placeholder)};
    padding: 0 20px;
    border-right: 1px solid #a6a6a6;
    cursor: pointer;
`;

export default Filter;
