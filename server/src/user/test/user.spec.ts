import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { CustomAuthGuard } from '@auth/guard/customAuthGuard';

describe('User Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const mockGuard: CanActivate = {
            canActivate: jest.fn(
                (context: ExecutionContext): boolean => {
                    const req = context.switchToHttp().getRequest();
                    const { isValid } = req.cookies;

                    if (isValid == 'false') {
                        return false;
                    }

                    req.user = {
                        id: 1,
                        name: 'foo',
                    };
                    return true;
                }
            )
        };

        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).overrideGuard(CustomAuthGuard)
            .useValue(mockGuard)
            .compile();

        app = module.createNestApplication();
        app.use(cookieParser());
        await app.init();
    });

    describe('사용자 정보 조회', () => {
        test('로그인 시 200 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/users')
                .set('Cookie', ['isValid=true']);

            expect(res.statusCode).toBe(200);
            expect(res.body).not.toBeNull();

            const { userId, name } = res.body;
            expect(userId).not.toBeNull();
            expect(name).not.toBeNull();
        });


        test('비로그인 시 403 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/users')
                .set('Cookie', ['isValid=false']);

            expect(res.statusCode).toBe(403);
        });
    });

    test('사용자 작품 조회', async () => {
        const res = await request(app.getHttpServer())
            .get('/users/artworks')
            .set('Cookie', ['isValid=true']);

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        res.body.forEach(el => {
            expect(el.title).not.toBeNull();
        });
    });

    test('사용자가 입찰한 작품 조회', async () => {
        const testToken = [2, 3, 4];

        const res = await request(app.getHttpServer())
            .get('/users/artworks/bid')
            .set('Cookie', ['isValid=true'])
            .query({ nftTokens: JSON.stringify(testToken) });

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBe(3);
        res.body.forEach(el => {
            const { title, originalImage } = el;
            expect(title).not.toBeNull();
            expect(originalImage).toMatch(process.env.NCP_OBJECT_STORAGE);
        });
    });

    test('사용자가 개최한 전시회 조회', async () => {
        const res = await request(app.getHttpServer())
            .get('/users/exhibitions');

        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        res.body.forEach(el => {
            const { title, thumbnailImage } = el;
            expect(title).not.toBeNull();
            expect(thumbnailImage).not.toBeNull();
        });
    });

});
