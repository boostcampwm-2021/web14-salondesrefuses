import { Injectable } from '@nestjs/common';
import { ImageService } from 'src/image/service/image.service';

@Injectable()
export class ArtworkService {
    constructor(private readonly imageService: ImageService) {}

    async createArtWork(image, body) {
        try {
            const croppedImageBuffer = await this.imageService.cropImage(image);
            const [originalImage, croppedImage] = await Promise.all([
                this.imageService.fileUpload(image),
                this.imageService.fileUpload({
                    ...image,
                    buffer: croppedImageBuffer,
                }),
            ]);
            // 아트워크 저장
        } catch (error) {
            console.log(error);
        }
    }
}
