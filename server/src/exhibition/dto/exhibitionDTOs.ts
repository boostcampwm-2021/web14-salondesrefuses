import { ApiProperty } from '@nestjs/swagger';
import { Artwork } from 'src/artwork/artwork.entity';
import { ArtworkStatus } from 'src/artwork/artwork.status.enum';
import { Exhibition } from '../exhibition.entity';

export class ExhibitionListItemDTO {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description?: string;

    @ApiProperty()
    artist: string;

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

    static from(exhibition: Exhibition, artworks: Artwork[]): ExhibitionListItemDTO {
        const dto = new ExhibitionListItemDTO();
        dto.id = exhibition.id;
        dto.title = exhibition.title;
        dto.description = exhibition.description;
        dto.artist = exhibition.artist.name;
        dto.thumbnailImage = exhibition.thumbnailImage;
        dto.theme = exhibition.theme;
        dto.artCount = artworks.length;
        dto.isSale = artworks.some(artwork => artwork.status === ArtworkStatus.InBid);
        return dto;
    }
}
