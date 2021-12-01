import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/user.repository';
import { ArtworkRepository } from '@artwork/artwork.repository';
import { ExhibitionRepository } from './exhibition.repository';
import { ExhibitionController } from './exhibition.controller';
import { ExhibitionService } from './exhibition.service';
import { ImageService } from '@image/image.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ExhibitionRepository, UserRepository, ArtworkRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [ExhibitionController],
    providers: [ExhibitionService, ImageService],
})
export class ExhibitionModule {}
