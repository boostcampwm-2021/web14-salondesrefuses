export const getExhibtionIdsApiOperation = {
    summary: '전시회 모든 id 조회 API',
    description: '전시회 모든 id를 조회한다.',
};

export const getRandomExhibitionsAPiOperation = {
    summary: '전시회 랜덤 5개 조회 API',
    description: '랜덤으로 전시회 5개를 조회한다.',
};

export const getNewestExhibitionApiOperation = {
    summary: '최신순 전시회 15개 조회 API',
    description: '최신순으로 전시회 15개를 조회한다.',
};

export const getExhibitionsSortedByDeadlineApiOperation = {
    summary: '마감임박순 전시회 15개 조회 API',
    description: '마감임박순으로 전시회 15개를 조회한다.',
};

export const getExhibitionsSortedByInterestApiOperation = {
    summary: '관심순 전시회 15개 조회 API',
    description: '관심순으로 전시회 15개를 조회한다.',
};

export const holdExhibitionApiBody = {
    schema: {
        type: 'object',
        properties: {
            thumbnail: {
                type: 'string',
                format: 'binary',
                nullable: false,
            },
            title: { type: 'string', nullable: false },
            collaborator: { type: 'string', nullable: false },
            description: { type: 'string', nullable: false },
            startAt: { type: 'date', nullable: true },
            endAt: { type: 'date', nullable: true },
            artworkIds: { type: 'number[]', nullable: true },
            categoryIds: { type: 'number[]', nullable: true },
            contents: { type: 'string', nullable: false },
            size: { type: 'string', nullable: true },
        },
    },
};

export const updateExhibitionApiOperation = {
    summary: '전시회 수정 API',
    description: '전시회의 contents를 수정한다.',
};

export const getSpecificExhibitionApiOperation = {
    summary: '특정 전시회 조회 API',
    description: '전시회의 고유 id로 전시회를 조회한다.',
};
