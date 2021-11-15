import React from 'react';
import styled from '@emotion/styled';

import { SpaceBetween } from '@styles/common';
import ArtworkSelector from '../ArtworkSelector';

const index = () => {
    return (
        <ArtworkSelectorWrapper>
            <ArtworkSelectorHeader>
                <Label>작품 선택하기</Label>
            </ArtworkSelectorHeader>
            <ArtworkSelector />
        </ArtworkSelectorWrapper>
    );
};

const ArtworkSelectorWrapper = styled.div`
    width: 470px;
    margin-left: auto;
`;

const ArtworkSelectorHeader = styled.div`
    ${SpaceBetween}
    margin-bottom: 24px;
`;

const Label = styled.label`
    font: ${(props) => props.theme.font.textBase};
`;

export default index;
