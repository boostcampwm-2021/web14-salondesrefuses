import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageService } from 'src/image/service/image.service';
import { ArtworkRepository } from '../artwork.repository';
import { CreateArtworkDTO, NewArtworkDTO } from '../dto/artworkDTOs';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { AuctionRepository } from 'src/auction/auction.repository';
import { User } from 'src/user/user.entity';
import { ArtworkStatus } from '../artwork.status.enum';

@Injectable()
export class ArtworkService {
    private ipfs: IPFSHTTPClient;

    constructor(
        private readonly imageService: ImageService,
        @InjectRepository(ArtworkRepository)
        private readonly artworkRepository: ArtworkRepository,
        @InjectRepository(AuctionRepository)
        private readonly auctionRepository: AuctionRepository,
    ) {
        this.ipfs = create({ url: process.env.IPFS_URL });
    }

    async createNFTToken(image): Promise<string> {
        const { cid } = await this.ipfs.add(image.buffer);
        return cid.toString();
    }

    async createArtWork(
        image: Express.Multer.File,
        createArtworkDTO: CreateArtworkDTO,
        user: User,
    ): Promise<NewArtworkDTO> {
        try {
            const croppedImageBuffer = await this.imageService.cropImage(image);
            const [originalImage, croppedImage, cid] = await Promise.all([
                this.imageService.fileUpload(image),
                this.imageService.fileUpload({
                    ...image,
                    buffer: croppedImageBuffer,
                }),
                this.createNFTToken(image),
            ]);

            const newArtwork = this.artworkRepository.createArtwork(createArtworkDTO, originalImage, croppedImage, cid);
            const newAuction = this.auctionRepository.createAuction(createArtworkDTO);

            if (newAuction) {
                newArtwork.status = ArtworkStatus.InBid;
                newArtwork.auction = newAuction;
            }

            newArtwork.owner = user;
            newArtwork.artist = user;

            await this.artworkRepository.save(newArtwork);

            return NewArtworkDTO.from(newArtwork);
        } catch (error) {
            console.log(error);
        }
    }
}
