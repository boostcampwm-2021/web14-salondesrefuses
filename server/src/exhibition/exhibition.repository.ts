import { EntityRepository, Repository } from 'typeorm';
import { Exhibition } from "./exhibition.entity";
import { Artwork } from '../artwork/artwork.entity';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';

@EntityRepository(Exhibition)
export class ExhibitionRepository extends Repository<Exhibition> {

    async getRandomExhibitions(): Promise<Exhibition[]> {
        return await this.createQueryBuilder('exhibition')
            .innerJoinAndSelect('exhibition.artist', 'artist')
            .orderBy('RAND()')
            .limit(5)
            .getMany();
    }

    async getNewestExhibitions(page: number): Promise<Exhibition[]> {
        return await this.createQueryBuilder('exhibition')
            .where('exhibition.start_at <= now()')
            .orderBy(`now() - exhibition.start_at`, 'ASC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<Exhibition[]> {
        return await this.createQueryBuilder('exhibition')
            .orderBy('exhibition.end_at - now()', 'ASC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    async getExhibitionsSortedByInterest(page: number): Promise<Exhibition[]> {
        return await this.createQueryBuilder('exhibition')
            .innerJoin(subQuery => {
                return subQuery
                    .select('artwork.exhibition_id')
                    .from(Artwork, 'artwork')
                    .innerJoin(
                        InterestArtwork,
                        'interest_artwork',
                        'artwork.id = interest_artwork.artwork_id'
                    )
            }, 'artwork', 'artwork.exhibition_id = exhibition.id')
            .groupBy('exhibition.id')
            .orderBy('count(exhibition.id)', 'DESC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

}
