import { ApiOperationOptions } from '@nestjs/swagger';

export const getAuctionsSortedByNewsestApiOperation: ApiOperationOptions = {
    summary: '옥션 15개 최신순 조회 API - 인피니티 스크롤',
    description: '현재 경매중인 작품 15개씩 조회하는 API page는 0부터 시작',
};

export const getAuctionsSortedByPopularApiOperation: ApiOperationOptions = {
    summary: '옥션 15개 좋아요순 조회 API - 인피니티 스크롤',
    description: '현재 경매중인 작품 15개씩 조회하는 API page는 0부터 시작',
};

export const getAuctionDetailApiOperation: ApiOperationOptions = {
    summary: '옥션 상세 조회 API',
    description:
        '작품의 작가 설명, 현재 경매 가격, 가격 변동 추이, 작품 상세정보를 조회합니다.',
};
