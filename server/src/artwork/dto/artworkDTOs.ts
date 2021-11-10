import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from '../artwork.entity';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateArtworkDTO {
    title: string;

    @IsNotEmpty()
    type: string;

    description: string;

    @IsNotEmpty()
    isRegisterAuction: string;

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

export class InterestRequestDTO {
    @IsNotEmpty()
    @ApiProperty()
    artworkId: string;

    @IsNotEmpty()
    @Matches(/^true$|^false$/, {
        message: 'Only true or false is allowed for isInterest field.'
    })
    @ApiProperty()
    isInterest: "true" | "false";
}
