import React from 'react';
import styled from '@emotion/styled';

import { Label } from '@components/Exhibition/style';
import { SpaceBetween } from '@styles/common';
import Selector from './Selector';

const index = () => {
    return (
        <ArtworkSelectorWrapper>
            <ArtworkSelectorHeader>
                <Label>작품 선택하기</Label>
                <Link href="#">작품 추가하기</Link>
            </ArtworkSelectorHeader>
            <Selector />
        </ArtworkSelectorWrapper>
    );
};

export const ArtworkSelectorWrapper = styled.div`
    width: 470px;
    margin-left: auto;
`;

export const ArtworkSelectorHeader = styled.div`
    ${SpaceBetween}
    margin-bottom: 24px;
`;

export default index;
