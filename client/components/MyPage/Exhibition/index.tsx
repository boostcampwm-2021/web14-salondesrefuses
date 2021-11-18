import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { ExhibitionCardProps } from '@const/card-type';
import { getUserExhibitions } from '@utils/networking';
import Card from '@components/common/Card';

const ExhibitionPage = () => {
    const [exhibitions, setExhibitions] = useState<ExhibitionCardProps[]>([]);

    useEffect(() => {
        getUserExhibitions().then((res) => {
            setExhibitions(res.data);
        });
    }, []);

    return (
        <Container>
            {exhibitions &&
                exhibitions.map((exhibition, idx) => {
                    return <Card width="md" content={exhibition} key={idx} />;
                })}
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
`;

export default ExhibitionPage;
