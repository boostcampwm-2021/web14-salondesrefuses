import { Artwork } from 'src/artwork/artwork.entity';
import { CreateArtworkDTO } from 'src/artwork/dto/artworkDTOs';
import { InterestArtwork } from 'src/interestArtwork/interestArtwork.entity';
import { EntityRepository, Raw, Repository } from 'typeorm';
import { Auction } from './auction.entity';
import { User } from '../user/user.entity';
import { ArtworkStatus } from '../artwork/artwork.status.enum';

@EntityRepository(Auction)
export class AuctionRepository extends Repository<Auction> {
    createAuction(createArtWorkDTO: CreateArtworkDTO, user: User): Auction {
        if (createArtWorkDTO.isRegisterAuction === 'true') {
            return this.create({
                seller: user,
                endAt: createArtWorkDTO.endAt,
            });
        }
    }

    findRandomAuctions(): Promise<Auction[]> {
        return this.createQueryBuilder('auction')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .innerJoinAndSelect('artwork.artist', 'artist')
            .orderBy('RAND()')
            .limit(3)
            .getMany();
    }

    findAllByAuctionOrderByNewest(page: number): Promise<Auction[]> {
        return this.createQueryBuilder('auction')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .innerJoinAndSelect('artwork.artist', 'artist')
            .orderBy('auction.id', 'DESC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    findAllByAuctionOrderByPopular(page: number): Promise<Auction[]> {
        return this.createQueryBuilder('auction')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .innerJoinAndSelect('artwork.artist', 'artist')
            .innerJoin(
                subQuery =>
                    subQuery
                        .select('a.id, count(i.artwork_id) as count')
                        .from(Artwork, 'a')
                        .leftJoin(InterestArtwork, 'i', 'a.id = i.artwork_id')
                        .groupBy('a.id'),
                'interest',
                'artwork.id = interest.id',
            )
            .orderBy('interest.count', 'DESC')
            .addOrderBy('auction.id', 'DESC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    findByAuctionWithAuctionHistoryAndArtwork(auctionId: number): Promise<Auction> {
        return this.createQueryBuilder('auction')
            .where(`auction.id = ${auctionId}`)
            .leftJoinAndSelect('auction.auctionHistories', 'history')
            .leftJoinAndSelect('history.bidder', 'bidder')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .innerJoinAndSelect('artwork.artist', 'artist')
            .getOne();
    }

    async deleteAuction(id: number): Promise<Auction> {
        const auction = await this.createQueryBuilder('auction')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .innerJoinAndSelect('auction.seller', 'seller')
            .where('auction.id = :id', { id })
            .getOne();

        this.delete({ id });
        return auction;
    }

    findAuctionInfo(auctionId: number): Promise<Auction> {
        return this.findOne({
            relations: [ 'artwork' ],
            where: { id: auctionId }
        });
    }

    findEndedAuctions(): Promise<Auction[]> {
        return this.find({
            relations: ['artwork'],
            where: [
                { endAt: Raw(endAt => `${endAt} <= CURRENT_DATE`) },
                { artwork: { status: ArtworkStatus.InBid } },
            ]
        })
    }

}
