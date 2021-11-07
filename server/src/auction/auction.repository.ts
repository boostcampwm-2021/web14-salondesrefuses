import { CreateArtworkDTO } from 'src/artwork/dto/artworkDTOs';
import { EntityRepository, Repository } from 'typeorm';
import { Auction } from './auction.entity';

@EntityRepository(Auction)
export class AuctionRepository extends Repository<Auction> {
    createAuction(createArtWorkDTO: CreateArtworkDTO): Auction {
        if (createArtWorkDTO.isRegisterAuction === 'true') {
            return this.create({
                endAt: createArtWorkDTO.endAt,
            });
        }
    }

    findAllByAuctionWithArtworkAndPageable(page: number): Promise<Auction[]> {
        return this.createQueryBuilder('auction')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    findByAuctionWithAuctionHistoryAndArtwork(
        auctionId: number,
    ): Promise<Auction> {
        return this.createQueryBuilder('auction')
            .where(`auction.id = ${auctionId}`)
            .leftJoinAndSelect('auction.auctionHistories', 'history')
            .innerJoinAndSelect('auction.artwork', 'artwork')
            .getOne();
    }
}
