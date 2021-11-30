import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    ) {}

    async createCID(image): Promise<string> {
        if(!this.ipfs) {
            this.ipfs = create({ url: process.env.IPFS_URL });
        }

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
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'create artwork failed'
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getArtwork(artworkId: number): Promise<Artwork> {
        const artwork = await this.artworkRepository.findArtwork(artworkId);

        if(!artwork) {
            throw new NotFoundException(`Can't find artwork with id: ${artworkId}`);
        }
        return artwork;
    }

    bulkUpdateArtworkState(artworkIds: number[]): void {
        this.artworkRepository.bulkUpdateArtworkState(artworkIds);
    }

    updateNFTToken(artworkId: number, nftToken: string): Promise<UpdateResult> {
        return this.artworkRepository.updateNFTToken(artworkId, nftToken);
    }

}
