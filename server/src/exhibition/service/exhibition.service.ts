import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExhibitionRepository } from '../exhibition.repository';
import { ExhibitionDTO } from '../dto/exhibitionDTO';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(ExhibitionRepository)
        private exhibitionRepository: ExhibitionRepository
    ) {}

    async getRandomExhibitions(): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getRandomExhibitions();
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async getNewestExhibitions(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getNewestExhibitions(page);
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async getExhibitionsSortedByDeadline(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByDeadline(page);
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

    async getExhibitionsSortedByInterest(page: number): Promise<ExhibitionDTO[]> {
        const exhibitions = await this.exhibitionRepository.getExhibitionsSortedByInterest(page);
        return exhibitions.map(exhibition => ExhibitionDTO.from(exhibition));
    }

}
