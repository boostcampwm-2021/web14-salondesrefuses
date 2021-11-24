import styled from '@emotion/styled';
import React, { useState } from 'react';
import { ExhibitionArtwork } from 'interfaces';
import { BlackButton } from '@styles/common';
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
                                <P type="BASE">{artwork.description}</P>
                                {artwork.auctionId && (
                                    <Link href={`/auction/${artwork.auctionId}`}>
                                        <ToAuction>경매 보러 가기 </ToAuction>
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
    cursor: pointer;
    img {
        height: 100%;
    }
`;
const DetailContainer = styled.div`
    position: absolute;
    padding: 10%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    backdrop-filter: blur(5px);
    background-color: #ffffff4d;
`;
const ToAuction = styled(BlackButton)`
    position: absolute;
    top: 85%;
    left: 75%;
`;

const P = styled.p<{ type: string }>`
    font: ${(props) =>
        props.type === 'XL'
            ? props.theme.font.textEnTitle
            : 'LG'
            ? props.theme.font.textEnLg
            : props.theme.font.textEnBase};
    margin-bottom: 30px;
`;

export default ExhibitionModal;
