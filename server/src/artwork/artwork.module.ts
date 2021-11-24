import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from 'src/auction/auction.repository';
import { ImageModule } from 'src/image/image.module';
import { ArtworkRepository } from './artwork.repository';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { UserRepository } from '../user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { InterestArtworkModule } from '../interestArtwork/interestArtwork.module';

@Module({
    imports: [
        ImageModule,
        InterestArtworkModule,
        TypeOrmModule.forFeature([ArtworkRepository, AuctionRepository, UserRepository]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [ArtworkController],
    providers: [ArtworkService],
    exports: [ArtworkService],
})
export class ArtworkModule {}
