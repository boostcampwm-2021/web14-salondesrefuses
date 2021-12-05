import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from '@image/image.module';
import { InterestArtworkModule } from '@interestArtwork/interestArtwork.module';
import { AuctionRepository } from '@auction/auction.repository';
import { UserRepository } from '@user/user.repository';
import { ArtworkRepository } from './artwork.repository';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';

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
