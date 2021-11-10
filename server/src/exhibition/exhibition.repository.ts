import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Exhibition } from './exhibition.entity';
import { Artwork } from '../artwork/artwork.entity';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { HoldExhibitionDTO } from './dto/exhibitionDTOs';
import { Category } from 'src/category/category.entity';

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
                        .select('artwork.exhibition_id, count(interest_artwork.artwork_id) as count')
                        .from(Artwork, 'artwork')
                        .leftJoin(InterestArtwork, 'interest_artwork', 'artwork.id = interest_artwork.artwork_id')
                        .groupBy('artwork.id');
                },
                'artwork',
                'artwork.exhibition_id = exhibition.id',
            )
            .orderBy('artwork.count', 'DESC')
            .addOrderBy('exhibition.id', 'DESC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    async getUsersExhibitions(artist: User): Promise<Exhibition[]> {
        return await this.find({ artist });
    }

    createExhibition(
        thumbnailPath: string,
        holdExhibitionDTO: HoldExhibitionDTO,
        user: User,
        categories: Category[],
    ): Exhibition {
        return this.create({
            title: holdExhibitionDTO.title,
            collaborator: holdExhibitionDTO.collaborator,
            description: holdExhibitionDTO.description,
            startAt: holdExhibitionDTO.startAt,
            endAt: holdExhibitionDTO.endAt,
            thumbnailImage: thumbnailPath,
            contents: holdExhibitionDTO.contents,
            artist: user,
            categories: categories,
        });
    }
}
