import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestArtworkService } from './interestArtwork.service';
import { InterestArtworkRepository } from './interestArtwork.repository';
import { ArtworkRepository } from '../artwork/artwork.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([InterestArtworkRepository, ArtworkRepository])
    ],
    providers: [ InterestArtworkService ],
    exports: [ InterestArtworkService ],
})
export class InterestArtworkModule {}
