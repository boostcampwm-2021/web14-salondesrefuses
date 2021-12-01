import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomAuthGuard } from '@auth/guard/customAuthGuard';

describe('Exhibition Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const mockGuard: CanActivate = { canActivate: jest.fn(
                (context: ExecutionContext): boolean => {
                    const req = context.switchToHttp().getRequest();
                    const { isValid } = req.cookies;

                    if(isValid == 'false') {
                        return false;
                    }
                    return true;
                }
            )};

        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).overrideGuard(CustomAuthGuard)
            .useValue(mockGuard)
            .compile();

        app = module.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    test('모든 전시회 ID 조회', async() => {
        const res = await request(app.getHttpServer())
            .get('/exhibitions');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(typeof res.body[0]).toBe('number');
    });

    test('메인 페이지 랜덤 전시회 조회', async () => {
        const res = await request(app.getHttpServer())
            .get('/exhibitions/random');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeLessThanOrEqual(5);
    });

    describe('전시회 최신순으로 조회', () => {
        test('성공 시 200 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/exhibitions/newest')
                .query({ page: 0 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body.length).toBeLessThanOrEqual(15);
            res.body.forEach(el => {
                expect(el.artCount).toBeGreaterThanOrEqual(1);
            });
        });

        test('잘못된 페이지 요청 시 400 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/exhibitions/newest')
                .query({ page: -1 });

            expect(res.statusCode).toBe(400);
        });
    });

    describe('전시회 ID로 특정 전시회 조회', () => {
        test('성공 시 200 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/exhibitions/1');

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Object);

            const { content, artworks } = res.body;
            expect(content).not.toBeNull();
            expect(artworks.length).toBeGreaterThanOrEqual(1);
        });

        test('잘못된 전시회 ID로 조회 시 404 에러 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/exhibitions/-1');

            expect(res.statusCode).toBe(404);
        });
    });

});
