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

export const getArtworkApiOperation = {
    summary: '특정 작품 조회 API',
    description: '작품 ID로 특정 작품을 조회한다.'
};

export const updateNFTTokenApiOperation = {
    summary: '작품의 NFT TOKEN 수정 API',
    description: '등록한 작품의 NFT 토큰을 발급 받고 저장한다.'
};
