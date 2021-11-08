import React, { useState } from 'react';
import type { NextPage } from 'next';
import Layout from '@components/common/Layout';
import { ExhibitionCardProps } from '@const/card-type';
import Card from '@components/Card';
import Link from 'next/link';
import {
    TopContainer,
    FilterWrapper,
    Filter,
    Buttons,
    BlackButton,
    ExhibitionList,
} from './style';

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
                    <div>
                        <Filter
                            select={onSelect === 'Newest'}
                            onClick={onSelectFilter}
                        >
                            Newest
                        </Filter>
                    </div>
                    <div>
                        <Filter
                            select={onSelect === 'Popular'}
                            onClick={onSelectFilter}
                        >
                            Popular
                        </Filter>
                    </div>
                    <div>
                        <Filter
                            select={onSelect === 'Deadline'}
                            onClick={onSelectFilter}
                        >
                            Deadline
                        </Filter>
                    </div>
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

export interface FilterProps {
    select: boolean;
}

export default ExhibitionPage;
