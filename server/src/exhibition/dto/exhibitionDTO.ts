import { ApiProperty } from '@nestjs/swagger';
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

    static from(exhibition: Exhibition): ExhibitionDTO {
        const dto = new ExhibitionDTO();
        const { title, description, artist, collaborator, thumbnailImage, categories } = exhibition;

        dto.title = title;
        dto.description = description;
        dto.artist = artist.name;
        dto.collaborator = collaborator;
        dto.thumbnailImage = thumbnailImage;
        dto.category = categories?.join(',');

        return dto;
    }
}