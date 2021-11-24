import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitionController } from './exhibition.controller';
import { ExhibitionService } from './exhibition.service';
import { ExhibitionRepository } from './exhibition.repository';
import { JwtModule } from '@nestjs/jwt';
import { ImageService } from 'src/image/image.service';
import { UserRepository } from 'src/user/user.repository';
import { ArtworkRepository } from 'src/artwork/artwork.repository';

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
