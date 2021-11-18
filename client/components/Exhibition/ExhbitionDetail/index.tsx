import React from 'react';
import styled from '@emotion/styled';

import { Exhibition } from 'interfaces';
import ExhibitionContents from './ExhibitionContents';

const ExhbitionDetail = ({ exhibition }: { exhibition: Exhibition }) => {
    return (
        <ExhibitionContainer>
            <div>
                <ExhibitionDescription>
                    <TitleContainer>
                        <Title>{exhibition.title}</Title>
                        <Artist>{exhibition.collaborator}</Artist>
                    </TitleContainer>
                    <Description>{exhibition.description}</Description>
                </ExhibitionDescription>
                <ExhibitionContents contents={exhibition.contents} size={exhibition.size} />
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
