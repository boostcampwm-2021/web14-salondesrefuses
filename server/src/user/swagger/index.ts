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
};

export const userProfileApiParam = {
    name: 'userId',
    type: String,
    require: true,
};

export const updateUserProfileApiOperation = {
    summary: '사용자 프로필 수정 API',
    description: '사용자 이름, SNS ID, 설명, 프로필 사진 등을 수정한다.'
};

export const getInterestArtworksApiOperation = {
    summary: '사용자 관심 작품 조회 API',
    description: '사용자의 관심 작품 목록을 조회한다.'
};

export const getBiddingArtworksApiOperation = {
    summary: '거래중인 작품 조회 API',
    description: '현재 거래중인 작품 목록을 조회한다.'
};
