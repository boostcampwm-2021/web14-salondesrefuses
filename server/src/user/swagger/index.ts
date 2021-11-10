export const getAllUsersArtworksApiOperation = {
    summary: '내 모든 작품 조회 API',
    description: '작품 데이터를 DB에 저장한다.',
};

export const getAllUsersArtworksApiParam = {
    name: 'userId',
    type: Number,
    require: true,
};

export const getUserProfile = {
    summary: '사용자 프로필 조회 API',
    description: '사용자의 프로필을 조회한다.'
}

export const getUserProfileApiParam = {
    name: 'userId',
    type: String,
    require: true,
}
