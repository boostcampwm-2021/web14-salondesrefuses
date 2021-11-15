import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { ExhibitionCardProps } from '@const/card-type';
import Card from '@components/common/Card';
import { getExhibitions } from '@utils/networking';
import { SpaceBetween } from '@styles/common';

const ExhibitionList = ({ filter }: { filter: string }) => {
    const [exhibitions, setExhibitions] = useState<ExhibitionCardProps[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        getExhibitions(filter.toLowerCase(), page).then((res) =>
            setExhibitions([...exhibitions, ...res.data]),
        );
    }, [page]);

    useEffect(() => {
        getExhibitions(filter.toLowerCase(), page).then((res) =>
            setExhibitions(res.data),
        );
    }, [filter]);

    return (
        <Container>
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
