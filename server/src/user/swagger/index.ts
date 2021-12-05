export const getUsersArtworksApiOperation = {
    summary: '사용자 작품 조회 API',
    description: '사용자의 작품 목록을 조회한다.',
};

export const getUserProfile = {
    summary: '사용자 프로필 조회 API',
    description: '사용자의 프로필을 조회한다.'
};

export const updateUserProfileApiOperation = {
    summary: '사용자 프로필 수정 API',
    description: '사용자 이름, SNS ID, 설명, 프로필 사진 등을 수정한다.'
};

export const updateUserProfileApiBody = {
    schema: {
        type: 'object',
        properties: {
            image: {
                type: 'string',
                format: 'binary',
                nullable: true,
            },
            name: { type: 'string', nullable: true },
            snsId: { type: 'string', nullable: true },
            description: { type: 'string', nullable: true },
        },
    },
};

export const getInterestArtworksApiOperation = {
    summary: '사용자 관심 작품 조회 API',
    description: '사용자의 관심 작품 목록을 조회한다.'
};

export const getBiddingArtworksApiOperation = {
    summary: '거래중인 작품 조회 API',
    description: '사용자가 현재 거래중인 작품 목록을 조회한다.'
};

export const getBiddedArtworksApiOperation = {
    summary: '입찰한 작품 조회 API',
    description: '사용자가 입찰한 작품 목록을 조회한다.'
};

export const getUsersExhibitionsApiOperation = {
    summary: '사용자 전시회 조회 API',
    description: '사용자의 전시회 목록을 조회한다.'
}
