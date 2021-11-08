import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from '../artwork.entity';

export class CreateArtworkDTO {
    title: string;
    type: string;
    description: string;
    isRegisterAuction?: string;
    endAt?: Date;
}

export class NewArtworkDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nftToken: string;

    static from(artwork: Artwork): NewArtworkDTO {
        const newArtworkDTO = new NewArtworkDTO();
        newArtworkDTO.id = artwork.id;
        newArtworkDTO.nftToken = artwork.nftToken;
        return newArtworkDTO;
    }
}
