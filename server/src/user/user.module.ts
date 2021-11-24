import { Module } from '@nestjs/common';
import { ImageModule } from '../image/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { ArtworkRepository } from '../artwork/artwork.repository';
import { ExhibitionRepository } from '../exhibition/exhibition.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuctionHistoryRepository } from '../auctionHistory/auctionHistory.repository';

@Module({
    imports: [
        ImageModule,
        TypeOrmModule.forFeature([ UserRepository, ArtworkRepository, ExhibitionRepository, AuctionHistoryRepository ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET_KEY,
        }),
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ UserService ],
})
export class UserModule {}
