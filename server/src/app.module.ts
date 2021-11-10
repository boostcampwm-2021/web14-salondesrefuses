import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { ArtworkModule } from './artwork/artwork.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuctionModule } from './auction/auction.module';
import { SseModule } from './utils/sse/sse.module';
import { InterestArtworkModule } from './interestArtwork/interestArtwork.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ExhibitionModule,
        ArtworkModule,
        UserModule,
        AuthModule,
        AuctionModule,
        InterestArtworkModule,
        SseModule,
    ],
})
export class AppModule {}
