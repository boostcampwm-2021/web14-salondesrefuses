import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Exhibition, ExhibitionArtwork } from 'interfaces';
import ExhibitionContents from './ExhibitionContents';
import ExhibitionModal from './ExhibitionModal';

const ExhbitionDetail = ({ exhibition }: { exhibition: Exhibition }) => {
    const [modalArtwork, setModalArtwork] = useState<ExhibitionArtwork | null>(null);
    const [showModalArtwork, setShowModalArtwork] = useState(false);
    // const artworks = exhibition.artworks.map((artwork) => JSON.parse(artwork));
    const setModalNum = (n: string | undefined) => {
        if (!n) return;
        let artwork = exhibition.artworks.find((art) => art.id === +n);
        setModalArtwork(artwork || null);
        setShowModalArtwork(true);
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        document.body.style.overflow = 'scroll';
        setShowModalArtwork(false);
        setModalArtwork(null);
    };
    return (
        <ExhibitionContainer>
            {showModalArtwork && modalArtwork && <ExhibitionModal artwork={modalArtwork} closeModal={closeModal} />}
            <div>
                <ExhibitionDescription>
                    <TitleContainer>
                        <Title>{exhibition.title}</Title>
                        <Artist>{exhibition.collaborator}</Artist>
                    </TitleContainer>
                    <Description>{exhibition.description}</Description>
                </ExhibitionDescription>
                <ExhibitionContents contents={exhibition.contents} size={exhibition.size} setModalNum={setModalNum} />
            </div>
        </ExhibitionContainer>
    );
};

const ExhibitionContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 50px 100px;
    justify-content: center;
    margin-bottom: 200px;
`;

const ExhibitionDescription = styled.div`
    width: auto;
    margin-bottom: 100px;
`;
const TitleContainer = styled.div`
    border-left: 1px solid ${(props) => props.theme.color.blackLight};
    padding: 30px;
    margin-bottom: 50px;
`;
const Title = styled.p`
    font: ${(props) => props.theme.font.textEnXl};
    margin-bottom: 30px;
`;
const Artist = styled.p`
    font: ${(props) => props.theme.font.textEnLg};
`;
const Description = styled.p`
    font: ${(props) => props.theme.font.textEnMd};
    text-align: center;
    padding: 0 90px;
`;
export default ExhbitionDetail;
