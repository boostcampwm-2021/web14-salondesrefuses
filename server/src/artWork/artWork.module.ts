import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageModule } from 'src/image/image.module';
import { ArtworkRepository } from './artwork.repository';
import { ArtworkController } from './controller/artwork.controller';
import { ArtworkService } from './service/artwork.service';

@Module({
    imports: [ImageModule, TypeOrmModule.forFeature([ArtworkRepository])],
    controllers: [ArtworkController],
    providers: [ArtworkService],
    exports: [ArtworkService],
})
export class ArtworkModule {}
