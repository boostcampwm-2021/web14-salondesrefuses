import React, { useState, useEffect } from 'react';

import { ExhibitionCardProps } from '@const/card-type';
import Card from '@components/common/Card';
import { getExhibitions } from 'service/networking';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { Grid } from '@components/common/Card/style';

const ExhibitionList = ({ filter }: { filter: string }) => {
    const [exhibitions, setExhibitions] = useState<ExhibitionCardProps[]>([]);
    const [page, setPage] = useState(0);
    const gridRef = useInfiniteScroll(() => setPage((page) => page + 1), exhibitions);

    useEffect(() => {
        getExhibitions(filter.toLowerCase(), page).then((res) => {
            setExhibitions([...exhibitions, ...res.data]);
        });
    }, [page]);

    useEffect(() => {
        getExhibitions(filter.toLowerCase(), 0).then((res) => setExhibitions(res.data));
        setPage((page) => 0);
    }, [filter]);

    return (
        <Grid ref={gridRef}>
            {exhibitions.map((exihibition, idx) => (
                <Card key={idx} width="lg" content={exihibition} />
            ))}
        </Grid>
    );
};

export default ExhibitionList;
