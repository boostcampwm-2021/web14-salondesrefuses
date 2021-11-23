import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ExhibitionArtwork } from 'interfaces';
import { Button, Center } from '@styles/common';
import Link from 'next/link';

interface Props {
    artwork: ExhibitionArtwork;
    closeModal: () => void;
}

const ExhibitionModal = ({ artwork, closeModal }: Props) => {
    const [showDetail, setShowDetail] = useState(false);
    const onModalClick = (e: React.MouseEvent<HTMLImageElement | HTMLDivElement, MouseEvent>, flag: boolean) => {
        e.stopPropagation();
        setShowDetail(flag);
    };
    return (
        <ModalWrapper onClick={() => closeModal()}>
            <Modal>
                <ImgDiv>
                    <img src={artwork.originalImage} alt={artwork.title} onClick={(e) => onModalClick(e, true)} />

                    {showDetail && (
                        <DetailContainer onClick={(e) => onModalClick(e, false)}>
                            <div>
                                <P type="XL">{artwork.title}</P>
                                <P type="LG">{artwork.artist}</P>
                                <P type="MD">{artwork.description}</P>
                                {artwork.auctionId && (
                                    <Link href={`/auction/${artwork.auctionId}`}>
                                        <Button>경매 보러 가기 </Button>
                                    </Link>
                                )}
                            </div>
                        </DetailContainer>
                    )}
                </ImgDiv>
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
const ImgDiv = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 70%;

    img {
        height: 100%;
    }
`;
const DetailContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    backdrop-filter: blur(5px);
    background-color: #ffffff4d;
`;

const P = styled.p<{ type: string }>`
    font: ${(props) =>
        props.type === 'XL' ? props.theme.font.textEnXl : 'LG' ? props.theme.font.textEnLg : props.theme.font.textEnMd};
`;

export default ExhibitionModal;
