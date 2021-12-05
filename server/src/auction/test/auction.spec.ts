import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';

describe('Auction Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    test('메인 페이지 랜덤 경매 작품 조회', async () => {
        const res = await request(app.getHttpServer())
            .get('/auctions/random');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeLessThanOrEqual(3);
    });

    describe('경매 작품 최신순으로 조회', () => {
        test('성공 시 경매 작품 배열 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/auctions/newest')
                .query({ page: 0 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBeLessThanOrEqual(15);
            res.body.forEach(el => {
                expect(el.price).not.toBeNull();
            });
        });

        test('잘못된 page 요청 시 400 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/auctions/newest')
                .query({ page: -1 });

            expect(res.statusCode).toBe(400);
        });
    });

    test('경매 ID로 특정 경매 조회', async () => {
        const res = await request(app.getHttpServer())
            .get('/auctions/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.endAt).not.toBeNull();

        const { artwork, artist } = res.body;
        expect(artwork).not.toBeNull();
        expect(artwork).toHaveProperty('nftToken');
        expect(artist).not.toBeNull();
        expect(artist).toHaveProperty('name');
    });

});
