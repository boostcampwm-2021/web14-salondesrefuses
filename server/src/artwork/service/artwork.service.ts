import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/service/image.service';
import { ArtworkRepository } from '../artwork.repository';
import { CreateArtworkDTO } from '../dto/artworkDTOs';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { CIDR } from 'aws-sdk/clients/directconnect';

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

    async createNFTToken(image): Promise<> {
        const { cid } = await this.ipfs.add(image.buffer);
        return cid;
    }

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

            const newArtwork = CreateArtworkDTO.convertArtworkEntity(
                body,
                originalImage,
                croppedImage,
                'NFT_TOKEN',
            );

            this.artworkRepository.save(newArtwork);
        } catch (error) {
            console.log(error);
        }
    }
}
