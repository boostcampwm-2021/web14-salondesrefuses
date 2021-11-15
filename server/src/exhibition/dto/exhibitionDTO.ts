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

    theme: string;

    description: string;

    @IsNotEmpty()
    startAt: Date;

    @IsNotEmpty()
    endAt: Date;

    @IsNotEmpty()
    contents: string;

    categories: string;

    artworkIds: number[];

    static from(exhibition: Exhibition): HoldExhibitionDTO {
        const dto = new HoldExhibitionDTO();
        const { title, collaborator, theme, description, startAt, endAt, contents, categories } = exhibition;

        dto.title = title;
        dto.collaborator = collaborator;
        dto.theme = theme;
        dto.description = description;
        dto.startAt = startAt;
        dto.endAt = endAt;
        dto.contents = contents;
        dto.categories = categories;
        return dto;
    }

}
