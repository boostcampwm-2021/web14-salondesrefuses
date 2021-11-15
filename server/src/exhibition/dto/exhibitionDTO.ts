import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Artwork } from 'src/artwork/artwork.entity';
import { ArtworkStatus } from 'src/artwork/artwork.status.enum';
import { Exhibition } from '../exhibition.entity';

export class ExhibitionDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    artist: string;

    @ApiProperty()
    collaborator: string;

    @ApiProperty()
    thumbnailImage: string;

    @ApiProperty()
    category: string;

    @ApiProperty()
    theme: string;

    @ApiProperty()
    artCount: number;

    @ApiProperty()
    isSale: boolean;

    static from(exhibition: Exhibition, artworks: Artwork[]): ExhibitionDTO {
        const dto = new ExhibitionDTO();
        const { id, title, description, artist, collaborator, thumbnailImage, categories, theme } = exhibition;

        dto.id = id;
        dto.title = title;
        dto.description = description;
        dto.artist = artist.name;
        dto.collaborator = collaborator;
        dto.thumbnailImage = thumbnailImage;
        dto.category = categories;
        dto.theme = theme;
        dto.artCount = artworks.length;
        dto.isSale = artworks.some(artwork => artwork.status === ArtworkStatus.InBid);
        return dto;
    }
}

export class HoldExhibitionDTO {
    @IsNotEmpty()
    title: string;

    collaborator: string;

    @IsNotEmpty()
    startAt: Date;

    @IsNotEmpty()
    endAt: Date;

    description: string;

    artworkIds: number[];

    @IsNotEmpty()
    contents: string;

    categories: string[];

    theme: string;
}
