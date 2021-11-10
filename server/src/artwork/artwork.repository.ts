import { ObjectStorageData } from 'src/image/dto/ImageDTOs';
import { EntityRepository, Repository } from 'typeorm';
import { Artwork } from './artwork.entity';
import { ArtworkStatus } from './artwork.status.enum';
import { CreateArtworkDTO } from './dto/artworkDTOs';
import { User } from '../user/user.entity';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { ArtworkInBid } from '../artworkInBid/artworkInBid.entity';

@EntityRepository(Artwork)
export class ArtworkRepository extends Repository<Artwork> {

    createArtwork(
        createArtWorkDTO: CreateArtworkDTO,
        { Location: originalImagePath }: ObjectStorageData,
        { Location: croppedImagePath }: ObjectStorageData,
        nftToken: string,
    ): Artwork {
        return this.create({
            title: createArtWorkDTO.title,
            type: createArtWorkDTO.type,
            description: createArtWorkDTO.description,
            originalImage: originalImagePath,
            croppedImage: croppedImagePath,
            nftToken: nftToken,
        });
    }

    async getRandomAuctionArtworks(): Promise<Artwork[]> {
        return await this.createQueryBuilder('artwork')
            .where('artwork.status = :status', { status: ArtworkStatus.InBid })
            .orderBy('RAND()')
            .limit(3)
            .getMany();
    }

    async getAllUsersArtworks(userId: number): Promise<Artwork[]> {
        return await this.find({
            where: { artist: userId },
        });
    }

    getInterestArtworks(userId: number): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .innerJoin(subQuery => {
                return subQuery
                    .select('interest_artwork.artwork_id')
                    .from(InterestArtwork, 'interest_artwork')
                    .where('interest_artwork.user_id = :userId', { userId })
            }, 'interest', 'interest.artwork_id = artwork.id')
            .getMany();
    }

    getBiddingArtworks(userId: number): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .innerJoin(subQuery => {
                return subQuery
                    .select('artwork_in_bid.artwork_id')
                    .from(ArtworkInBid, 'artwork_in_bid')
                    .where('artwork_in_bid.user_id = :userId', { userId })
            }, 'bidding', 'bidding.artwork_id = artwork.id')
            .getMany();
    }

    getBiddedArtworks(userId: number): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .where('artwork.status = :status', { status: ArtworkStatus.BidCompleted })
            .andWhere('artwork.owner_id = :userId', { userId })
            .getMany();
    }

}
