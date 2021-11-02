import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/service/image.service';
import { ArtworkRepository } from '../artwork.repository';
import { CreateArtworkDTO } from '../dto/artworkDTOs';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { Artwork } from '../artwork.entity';

@Injectable()
export class ArtworkService {
    ipfs: IPFSHTTPClient;

    constructor(
        private readonly imageService: ImageService,
        @InjectRepository(ArtworkRepository)
        private readonly artworkRepository: ArtworkRepository,
    ) {
        this.ipfs = create({ url: process.env.IPFS_URL });
    }

    async createNFTToken(image): Promise<string> {
        const { cid } = await this.ipfs.add(image.buffer);
        return cid.toString();
    }

    async createArtWork(image: Express.Multer.File, body: CreateArtworkDTO): Promise<Artwork> {
        try {
            const croppedImageBuffer = await this.imageService.cropImage(image);
            const [originalImage, croppedImage] = await Promise.all([
                this.imageService.fileUpload(image),
                this.imageService.fileUpload({
                    ...image,
                    buffer: croppedImageBuffer,
                }),
            ]);

            const newArtwork = CreateArtworkDTO.convertArtworkEntity(
                body,
                originalImage,
                croppedImage,
                'NFT_TOKEN',
            );

            return await this.artworkRepository.save(newArtwork);
        } catch (error) {
            console.log(error);
        }
    }
}
