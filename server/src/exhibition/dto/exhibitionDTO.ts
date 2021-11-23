import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Artwork } from 'src/artwork/artwork.entity';
import { ArtworkStatus } from 'src/artwork/artwork.status.enum';
import { ArtworkDTO } from 'src/artwork/dto/artworkDTOs';
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
        const { id, title, description, artistName, collaborator, thumbnailImage, categories, theme } = exhibition;

        dto.id = id;
        dto.title = title;
        dto.description = description;
        dto.artist = artistName;
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
    id: number;

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

    artworkIds: string;

    size: string;

    static from(exhibition: Exhibition): HoldExhibitionDTO {
        const dto = new HoldExhibitionDTO();
        const { id, title, collaborator, theme, description, startAt, endAt, contents, categories, size } = exhibition;

        dto.id = id;
        dto.title = title;
        dto.collaborator = collaborator;
        dto.theme = theme;
        dto.description = description;
        dto.startAt = startAt;
        dto.endAt = endAt;
        dto.contents = contents;
        dto.categories = categories;
        dto.size = `${size}`;
        return dto;
    }
}

export class UpdateExhibitionDTO {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    contents: string;
}

export class ExhibitionDetailDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    collaborator: string;

    @ApiProperty()
    theme: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    startAt: Date;

    @ApiProperty()
    endAt: Date;

    @ApiProperty()
    contents: string;

    @ApiProperty()
    categories: string;

    @ApiProperty()
    artworks: ArtworkDTO[];

    @ApiProperty()
    size: string;

    static from(exhibition: Exhibition, artworks: Artwork[]): ExhibitionDetailDTO {
        const { id, title, collaborator, theme, description, startAt, endAt, contents, categories, size } = exhibition;

        const exhibitionDetailDTO = new ExhibitionDetailDTO();
        exhibitionDetailDTO.id = id;
        exhibitionDetailDTO.title = title;
        exhibitionDetailDTO.collaborator = collaborator;
        exhibitionDetailDTO.description = description;
        exhibitionDetailDTO.theme = theme;
        exhibitionDetailDTO.startAt = startAt;
        exhibitionDetailDTO.endAt = endAt;
        exhibitionDetailDTO.contents = contents;
        exhibitionDetailDTO.categories = categories;
        exhibitionDetailDTO.size = size;
        exhibitionDetailDTO.artworks = artworks.map(artwork => ArtworkDTO.from(artwork));
        return exhibitionDetailDTO;
    }
}
