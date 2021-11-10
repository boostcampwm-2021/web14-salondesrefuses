import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryContoller } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CategoryRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [CategoryContoller],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
