import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from '../exhibition.repository';
import { ExhibitionListItemDTO } from '../dto/exhibitionDTOs';
import { ArtworkRepository } from 'src/artwork/artwork.repository';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository,
        @InjectRepository(ArtworkRepository)
        private artworkRepository: ArtworkRepository,
    ) {}

    async getRandomExhibitions(): Promise<ExhibitionListItemDTO[]> {
        const exhibitions = await this.exhibitionRepository.getRandomExhibitions();
        // @TODO 카테고리 로직 추가
        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionListItemDTO.from(exhibition, artworks);
            }),
        );
    }

    async getNewestExhibitions(page: number): Promise<ExhibitionListItemDTO[]> {
        const exhibitions = await this.exhibitionRepository.getNewestExhibitions(page);

        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionListItemDTO.from(exhibition, artworks);
            }),
        );
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionListItemDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByDeadline(page);

        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionListItemDTO.from(exhibition, artworks);
            }),
        );
    }

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionListItemDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByInterest(page);

        return Promise.all(
            exhibitions.map(async exhibition => {
                const artworks = await this.artworkRepository.findAllByExhibitionId(exhibition.id);
                return ExhibitionListItemDTO.from(exhibition, artworks);
            }),
        );
    }
}
