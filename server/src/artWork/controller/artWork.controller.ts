import { Controller, Get } from "@nestjs/common";
import { ArtworkService } from "../service/artwork.service";
import { Artwork } from "../artwork.entity";

@Controller('/artworks')
export class ArtworkController {
    constructor(private artworkService: ArtworkService) {}

    @Get('/random')
    getRandomAuctionArtworks(): Promise<Artwork[]> {
        return this.artworkService.getRandomAuctionArtworks();
    }

}
