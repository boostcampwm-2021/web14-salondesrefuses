import { Exhibition } from '../exhibition.entity';

export const getRandomExhibitionsAPiOperation = {
    summary: '전시회 랜덤 5개 조회 API',
    description: '랜덤으로 전시회 5개를 조회한다.',
}

export const getRandomExhibitionApiResponse = {
    description: '전시회 객체 5개 배열',
    type: Exhibition,
    isArray: true,
}

export const getNewestExhibitionApiOperation = {
    summary: '최신순 전시회 15개 조회 API',
    description: '최신순으로 전시회 15개를 조회한다.'
}

export const getExhibitionApiResponse = {
    description: '전시회 객체 15개 배열',
    type: Exhibition,
    isArray: true,
}

export const getExhibitionsSortedByDeadlineApiOperation = {
    summary: '마감임박순 전시회 15개 조회 API',
    description: '마감임박순으로 전시회 15개를 조회한다.'
};

export const getExhibitionsSortedByInterestApiOperation = {
    summary: '관심순 전시회 15개 조회 API',
    description: '관심순으로 전시회 15개를 조회한다.'
}
