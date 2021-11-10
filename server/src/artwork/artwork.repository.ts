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

    getInterestArtworks(userId: string, loginStrategy: string): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .innerJoin(subQuery => {
                return subQuery
                    .select('interest_artwork.artwork_id, user.user_id, user.login_strategy')
                    .from(InterestArtwork, 'interest_artwork')
                    .innerJoin(User, 'user', 'interest_artwork.user_id = user.id')
            }, 'interest', 'interest.artwork_id = artwork.id')
            .where('interest.user_id = :userId', { userId })
            .andWhere('interest.login_strategy = :loginStrategy', { loginStrategy })
            .getMany();
    }

    getBiddingArtworks(userId: string, loginStrategy: string): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .innerJoin(subQuery => {
                return subQuery
                    .select('artwork_in_bid.artwork_id, user.user_id, user.login_strategy')
                    .from(ArtworkInBid, 'artwork_in_bid')
                    .innerJoin(User, 'user', 'artwork_in_bid.user_id = user.id')
            }, 'bidding', 'bidding.artwork_id = artwork.id')
            .where('bidding.user_id = :userId', { userId })
            .andWhere('bidding.login_strategy = :loginStrategy', { loginStrategy })
            .getMany();
    }

    getBiddedArtworks(userId: string, loginStrategy: string): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .innerJoin(subQuery => {
                return subQuery
                    .select('user.id as user_id')
                    .from(User, 'user')
                    .where('user.user_id = :userId', { userId })
                    .andWhere('user.login_strategy = :loginStrategy', { loginStrategy })
            }, 'bidded', 'bidded.user_id = artwork.owner_id')
            .where('artwork.status = :status', { status: ArtworkStatus.BidCompleted })
            .getMany();
    }

}
