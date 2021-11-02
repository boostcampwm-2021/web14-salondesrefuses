import { ImageService } from './service/image.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [ImageService],
    exports: [ImageService],
})
export class ImageModule {}
