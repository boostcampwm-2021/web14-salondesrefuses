import { EntityRepository, Repository } from 'typeorm';
import { Exhibition } from './exhibition.entity';
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
            .innerJoinAndSelect('exhibition.artist', 'artist')
            .where('exhibition.start_at <= now()')
            .orderBy(`now() - exhibition.start_at`, 'ASC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<Exhibition[]> {
        return await this.createQueryBuilder('exhibition')
            .innerJoinAndSelect('exhibition.artist', 'artist')
            .orderBy('exhibition.end_at - now()', 'ASC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    async getExhibitionsSortedByInterest(page: number): Promise<Exhibition[]> {
        return await this.createQueryBuilder('exhibition')
            .innerJoinAndSelect('exhibition.artist', 'artist')
            .innerJoin(
                subQuery => {
                    return subQuery
                        .select('a.id, count(i.artwork_id) as count')
                        .from(Artwork, 'a')
                        .leftJoin(InterestArtwork, 'i', 'a.id = i.artwork_id')
                        .groupBy('a.id');
                },
                'interest',
                'exhibition.id = interest.id',
            )
            .orderBy('interest.count', 'DESC')
            .addOrderBy('exhibition.id', 'DESC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }
}
