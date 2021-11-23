import styled from '@emotion/styled';
import React from 'react';
import { ExhibitionArtwork } from 'interfaces';

const ExhibitionModal = ({ artwork }: { artwork: ExhibitionArtwork }) => {
    console.log('modal', artwork);
    return (
        <ModalWrapper>
            <Modal></Modal>
        </ModalWrapper>
    );
};

const ModalWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #000000;
    opacity: 50%;
    z-index: 9999;
`;
const Modal = styled.div``;

export default ExhibitionModal;
