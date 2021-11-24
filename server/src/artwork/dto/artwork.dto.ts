import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from '../artwork.entity';
import { IsNotEmpty, Matches } from 'class-validator';

export class CreateArtworkDTO {
    title: string;

    @IsNotEmpty()
    type: string;

    year: string;

    price: string;

    description: string;

    @IsNotEmpty()
    isRegisterAuction: string;

    endAt?: Date;
}

export class NewArtworkDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    cid: string;

    static from(artwork: Artwork): NewArtworkDTO {
        const newArtworkDTO = new NewArtworkDTO();
        newArtworkDTO.id = artwork.id;
        newArtworkDTO.cid = artwork.cid;
        return newArtworkDTO;
    }
}

export class InterestRequestDTO {
    @IsNotEmpty()
    @ApiProperty()
    artworkId: string;

    @IsNotEmpty()
    @Matches(/^true$|^false$/, {
        message: 'Only true or false is allowed for isInterest field.',
    })
    @ApiProperty()
    isInterest: 'true' | 'false';
}

export class ArtworkDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    originalImage: string;

    @ApiProperty()
    croppedImage: string;

    @ApiProperty()
    artist: string;

    @ApiProperty()
    auctionId?: number;

    static from(artwork: Artwork): ArtworkDto {
        const { id, title, type, description, originalImage, croppedImage, artist, auction } = artwork;
        const artworkDTO = new ArtworkDto();
        artworkDTO.id = id;
        artworkDTO.title = title;
        artworkDTO.type = type;
        artworkDTO.description = description;
        artworkDTO.originalImage = originalImage;
        artworkDTO.croppedImage = croppedImage;
        artworkDTO.artist = artist.name;
        artworkDTO.auctionId = auction && auction.id;
        return artworkDTO;
    }
}
