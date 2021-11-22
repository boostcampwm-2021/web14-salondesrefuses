import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';

import { ExhibitionCardProps } from '@const/card-type';
import Card from '@components/common/Card';
import { getExhibitions } from '@utils/networking';
import { SpaceBetween } from '@styles/common';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

const ExhibitionList = ({ filter }: { filter: string }) => {
    const [exhibitions, setExhibitions] = useState<ExhibitionCardProps[]>([]);
    console.log(exhibitions && exhibitions[0]);
    const [page, setPage] = useState(0);
    const gridRef = useInfiniteScroll(() => setPage((page) => page + 1), exhibitions);

    useEffect(() => {
        getExhibitions(filter.toLowerCase(), page).then((res) => {
            setExhibitions([...exhibitions, ...res.data]);
        });
    }, [page]);

    useEffect(() => {
        getExhibitions(filter.toLowerCase(), page).then((res) => setExhibitions(res.data));
    }, [filter]);

    return (
        <Container ref={gridRef}>
            {exhibitions.map((exihibition, idx) => (
                // TODO : idx를 id로 교체해야하는데 굳이 할필요 없기도 함
                <Card key={idx} width="lg" content={exihibition} />
            ))}
        </Container>
    );
};

const Container = styled.div`
    ${SpaceBetween}
    flex-wrap: wrap;

    width: 1180px;

    & > div {
        margin-bottom: 45px;
    }
`;

export default ExhibitionList;
