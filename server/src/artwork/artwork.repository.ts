import { EntityRepository, Repository } from 'typeorm';
import { Artwork } from './artwork.entity';

@EntityRepository(Artwork)
export class ArtworkRepository extends Repository<Artwork> {}
