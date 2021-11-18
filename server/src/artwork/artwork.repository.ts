import { ObjectStorageData } from 'src/image/dto/ImageDTOs';
import { EntityRepository, In, Repository, UpdateResult } from 'typeorm';
import { Artwork } from './artwork.entity';
import { ArtworkStatus } from './artwork.status.enum';
import { CreateArtworkDTO } from './dto/artworkDTOs';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { ArtworkInBid } from '../artworkInBid/artworkInBid.entity';

@EntityRepository(Artwork)
export class ArtworkRepository extends Repository<Artwork> {
    createArtwork(
        createArtWorkDTO: CreateArtworkDTO,
        { Location: originalImagePath }: ObjectStorageData,
        { Location: croppedImagePath }: ObjectStorageData,
        cid: string,
    ): Artwork {
        return this.create({
            title: createArtWorkDTO.title,
            type: createArtWorkDTO.type,
            description: createArtWorkDTO.description,
            originalImage: originalImagePath,
            croppedImage: croppedImagePath,
            cid,
        });
    }

    async getArtwork(id: number): Promise<Artwork> {
        return await this.findOne({ id });
    }

    async getRandomAuctionArtworks(): Promise<Artwork[]> {
        return await this.createQueryBuilder('artwork')
            .where('artwork.status = :status', { status: ArtworkStatus.InBid })
            .orderBy('RAND()')
            .limit(3)
            .getMany();
    }

    async getUsersArtworks(userId: number): Promise<Artwork[]> {
        return await this.find({
            where: { artist: userId },
        });
    }

    async getInterestArtworks(userId: number): Promise<Artwork[]> {
        return await this.createQueryBuilder('artwork')
            .innerJoin(
                subQuery => {
                    return subQuery
                        .select('interest_artwork.artwork_id')
                        .from(InterestArtwork, 'interest_artwork')
                        .where('interest_artwork.user_id = :userId', { userId });
                },
                'interest',
                'interest.artwork_id = artwork.id',
            )
            .getMany();
    }

    async getBiddingArtworks(userId: number): Promise<Artwork[]> {
        return await this.createQueryBuilder('artwork')
            .innerJoin(
                subQuery => {
                    return subQuery
                        .select('artwork_in_bid.artwork_id')
                        .from(ArtworkInBid, 'artwork_in_bid')
                        .where('artwork_in_bid.user_id = :userId', { userId });
                },
                'bidding',
                'bidding.artwork_id = artwork.id',
            )
            .getMany();
    }

    async getBiddedArtworks(userId: number): Promise<Artwork[]> {
        return await this.createQueryBuilder('artwork')
            .where('artwork.status = :status', { status: ArtworkStatus.BidCompleted })
            .andWhere('artwork.owner_id = :userId', { userId })
            .getMany();
    }

    async findAllByExhibitionId(exhibitonId: number): Promise<Artwork[]> {
        return await this.find({
            where: { exhibitionId: exhibitonId },
        });
    }

    async bulkUpdateArtworkState(artworkIds: number[]): Promise<void> {
        this.createQueryBuilder('artworks')
            .update()
            .set({ status: ArtworkStatus.BidCompleted })
            .where({ id: In(artworkIds) })
            .execute();
    }

    async updateNFTToken(id: number, nftToken: string): Promise<UpdateResult> {
        return await this.update(id, { nftToken });
    }

}
