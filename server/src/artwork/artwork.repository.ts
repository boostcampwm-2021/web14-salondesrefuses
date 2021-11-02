import { EntityRepository, Repository } from 'typeorm';
import { Artwork } from './artwork.entity';
import { ArtworkStatus } from './artwork.status.enum';

@EntityRepository(Artwork)
export class ArtworkRepository extends Repository<Artwork> {
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
}
