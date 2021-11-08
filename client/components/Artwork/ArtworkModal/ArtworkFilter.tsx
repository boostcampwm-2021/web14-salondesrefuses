import React from 'react';
import styled from '@emotion/styled';

const ArtworkFilter = ({
    checked,
    setChecked,
}: {
    checked: string;
    setChecked: React.Dispatch<string>;
}) => {
    const getColor = (checked: string) =>
        checked === 'artwork'
            ? '/icons/check_green.png'
            : '/icons/check_grey.png';

    return (
        <Container>
            <div onClick={() => setChecked('artwork')}>
                <img src={getColor(checked)} alt="only art work" />
                <span>Only Artwork</span>
            </div>
            <div onClick={() => setChecked('auction')}>
                <img src={getColor(checked)} alt="also on auction" />
                <span>Also On Auction</span>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;

    & > div {
        display: flex;
        align-items: center;
        margin-right: 30px;
    }

    & span {
        color: white;
        font-size: 24px;
        font-weight: 200;
        margin-left: 10px;
    }

    & img {
        width: 32px;
        height: 32px;
        border: none;
        box-shadow: none;
    }
`;

export default ArtworkFilter;
