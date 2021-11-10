import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExhibitionController } from './controller/exhibition.controller';
import { ExhibitionService } from './service/exhibition.service';
import { ExhibitionRepository } from './exhibition.repository';
import { ArtworkRepository } from 'src/artwork/artwork.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([ExhibitionRepository, ArtworkRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [ExhibitionController],
    providers: [ExhibitionService],
})
export class ExhibitionModule {}
