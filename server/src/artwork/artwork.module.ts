import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuctionRepository } from 'src/auction/auction.repository';
import { ImageModule } from 'src/image/image.module';
import { ArtworkRepository } from './artwork.repository';
import { ArtworkController } from './controller/artwork.controller';
import { ArtworkService } from './service/artwork.service';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [
        ImageModule,
        TypeOrmModule.forFeature([ ArtworkRepository, AuctionRepository, UserRepository ]),
    ],
    controllers: [ArtworkController],
    providers: [ArtworkService],
    exports: [ArtworkService],
})
export class ArtworkModule {}
