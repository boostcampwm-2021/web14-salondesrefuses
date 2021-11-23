import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ExhibitionArtwork } from 'interfaces';
import { Button, Center } from '@styles/common';

interface Props {
    artwork: ExhibitionArtwork;
    closeModal: () => void;
}

const ExhibitionModal = ({ artwork, closeModal }: Props) => {
    const [showDetail, setShowDetail] = useState(false);
    return (
        <ModalWrapper
            onClick={() => {
                closeModal();
            }}
        >
            <Modal>
                <Img src={artwork.originalImage} alt={artwork.title} onClick={() => setShowDetail(true)} />
                {showDetail && (
                    <DetailContainer onClick={() => setShowDetail(false)}>
                        <div>
                            <P type="XL">{artwork.title}</P>
                            <P type="LG">{artwork.artist}</P>
                            <P type="MD">{artwork.description}</P>
                            {artwork.auctionId && (
                                <a href={`${process.env.BASE_URL}/auction/${artwork.auctionId}`}>
                                    <Button>경매 보러 가기</Button>
                                </a>
                            )}
                        </div>
                    </DetailContainer>
                )}
            </Modal>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000cc;
    z-index: 9100;
`;
const Modal = styled.div`
    z-index: 9200;
`;
const Img = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 70%;
`;
const DetailContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    max-height: 70%;
    width: 80%;
    background-color: #fff;
    opacity: 50%;
`;

const P = styled.p<{ type: string }>`
    font: ${(props) =>
        props.type === 'XL' ? props.theme.font.textEnXl : 'LG' ? props.theme.font.textEnLg : props.theme.font.textEnMd};
`;

export default ExhibitionModal;
