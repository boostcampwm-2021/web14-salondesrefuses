import React from 'react';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

import { SpaceBetween } from '@styles/common';
import CSuspense from '@components/common/Suspense';
import ErrorBoundary from '@components/common/ErrorBoundary';
import Fallback from '@components/common/Fallback';

const ArtworkSelector = dynamic(() => import('@components/Exhibition/ArtworkSelector'), { ssr: false });

const ArtworkSelectorWrapper = () => {
    return (
        <Container>
            <ArtworkSelectorHeader>
                <Label>작품 선택하기</Label>
            </ArtworkSelectorHeader>
            <ErrorBoundary fallback={<div>...failed</div>}>
                <CSuspense fallback={<Fallback />}>
                    <ArtworkSelector />
                </CSuspense>
            </ErrorBoundary>
        </Container>
    );
};

const Container = styled.div`
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

export default ArtworkSelectorWrapper;
