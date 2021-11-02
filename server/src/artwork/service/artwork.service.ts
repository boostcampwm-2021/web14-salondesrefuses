import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auction } from 'src/auction/auction.entity';
import { ImageService } from 'src/image/service/image.service';
import { Artwork } from '../artwork.entity';
import { ArtworkRepository } from '../artwork.repository';
import { CreateArtworkDTO } from '../dto/artworkDTOs';

@Injectable()
export class ArtworkService {
    constructor(
        private readonly imageService: ImageService,
        @InjectRepository(ArtworkRepository)
        private readonly artworkRepository: ArtworkRepository,
    ) {}

    async createArtWork(image, body: CreateArtworkDTO) {
        try {
            const croppedImageBuffer = await this.imageService.cropImage(image);
            const [originalImage, croppedImage] = await Promise.all([
                this.imageService.fileUpload(image),
                this.imageService.fileUpload({
                    ...image,
                    buffer: croppedImageBuffer,
                }),
            ]);

            const newArtwork = new Artwork();
            newArtwork.title = body.title;
            newArtwork.type = body.type;
            newArtwork.description = body.description;
            newArtwork.originalImage = originalImage.Location;
            newArtwork.croppedImage = croppedImage.Location;
            newArtwork.nftToken = 'temp-NFT-token';

            if (body.isRegisterAuction) {
                const newAuction = new Auction();
                newAuction.startAt = new Date('2020-10-01');
                newAuction.endAt = new Date('2020-10-10');
                newArtwork.auction = newAuction;
                // this.auctionRepository.save(newAuction);
            }

            this.artworkRepository.save(newArtwork);
        } catch (error) {
            console.log(error);
        }
    }
}
