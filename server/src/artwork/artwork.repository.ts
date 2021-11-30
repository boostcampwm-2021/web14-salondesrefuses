import { ObjectStorageData } from 'src/image/dto/Image.dto';
import { EntityRepository, In, Repository, UpdateResult } from 'typeorm';
import { Artwork } from './artwork.entity';
import { ArtworkStatus } from './enum/artwork.enum';
import { CreateArtworkDTO } from './dto/artwork.dto';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { AuctionHistory } from 'src/auctionHistory/auctionHistory.entity';
import { Auction } from 'src/auction/auction.entity';

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
            year: createArtWorkDTO.year,
            description: createArtWorkDTO.description,
            originalImage: originalImagePath,
            croppedImage: croppedImagePath,
            cid,
        });
    }

    findArtwork(id: number): Promise<Artwork> {
        return this.findOne({ id });
    }

    findUsersArtworks(userId: number): Promise<Artwork[]> {
        return this.find({
            where: { artist: userId },
        });
    }

    findInterestArtworks(userId: number): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
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

    findBiddedArtworks(nftTokens: string[]): Promise<Artwork[]> {
        return this.find({ where: [{ nftToken: In(nftTokens) }] });
    }

    findAllByArtworkIds(artworkIds: number[], relations?: string[]): Promise<Artwork[]> {
        return this.find({ where: { id: In(artworkIds) }, relations: relations });
    }

    bulkUpdateArtworkState(artworkIds: number[]): void {
        this.createQueryBuilder('artworks')
            .update()
            .set({ status: ArtworkStatus.BidCompleted })
            .where({ id: In(artworkIds) })
            .execute();
    }

    updateNFTToken(id: number, nftToken: string): Promise<UpdateResult> {
        return this.update(id, { nftToken });
    }

    findAllByBidding(bidderId): Promise<Artwork[]> {
        return this.createQueryBuilder('artwork')
            .innerJoinAndSelect(
                subquery => {
                    return subquery
                        .select('distinct(a.id), a.artwork_id')
                        .from(AuctionHistory, 'auction_history')
                        .innerJoin(Auction, 'a', 'auction_history.auction_id = a.id')
                        .where(`auction_history.bidder_id = ${bidderId}`);
                },
                'auction',
                'artwork.id = auction.artwork_id',
            )
            .getMany();
    }
}
