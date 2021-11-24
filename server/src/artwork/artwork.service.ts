import { Injectable } from '@nestjs/common';
import { ImageService } from 'src/image/image.service';
import { ArtworkRepository } from './artwork.repository';
import { CreateArtworkDTO, NewArtworkDTO } from './dto/artwork.dto';
import { create, IPFSHTTPClient } from 'ipfs-http-client';
import { AuctionRepository } from 'src/auction/auction.repository';
import { User } from 'src/user/user.entity';
import { ArtworkStatus } from './enum/artwork.enum';
import { Artwork } from './artwork.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ArtworkService {
    private ipfs: IPFSHTTPClient;

    constructor(
        private readonly imageService: ImageService,
        private readonly artworkRepository: ArtworkRepository,
        private readonly auctionRepository: AuctionRepository,
    ) {
        this.ipfs = create({ url: process.env.IPFS_URL });
    }

    async createCID(image): Promise<string> {
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
                this.createCID(image),
            ]);

            const newArtwork = this.artworkRepository.createArtwork(createArtworkDTO, originalImage, croppedImage, cid);
            const newAuction = this.auctionRepository.createAuction(createArtworkDTO, user);

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

    getArtwork(artworkId: number): Promise<Artwork> {
        return this.artworkRepository.findArtwork(artworkId);
    }

    bulkUpdateArtworkState(artworkIds: number[]): void {
        this.artworkRepository.bulkUpdateArtworkState(artworkIds);
    }

    updateNFTToken(artworkId: number, nftToken: string): Promise<UpdateResult> {
        return this.artworkRepository.updateNFTToken(artworkId, nftToken);
    }

}
