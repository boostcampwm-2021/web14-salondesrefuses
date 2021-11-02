import React from 'react';
import styled from '@emotion/styled';

const ArtworkFilter = ({
    checked,
    setChecked,
}: {
    checked: string;
    setChecked: React.Dispatch<string>;
}) => {
    const onClickArtwork = () => {
        setChecked('artwork');
    };
    const onClickAuction = () => {
        setChecked('auction');
    };
    return (
        <Container>
            <div onClick={onClickArtwork}>
                <img
                    src={
                        checked === 'artwork'
                            ? '/icons/check_green.png'
                            : '/icons/check_grey.png'
                    }
                    alt="only art work"
                />
                <span>Only Artwork</span>
            </div>
            <div onClick={onClickAuction}>
                <img
                    src={
                        checked === 'auction'
                            ? '/icons/check_green.png'
                            : '/icons/check_grey.png'
                    }
                    alt="also on auction"
                />
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
