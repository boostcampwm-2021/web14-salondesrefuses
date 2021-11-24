import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Exhibition } from './exhibition.entity';
import { Artwork } from '../artwork/artwork.entity';
import { InterestArtwork } from '../interestArtwork/interestArtwork.entity';
import { HoldExhibitionDTO } from './dto/exhibition.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Exhibition)
export class ExhibitionRepository extends Repository<Exhibition> {
    async findExhibition(id: number): Promise<Exhibition> {
        const exhibition = await this.findOne(id);
        if(!exhibition) {
            throw new NotFoundException();
        }
        return exhibition;
    }

    findRandomExhibitions(): Promise<Exhibition[]> {
        return this.createQueryBuilder('exhibition')
            .orderBy('RAND()')
            .limit(5)
            .getMany();
    }

    findNewestExhibitions(page: number): Promise<Exhibition[]> {
        return this.createQueryBuilder('exhibition')
            .where('exhibition.start_at <= now()')
            .orderBy(`now() - exhibition.start_at`, 'ASC')
            .addOrderBy('id', 'DESC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    findExhibitionsSortedByDeadline(page: number): Promise<Exhibition[]> {
        return this.createQueryBuilder('exhibition')
            .orderBy('exhibition.end_at - now()', 'ASC')
            .offset(page * 15)
            .limit(15)
            .getMany();
    }

    findExhibitionsSortedByInterest(page: number): Promise<Exhibition[]> {
        return this.createQueryBuilder('exhibition')
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

    findUsersExhibitions(artist: User): Promise<Exhibition[]> {
        return this.find({ artistName: artist.name });
    }

    createExhibition(thumbnailPath: string, holdExhibitionDTO: HoldExhibitionDTO, user: User): Exhibition {
        const { title, collaborator, description, startAt, endAt, contents, theme, categories, size, artworkIds } =
            holdExhibitionDTO;

        return this.create({
            title,
            collaborator,
            description,
            startAt,
            endAt,
            thumbnailImage: thumbnailPath,
            contents,
            theme,
            artistName: user.name,
            categories: JSON.stringify(categories),
            size,
            artworkIds,
        });
    }
}
