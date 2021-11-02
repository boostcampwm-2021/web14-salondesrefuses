import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArtworkRepository } from "../artwork.repository";
import { Artwork } from "../artwork.entity";

@Injectable()
export class ArtworkService {
    constructor(
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository
    ) {}

    getRandomAuctionArtworks(): Promise<Artwork[]> {
        return this.artworkRepository.getRandomAuctionArtworks();
    }

}
