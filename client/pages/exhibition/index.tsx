import React, { useState } from 'react';
import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { Button, SpaceBetween } from '@styles/common';
import Layout from '@components/common/Layout';
import { ExhibitionCardProps } from '@const/card-type';
import Card from '@components/Card';
import Link from 'next/link';

const dummyExihibition: ExhibitionCardProps[] = [
    {
        id: 1,
        title: '제목',
        description: '설명',
        artist: '작가',
        imgSrc: 'https://lh3.googleusercontent.com/BS-RVzJM5otwbPEtfNwM2uQY0n8hc37CNGiSLVGHKrlZzZej3flmJ1GlzYD7gWzGXYzuvtU053yfPYPyEcAFzsB5OdRBw0Ruyy0u=w600',
        category: '사진',
        theme: '부스트캠프',
        artCount: 3,
        isSale: true,
    },
    {
        id: 2,
        title: '제목',
        description: '설명',
        artist: '작가',
        imgSrc: 'https://lh3.googleusercontent.com/d2Df1yJtBUGvtcU85joQlgmAYkfNgOzY5rx6FbplJ91xvLbBiPmIt5qRlQBtSHkh2lKfAQuUVE4k2m34sywuwT-DZXKPRYoZfdiFlA=w600',
        category: '사진',
        theme: '부스트캠프',
        artCount: 3,
        isSale: true,
    },
    {
        id: 3,
        title: '제목',
        description: '설명',
        artist: '작가',
        imgSrc: 'https://lh3.googleusercontent.com/O7OdPM5UVc97cWRDvGIHg8hTqireb0YTA7ocwpz8fvWb4xgrFFt5x391saO27hzp0PwLRcTseEPLSgolpYQNgRWm8egseUI_33fZOg=w600',
        category: '사진',
        theme: '부스트캠프',
        artCount: 3,
        isSale: true,
    },
    {
        id: 4,
        title: '제목',
        description: '설명',
        artist: '작가',
        imgSrc: 'https://lh3.googleusercontent.com/BS-RVzJM5otwbPEtfNwM2uQY0n8hc37CNGiSLVGHKrlZzZej3flmJ1GlzYD7gWzGXYzuvtU053yfPYPyEcAFzsB5OdRBw0Ruyy0u=w600',
        category: '사진',
        theme: '부스트캠프',
        artCount: 3,
        isSale: true,
    },
    {
        id: 5,
        title: '제목',
        description: '설명',
        artist: '작가',
        imgSrc: 'https://lh3.googleusercontent.com/d2Df1yJtBUGvtcU85joQlgmAYkfNgOzY5rx6FbplJ91xvLbBiPmIt5qRlQBtSHkh2lKfAQuUVE4k2m34sywuwT-DZXKPRYoZfdiFlA=w600',
        category: '사진',
        theme: '부스트캠프',
        artCount: 3,
        isSale: true,
    },
    {
        id: 6,
        title: '제목',
        description: '설명',
        artist: '작가',
        imgSrc: 'https://lh3.googleusercontent.com/O7OdPM5UVc97cWRDvGIHg8hTqireb0YTA7ocwpz8fvWb4xgrFFt5x391saO27hzp0PwLRcTseEPLSgolpYQNgRWm8egseUI_33fZOg=w600',
        category: '사진',
        theme: '부스트캠프',
        artCount: 3,
        isSale: true,
    },
];

const ExhibitionPage: NextPage = () => {
    const [onSelect, setOnSelect] = useState<string>('Newest');

    const onSelectFilter = ({ currentTarget }: React.MouseEvent) => {
        setOnSelect(currentTarget.textContent || 'Newest');
    };

    return (
        <Layout>
            <TopContainer>
                <FilterWrapper>
                    <Filter
                        select={onSelect === 'Newest'}
                        onClick={onSelectFilter}
                    >
                        Newest
                    </Filter>
                    <Filter
                        select={onSelect === 'Popular'}
                        onClick={onSelectFilter}
                    >
                        Popular
                    </Filter>
                    <Filter
                        select={onSelect === 'Deadline'}
                        onClick={onSelectFilter}
                    >
                        Deadline
                    </Filter>
                </FilterWrapper>

                <Buttons>
                    <BlackButton>Hold Exhibition</BlackButton>
                    <Link href="/artwork/post">
                        <BlackButton>Post Artwork</BlackButton>
                    </Link>
                </Buttons>
            </TopContainer>

            <ExhibitionList>
                {dummyExihibition.map((exihibition) => (
                    <Card
                        key={exihibition.id}
                        width="lg"
                        content={exihibition}
                    />
                ))}
            </ExhibitionList>
        </Layout>
    );
};

interface FilterProps {
    select: boolean;
}

const TopContainer = styled.div`
    display: flex;
    width: 1180px;
    margin: 45px 0;
`;

const FilterWrapper = styled.div`
    ${SpaceBetween}
`;

const Filter = styled.button<FilterProps>`
    height: 30px;
    padding: 0px 30px;
    border: none;
    border-left: 1px solid #a6a6a6;

    font: ${(props) =>
        props.select ? props.theme.font.textEnLg : props.theme.font.textEnMd};
    color: ${(props) => (props.select ? props.theme.color.primary : '#757575')};

    background: none;

    &:first-of-type {
        border-left: none;
    }
`;

const Buttons = styled.div`
    margin-left: auto;
`;

const BlackButton = styled(Button)`
    color: black;
    border-bottom: 1px solid black;
    font: ${(props) => props.theme.font.textEnLg};

    &:first-of-type {
        margin-right: 25px;
    }
`;

const ExhibitionList = styled.div`
    ${SpaceBetween}
    flex-wrap: wrap;

    width: 1180px;

    & > div {
        margin-bottom: 45px;
    }
`;

export default ExhibitionPage;
