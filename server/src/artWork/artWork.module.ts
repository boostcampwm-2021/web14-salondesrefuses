import { Module } from '@nestjs/common';
import { ImageModule } from 'src/image/image.module';
import { ArtworkController } from './controller/artwork.controller';
import { ArtworkService } from './service/artwork.service';

@Module({
    imports: [ImageModule],
    controllers: [ArtworkController],
    providers: [ArtworkService],
    exports: [ArtworkService],
})
export class ArtworkModule {}
