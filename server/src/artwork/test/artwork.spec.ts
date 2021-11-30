import * as request from 'supertest';
import * as faker from 'faker';
import * as fs from 'fs';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, ExecutionContext, INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { CustomAuthGuard } from '../../auth/guard/CustomAuthGuard';

describe('Artwork Test', () => {
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

    describe('작품 ID로 작품 조회', () => {
        test('성공 시 200 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/artworks/1');

            expect(res.statusCode).toBe(200);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.originalImage).toMatch(process.env.NCP_OBJECT_STORAGE);
        });

        test('작품 ID가 숫자가 아닐 경우 400 에러 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/artworks/artworkId');

            expect(res.statusCode).toBe(400);
        });

        test('잘못된 작품 ID로 조회 시 404 에러 반환', async () => {
            const res = await request(app.getHttpServer())
                .get('/artworks/-1');

            expect(res.statusCode).toBe(404);
        });
    });

    // test('작품 생성 시 NewArtworkDTO 반환', async () => {
    //     const image = path.join(__dirname, './logo.png');
    //     const createArtworkDTO = {
    //         title: 'artwork title',
    //         type: 'photography',
    //         year: '2021',
    //         price: '5ETH',
    //         description: 'this is artwork',
    //         isRegisterAuction: 'true',
    //         endAt: '2021-12-01',
    //         image: JSON.stringify(fs.readFileSync(image)),
    //     };
    //     // const formData = new FormData();
    //     // formData.append('title', 'artwork title');
    //     // formData.append('type', 'photography');
    //     // formData.append('year', '2021');
    //     // formData.append('price', '5ETH');
    //     // formData.append('description', 'this is artwork');
    //     // formData.append('isRegisterAuction', 'true');
    //     // formData.append('endAt', '2021-12-01');
    //     // formData.append('image', fs.readFileSync(image).toString());
    //
    //     const res = await request(app.getHttpServer())
    //         .post('/artworks')
    //         .set('Cookie', ['isValid=true'])
    //         .send(createArtworkDTO);
    //
    //     expect(res.statusCode).toBe(200);
    // });

    test('로그인되어 있지 않은 상태에서 작품 생성 시 401 에러 반환', async () => {
        const image = path.join(__dirname, './logo.png');
        const createArtworkDTO = {
            title: 'artwork title',
            type: 'photography',
            year: '2021',
            price: '5ETH',
            description: 'this is artwork',
            isRegisterAuction: 'true',
            endAt: '2021-12-01',
            image: fs.readFileSync(image).toString(),
        };

        const res = await request(app.getHttpServer())
            .post('/artworks')
            .set('Cookie', ['isValid=false'])
            .send(createArtworkDTO)

        expect(res.statusCode).toBe(403);
    });

    test('작품을 경매로 등록할 시 nft token 추가', async () => {
        const nftToken = faker.lorem.sentence();

        const res = await request(app.getHttpServer())
            .patch('/artworks/1/nft')
            .set('Cookie', ['isValid=true'])
            .send({ nftToken });

        expect(res.statusCode).toBe(200);
        expect(res.body.affected).toBe(1);
    });

});
