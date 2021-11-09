export const createArtWorkApiOperation = {
    summary: '작품 등록 API',
    description: '작품 데이터를 DB에 저장한다.',
};

export const createArtworkApiBody = {
    schema: {
        type: 'object',
        properties: {
            image: {
                type: 'string',
                format: 'binary',
                nullable: false,
            },
            title: { type: 'string', nullable: false },
            type: { type: 'string', nullable: false },
            description: { type: 'string', nullable: false },
            isRegisterAuction: { type: 'boolean', nullable: true },
            endAt: { type: 'date', nullable: true },
        },
    },
};

export const interestApiOperation = {
    summary: '작품 좋아요 등록/해제 API',
    description: 'isInterest 값이 true면 등록/false면 해제',
};
